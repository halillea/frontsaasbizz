<template>
  <div class="min-h-screen bg-[#F9FAFB] font-sans text-slate-800">
    
    <div class="bg-slate-900 text-white py-6 px-4 text-center border-b border-slate-800 relative z-50">
      <div class="group flex flex-col md:flex-row items-center justify-center gap-3">
        <span class="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Debug Mode</span>
        <span class="text-base font-medium text-blue-200">
          Displaying all <span class="text-white font-bold">{{ allStartups.length }}</span> entries for visual data verification.
        </span>
      </div>
    </div>

    <header class="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-md bg-white/90">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">S</div>
          <span class="text-xl font-bold tracking-tight text-slate-900">SaaSBizz <span class="text-xs text-gray-400 font-normal">Audit</span></span>
        </NuxtLink>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <aside class="hidden lg:block lg:col-span-2 space-y-4 sticky top-24">
          <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">Sponsored</div>
          <div class="space-y-4">
            <div v-for="ad in currentLeftAds" :key="ad.id" class="p-3 rounded-lg border border-blue-100 bg-blue-50/50">
              <div class="font-bold text-xs text-gray-900">{{ ad.name }}</div>
              <p class="text-[10px] text-slate-600 mt-1">{{ ad.copy }}</p>
            </div>
          </div>
        </aside>

        <section class="col-span-1 lg:col-span-8 space-y-12">
          
          <div>
            <div class="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
              <div class="flex items-center gap-3">
                <span class="text-2xl">📊</span>
                <h2 class="text-2xl font-black tracking-tight text-gray-900 uppercase">All Startups (By Revenue)</h2>
              </div>
              <span class="text-xs font-mono text-gray-400">Total: {{ allStartups.length }}</span>
            </div>
            
            <div class="space-y-3">
              <StartupCard 
                v-for="(startup, index) in sortedByRevenue" 
                :key="'audit-' + startup.id" 
                :startup="startup" 
                :rank="index + 1"
              />
            </div>
          </div>

        </section>

        <aside class="hidden lg:block lg:col-span-2 space-y-4 sticky top-24">
          <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">Featured</div>
          <div class="space-y-4">
            <div v-for="ad in currentRightAds" :key="ad.id" class="p-3 rounded-lg border border-blue-100 bg-blue-50/50">
              <div class="font-bold text-xs text-gray-900">{{ ad.name }}</div>
              <p class="text-[10px] text-slate-600 mt-1">{{ ad.copy }}</p>
            </div>
          </div>
        </aside>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import allStartupsData from '~/content/startups.json'

const allStartups = ref(allStartupsData)

// Helper: Clean string "$116,350" into number 116350 for sorting
const parseRev = (val) => {
  if (!val || typeof val !== 'string') return 0
  return Number(val.replace(/[^0-9.-]+/g, ""))
}

// Full list sorted by revenue to check data integrity
const sortedByRevenue = computed(() => {
  return [...allStartups.value].sort((a, b) => parseRev(b.total_revenue) - parseRev(a.total_revenue))
})

// Static Ad placeholders for visual consistency
const adInventory = Array.from({ length: 10 }, (_, i) => ({ 
  id: i, 
  name: `Ad Slot ${i + 1}`, 
  copy: 'Check visual alignment of cards.' 
}))
const currentLeftAds = computed(() => adInventory.slice(0, 5))
const currentRightAds = computed(() => adInventory.slice(5, 10))

useHead({ title: 'Data Audit - SaaSBizz' })
</script>