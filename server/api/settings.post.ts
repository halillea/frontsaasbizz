import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = serverSupabaseServiceRole(event)

    try {
        // Upsert setting to DB
        const { error } = await client
            .from('settings')
            .upsert({
                key: 'advertising_soldout',
                value: { advertising_soldout: body.advertising_soldout }
            })

        if (error) throw error

        return {
            success: true,
            settings: { advertising_soldout: body.advertising_soldout }
        }
    } catch (error: any) {
        console.error('Settings API Error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to save settings'
        })
    }
})
