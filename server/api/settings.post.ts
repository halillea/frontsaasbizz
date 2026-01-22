import { promises as fs } from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const settingsPath = path.resolve(process.cwd(), 'content/settings.json')

    try {
        // Read existing settings
        let settings = {}
        try {
            const fileData = await fs.readFile(settingsPath, 'utf-8')
            settings = JSON.parse(fileData)
        } catch (e) {
            settings = { advertising_soldout: false }
        }

        // Merge new settings
        const updatedSettings = {
            ...settings,
            ...body
        }

        // Save settings
        await fs.writeFile(settingsPath, JSON.stringify(updatedSettings, null, 2), 'utf-8')

        console.log('[Settings Updated]', updatedSettings)

        return {
            success: true,
            settings: updatedSettings
        }
    } catch (error: any) {
        console.error('Settings API Error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to save settings'
        })
    }
})
