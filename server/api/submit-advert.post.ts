import { promises as fs } from 'node:fs'
import path from 'node:path'
import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Validate required fields (only business_name, website_url, contact_email are required)
    if (!body.business_name || !body.website_url || !body.contact_email) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields: business_name, website_url, and contact_email are required'
        })
    }

    const advertsPath = path.resolve(process.cwd(), 'content/toreview_advert.json')

    try {
        // 1. Read existing adverts
        let adverts = []
        try {
            const fileData = await fs.readFile(advertsPath, 'utf-8')
            adverts = JSON.parse(fileData)
        } catch (e) {
            // File might not exist yet
            adverts = []
        }

        // 2. Prepare new entry
        const newEntry = {
            id: Date.now(),
            created_at: new Date().toISOString(),
            status: 'pending_review',
            business_name: body.business_name,
            website_url: body.website_url,
            logo_url: body.logo_url || null,
            tagline: body.tagline || null,
            description: body.description || null,
            keywords: body.keywords || null,
            contact_email: body.contact_email,
            contact_name: body.contact_name || null
        }

        // 3. Append and save
        adverts.push(newEntry)
        await fs.writeFile(advertsPath, JSON.stringify(adverts, null, 2), 'utf-8')

        // 4. Send email notification via Resend
        try {
            const config = useRuntimeConfig()
            const resend = new Resend(config.resendApiKey);
            const { data, error } = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: ['info@totakeaction.com'],
                subject: `New Ad Submission: ${body.business_name}`,
                html: `
                <h1>New Advertisement Submission</h1>
                <h2>Business Details</h2>
                <ul>
                    <li><strong>Name:</strong> ${body.business_name}</li>
                    <li><strong>URL:</strong> <a href="${body.website_url}">${body.website_url}</a></li>
                    <li><strong>Logo:</strong> ${body.logo_url || 'Not provided'}</li>
                    <li><strong>Tagline:</strong> ${body.tagline || 'Not provided'}</li>
                    <li><strong>Description:</strong> ${body.description || 'Not provided'}</li>
                    <li><strong>Keywords:</strong> ${body.keywords || 'None'}</li>
                </ul>
                <h2>Contact Information</h2>
                <ul>
                    <li><strong>Email:</strong> ${body.contact_email}</li>
                    <li><strong>Name:</strong> ${body.contact_name || 'Not provided'}</li>
                </ul>
                <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
                `
            });

            if (error) {
                console.error('Resend API Error:', error);
            } else {
                console.log('Resend Email Sent:', data);
            }
        } catch (e) {
            console.error('Failed to send email via Resend:', e);
            // Non-blocking error
        }

        return {
            success: true,
            message: 'Advertisement submission received and saved for review'
        }
    } catch (error: any) {
        console.error('API Error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to process submission'
        })
    }
})
