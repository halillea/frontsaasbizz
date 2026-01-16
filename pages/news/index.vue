<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="text-center py-8">
      <h1 class="text-4xl font-black tracking-tight text-white mb-4">
        📰 SaaSBizz News
      </h1>
      <p class="text-slate-400 text-lg max-w-2xl mx-auto">
        Stay updated with the latest trends, insights, and stories from the SaaS world
      </p>
    </header>

    <!-- Articles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <NuxtLink 
        v-for="article in publishedArticles" 
        :key="article.id"
        :to="`/news/${article.slug}`"
        class="glass-card rounded-2xl overflow-hidden hover-glow transition-all cursor-pointer block"
      >
        <!-- Featured Image or Gradient -->
        <div 
          v-if="article.featured_image"
          class="h-48 bg-cover bg-center"
          :style="{ backgroundImage: `url(${article.featured_image})` }"
        ></div>
        <div 
          v-else
          class="h-48 flex items-center justify-center"
          :class="getGradientClass(article.category)"
        >
          <span class="text-6xl">{{ getCategoryEmoji(article.category) }}</span>
        </div>
        
        <div class="p-6 space-y-4">
          <div class="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest">
            <span>{{ formatDate(article.created_at) }}</span>
            <span>•</span>
            <span>{{ article.category }}</span>
          </div>
          <h2 class="text-xl font-bold text-white">
            {{ article.title }}
          </h2>
          <p class="text-slate-400 text-sm leading-relaxed">
            {{ article.excerpt }}
          </p>
          <div class="pt-4 border-t border-white/5 flex items-center justify-between">
            <span class="text-xs text-slate-500">By {{ article.author }}</span>
            <span class="text-blue-400 text-sm font-medium">
              Read more →
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- No Articles Message -->
    <div v-if="publishedArticles.length === 0" class="text-center py-12">
      <div class="text-5xl mb-4">📝</div>
      <p class="text-slate-400">No articles published yet. Check back soon!</p>
    </div>

    <!-- Newsletter Signup -->
    <div class="glass-card rounded-2xl p-8 text-center">
      <h3 class="text-xl font-bold text-white mb-2">📬 Stay in the Loop</h3>
      <p class="text-slate-400 mb-6 max-w-md mx-auto">
        Get weekly insights on SaaS trends, founder stories, and revenue data delivered to your inbox.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="your@email.com"
          class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
        >
        <button class="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
          Subscribe
        </button>
      </div>
      <p class="text-xs text-slate-500 mt-3">No spam, unsubscribe anytime</p>
    </div>

    <!-- Search Section -->
    <SearchSection />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import allArticles from '~/content/articles.json'

// Only show published articles (not draft or status 9)
const publishedArticles = computed(() => 
  allArticles
    .filter(a => a.status === 'published')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function getCategoryEmoji(category: string) {
  const emojis: Record<string, string> = {
    'Trends': '📈',
    'Growth': '💰',
    'News': '📰',
    'Guides': '📚',
    'Interviews': '🎙️',
    'Tools': '🛠️'
  }
  return emojis[category] || '📝'
}

function getGradientClass(category: string) {
  const gradients: Record<string, string> = {
    'Trends': 'bg-gradient-to-br from-blue-600 to-purple-600',
    'Growth': 'bg-gradient-to-br from-green-600 to-teal-600',
    'News': 'bg-gradient-to-br from-orange-600 to-red-600',
    'Guides': 'bg-gradient-to-br from-indigo-600 to-blue-600',
    'Interviews': 'bg-gradient-to-br from-pink-600 to-purple-600',
    'Tools': 'bg-gradient-to-br from-cyan-600 to-blue-600'
  }
  return gradients[category] || 'bg-gradient-to-br from-slate-600 to-slate-700'
}

useSeoMeta({
  title: 'News & Blog - SaaSBizz',
  description: 'Latest trends, insights, and stories from the SaaS world. Stay updated with SaaSBizz News.',
  ogTitle: 'News & Blog - SaaSBizz',
  ogDescription: 'Latest trends, insights, and stories from the SaaS world.',
})
</script>
