<template>
  <div class="max-w-4xl mx-auto">
    <!-- Back Link -->
    <NuxtLink to="/news" class="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 text-sm mb-8 transition-colors">
      ← Back to News
    </NuxtLink>

    <!-- Article Not Found -->
    <div v-if="!article" class="text-center py-20">
      <div class="text-5xl mb-4">📰</div>
      <h1 class="text-2xl font-bold text-white mb-4">Article Not Found</h1>
      <p class="text-slate-400 mb-6">The article you're looking for doesn't exist.</p>
      <NuxtLink to="/news" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-colors">
        Browse All Articles
      </NuxtLink>
    </div>

    <!-- Article Content -->
    <article v-else class="space-y-6">
      <!-- Header -->
      <header class="space-y-3 mb-4">
        <div class="flex items-center gap-3 text-xs text-slate-500 uppercase tracking-widest">
          <span class="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">{{ article.category }}</span>
          <span>{{ formatDate(article.created_at) }}</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-black text-white leading-tight">
          {{ article.title }}
        </h1>
      </header>

      <!-- Content with embedded image -->
      <div class="prose prose-invert prose-lg max-w-none">
        <!-- Image floated left -->
        <img 
          v-if="article.featured_image"
          :src="article.featured_image" 
          :alt="article.title"
          class="w-32 h-32 object-cover rounded-xl float-left mr-3 mb-2"
          loading="lazy"
          width="128"
          height="128"
        >
        <p class="text-slate-400 text-sm mb-3">Author: {{ normalizedAuthor }}</p>
        <div v-html="renderedContent" class="article-content"></div>
      </div>

      <!-- Footer -->
      <footer class="pt-8 border-t border-white/10 clear-both">
        <div class="flex items-center justify-between">
          <NuxtLink to="/news" class="text-blue-400 hover:text-blue-300 font-medium">
            ← More Articles
          </NuxtLink>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import allArticles from '~/content/articles.json'

const route = useRoute()
const slug = route.params.slug as string

const article = computed(() => 
  allArticles.find(a => a.slug === slug && a.status === 'published')
)

// Simple markdown to HTML conversion - removes title and source from body
const renderedContent = computed(() => {
  if (!article.value) return ''
  let content = article.value.content
    // Remove the title (## heading) since we show it in header
    .replace(/^##\s+.+$/m, '')
    // Remove Source: line
    .replace(/\*\*Source:\*\*.*/gi, '')
    // Remove Author: line (already shown separately)
    .replace(/\*\*Author:\*\*.*/gi, '')
  
  let html = content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^\* (.+)$/gm, '<li>$1</li>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-blue-400 hover:underline">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .trim()
  return `<p>${html}</p>`.replace(/<p><h/g, '<h').replace(/<\/h(\d)><\/p>/g, '</h$1>').replace(/<p><\/p>/g, '')
})

// Normalize author name - use default for generic authors
const normalizedAuthor = computed(() => {
  const author = article.value?.author?.toLowerCase() || ''
  const genericAuthors = ['staff writer', 'press release', 'staff', 'admin', 'editor', 'team', 'saasbizz team', 'anonymous']
  
  // Check if it's a generic author or not a full name (no space = not full name)
  const isGeneric = genericAuthors.some(g => author.includes(g))
  const hasFullName = author.trim().includes(' ') && author.length > 5
  
  if (isGeneric || !hasFullName) {
    return 'Hal Smith'
  }
  return article.value?.author || 'Hal Smith'
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

// SEO
const config = useRuntimeConfig()
const baseUrl = config.public?.siteUrl || 'https://saasbizz.com'
const canonicalUrl = `${baseUrl}/news/${slug}`

useSeoMeta({
  title: article.value ? `${article.value.title} - SaaSBizz News` : 'Article Not Found - SaaSBizz',
  description: article.value?.excerpt || 'Article not found',
  ogTitle: article.value?.title,
  ogDescription: article.value?.excerpt,
  ogImage: article.value?.featured_image,
  ogType: 'article',
})

// Canonical URL + JSON-LD Structured Data
useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
  script: article.value ? [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': article.value.title,
        'description': article.value.excerpt,
        'image': article.value.featured_image || '',
        'datePublished': article.value.created_at,
        'author': {
          '@type': 'Person',
          'name': article.value.author
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'SaaSBizz',
          'url': baseUrl
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      })
    }
  ] : []
})
</script>

<style>
.article-content h2 {
  @apply text-2xl font-bold text-white mt-8 mb-4;
}
.article-content h3 {
  @apply text-xl font-bold text-white mt-6 mb-3;
}
.article-content p {
  @apply text-slate-300 leading-relaxed mb-4;
}
.article-content li {
  @apply text-slate-300 ml-6 mb-2 list-disc;
}
.article-content strong {
  @apply text-white;
}
</style>
