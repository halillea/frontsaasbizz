<template>
  <section class="mt-20 pt-12 border-t border-white/5">
    <!-- Search Module -->
    <div class="max-w-3xl mx-auto text-center space-y-8">
      <h2 class="text-3xl font-black text-white tracking-tight">
        The database of profitable startup with positive MRR
      </h2>
      
      <div class="flex justify-center">
        <div class="relative flex-grow max-w-xl group w-full" ref="searchContainer">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
          <input 
            ref="searchInput"
            v-model="searchQuery"
            type="text" 
            placeholder="Search startups, founders, categories.." 
            class="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            @focus="showDropdown = true"
            @blur="handleBlur"
            @keydown.down.prevent="navigateDown"
            @keydown.up.prevent="navigateUp"
            @keydown.enter.prevent="selectCurrent"
            @keydown.escape="showDropdown = false"
          >
          
          <!-- Autocomplete Dropdown -->
          <div 
            v-if="showDropdown && searchQuery && filteredSuggestions.length > 0"
            class="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto"
          >
            <NuxtLink
              v-for="(startup, index) in filteredSuggestions"
              :key="startup.id"
              :to="`/startup/${startup.trustmrr_profile_url}`"
              class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition-colors border-b border-white/5 last:border-b-0"
              :class="{ 'bg-slate-800': index === selectedIndex }"
              @mousedown.prevent="navigateToStartup(startup.trustmrr_profile_url)"
            >
              <img
                :src="`https://www.google.com/s2/favicons?domain=${startup.domain || startup.website_url}&sz=64`"
                :alt="`${startup.startup_name} logo`"
                class="w-10 h-10 rounded-lg border border-white/10 bg-slate-800 object-contain p-1 flex-shrink-0"
                @error="handleLogoError"
              >
              <div class="min-w-0 flex-1 text-left">
                <div class="text-sm font-bold text-white truncate">{{ startup.startup_name }}</div>
                <div class="text-xs text-slate-400 truncate">{{ startup.tagline || startup.full_description }}</div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Explorer -->
    <div id="categories" class="mt-20 space-y-10">
      <div class="text-center">
        <h3 class="text-xl font-black text-white uppercase italic tracking-widest">Explore by category</h3>
      </div>
      
      <div class="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
        <button 
          v-for="cat in categories" 
          :key="cat.name"
          @click="searchByCategory(cat.name)"
          class="group flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-900/40 border border-white/5 hover:border-blue-500/20 hover:bg-slate-800 transition-all duration-500"
        >
          <span class="text-lg grayscale group-hover:grayscale-0 transition-all duration-300">{{ cat.icon }}</span>
          <span class="text-sm font-bold text-slate-400 group-hover:text-blue-400 transition-colors uppercase tracking-wide">{{ cat.name }}</span>
        </button>
      </div>
    </div>

    <!-- Search Results (Display when searching) -->
    <div v-if="searchQuery && !showDropdown" id="search-results" class="mt-16 space-y-6">
      <div class="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 class="text-lg font-black text-white uppercase italic">Search Results ({{ filteredResults.length }})</h3>
        <button @click="searchQuery = ''" class="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">Clear results</button>
      </div>
      
      <div v-if="filteredResults.length > 0" class="space-y-2">
        <StartupCard 
          v-for="startup in filteredResults" 
          :key="'search-' + startup.id" 
          :startup="startup" 
        />
      </div>
      <div v-else class="py-20 text-center">
        <div class="text-4xl mb-4">🔍</div>
        <p class="text-slate-500 font-bold uppercase tracking-widest">No startups found matching your query</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import allStartups from '~/content/startups.json'
import type { Startup } from '~/types/startup'

const router = useRouter()
const route = useRoute()
const searchQuery = ref('')
const showDropdown = ref(false)
const selectedIndex = ref(0)
const startups = allStartups as Startup[]

// Initialize search from URL query parameter
onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search as string
    showDropdown.value = false
    setTimeout(scrollToResults, 200)
  }
})

// Watch for route changes (when navigating from footer links)
watch(() => route.query.search, (newSearch) => {
  if (newSearch) {
    searchQuery.value = newSearch as string
    showDropdown.value = false
    setTimeout(scrollToResults, 200)
  }
})

const categories = [
  { name: 'Artificial Intelligence', icon: '🤖' },
  { name: 'SaaS', icon: '☁️' },
  { name: 'Developer Tools', icon: '🛠️' },
  { name: 'Fintech', icon: '💰' },
  { name: 'Productivity', icon: '✅' },
  { name: 'Marketing', icon: '📣' },
  { name: 'E-commerce', icon: '🛒' },
  { name: 'Design Tools', icon: '🎨' },
  { name: 'No-Code', icon: '📦' },
  { name: 'Analytics', icon: '📊' },
  { name: 'Education', icon: '🎓' },
  { name: 'Health & Fitness', icon: '❤️' },
  { name: 'Social Media', icon: '📱' },
  { name: 'Content Creation', icon: '✍️' },
  { name: 'Sales', icon: '📈' },
  { name: 'Customer Support', icon: '🎧' },
  { name: 'Recruiting & HR', icon: '👥' },
  { name: 'Real Estate', icon: '🏠' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Security', icon: '🛡️' }
]

// Suggestions for dropdown (max 8)
const filteredSuggestions = computed(() => {
  if (!searchQuery.value) return []
  const q = searchQuery.value.toLowerCase()
  return startups.filter(s => 
    s.startup_name.toLowerCase().includes(q) || 
    (s.founder_name && s.founder_name.toLowerCase().includes(q)) ||
    (s.category && s.category.toLowerCase().includes(q)) ||
    (s.domain && s.domain.toLowerCase().includes(q)) ||
    (s.founder_social && s.founder_social.toLowerCase().includes(q))
  ).slice(0, 8)
})

// Full results for results section
const filteredResults = computed(() => {
  if (!searchQuery.value) return []
  const q = searchQuery.value.toLowerCase()
  return startups.filter(s => 
    s.startup_name.toLowerCase().includes(q) || 
    (s.founder_name && s.founder_name.toLowerCase().includes(q)) ||
    (s.category && s.category.toLowerCase().includes(q)) ||
    (s.domain && s.domain.toLowerCase().includes(q)) ||
    (s.founder_social && s.founder_social.toLowerCase().includes(q))
  ).slice(0, 50)
})

function handleBlur() {
  // Delay to allow clicks on dropdown items
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

function navigateDown() {
  if (selectedIndex.value < filteredSuggestions.value.length - 1) {
    selectedIndex.value++
  }
}

function navigateUp() {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

function selectCurrent() {
  if (filteredSuggestions.value.length > 0 && showDropdown.value) {
    const startup = filteredSuggestions.value[selectedIndex.value]
    navigateToStartup(startup.trustmrr_profile_url)
  } else {
    showDropdown.value = false
    scrollToResults()
  }
}

function navigateToStartup(slug: string) {
  showDropdown.value = false
  router.push(`/startup/${slug}`)
}

function scrollToResults() {
  setTimeout(() => {
    document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

function searchByCategory(categoryName: string) {
  searchQuery.value = categoryName
  showDropdown.value = false
  scrollToResults()
}

function handleLogoError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23334155" width="100" height="100"/><text x="50" y="60" font-size="40" text-anchor="middle" fill="%2394a3b8">?</text></svg>'
}

// Reset selected index when query changes
watch(searchQuery, () => {
  selectedIndex.value = 0
  if (searchQuery.value) {
    showDropdown.value = true
  }
})
</script>
