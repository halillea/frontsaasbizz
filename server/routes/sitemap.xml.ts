import allArticles from '~/content/articles.json'

export default defineEventHandler(async (event) => {
    const baseUrl = 'https://saasbizz.com'

    // Static pages
    const staticPages = [
        { url: '/', priority: '1.0', changefreq: 'daily' },
        { url: '/news', priority: '0.9', changefreq: 'daily' },
        { url: '/search', priority: '0.7', changefreq: 'weekly' },
        { url: '/advertise', priority: '0.6', changefreq: 'monthly' },
    ]

    // Article pages
    const articlePages = allArticles
        .filter((a: any) => a.status === 'published')
        .map((a: any) => ({
            url: `/news/${a.slug}`,
            priority: '0.8',
            changefreq: 'weekly',
            lastmod: a.created_at?.split('T')[0] || new Date().toISOString().split('T')[0]
        }))

    const allPages = [...staticPages, ...articlePages]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`

    setHeader(event, 'content-type', 'application/xml')
    return sitemap
})
