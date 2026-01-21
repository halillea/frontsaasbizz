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
            Top 30 Earners
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
            Recently Added (20)
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
import { ref, computed, onMounted, watch } from 'vue'
import homepageData from '~/content/startups-homepage.json'
import type { Startup } from '~/types/startup'

const EARNER_PER_PAGE = 30
const RECENT_PER_PAGE = 20

// Homepage data is pre-sorted: first 30 are top earners, next 20 are recent
const homepageStartups = homepageData as Startup[]

// Pagination data (lazy loaded when needed)
const paginationStartups = ref<Startup[]>([])
const paginationLoaded = ref(false)

async function loadPaginationData() {
  if (paginationLoaded.value) return
  const data = await import('~/content/startups-pagination.json')
  paginationStartups.value = data.default as Startup[]
  paginationLoaded.value = true
}

// Loading state
const isLoading = ref(true)
onMounted(() => {
  setTimeout(() => { isLoading.value = false }, 100)
})

// Pagination state
const topEarnersPage = ref(1)
const recentPage = ref(1)

// Pre-sorted top earners: homepage has top 30, pagination has 31-150
const topEarners = computed(() => {
  const top30 = homepageStartups.slice(0, 30)
  if (!paginationLoaded.value) return top30
  const top31to150 = paginationStartups.value.slice(0, 120)
  return [...top30, ...top31to150]
})

// Pre-sorted recent: homepage has recent 20, pagination has 21-60
const recentlyAdded = computed(() => {
  const recent20 = homepageStartups.slice(30, 50)
  if (!paginationLoaded.value) return recent20
  const recent21to60 = paginationStartups.value.slice(120)
  return [...recent20, ...recent21to60]
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

// Total pages - use fixed totals (150 top earners, 60 recent) for correct pagination display
const TOTAL_TOP_EARNERS = 150
const TOTAL_RECENT = 60
const topEarnersTotalPages = computed(() => Math.ceil(TOTAL_TOP_EARNERS / EARNER_PER_PAGE)) // 5 pages
const recentTotalPages = computed(() => Math.ceil(TOTAL_RECENT / RECENT_PER_PAGE)) // 3 pages

// Lazy load pagination data when user tries to go past page 1
watch([topEarnersPage, recentPage], ([earnersPage, recentPg]) => {
  if (earnersPage > 1 || recentPg > 1) {
    loadPaginationData()
  }
})

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
