<template>
  <div class="space-y-12">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <span class="text-2xl" aria-hidden="true">📂</span>
      <h2 class="text-2xl font-black tracking-tight text-white uppercase italic">
        Category: <span class="text-blue-500">{{ formattedCategoryName }}</span>
      </h2>
    </div>

    <!-- Content -->
    <div v-if="isLoading">
      <LoadingSkeleton :count="10" />
    </div>

    <template v-else>
      <div v-if="paginatedStartups.length > 0">
        <!-- Semantic Table -->
        <TopEarnersTable 
          :startups="paginatedStartups" 
          :start-rank="(currentPage - 1) * ITEMS_PER_PAGE + 1"
        />

        <!-- Pagination -->
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :item-name="formattedCategoryName + ' startups'"
          @prev="currentPage--"
          @next="currentPage++"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 text-slate-500">
        <p class="text-xl">No startups found in this category.</p>
        <NuxtLink to="/" class="text-blue-500 hover:text-blue-400 mt-4 inline-block">Back to Home</NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import allStartups from '~/content/startups.json'
import { parseRevenue } from '~/utils/helpers'
import type { Startup } from '~/types/startup'

const route = useRoute()
const ITEMS_PER_PAGE = 50
const startups = allStartups as Startup[]

const isLoading = ref(true)
const currentPage = ref(1)

// Get category from route param and normalize
const categorySlug = computed(() => {
  const c = route.params.category
  return Array.isArray(c) ? c[0] : c
})

const formattedCategoryName = computed(() => {
  if (!categorySlug.value) return ''
  // Convert slug to readable name (e.g. "no-code" -> "No Code")
  return categorySlug.value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

// Filter and sort startups
const filteredStartups = computed(() => {
  if (!categorySlug.value) return []
  
  const targetCategory = categorySlug.value.toLowerCase()
  
  // Create a regex for more flexible matching (e.g. handle exact match or simple includes if needed)
  // For now, let's assume direct slug match against normalized category field
  // Or better, let's normalize the startup category to verify
  
  return startups
    .filter(s => {
      if (!s.category) return false
      // Basic normalization: lowercase and spaces to hyphens for check, or just check inclusion
      // The instruction says "visit all the startup in this category". 
      // Startups.json has raw strings like "marketing", "ai", "content creation".
      // We expect the URL to be /category/content-creation.
      
      const sCategoryNormalized = s.category.toLowerCase().replace(/\s+/g, '-')
      return sCategoryNormalized === targetCategory || s.category.toLowerCase().includes(targetCategory.replace(/-/g, ' '))
    })
    .sort((a, b) => {
      // Sort by MRR descending
      // parseRevenue handles "$1,234", "Pre-Revenue" (returns 0), etc.
      return parseRevenue(b.mrr) - parseRevenue(a.mrr)
    })
})

const paginatedStartups = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return filteredStartups.value.slice(start, start + ITEMS_PER_PAGE)
})

const totalPages = computed(() => Math.ceil(filteredStartups.value.length / ITEMS_PER_PAGE))

// Reset pagination when category changes
watch(categorySlug, () => {
  currentPage.value = 1
  isLoading.value = true
  setTimeout(() => { isLoading.value = false }, 300)
})

onMounted(() => {
  // Simulate load
  setTimeout(() => { isLoading.value = false }, 300)
})

// SEO
useSeoMeta({
  title: computed(() => `${formattedCategoryName.value} Startups - SaaSBizz`),
  description: computed(() => `Discover top ${formattedCategoryName.value} SaaS startups ranked by MRR.`),
})
</script>
