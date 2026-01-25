<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="flex items-center gap-3">
      <span class="text-3xl" aria-hidden="true">✨</span>
      <div>
        <h1 class="text-3xl font-black tracking-tight text-white italic">
          Recently Added
        </h1>
        <p class="text-slate-400 text-sm mt-1">Newest startups added to the leaderboard, sorted by date</p>
      </div>
    </header>

    <!-- Column Headers -->
    <div class="hidden lg:flex items-center gap-4 px-4 py-2 text-[10px] font-bold text-slate-500 border-b border-white/5">
      <div class="w-[35%] flex gap-12">
        <span>Startup</span>
      </div>
      <div class="w-[65%] flex items-center gap-8 px-4 justify-end">
        <span class="w-[140px] text-left">Founder</span>
        <div class="flex gap-5 flex-shrink-0 text-right min-w-[280px] justify-end">
          <span class="w-28">Total Rev</span>
          <span class="w-24">MRR</span>
          <span class="w-16">Growth</span>
        </div>
      </div>
    </div>

    <!-- Startup List -->
    <div class="space-y-2" role="list" aria-label="Recently added startups">
      <NuxtLink
        v-for="startup in paginatedStartups"
        :key="startup.id"
        :to="`/startup/${startup.trustmrr_link}`"
        class="group relative flex items-center gap-4 py-2 px-4 rounded-xl glass-card hover-glow border-[1px] border-white/5 transition-all duration-300"
        role="listitem"
      >
        <!-- LEFT SIDE (35%): Logo + Name + Tagline -->
        <div class="w-[35%] flex items-center gap-3 flex-shrink-0 min-w-0">
          <div class="relative flex-shrink-0">
            <img
              :src="`https://www.google.com/s2/favicons?domain=${startup.domain}&sz=64`"
              :alt="`${startup.startup_name} logo`"
              class="relative w-8 h-8 rounded-lg border border-white/10 bg-slate-900 object-cover"
              loading="lazy"
              width="32"
              height="32"
              @error="handleImageError"
            >
          </div>
          <div class="flex flex-col min-w-0">
            <h3 class="font-normal text-sm text-white truncate group-hover:text-blue-400 transition-colors">
              {{ startup.startup_name }}
            </h3>
            <p class="text-[11px] text-slate-400 truncate font-light mt-0.5">
              {{ startup.tagline || startup.full_description }}
            </p>
          </div>
        </div>

        <!-- RIGHT SIDE (65%): Founder + Financials -->
        <div class="w-[65%] flex items-center gap-8 px-4 border-l border-white/5 justify-end">
          <!-- Founder Section -->
          <div class="flex items-center gap-2 w-[140px] flex-shrink-0">
            <div class="w-6 h-6 rounded-full overflow-hidden border border-white/20 bg-slate-800 flex-shrink-0">
              <img
                v-if="startup.founder_image_local_path"
                :src="`/founder_images/${startup.founder_image_local_path}`"
                :alt="startup.founder_name"
                class="w-full h-full object-cover"
                @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
              >
              <div v-else class="w-full h-full flex items-center justify-center text-[8px] font-bold text-slate-500 uppercase">
                {{ (startup.founder_name || 'A').charAt(0) }}
              </div>
            </div>
            <div class="text-sm font-medium text-slate-300 truncate">
              {{ startup.founder_name || 'Anonymous' }}
            </div>
          </div>

          <!-- Financials -->
          <div class="flex items-center gap-5 flex-shrink-0 text-right min-w-[280px] justify-end">
            <div class="w-28 text-right">
              <div class="font-mono font-bold text-lg text-white">{{ formatCurrency(startup.total_revenue) }}</div>
            </div>
            <div class="w-24 text-right">
              <div class="font-mono font-bold text-lg text-slate-200">{{ formatCurrency(startup.mrr) }}</div>
            </div>
            <div class="w-16 text-right">
              <div 
                class="font-mono text-xs font-bold"
                :class="{
                  'text-green-500': (startup.mom_growth || 0) > 0,
                  'text-red-500': (startup.mom_growth || 0) < 0,
                  'text-slate-400': !startup.mom_growth
                }"
              >
                {{ startup.mom_growth ? `${startup.mom_growth > 0 ? '+' : ''}${startup.mom_growth}%` : '-' }}
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Pagination -->
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      item-name="startups"
      aria-label="Recently added pagination"
      @prev="currentPage--"
      @next="currentPage++"
    />

    <!-- Search Section -->
    <SearchSection />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import allStartups from '~/content/startups.json'
import { formatCurrency } from '~/utils/helpers'
import type { Startup } from '~/types/startup'

const PER_PAGE = 30
const currentPage = ref(1)
const startups = allStartups as Startup[]

// Sort by fetched_at descending (newest first)
const sortedStartups = computed(() => {
  return [...startups].sort((a, b) => 
    new Date(b.fetched_at || '').getTime() - new Date(a.fetched_at || '').getTime()
  )
})

const totalPages = computed(() => Math.ceil(sortedStartups.value.length / PER_PAGE))

const paginatedStartups = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE
  return sortedStartups.value.slice(start, start + PER_PAGE)
})

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function handleImageError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23334155" width="100" height="100" rx="12"/><text x="50" y="60" font-size="40" text-anchor="middle" fill="%2394a3b8">?</text></svg>'
}

// SEO Meta
useSeoMeta({
  title: 'Recently Added Startups - SaaSBizz',
  description: 'Browse the newest startups added to the SaaSBizz leaderboard, sorted by date.',
  ogTitle: 'Recently Added Startups - SaaSBizz',
  ogDescription: 'Browse the newest startups added to the SaaSBizz leaderboard, sorted by date.',
})
</script>
