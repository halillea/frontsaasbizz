<template>
  <NuxtLink
    :to="`/startup/${startup.trustmrr_link}`"
    class="group relative flex items-center gap-4 py-0 px-4 rounded-xl glass-card hover-glow border-[1px] border-white/5 transition-all duration-300"
    role="listitem"
    :aria-label="`View details for ${startup.startup_name}`"
  >
    <!-- Rank Badge (Absolute) -->
    <div 
      v-if="rank" 
      class="absolute -left-2 -top-2 w-5 h-5 rounded-full flex items-center justify-center font-black font-mono text-[9px] shadow-lg border border-white/10 z-10"
      :class="[
        rank === 1 ? 'bg-yellow-400 text-yellow-900' : 
        rank === 2 ? 'bg-slate-300 text-slate-900' : 
        rank === 3 ? 'bg-amber-600 text-amber-100' : 
        'bg-slate-800 text-slate-400'
      ]"
    >
      {{ rank }}
    </div>

    <!-- LEFT SIDE (35%): Logo + Name + Tagline (2 rows) -->
    <div class="w-[35%] flex items-center gap-3 flex-shrink-0 min-w-0">
      <!-- Logo -->
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

      <!-- Name & Tagline (Stacked) -->
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
      <div class="w-[65%] flex items-center px-4 border-l border-white/5">
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

        <!-- Total Revenue -->
        <div class="w-28 text-right ml-10">
          <div class="font-mono font-bold text-lg text-white">{{ formatCurrency(startup.total_revenue) }}</div>
        </div>

        <!-- MRR -->
        <div class="w-32 text-right ml-auto">
          <div class="font-mono font-bold text-lg text-slate-200 whitespace-nowrap">{{ formatCurrency(startup.mrr) }}</div>
        </div>

        <!-- Growth -->
        <div class="w-16 text-right ml-4">
          <div 
            v-if="hasValidGrowth" 
            class="font-mono font-bold text-[15px]"
            :class="isGrowthPositive ? 'text-green-400' : 'text-red-400'"
          >
            {{ formatGrowth(startup.mom_growth) }}
          </div>
          <div v-else class="font-mono text-[15px] text-slate-600">-</div>
        </div>
      </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isValidGrowth, formatCurrency, formatGrowth } from '~/utils/helpers'
import type { Startup } from '~/types/startup'

const props = defineProps<{
  startup: Startup
  rank?: number | null
}>()

const hasValidGrowth = computed(() => isValidGrowth(props.startup.mom_growth))
const isGrowthPositive = computed(() => {
  if (props.startup.mom_growth === null || props.startup.mom_growth === undefined) return false
  if (typeof props.startup.mom_growth === 'number') return props.startup.mom_growth >= 0
  return !String(props.startup.mom_growth).startsWith('-')
})

// Image error handling
const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23334155" width="100" height="100" rx="12"/><text x="50" y="60" font-size="40" text-anchor="middle" fill="%2394a3b8">?</text></svg>'
}
</script>
