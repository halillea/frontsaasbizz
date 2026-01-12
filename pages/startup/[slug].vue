<template>
  <div class="min-h-screen bg-[#F9FAFB] font-sans text-slate-800">
    
    <div class="bg-slate-900 text-white py-6 px-4 text-center border-b border-slate-800 relative z-50">
      <a href="https://saasitron.com" target="_blank" class="group flex flex-col md:flex-row items-center justify-center gap-3 hover:text-blue-200 transition-colors">
        <span class="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Main Sponsor</span>
        <span class="text-base md:text-lg font-medium">
          <span class="font-bold text-blue-400">SAASitron:</span> 
          Stop coding from scratch. Ship your SaaS in days with the ultimate boilerplate kit.
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
          <NuxtLink to="/" class="hover:text-blue-600">Leaderboard</NuxtLink>
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

        <section class="col-span-1 lg:col-span-8 bg-gradient-to-br from-emerald-50 to-sky-50 rounded-3xl p-8 border border-blue-200 shadow-sm min-h-[80vh]">
          <div v-if="!startup" class="text-center py-20 text-gray-500">
            <h2 class="text-2xl font-bold">Startup not found</h2>
            <NuxtLink to="/" class="text-blue-600 underline mt-4 block">Return to Leaderboard</NuxtLink>
          </div>
          
          <div v-else>
            <div class="flex flex-col md:flex-row gap-6 mb-10 items-start">
               <img :src="`https://www.google.com/s2/favicons?domain=${startup.domain || startup.website_url}&sz=256`" class="w-32 h-32 rounded-3xl border-4 border-white shadow-lg bg-white object-contain p-2 flex-shrink-0">
              <div class="flex-1 pt-1">
                <div class="flex justify-between items-start">
                  <h1 class="text-5xl font-black text-gray-900 tracking-tight mb-3">{{ startup.startup_name }}</h1>
                  <a v-if="startup.website_url" :href="startup.website_url" target="_blank" class="hidden md:flex items-center gap-1 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-700 transition-all">Visit Website</a>
                </div>
                <div class="flex items-center gap-2 mb-3">
                    <span class="text-slate-400 text-xs font-medium">Verified SaaS</span>
                </div>
                <p class="text-lg text-slate-600 leading-relaxed font-medium">{{ startup.tagline || startup.full_description }}</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              
              <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center h-32">
                <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 truncate">
                  Total Revenue &nbsp;&nbsp;&nbsp; <span class="text-blue-600 font-extrabold">#{{ startupRank }}</span>
                </div>
                <div class="text-2xl font-mono font-bold text-gray-900">{{ startup.total_revenue }}</div>
                <div v-if="isValidGrowth" class="text-[10px] text-green-600 font-bold mt-1">
                  ↑ {{ startup.mom_growth }} Monthly Growth
                </div>
              </div>

              <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center h-32">
                <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">MRR</div>
                <div class="text-2xl font-mono font-bold text-gray-900">{{ startup.mrr }}</div>
                <div v-if="startup.subscriptions" class="text-[10px] text-gray-500 font-bold mt-1">
                   {{ startup.subscriptions }} Subscribers
                </div>
              </div>

              <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center h-32">
                <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Founder</div>
                <div class="flex items-center gap-3">
                   <NuxtLink v-if="isFounderValid" :to="`/founder/${getFounderSlug(startup.founder_name)}`" class="flex-shrink-0 group">
                     <img v-if="startup.founder_image_local_path" :src="`/founder_images/${startup.founder_image_local_path}`" class="w-10 h-10 rounded-full object-cover border border-gray-200 group-hover:border-blue-400">
                     <div v-else class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs">?</div>
                   </NuxtLink>
                   <div class="min-w-0 overflow-hidden">
                     <NuxtLink v-if="isFounderValid" :to="`/founder/${getFounderSlug(startup.founder_name)}`" class="text-sm font-bold text-gray-900 truncate hover:text-blue-600 transition-colors block">
                       {{ startup.founder_name }}
                     </NuxtLink>
                     <span v-else class="text-sm font-bold text-gray-400 block">Anonymous</span>
                     
                     <a v-if="startup.founder_social" 
                        :href="`https://x.com/${startup.founder_social.replace('@', '')}`" 
                        target="_blank" 
                        class="text-[9px] text-blue-500 hover:underline block mt-0.5 truncate">
                        {{ formatFollowers(startup.x_follower_count) }} followers on 𝕏 @{{ startup.founder_social.replace('@', '') }}
                     </a>
                   </div>
                </div>
              </div>

              <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center h-32">
                <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 truncate">
                  Founded &nbsp;&nbsp;&nbsp; <span class="text-gray-600">{{ startup.category }}</span>
                </div>
                <div class="text-lg font-bold text-gray-900">{{ startup.founded_date || 'N/A' }}</div>
                
                <div v-if="startup.country" class="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-tight flex items-center gap-1">
                  <span>📍</span> {{ startup.country }}
                </div>
              </div>

            </div>

            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 border-b pb-2">Business Overview</h3>
              <p class="text-slate-600 leading-7 whitespace-pre-wrap">{{ startup.full_description }}</p>
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

const route = useRoute()
const startup = computed(() => allStartups.find(s => s.trustmrr_profile_url === route.params.slug))

// --- RANKING CALCULATION ---
const parseRev = (val) => {
  if (!val || typeof val !== 'string') return 0
  return Number(val.replace(/[^0-9.-]+/g, ""))
}

const startupRank = computed(() => {
  if (!startup.value) return '-'
  const sorted = [...allStartups].sort((a, b) => parseRev(b.total_revenue) - parseRev(a.total_revenue))
  return sorted.findIndex(s => s.id === startup.value.id) + 1
})

const isFounderValid = computed(() => startup.value?.founder_name && startup.value.founder_name !== 'null,' && startup.value.founder_name.length > 2)
const isValidGrowth = computed(() => startup.value?.mom_growth?.includes('%'))

const getFounderSlug = (name) => {
  if (!name) return ''
  return name.replace(/[^a-zA-Z0-9 ]/g, "").trim().replace(/\s+/g, "-").toLowerCase()
}

const formatFollowers = (count) => {
  if (!count) return '0'
  const num = Number(count)
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}

// --- ADVERTISING LOGIC ---
const bluePalette = [ '#eff6ff', '#dbeafe', '#e0f2fe', '#cffafe', '#e0e7ff' ]
const adInventory = Array.from({ length: 20 }, (_, i) => ({ 
  id: i, 
  name: `Partner ${i + 1}`, 
  emoji: ['🚀', '⚡', '🔥', '💎'][i % 4], 
  copy: 'Scale your SaaS today.', 
  bg: bluePalette[i % 5] 
}))

const adGroupIndex = ref(0)
const currentLeftAds = computed(() => adInventory.slice(adGroupIndex.value === 0 ? 0 : 10, adGroupIndex.value === 0 ? 5 : 15))
const currentRightAds = computed(() => adInventory.slice(adGroupIndex.value === 0 ? 5 : 15, adGroupIndex.value === 0 ? 10 : 20))

let adInterval = null
onMounted(() => { 
  adInterval = setInterval(() => { adGroupIndex.value = adGroupIndex.value === 0 ? 1 : 0 }, 12000) 
})
onUnmounted(() => { if (adInterval) clearInterval(adInterval) })

useHead({
  title: startup.value ? `${startup.value.startup_name} - Verified SaaS Stats` : 'Startup Not Found'
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.8s ease-in-out; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>