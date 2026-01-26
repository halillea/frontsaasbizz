import { serverSupabaseServiceRole } from '#supabase/server'
import sponsors from '~/content/sponsors.json'

export default defineEventHandler(async (event) => {
    const client = serverSupabaseServiceRole(event)

    try {
        // Clean up data for database insert
        const records = (sponsors as any[]).map((s: any) => ({
            created_at: s.created_at || new Date().toISOString(),
            business_name: s.business_name || s.startup_name,
            website_url: s.website_url,
            logo_url: s.logo_url || null,
            tagline: s.tagline || null,
            description: s.description || null,
            keywords: s.keywords || null,
            contact_email: s.contact_email,
            contact_name: s.contact_name || null,
            status: s.status === 9 ? 'paused' : (s.status || 'active'),
            mrr: s.mrr || null
        }))

        // Upsert to Supabase
        const { error, count } = await client
            .from('sponsors')
            .upsert(records as any, { onConflict: 'website_url', ignoreDuplicates: false })

        if (error) throw error

        return {
            success: true,
            message: `Migrated ${records.length} sponsors`
        }
    } catch (e: any) {
        return {
            success: false,
            error: e.message
        }
    }
})
