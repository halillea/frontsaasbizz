import { promises as fs } from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
    const settingsPath = path.resolve(process.cwd(), 'content/settings.json')

    try {
        const fileData = await fs.readFile(settingsPath, 'utf-8')
        const settings = JSON.parse(fileData)
        return settings
    } catch (e) {
        // Return default settings if file doesn't exist
        return {
            advertising_soldout: false
        }
    }
})
