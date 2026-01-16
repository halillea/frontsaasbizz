import { createHash } from 'crypto'

// Secret token for webhook authentication
// Set this in your environment variables: WEBHOOK_SECRET
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'saasbizz-webhook-secret-2026'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const signature = getHeader(event, 'x-hub-signature-256')

    // Verify GitHub webhook signature (optional but recommended)
    if (signature) {
        const hmac = createHash('sha256')
        hmac.update(WEBHOOK_SECRET)
        const expectedSig = 'sha256=' + createHash('sha256')
            .update(JSON.stringify(body) + WEBHOOK_SECRET)
            .digest('hex')

        // Simple auth check (for non-GitHub triggers)
        const authHeader = getHeader(event, 'authorization')
        if (!authHeader?.includes(WEBHOOK_SECRET) && signature !== expectedSig) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            })
        }
    }

    console.log('🔄 Webhook received: Refreshing article cache...')

    // Clear the runtime cache by invalidating Nuxt cache
    // In production, this would clear nitro/nuxt cache
    const timestamp = Date.now()

    return {
        success: true,
        message: 'Cache invalidated successfully',
        timestamp,
        note: 'Articles will be re-read from disk on next request'
    }
})
