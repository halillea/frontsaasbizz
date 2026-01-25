<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end gap-4 mb-4 border-b border-white/5 pb-4">
      <div class="flex items-center gap-4">
        <span class="text-3xl sm:text-4xl" aria-hidden="true">🏆</span>
        <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-outfit">
          Top MRR Leaderboard
        </h1>
      </div>
      <span class="text-slate-400 font-medium text-sm sm:mb-2 ml-1">Verified Revenue Ranking</span>
    </div>

    <!-- Leaderboard Table -->
    <TopEarnersTable 
      :startups="paginatedStartups" 
      :start-rank="(currentPage - 1) * ITEMS_PER_PAGE + 1"
    />

    <!-- Pagination -->
    <Pagination
      class="mt-8"
      :current-page="currentPage"
      :total-pages="totalPages"
      item-name="startups"
      @prev="currentPage--"
      @next="currentPage++"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import allStartups from '~/content/startups.json'
import { parseRevenue } from '~/utils/helpers'
import type { Startup } from '~/types/startup'

const ITEMS_PER_PAGE = 30
const currentPage = ref(1)

const startups = (allStartups as Startup[])
  .filter(s => s.mrr) // Only show startups with MRR
  .sort((a, b) => parseRevenue(b.mrr) - parseRevenue(a.mrr))

const paginatedStartups = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return startups.slice(start, start + ITEMS_PER_PAGE)
})

const totalPages = computed(() => Math.ceil(startups.length / ITEMS_PER_PAGE))

useSeoMeta({
  title: 'Top MRR Leaderboard - SaaSBizz',
  description: 'The highest earning SaaS startups ranked by verified Monthly Recurring Revenue (MRR).',
})
</script>
