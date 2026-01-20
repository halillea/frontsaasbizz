<template>
  <div 
    class="w-full h-11 flex items-center gap-3 p-1.5 mb-1 rounded-2xl border transition-colors duration-300"
    :class="themeColor === 'white' ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-white/5'"
  >
    <!-- Label (Directly on outer bg) -->
    <div class="pl-3 shrink-0">
      <span 
        class="text-xs font-black uppercase tracking-widest whitespace-nowrap"
        :class="themeColor === 'white' ? 'text-blue-900' : 'text-blue-400'"
      >
        SaaSBizz Index
      </span>
    </div>

    <!-- Inner Ticker Container (The white box) -->
    <div 
      class="flex-1 h-full overflow-hidden relative flex items-center rounded-xl border transition-colors duration-300"
      :class="themeColor === 'white' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-100/95 border-white/10'"
    >
      <!-- Ticker Track -->
      <div class="flex items-center gap-6 whitespace-nowrap animate-ticker pl-4">
        <div 
          v-for="startup in tickerStartups" 
          :key="startup.id"
          class="flex items-baseline gap-3 text-xs"
        >
          <span class="font-bold transition-colors text-blue-500">
            {{ startup.startup_name }}
          </span>
          <span class="font-black font-mono text-black transition-colors">
            {{ formatCurrency(startup.mrr) }}
          </span>
          
          <!-- Growth Indicator -->
          <span 
            class="font-bold flex items-center gap-1"
            :class="getGrowthColor(startup.mom_growth)"
            v-if="startup.mom_growth"
          >
            <!-- Up Arrow (Positive) -->
            <svg 
              v-if="isPositiveGrowth(startup.mom_growth)" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-3 w-3 stroke-[3]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <!-- Down Arrow (Negative) -->
            <svg 
              v-else 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-3 w-3 stroke-[3]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
            
            {{ startup.mom_growth }}{{ typeof startup.mom_growth === 'number' ? '%' : '' }}
          </span>
        </div>
        
        <!-- Duplicated items for seamless loop -->
        <div 
          v-for="startup in tickerStartups" 
          :key="'dup-' + startup.id"
          class="flex items-baseline gap-3 text-xs"
        >
          <span class="font-bold transition-colors text-blue-500">
            {{ startup.startup_name }}
          </span>
          <span class="font-black font-mono text-black transition-colors">
            {{ formatCurrency(startup.mrr) }}
          </span>
          
          <span 
            class="font-bold flex items-center gap-1"
            :class="getGrowthColor(startup.mom_growth)"
            v-if="startup.mom_growth"
          >
            <!-- Up Arrow (Positive) -->
            <svg 
              v-if="isPositiveGrowth(startup.mom_growth)" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-3 w-3 stroke-[3]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <!-- Down Arrow (Negative) -->
            <svg 
              v-else 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-3 w-3 stroke-[3]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>

            {{ startup.mom_growth }}{{ typeof startup.mom_growth === 'number' ? '%' : '' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import allStartups from '~/content/startups.json'
import { useTheme } from '~/composables/useTheme'
import { formatCurrency } from '~/utils/helpers'

const { themeColor } = useTheme()

const tickerStartups = computed(() => {
  return allStartups
    .filter(s => {
      // Handle legacy string MRR and new numeric MRR
      // Filter criteria: Name < 10 chars, MRR not Pre-Revenue/0
      const mrrStr = String(s.mrr).toLowerCase()
      if (mrrStr === 'pre-revenue' || mrrStr === '$0' || s.mrr === 0) return false
      
      return s.startup_name && s.startup_name.length < 10
    })
    .slice(0, 25) // Take top 25 matches
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
  animation: ticker 60s linear infinite; /* Slowed down slightly for readability */
}

.glass-strip:hover .animate-ticker {
  animation-play-state: paused;
}
</style>
