<template>
  <div class="space-y-12">
    <!-- Loading State -->
    <div v-if="isLoading">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-2xl">🏆</span>
        <h2 class="text-2xl font-black tracking-tight text-white uppercase italic">Top Earners</h2>
      </div>
      <LoadingSkeleton :count="10" />
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Top Earners Section -->
      <section aria-labelledby="top-earners-heading">
        <!-- New Header Layout -->
        <div class="mb-6 space-y-4">
          <!-- Row 1: Label + Search (Centered) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
            <span class="text-slate-400 font-medium text-[11px] uppercase tracking-wider text-center sm:text-left">Verified Revenue Leaderboard</span>
            <div class="w-full sm:w-64 mx-auto place-self-center">
              <SearchAutocomplete
                v-model="searchQuery"
                placeholder="Search startups or founders..."
              />
            </div>
            <!-- Empty col for balance -->
            <div class="hidden sm:block"></div>
          </div>

          <!-- Row 2: Title + Category (No Label) -->
          <div class="flex flex-col sm:flex-row items-end justify-between gap-4 border-b border-white/5 pb-2">
            <h1 id="top-earners-heading" class="text-base font-semibold tracking-tight text-white font-outfit">
              Top 30 Earners
            </h1>
            <div class="w-full sm:w-48">
              <BaseSelect
                v-model="selectedCategory"
                :options="categoryOptions"
              />
            </div>
          </div>
        </div>

        <!-- Semantic Table -->
        <TopEarnersTable 
          :startups="paginatedTopEarners" 
          :start-rank="(topEarnersPage - 1) * EARNER_PER_PAGE + 1"
          :sort-field="sortField"
          :sort-direction="sortDirection"
          @toggle-sort="toggleSort"
        />
        
        <!-- Pagination for Top Earners -->
        <Pagination
          class="mt-8"
          :current-page="topEarnersPage"
          :total-pages="topEarnersTotalPages"
          item-name="top earners"
          aria-label="Top earners pagination"
          @prev="topEarnersPage--"
          @next="topEarnersPage++"
        />
      </section>

      <!-- News Box -->
      <NewsBox />

      <!-- Recently Added Section -->
      <section aria-labelledby="recent-heading" class="mt-12">
        <div class="mb-2">
          <h2 id="recent-heading" class="text-base font-semibold tracking-tight text-white font-outfit">
            Recently Added (20)
          </h2>
        </div>

        <!-- Semantic Table (Reusing layout) -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-white/10 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                <th class="px-4 py-3 font-bold text-center w-12">#</th>
                <th class="px-4 py-3 font-bold">Startup</th>
                <th class="px-6 py-3 font-bold border-l border-white/5">Founder</th>
                <th class="px-4 py-3 font-bold text-right border-l border-white/5">Total Rev</th>
                <th class="px-4 py-3 font-bold text-right border-l border-white/5">MRR</th>
                <th class="px-4 py-3 font-bold text-right border-l border-white/5">Growth</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5" role="list">
              <StartupCard
                v-for="(startup, index) in paginatedRecentlyAdded"
                :key="'recent-' + startup.id"
                :startup="startup"
              />
            </tbody>
          </table>
        </div>

        <!-- Pagination for Recently Added -->
        <Pagination
          class="mt-8"
          :current-page="recentPage"
          :total-pages="recentTotalPages"
          item-name="recent startups"
          aria-label="Recently added pagination"
          @prev="recentPage--"
          @next="recentPage++"
        />
      </section>

      <!-- Search & Category Section -->
      <SearchSection />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import allStartups from '~/content/startups.json'
import type { Startup } from '~/types/startup'
import { useTableControls } from '~/composables/useTableControls'
import SearchAutocomplete from '~/components/ui/SearchAutocomplete.vue'
import BaseSelect from '~/components/ui/BaseSelect.vue'

const EARNER_PER_PAGE = 30
const RECENT_PER_PAGE = 20

// Data is pre-sorted by MRR descending
const startups = allStartups as Startup[]

// Initialize Table Controls with ALL 150 top earners (or full filtered list)
// We use the full 'startups' list so search works across everything
const { 
  searchQuery, 
  selectedCategory, 
  sortField, 
  sortDirection,
  categoryOptions, 
  filteredData, 
  toggleSort 
} = useTableControls(startups)

// Loading state
const isLoading = ref(true)
onMounted(() => {
  setTimeout(() => { isLoading.value = false }, 100)
})

// Pagination state
const topEarnersPage = ref(1)
const recentPage = ref(1)

// Reset pagination when search/filter changes
watch([searchQuery, selectedCategory], () => {
  topEarnersPage.value = 1
})

// Filtered Data (driven by useTableControls)
const allFilteredStartups = filteredData

// Top earners: Slice from the FILTERED list
const topEarners = computed(() => {
  // If search/filter is active, show matches from sorting
  // If no search, limit to top 150 for "Top Earners" logic, or just show all if filtered
  // To keep it simple and powerful: Show all matches from the filter
  return allFilteredStartups.value
})

// Recent: Independent computation for recent section
const recentlyAdded = computed(() => {
  const byDate = [...startups].sort((a, b) =>
    new Date(b.fetched_at || 0).getTime() - new Date(a.fetched_at || 0).getTime()
  )
  return byDate.slice(0, 60)
})

// Paginated data for Top Earners Table
const paginatedTopEarners = computed(() => {
  const start = (topEarnersPage.value - 1) * EARNER_PER_PAGE
  return topEarners.value.slice(start, start + EARNER_PER_PAGE)
})

const paginatedRecentlyAdded = computed(() => {
  const start = (recentPage.value - 1) * RECENT_PER_PAGE
  return recentlyAdded.value.slice(start, start + RECENT_PER_PAGE)
})

const topEarnersTotalPages = computed(() => Math.ceil(topEarners.value.length / EARNER_PER_PAGE))
const recentTotalPages = computed(() => Math.ceil(recentlyAdded.value.length / RECENT_PER_PAGE))

// SEO Meta
useSeoMeta({
  title: 'SaaSBizz - Verified SaaS Leaderboard',
  description: 'Discover verified SaaS startups ranked by revenue. Real MRR data from founders building in public.',
  ogTitle: 'SaaSBizz - Verified SaaS Leaderboard',
  ogDescription: 'Discover verified SaaS startups ranked by revenue. Real MRR data from founders building in public.',
  ogUrl: 'https://saasbizz.com',
  twitterTitle: 'SaaSBizz - Verified SaaS Leaderboard',
  twitterDescription: 'Discover verified SaaS startups ranked by revenue. Real MRR data from founders building in public.',
})

// JSON-LD Structured Data
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'SaaSBizz',
        url: 'https://saasbizz.com',
        description: 'Verified SaaS Leaderboard - Real MRR data from founders building in public',
        publisher: {
          '@type': 'Organization',
          name: 'SaaSBizz',
          url: 'https://saasbizz.com'
        }
      })
    }
  ],
  style: [
    {
      innerHTML: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `
    }
  ]
})
</script>
