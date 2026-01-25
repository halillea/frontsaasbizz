<template>
  <tr 
    class="group border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer focus:outline-none focus:bg-white/10"
    tabindex="0"
    @click="navigateToStartup"
    @keydown.enter="navigateToStartup"
  >
    <!-- Rank Column -->
    <td class="px-4 py-3 align-middle text-center w-8">
      <span 
        v-if="rank" 
        class="font-mono text-xs font-bold text-slate-400"
      >
        {{ rank }}
      </span>
    </td>

    <!-- Entity Column (Logo + Name) -->
    <td class="px-4 py-3 align-middle">
      <div class="flex items-center gap-3">
        <div class="relative shrink-0">
          <img
            :src="`https://www.google.com/s2/favicons?domain=${startup.domain}&sz=64`"
            :alt="`${startup.startup_name} logo`"
            class="w-7 h-7 rounded border border-white/10 bg-slate-900 object-cover"
            loading="lazy"
            @error="handleImageError"
          >
        </div>
        <div class="flex flex-col min-w-0 max-w-[180px] sm:max-w-xs">
          <h3 class="font-semibold text-sm text-slate-200 group-hover:text-blue-400 transition-colors truncate">
            {{ startup.startup_name }}
          </h3>
          <p v-if="startup.tagline" class="text-xs text-slate-400 truncate font-normal mt-0.5">
            {{ formatTagline(startup.tagline) }}
          </p>
        </div>
      </div>
    </td>

    <!-- Founder Column -->
    <td class="px-6 py-3 align-middle border-l border-white/5">
      <div class="flex items-center gap-2">
        <div class="w-5 h-5 rounded-full overflow-hidden border border-white/10 bg-slate-800 shrink-0">
          <img
            v-if="startup.founder_image_local_path"
            :src="`/founder_images/${startup.founder_image_local_path || ''}`"
            :alt="startup.founder_name"
            class="w-full h-full object-cover"
            @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
          >
          <div v-else class="w-full h-full flex items-center justify-center text-[7px] font-bold text-slate-400 uppercase">
            {{ (startup.founder_name || 'A').charAt(0) }}
          </div>
        </div>
        <div class="text-xs font-normal text-slate-400 truncate max-w-[100px]">
          {{ startup.founder_name || 'Anonymous' }}
        </div>
      </div>
    </td>

    <!-- Total Revenue -->
    <td class="px-4 py-3 align-middle text-right border-l border-white/5">
      <div class="font-mono text-sm font-semibold text-white tabular-nums tracking-tight">
        {{ formatCompactCurrency(startup.total_revenue) }}
      </div>
    </td>

    <!-- MRR -->
    <td class="px-4 py-3 align-middle text-right border-l border-white/5">
      <div class="font-mono text-xs font-bold text-slate-300 tabular-nums tracking-tight">
        {{ formatCurrency(startup.mrr) }}
      </div>
    </td>

    <!-- Growth -->
    <td class="px-4 py-3 align-middle text-right border-l border-white/5">
      <div 
        v-if="hasValidGrowth" 
        class="font-mono text-xs font-bold tabular-nums"
        :class="isGrowthPositive ? 'text-green-500' : 'text-red-500'"
      >
        {{ formatGrowth(startup.mom_growth) }}
      </div>
      <div v-else class="font-mono text-xs text-slate-700">-</div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isValidGrowth, formatCurrency, formatCompactCurrency, formatGrowth } from '~/utils/helpers'
import type { Startup } from '~/types/startup'

const props = defineProps<{
  startup: Startup
  rank?: number | null
}>()

const router = useRouter()

const hasValidGrowth = computed(() => isValidGrowth(props.startup.mom_growth))
const isGrowthPositive = computed(() => {
  if (props.startup.mom_growth === null || props.startup.mom_growth === undefined) return false
  if (typeof props.startup.mom_growth === 'number') return props.startup.mom_growth >= 0
  return !String(props.startup.mom_growth).startsWith('-')
})

function navigateToStartup() {
  if (props.startup.trustmrr_link) {
    router.push(`/startup/${props.startup.trustmrr_link}`)
  } else {
    console.warn('Startup missing trustmrr_link:', props.startup)
  }
}

function formatTagline(tagline: string | null | undefined) {
  if (!tagline) return ''
  return tagline.length > 40 ? tagline.substring(0, 40) + '...' : tagline
}

// Image error handling
const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23334155" width="100" height="100" rx="12"/><text x="50" y="60" font-size="40" text-anchor="middle" fill="%2394a3b8">?</text></svg>'
}
</script>
