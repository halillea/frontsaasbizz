import { promises as fs } from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.title || !body.slug || !body.content) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields: title, slug, content'
        })
    }

    const articlesPath = path.resolve(process.cwd(), 'content/articles.json')
    const articlesNewPath = path.resolve(process.cwd(), 'articles/new')
    const articlesProcessedPath = path.resolve(process.cwd(), 'articles/processed')

    try {
        // Read existing articles
        let articles = []
        try {
            const fileData = await fs.readFile(articlesPath, 'utf-8')
            articles = JSON.parse(fileData)
        } catch {
            articles = []
        }

        // Check if slug already exists
        if (articles.some((a: any) => a.slug === body.slug)) {
            throw createError({
                statusCode: 400,
                statusMessage: `Article with slug "${body.slug}" already exists`
            })
        }

        // Create new article entry
        const newArticle = {
            id: Date.now(),
            created_at: new Date().toISOString(),
            status: 'published',
            title: body.title,
            slug: body.slug,
            excerpt: body.excerpt || body.content.slice(0, 200),
            content: body.content,
            category: body.category || 'News',
            featured_image: body.featured_image || '',
            author: body.author || 'SaaSBizz Team',
            source: body.source || ''
        }

        // Add to articles
        articles.unshift(newArticle)
        await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2), 'utf-8')

        // Move the original .md file to processed folder if filename provided
        if (body.filename) {
            try {
                // Create processed folder if it doesn't exist
                await fs.mkdir(articlesProcessedPath, { recursive: true })

                const sourcePath = path.join(articlesNewPath, body.filename)
                const destPath = path.join(articlesProcessedPath, body.filename)

                await fs.rename(sourcePath, destPath)
            } catch (moveError) {
                console.log('Could not move file:', moveError)
                // Don't fail if file move fails
            }
        }

        return {
            success: true,
            message: `Article "${body.title}" imported successfully`,
            article: newArticle
        }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Import article error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to import article'
        })
    }
})
