import { ref } from 'vue'
import allArticles from '~/content/articles.json'

/** Article data structure from articles.json */
interface Article {
    slug: string
    status: 'published' | 'draft'
    created_at: string
    [key: string]: unknown
}

/** In-memory cache for parsed articles */
const articleCache = ref<Map<string, Article>>(new Map())
let cacheInitialized = false

/**
 * Composable for caching and retrieving articles.
 * 
 * Provides sub-millisecond article lookups by pre-loading
 * all published articles into a Map on first access.
 * 
 * @returns {Object} Article cache utilities
 * @returns {Function} getArticle - Get article by slug
 * @returns {Function} getAllArticles - Get all published articles (sorted by date)
 * @returns {Function} clearCache - Clear cache (for webhook reloading)
 * @returns {Function} cacheSize - Get current cache size
 * 
 * @example
 * const { getArticle, getAllArticles } = useArticleCache()
 * const article = getArticle('my-article-slug')
 * const articles = getAllArticles() // Sorted by created_at desc
 */
export function useArticleCache() {
    /**
     * Initialize cache on first use.
     * Populates cache with all published articles from JSON.
     */
    function initCache(): void {
        if (cacheInitialized) return

            ; (allArticles as Article[]).forEach((article) => {
                if (article.status === 'published') {
                    articleCache.value.set(article.slug, article)
                }
            })
        cacheInitialized = true
    }

    /**
     * Get article from cache by slug (sub-millisecond lookup)
     * @param slug - Article URL slug
     * @returns Article object or null if not found
     */
    function getArticle(slug: string): Article | null {
        initCache()
        return articleCache.value.get(slug) || null
    }

    /**
     * Get all published articles sorted by creation date (newest first)
     * @returns Array of published articles
     */
    function getAllArticles(): Article[] {
        initCache()
        return Array.from(articleCache.value.values())
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    /**
     * Clear cache (called by webhook for hot-reload)
     */
    function clearCache(): void {
        articleCache.value.clear()
        cacheInitialized = false
    }

    return {
        getArticle,
        getAllArticles,
        clearCache,
        /** Get current number of cached articles */
        cacheSize: (): number => articleCache.value.size
    }
}
