import { Resend } from 'resend'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = serverSupabaseServiceRole(event)

    // Validate required fields
    if (!body.business_name || !body.website_url || !body.contact_email) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields'
        })
    }

    try {
        // 1. Insert into Supabase (Sponsors table with status='pending_review')
        const newEntry = {
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

        const { error: dbError } = await client
            .from('sponsors')
            .insert(newEntry)

        if (dbError) throw dbError

        // 2. Send email notification via Resend
        try {
            const config = useRuntimeConfig()
            const resend = new Resend(config.resendApiKey);
            const { data, error } = await resend.emails.send({
                from: 'info@envoi.saasbizz.com',
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
            message: 'Advertisement submitted successfully'
        }
    } catch (error: any) {
        console.error('API Error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to process submission'
        })
    }
})
