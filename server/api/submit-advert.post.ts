import { promises as fs } from 'node:fs'
import path from 'node:path'

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

        // 4. Log email notification (in production, use nodemailer or email service)
        console.log('========================================')
        console.log('[EMAIL NOTIFICATION]')
        console.log('========================================')
        console.log(`To: info@totakeaction.com`)
        console.log(`Subject: New Ad Submission: ${body.business_name}`)
        console.log('')
        console.log('Business Details:')
        console.log(`  Name: ${body.business_name}`)
        console.log(`  URL: ${body.website_url}`)
        console.log(`  Logo: ${body.logo_url || 'Not provided'}`)
        console.log(`  Tagline: ${body.tagline || 'Not provided'}`)
        console.log(`  Description: ${body.description || 'Not provided'}`)
        console.log(`  Keywords: ${body.keywords || 'None'}`)
        console.log(`  Contact Email: ${body.contact_email}`)
        console.log(`  Contact Name: ${body.contact_name || 'Not provided'}`)
        console.log('========================================')

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
