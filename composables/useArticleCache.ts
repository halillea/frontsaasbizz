import { ref } from 'vue'
import allArticles from '~/content/articles.json'

// In-memory cache for parsed articles
const articleCache = ref<Map<string, any>>(new Map())
let cacheInitialized = false

export function useArticleCache() {

    // Initialize cache on first use
    function initCache() {
        if (cacheInitialized) return

        allArticles.forEach((article: any) => {
            if (article.status === 'published') {
                articleCache.value.set(article.slug, article)
            }
        })
        cacheInitialized = true
    }

    // Get article from cache (sub-millisecond)
    function getArticle(slug: string) {
        initCache()
        return articleCache.value.get(slug) || null
    }

    // Get all published articles
    function getAllArticles() {
        initCache()
        return Array.from(articleCache.value.values())
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    // Clear cache (called by webhook)
    function clearCache() {
        articleCache.value.clear()
        cacheInitialized = false
    }

    return {
        getArticle,
        getAllArticles,
        clearCache,
        cacheSize: () => articleCache.value.size
    }
}
