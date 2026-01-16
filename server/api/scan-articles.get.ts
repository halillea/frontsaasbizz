import { promises as fs } from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async () => {
    const articlesNewPath = path.resolve(process.cwd(), 'articles/new')

    try {
        // Check if directory exists
        try {
            await fs.access(articlesNewPath)
        } catch {
            return { articles: [], message: 'No /articles/new/ folder found' }
        }

        // Read all .md files
        const files = await fs.readdir(articlesNewPath)
        const mdFiles = files.filter(f => f.endsWith('.md'))

        const articles = []

        for (const filename of mdFiles) {
            const filePath = path.join(articlesNewPath, filename)
            const content = await fs.readFile(filePath, 'utf-8')

            // Parse the markdown content
            const lines = content.split('\n')

            // Extract title from first ## heading
            let title = filename.replace('.md', '')
            const titleMatch = content.match(/^##\s+(.+)$/m)
            if (titleMatch) {
                title = titleMatch[1].trim()
            }

            // Extract source URL
            let source = ''
            const sourceMatch = content.match(/\*\*Source:\*\*\s*\[?[^\]]*\]?\(?([^)\s]+)\)?/i)
            if (sourceMatch) {
                source = sourceMatch[1]
            }

            // Extract author
            let author = 'SaaSBizz Team'
            const authorMatch = content.match(/\*\*Author:\*\*\s*(.+)$/m)
            if (authorMatch) {
                author = authorMatch[1].trim()
            }

            // Generate slug from filename
            const slug = filename
                .replace('.md', '')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '')

            // Get excerpt (first paragraph after metadata)
            let excerpt = ''
            const paragraphs = content.split('\n\n')
            for (const para of paragraphs) {
                const trimmed = para.trim()
                if (trimmed &&
                    !trimmed.startsWith('##') &&
                    !trimmed.startsWith('**') &&
                    !trimmed.startsWith('*') &&
                    !trimmed.startsWith('-') &&
                    trimmed.length > 50) {
                    excerpt = trimmed.slice(0, 200)
                    break
                }
            }

            articles.push({
                filename,
                title,
                slug,
                author,
                source,
                excerpt,
                content,
                category: 'News'
            })
        }

        return {
            articles,
            count: articles.length
        }
    } catch (error: any) {
        console.error('Scan articles error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to scan articles folder'
        })
    }
})
