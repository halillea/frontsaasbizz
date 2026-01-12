<template>
  <div class="min-h-screen bg-[#F9FAFB] font-sans text-slate-800">
    
    <div class="bg-slate-900 text-white py-6 px-4 text-center border-b border-slate-800 relative z-50">
      <a href="https://saasitron.com" target="_blank" class="group flex flex-col md:flex-row items-center justify-center gap-3 hover:text-blue-200 transition-colors">
        <span class="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Main Sponsor</span>
        <span class="text-base md:text-lg font-medium">
          <span class="font-bold text-blue-400">SAASitron:</span> 
          Stop coding from scratch. Ship your SaaS in days with the ultimate boilerplate & SDK kit.
        </span>
        <span class="group-hover:translate-x-1 transition-transform text-lg">→</span>
      </a>
    </div>

    <header class="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-md bg-white/90">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold shadow-sm shadow-blue-200">S</div>
          <span class="text-xl font-bold tracking-tight text-slate-900">SaaSBizz</span>
        </NuxtLink>
        <div class="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <NuxtLink to="/" class="text-blue-600">Leaderboard</NuxtLink>
          <NuxtLink to="/submit" class="hover:text-blue-600">Submit</NuxtLink>
          <button class="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors">Advertise</button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <aside class="hidden lg:block lg:col-span-2 space-y-4 sticky top-24">
          <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sponsored</div>
          <Transition name="fade" mode="out-in">
            <div :key="adGroupIndex" class="space-y-4">
              <div v-for="ad in currentLeftAds" :key="ad.id">
                 <a href="#" class="block p-3 rounded-lg border border-blue-100 hover:shadow-md transition-all group" :style="{ backgroundColor: ad.bg }">
                    <div class="flex items-center gap-2 mb-1.5">
                      <span class="text-lg">{{ ad.emoji }}</span>
                      <span class="font-bold text-xs text-gray-900 group-hover:text-blue-700">{{ ad.name }}</span>
                    </div>
                    <p class="text-[11px] leading-snug text-slate-600">{{ ad.copy }}</p>
                 </a>
              </div>
            </div>
          </Transition>
        </aside>

        <section class="col-span-1 lg:col-span-8 space-y-12">
          
          <div>
            <div class="flex items-center gap-3 mb-6">
              <span class="text-2xl">🏆</span>
              <h2 class="text-2xl font-black tracking-tight text-gray-900 uppercase italic">Top 30 Earners</h2>
            </div>
            <div class="space-y-3">
              <StartupCard 
                v-for="(startup, index) in topEarners" 
                :key="'earner-' + startup.id" 
                :startup="startup" 
                :rank="index + 1"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center gap-3 mb-6">
              <span class="text-2xl">✨</span>
              <h2 class="text-2xl font-black tracking-tight text-gray-900 uppercase italic">Recently Added</h2>
            </div>
            <div class="space-y-3">
              <StartupCard 
                v-for="startup in recentlyAdded" 
                :key="'recent-' + startup.id" 
                :startup="startup"
              />
            </div>
          </div>

        </section>

        <aside class="hidden lg:block lg:col-span-2 space-y-4 sticky top-24">
          <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Featured Tools</div>
          <Transition name="fade" mode="out-in">
            <div :key="adGroupIndex" class="space-y-4">
              <div v-for="ad in currentRightAds" :key="ad.id">
                 <a href="#" class="block p-3 rounded-lg border border-blue-100 hover:shadow-md transition-all group" :style="{ backgroundColor: ad.bg }">
                    <div class="flex items-center gap-2 mb-1.5">
                      <span class="w-5 h-5 rounded bg-white/50 text-blue-600 flex items-center justify-center text-[10px] font-bold">Ad</span>
                      <span class="font-bold text-xs text-gray-900 group-hover:text-blue-700">{{ ad.name }}</span>
                    </div>
                    <p class="text-[11px] leading-snug text-slate-600">{{ ad.copy }}</p>
                 </a>
              </div>
            </div>
          </Transition>
        </aside>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import allStartups from '~/content/startups.json'

// --- LEADERBOARD LOGIC ---

// Helper: Clean string "$116,350" into number 116350
const parseRev = (val) => {
  if (!val || typeof val !== 'string') return 0
  return Number(val.replace(/[^0-9.-]+/g, ""))
}

const topEarners = computed(() => {
  return [...allStartups]
    .sort((a, b) => parseRev(b.total_revenue) - parseRev(a.total_revenue))
    .slice(0, 30)
})

const recentlyAdded = computed(() => {
  const topEarnerIds = new Set(topEarners.value.map(s => s.id))
  return [...allStartups]
    .filter(s => !topEarnerIds.has(s.id))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 30)
})

useHead({ title: 'SaaSBizz - Verified SaaS Leaderboard' })

// --- ADVERTISING LOGIC (Rotation) ---
const bluePalette = [ '#eff6ff', '#dbeafe', '#e0f2fe', '#cffafe', '#e0e7ff' ]
const adInventory = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  name: `Advertiser ${i + 1}`,
  emoji: ['🚀', '⚡', '🔥', '💎'][i % 4],
  copy: 'Increase your MRR by 30% in 30 days.',
  bg: bluePalette[i % 5]
}))

const adGroupIndex = ref(0)
let adInterval = null

const currentLeftAds = computed(() => adInventory.slice(adGroupIndex.value === 0 ? 0 : 10, adGroupIndex.value === 0 ? 5 : 15))
const currentRightAds = computed(() => adInventory.slice(adGroupIndex.value === 0 ? 5 : 15, adGroupIndex.value === 0 ? 10 : 20))

onMounted(() => {
  adInterval = setInterval(() => { adGroupIndex.value = adGroupIndex.value === 0 ? 1 : 0 }, 12000)
})
onUnmounted(() => { if (adInterval) clearInterval(adInterval) })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.8s ease-in-out; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>