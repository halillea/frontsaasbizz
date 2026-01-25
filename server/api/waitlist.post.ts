import { promises as fs } from 'node:fs'
import path from 'node:path'
import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Validate required fields
    if (!body.name || !body.email) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields: name and email are required'
        })
    }

    const waitlistPath = path.resolve(process.cwd(), 'content/waitlist.json')

    try {
        // 1. Read existing waitlist
        let waitlist = []
        try {
            const fileData = await fs.readFile(waitlistPath, 'utf-8')
            waitlist = JSON.parse(fileData)
        } catch (e) {
            // File might not exist yet
            waitlist = []
        }

        // 2. Check if email already exists
        const existingEntry = waitlist.find((entry: any) => entry.email === body.email)
        if (existingEntry) {
            return {
                success: true,
                message: 'You are already on the waitlist!'
            }
        }

        // 3. Prepare new entry
        const newEntry = {
            id: Date.now(),
            created_at: new Date().toISOString(),
            name: body.name,
            email: body.email,
            phone: body.phone || null
        }

        // 4. Append and save
        waitlist.push(newEntry)
        await fs.writeFile(waitlistPath, JSON.stringify(waitlist, null, 2), 'utf-8')

        // 5. Log email notification (in production, use nodemailer or email service)
        console.log('========================================')
        console.log('[WAITLIST EMAIL NOTIFICATION]')
        console.log('========================================')
        console.log(`To: contact@totakeaction.com`)
        console.log(`Subject: New Advertising Waitlist Signup`)
        console.log('')
        console.log('Contact Details:')
        console.log(`  Name: ${body.name}`)
        console.log(`  Email: ${body.email}`)
        console.log(`  Phone: ${body.phone || 'Not provided'}`)
        console.log(`  Signed up at: ${newEntry.created_at}`)
        console.log('========================================')

        // 6. Send email notification using fetch to an email service
        // For now, we'll use a simple approach that logs the email
        // In production, integrate with SendGrid, Mailgun, or similar
        try {
            await sendEmailNotification({
                to: 'contact@totakeaction.com',
                subject: `New Advertising Waitlist Signup: ${body.name}`,
                name: body.name,
                email: body.email,
                phone: body.phone
            })
        } catch (emailError) {
            console.error('Email notification failed:', emailError)
            // Don't fail the request if email fails - entry is already saved
        }

        return {
            success: true,
            message: 'Successfully joined the waitlist'
        }
    } catch (error: any) {
        console.error('API Error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to process waitlist signup'
        })
    }
})

/**
 * Send email notification about new waitlist signup
 * Uses mailto link approach for simple implementation
 * Replace with actual email service in production
 */
async function sendEmailNotification(data: {
    to: string
    subject: string
    name: string
    email: string
    phone: string | null
}) {
    // Build email body
    const emailBody = `
New Advertising Waitlist Signup

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Time: ${new Date().toISOString()}

---
This person wants to be notified when advertising spots become available on SaaSBizz.
    `.trim()

    // Log the email content (for development)
    console.log('\n[EMAIL BODY]')
    console.log(emailBody)
    console.log('')

    // In production, you would use an email service like:
    // - Resend: await resend.emails.send({ ... })
    // - SendGrid: await sgMail.send({ ... })
    // - Nodemailer: await transporter.sendMail({ ... })

    try {
        const config = useRuntimeConfig()
        const resend = new Resend(config.resendApiKey);
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['info@totakeaction.com'],
            subject: data.subject,
            html: `
            <h1>${data.subject}</h1>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
            <hr>
            <p>This person wants to be notified when advertising spots become available on SaaSBizz.</p>
            `
        });

        if (error) {
            console.error('Resend API Error:', error);
            return false;
        }

        console.log('Resend Email Sent:', data);
        return true;
    } catch (e) {
        console.error('Failed to send email via Resend:', e);
        return false;
    }
}
