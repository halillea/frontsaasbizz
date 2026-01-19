<template>
  <div class="glass-card rounded-2xl p-6 border border-white/5 bg-slate-800/50">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      <h2 class="text-xl font-bold text-white">Startup Valuation Card</h2>
    </div>

    <div class="flex gap-2 mb-6">
      <span class="px-3 py-1 bg-slate-700/50 rounded-full text-xs font-medium text-slate-300">Valuation</span>
      <span class="px-3 py-1 bg-slate-700/50 rounded-full text-xs font-medium text-slate-300">VC</span>
      <span class="px-3 py-1 bg-slate-700/50 rounded-full text-xs font-medium text-slate-300">Finance</span>
    </div>

    <!-- Live Preview Card -->
    <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-inner overflow-hidden relative transition-all duration-500">
      <div class="space-y-3">
        <div class="flex justify-between items-center text-sm">
          <span class="text-slate-600 font-medium">ARR:</span>
          <span class="font-bold text-slate-900 animate-arr-pulse">{{ formattedRevenue }}</span>
        </div>

        <!-- Growth Row -->
        <div class="flex justify-between items-center text-sm">
          <span class="text-slate-600 font-medium">Growth:</span>
          <span class="font-bold text-green-600 flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {{ growthRate }}%
          </span>
        </div>

        <!-- Base Multiple Row -->
        <div class="flex justify-between items-center text-sm group">
          <span class="text-slate-600 font-medium">Base Multiple:</span>
          <span 
            class="font-bold text-blue-600 transition-all duration-500 transform"
            :key="currentMultiple"
          >
            {{ currentMultiple }}x
          </span>
        </div>

        <!-- AI Enhancement Row -->
        <div class="flex justify-between items-center text-sm">
          <span class="text-slate-600 font-medium">AI Enhancement:</span>
          <span 
            class="font-bold text-purple-600 flex items-center gap-1 transition-all duration-500"
            :key="currentAiMod"
          >
            <svg class="w-3 h-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {{ currentAiMod }}x
          </span>
        </div>

        <div class="h-px bg-slate-200 my-4"></div>

        <!-- Valuation Result -->
        <div class="flex justify-between items-baseline">
          <span class="text-slate-900 font-bold">Valuation:</span>
          <span 
            class="text-sm font-bold text-green-600 transition-all duration-300"
            :class="{ 'animate-stock-blink': isValidating }"
          >
            {{ formattedValuation }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { parseRevenue } from '~/utils/helpers'

const props = defineProps({
  revenue: {
    type: [String, Number],
    required: true
  }
})

// Data
const baseMultiples = [2, 3, 8, 12, 15]
const aiMultipliers = [1.2, 1.6, 1.8, 2.2]

// State
const currentBaseIndex = ref(3) // Start at 12x
const currentAiIndex = ref(3)   // Start at 2.2x
const growthRate = ref(45)      // Static for design matching
const isValidating = ref(false)
let intervalId: any = null
let nextUpdateIsBase = true // Toggle state

// Computed
const revenueValue = computed(() => {
  if (typeof props.revenue === 'number') return props.revenue
  return parseRevenue(props.revenue)
})

const currentMultiple = computed(() => baseMultiples[currentBaseIndex.value] ?? 1)
const currentAiMod = computed(() => aiMultipliers[currentAiIndex.value] ?? 1)

const valuation = computed(() => {
  return revenueValue.value * currentMultiple.value * currentAiMod.value
})

const formattedRevenue = computed(() => {
  const val = revenueValue.value
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
  if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`
  return `$${val}`
})

const formattedValuation = computed(() => {
  const val = valuation.value
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
  if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`
  return `$${val.toLocaleString()}`
})

// Lifecycle
onMounted(() => {
  startAnimationCycle()
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

function startAnimationCycle() {
  intervalId = setInterval(() => {
    // Start blink animation
    isValidating.value = true

    // Update values mid-blink (when invisible at 500ms)
    setTimeout(() => {
      if (nextUpdateIsBase) {
        // Pick a random new base index
        let newIndex = Math.floor(Math.random() * baseMultiples.length)
        while (newIndex === currentBaseIndex.value && baseMultiples.length > 1) {
          newIndex = Math.floor(Math.random() * baseMultiples.length)
        }
        currentBaseIndex.value = newIndex
      } else {
        // Pick a random new AI index
        let newIndex = Math.floor(Math.random() * aiMultipliers.length)
        while (newIndex === currentAiIndex.value && aiMultipliers.length > 1) {
          newIndex = Math.floor(Math.random() * aiMultipliers.length)
        }
        currentAiIndex.value = newIndex
      }
      
      // Toggle for next time
      nextUpdateIsBase = !nextUpdateIsBase
    }, 500)

    // End blink animation after 1s
    setTimeout(() => {
      isValidating.value = false
    }, 1000)

  }, 3000)
}
</script>

<style scoped>
.glass-card {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

@keyframes blink-fade {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.animate-stock-blink {
  animation: blink-fade 1s ease-out forwards;
}

@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-arr-pulse {
  animation: pulse-subtle 2s ease-in-out infinite;
}
</style>
