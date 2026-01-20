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
        <div class="flex items-center gap-3 mb-0">
          <span class="text-2xl" aria-hidden="true">🏆</span>
          <h2 id="top-earners-heading" class="text-2xl font-black tracking-tight text-white uppercase italic">
            Top 40 Earners
          </h2>
        </div>

        <!-- Column Headers -->
        <div class="hidden lg:flex items-center gap-4 px-4 py-1 mb-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
          <div class="w-[35%] flex gap-12">
            <span>Startup</span>
          </div>
          <div class="w-[65%] flex items-center px-4">
            <span class="w-[140px] text-left">Founder</span>
            <span class="w-28 text-right ml-10">Total Revenue</span>
            <span class="w-32 text-right ml-auto">MRR</span>
            <span class="w-16 text-right ml-4">MoM Growth</span>
          </div>
        </div>

        <div class="space-y-2" role="list" aria-label="Top earning startups">
          <StartupCard
            v-for="(startup, index) in paginatedTopEarners"
            :key="'earner-' + startup.id"
            :startup="startup"
            :rank="(topEarnersPage - 1) * EARNER_PER_PAGE + index + 1"
          />
        </div>
        <!-- Pagination for Top Earners -->
        <Pagination
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
      <section aria-labelledby="recent-heading" class="mt-16">
        <div class="flex items-center gap-3 mb-0">
          <span class="text-2xl" aria-hidden="true">✨</span>
          <h2 id="recent-heading" class="text-2xl font-black tracking-tight text-white uppercase italic">
            Recently Added (30)
          </h2>
        </div>

        <!-- Column Headers -->
        <div class="hidden lg:flex items-center gap-4 px-4 py-1 mb-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
          <div class="w-[35%] flex gap-12">
            <span>Startup</span>
          </div>
          <div class="w-[65%] flex items-center px-4">
            <span class="w-[140px] text-left">Founder</span>
            <span class="w-28 text-right ml-10">Total Revenue</span>
            <span class="w-32 text-right ml-auto">MRR</span>
            <span class="w-16 text-right ml-4">MoM Growth</span>
          </div>
        </div>

        <div class="space-y-2" role="list" aria-label="Recently added startups">
          <StartupCard
            v-for="startup in paginatedRecentlyAdded"
            :key="'recent-' + startup.id"
            :startup="startup"
          />
        </div>
        <!-- Pagination for Recently Added -->
        <Pagination
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
import { ref, computed, onMounted } from 'vue'
import allStartups from '~/content/startups.json'
import { parseRevenue } from '~/utils/helpers'
import type { Startup } from '~/types/startup'

const EARNER_PER_PAGE = 40
const RECENT_PER_PAGE = 30
const startups = allStartups as Startup[]

// Loading state
const isLoading = ref(true)
onMounted(() => {
  // Simulate brief loading for smooth UX
  setTimeout(() => { isLoading.value = false }, 100)
})

// Pagination state
const topEarnersPage = ref(1)
const recentPage = ref(1)

// Sorted data
const topEarners = computed(() => {
  return [...startups]
    .sort((a, b) => parseRevenue(b.total_revenue) - parseRevenue(a.total_revenue))
    .slice(0, 150) // Support up to 150 earners
})

const recentlyAdded = computed(() => {
  const topEarnerIds = new Set(topEarners.value.map(s => s.id))
  return [...startups]
    .filter(s => !topEarnerIds.has(s.id))
    .sort((a, b) => new Date(b.fetched_at || '').getTime() - new Date(a.fetched_at || '').getTime())
    .slice(0, 60) // Support up to 60 recent startups
})

// Paginated data
const paginatedTopEarners = computed(() => {
  const start = (topEarnersPage.value - 1) * EARNER_PER_PAGE
  return topEarners.value.slice(start, start + EARNER_PER_PAGE)
})

const paginatedRecentlyAdded = computed(() => {
  const start = (recentPage.value - 1) * RECENT_PER_PAGE
  return recentlyAdded.value.slice(start, start + RECENT_PER_PAGE)
})

// Total pages
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
