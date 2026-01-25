<template>
  <div class="w-full h-10 flex items-center overflow-hidden relative group cursor-default select-none">
    <!-- Gradient Masks for smooth fade edges -->
    <div class="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-[--market-bar-bg] to-transparent pointer-events-none"></div>
    <div class="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-[--market-bar-bg] to-transparent pointer-events-none"></div>

    <!-- Ticker Track -->
    <div class="flex items-center gap-12 whitespace-nowrap animate-ticker pl-4 hover:pause-animation">
      <div 
        v-for="startup in tickerStartups" 
        :key="startup.id"
        class="flex items-baseline gap-2 text-xs font-medium"
      >
        <span class="text-slate-400 hover:text-white transition-colors">
          {{ startup.startup_name }}
        </span>
        <span class="font-mono text-slate-300">
          {{ formatCurrency(startup.mrr) }}
        </span>
        
        <!-- Growth Indicator -->
        <span 
          class="flex items-center gap-0.5 text-[10px] font-bold"
          :class="getGrowthColor(startup.mom_growth)"
          v-if="startup.mom_growth"
        >
          <!-- Up Arrow (Positive) -->
          <svg 
            v-if="isPositiveGrowth(startup.mom_growth)" 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-2.5 w-2.5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round" 
            stroke-linejoin="round" 
          >
            <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <!-- Down Arrow (Negative) -->
          <svg 
            v-else 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-2.5 w-2.5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            stroke-width="3" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
          >
            <path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
          
          {{ startup.mom_growth }}{{ typeof startup.mom_growth === 'number' ? '%' : '' }}
        </span>
      </div>
      
      <!-- Duplicated items for seamless loop -->
      <div 
        v-for="startup in tickerStartups" 
        :key="'dup-' + startup.id"
        class="flex items-baseline gap-2 text-xs font-medium"
      >
        <span class="text-slate-400 hover:text-white transition-colors">
          {{ startup.startup_name }}
        </span>
        <span class="font-mono text-slate-300">
          {{ formatCurrency(startup.mrr) }}
        </span>
        
        <span 
          class="flex items-center gap-0.5 text-[10px] font-bold"
          :class="getGrowthColor(startup.mom_growth)"
          v-if="startup.mom_growth"
        >
          <svg 
            v-if="isPositiveGrowth(startup.mom_growth)" 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-2.5 w-2.5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round" 
            stroke-linejoin="round" 
          >
            <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <svg 
            v-else 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-2.5 w-2.5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            stroke-width="3" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
          >
            <path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>

          {{ startup.mom_growth }}{{ typeof startup.mom_growth === 'number' ? '%' : '' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import tickerData from '~/content/startups-ticker.json'
import { useTheme } from '~/composables/useTheme'
import { formatCurrency } from '~/utils/helpers'
import type { Startup } from '~/types/startup'

const { themeColor } = useTheme()

// Shuffle once on mount, not on every access
const tickerStartups = ref<Startup[]>(tickerData as Startup[])

onMounted(() => {
  const shuffled = [...tickerStartups.value] as Startup[]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = temp
  }
  tickerStartups.value = shuffled
})

function getGrowthColor(growth: string | number | null | undefined) {
  if (growth === null || growth === undefined) return 'text-slate-500'
  // Check for negative number or string starting with '-'
  if (String(growth).startsWith('-')) return 'text-red-600'
  return 'text-green-600'
}

function isPositiveGrowth(growth: string | number | null | undefined) {
  if (growth === null || growth === undefined) return false
  return !String(growth).startsWith('-')
}
</script>

<style scoped>

@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-ticker {
  animation: ticker 720s linear infinite;
}

.glass-strip:hover .animate-ticker {
  animation-play-state: paused;
}
</style>
