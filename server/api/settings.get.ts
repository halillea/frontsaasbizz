import settings from '../../content/settings.json'

export default defineEventHandler(async (event) => {
    return settings
})
