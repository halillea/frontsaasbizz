import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = serverSupabaseServiceRole(event)

    if (!body.business_name || !body.website_url) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields'
        })
    }

    try {
        // 1. Insert into Supabase
        const newEntry = {
            created_at: new Date().toISOString(),
            business_name: body.business_name,
            website_url: body.website_url,
            tagline: body.tagline || null,
            keywords: body.keywords || null,
            contact_email: body.contact_email || 'unknown',
            mrr: "Pending",
            status: 'pending'
        }

        const { error } = await client
            .from('sponsors')
            .insert(newEntry)

        if (error) throw error

        return {
            success: true,
            message: 'Sponsor data saved'
        }
    } catch (error: any) {
        console.error('API Error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to process submission'
        })
    }
})
