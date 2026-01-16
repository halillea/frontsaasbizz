import { promises as fs } from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.business_name || !body.website_url) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields'
        })
    }

    const sponsorsPath = path.resolve(process.cwd(), 'content/sponsors.json')

    try {
        // 1. Read existing sponsors
        let sponsors = []
        try {
            const fileData = await fs.readFile(sponsorsPath, 'utf-8')
            sponsors = JSON.parse(fileData)
        } catch (e) {
            // File might not exist yet, initialization handled by previous tool call but safety first
            sponsors = []
        }

        // 2. Prepare new entry
        const newEntry = {
            id: Date.now(),
            created_at: new Date().toISOString(),
            startup_name: body.business_name,
            website_url: body.website_url,
            tagline: body.tagline || null,
            category: body.keywords || null,
            mrr: "Pending",
            status: 'pending'
        }

        // 3. Append and save
        sponsors.push(newEntry)
        await fs.writeFile(sponsorsPath, JSON.stringify(sponsors, null, 2), 'utf-8')

        // 4. Mock Email Sending
        // In a real production environment, you would use nodemailer or a service like Postmark
        console.log(`[EMAIL SENDING] To: info@totakeaction.com`)
        console.log(`[EMAIL SUBJECT] New Sponsor Submission: ${body.business_name}`)
        console.log(`[EMAIL BODY]:`)
        console.log(`Business: ${body.business_name}`)
        console.log(`URL: ${body.website_url}`)
        console.log(`Tagline: ${body.tagline}`)
        console.log(`Keywords: ${body.keywords}`)

        return {
            success: true,
            message: 'Sponsor data saved and email notification logged'
        }
    } catch (error: any) {
        console.error('API Error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to process submission'
        })
    }
})
