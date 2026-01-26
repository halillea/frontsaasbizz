import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    try {
        const client = await serverSupabaseClient(event)
        const { data } = await client
            .from('settings')
            .select('value')
            .eq('key', 'advertising_soldout')
            .single()

        // Fallback to false if not set
        return data?.value || { advertising_soldout: false }
    } catch (e) {
        // Fallback if DB fails (e.g. key missing)
        return { advertising_soldout: false }
    }
})
