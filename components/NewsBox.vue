<template>
  <div class="glass-card rounded-xl p-3 mb-4">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-sm font-bold text-white uppercase tracking-wider">📰 Latest News</h3>
      <NuxtLink to="/news" class="text-[10px] text-blue-400 hover:text-blue-300 uppercase tracking-widest font-bold">
        View All →
      </NuxtLink>
    </div>
    
    <!-- 4 Articles Horizontal -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <NuxtLink 
        v-for="article in displayedArticles" 
        :key="article.id"
        :to="`/news/${article.slug}`"
        class="group block bg-slate-800/50 rounded-lg p-2 hover:bg-slate-700/50 transition-all cursor-pointer"
      >
        <div class="flex items-start gap-2">
          <!-- Thumbnail -->
          <img 
            v-if="article.thumbnail"
            :src="article.thumbnail"
            :alt="article.title"
            class="w-10 h-10 rounded-md object-cover flex-shrink-0"
          >
          <div 
            v-else
            class="w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center text-lg"
            :class="getGradientClass(article.category)"
          >
            {{ getCategoryEmoji(article.category) }}
          </div>
          
          <div class="flex-1 min-w-0">
            <!-- Trend Icon -->
            <div class="flex items-center gap-1">
              <span 
                class="text-xs animate-pulse"
                :class="getTrendClass(article.id)"
              >
                {{ getTrendIcon(article.id) }}
              </span>
              <span class="text-[9px] text-slate-500 uppercase">{{ article.category }}</span>
            </div>
            <!-- Headline -->
            <h4 class="text-[11px] font-bold text-slate-200 group-hover:text-blue-400 line-clamp-2 leading-tight transition-colors">
              {{ article.title }}
            </h4>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import allArticles from '~/content/articles.json'

// Get 4 most recent published articles
const displayedArticles = computed(() => 
  allArticles
    .filter(a => a.status === 'published')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4)
    .map(article => ({
      ...article,
      // Use 64x64 thumbnail if available
      thumbnail: article.featured_image?.replace('/200by200/', '/64by64/')
    }))
)

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
    'Guides': 'bg-gradient-to-br from-indigo-600 to-blue-600'
  }
  return gradients[category] || 'bg-gradient-to-br from-slate-600 to-slate-700'
}

function getTrendIcon(id: number) {
  const icons = ['📈', '🔥', '⚡', '📉', '💡', '🚀', '⭐', '💎']
  return icons[id % icons.length]
}

function getTrendClass(id: number) {
  const classes = ['text-green-400', 'text-orange-400', 'text-yellow-400', 'text-red-400']
  return classes[id % classes.length]
}
</script>
