import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = serverSupabaseServiceRole(event)

    if (!Array.isArray(body)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Expected an array of sponsors'
        })
    }

    try {
        // Bulk upsert sponsors
        const { error } = await client
            .from('sponsors')
            .upsert(body, { onConflict: 'id' })

        if (error) throw error

        return {
            success: true,
            message: `Saved ${body.length} sponsors`,
            count: body.length
        }
    } catch (error: any) {
        console.error('API Error saving sponsors:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to save sponsors'
        })
    }
})
