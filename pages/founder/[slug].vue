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

        <section class="col-span-1 lg:col-span-8">
          <div v-if="!profile" class="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <h1 class="text-2xl font-bold text-gray-900">Founder not found</h1>
            <NuxtLink to="/" class="mt-4 inline-block text-blue-600 font-bold hover:underline">Go Home</NuxtLink>
          </div>

          <div v-else class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm min-h-[80vh]">
            <div class="flex flex-col items-center text-center mb-12">
              <img v-if="profile.founder_image_local_path" :src="`/founder_images/${profile.founder_image_local_path}`" class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl mb-6 bg-gray-50">
              <h1 class="text-4xl font-black text-gray-900 tracking-tight">{{ profile.founder_name }}</h1>
              
              <div class="mt-3 flex items-center justify-center gap-2 text-sm text-slate-600 font-medium flex-wrap">
                <span class="text-slate-900 font-bold">{{ projects.length }} startups</span>
                <span class="text-slate-300">·</span>
                <span>{{ formatFollowers(profile.x_follower_count) }} 𝕏 followers</span>
                <a 
                  v-if="profile.founder_social"
                  :href="`https://x.com/${profile.founder_social.replace('@', '')}`" 
                  target="_blank" 
                  class="text-blue-500 hover:underline hover:text-blue-600 font-semibold"
                >
                  @{{ profile.founder_social.replace('@', '') }}
                </a>
              </div>
            </div>

            <div class="space-y-6">
              <h2 class="text-xl font-bold text-gray-900 border-b pb-2 tracking-tight uppercase italic flex items-center justify-between">
                <span>Portfolio</span>
              </h2>
              <div class="space-y-4">
                <StartupCard v-for="startup in projects" :key="startup.id" :startup="startup" />
              </div>
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

// 1. Clean the slug from URL to match data
const currentSlug = decodeURIComponent(route.params.slug)

// Helper to clean founder names from JSON to match URL slug
const getFounderSlug = (name) => {
  if (!name) return ''
  return name.replace(/[^a-zA-Z0-9 ]/g, "").trim().replace(/\s+/g, "-").toLowerCase()
}

// Helper to format large numbers (e.g. 1910 -> 1.9k)
const formatFollowers = (count) => {
  if (!count) return '0'
  const num = Number(count.toString().replace(/,/g, '')) // Remove commas if present in string
  if (isNaN(num)) return count
  return num.toLocaleString() // Formats 1910 as "1,910" per your example
}

// 2. Filter Startups belonging to this founder
const projects = computed(() => {
  return allStartups.filter(s => getFounderSlug(s.founder_name) === currentSlug)
})

const profile = computed(() => projects.value.length > 0 ? projects.value[0] : null)

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
  title: profile.value ? `${profile.value.founder_name} - Founder Profile` : 'Founder Not Found'
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.8s ease-in-out; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>