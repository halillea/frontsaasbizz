import { promises as fs } from 'node:fs'
import path from 'node:path'

/**
 * Admin API: Save entire sponsors array to sponsors.json
 * Used by admin dashboard to add/edit sponsors directly
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!Array.isArray(body)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Expected an array of sponsors'
        })
    }

    const sponsorsPath = path.resolve(process.cwd(), 'content/sponsors.json')

    try {
        // Write the entire sponsors array
        await fs.writeFile(sponsorsPath, JSON.stringify(body, null, 2), 'utf-8')

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
