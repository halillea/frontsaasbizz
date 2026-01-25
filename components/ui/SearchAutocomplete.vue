<template>
  <div class="relative group" ref="containerRef">
    <!-- Icon -->
    <div 
      class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors pointer-events-none z-10"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    </div>

    <!-- Input -->
    <input
      :value="modelValue"
      @input="handleInput"
      type="text"
      :placeholder="placeholder"
      class="w-full bg-[#0f172a] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
      @focus="showDropdown = true"
      @blur="handleBlur"
      @keydown.down.prevent="navigateDown"
      @keydown.up.prevent="navigateUp"
      @keydown.enter.prevent="selectCurrent"
      @keydown.escape="showDropdown = false"
    />

    <!-- Autocomplete Dropdown -->
    <div 
      v-if="showDropdown && modelValue && filteredSuggestions.length > 0"
      class="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto"
    >
      <div
        v-for="(startup, index) in filteredSuggestions"
        :key="startup.id"
        class="flex items-center gap-3 px-4 py-2 hover:bg-slate-800 transition-colors border-b border-white/5 last:border-b-0 cursor-pointer"
        :class="{ 'bg-slate-800': index === selectedIndex }"
        @mousedown.prevent="navigateToStartup(startup.trustmrr_link)"
      >
        <img
          :src="`https://www.google.com/s2/favicons?domain=${startup.domain}&sz=64`"
          :alt="`${startup.startup_name} logo`"
          class="w-8 h-8 rounded-md border border-white/10 bg-slate-800 object-contain p-0.5 flex-shrink-0"
          @error="handleLogoError"
        >
        <div class="min-w-0 flex-1 text-left">
          <div class="text-sm font-bold text-white truncate">{{ startup.startup_name }}</div>
          <div class="text-[10px] text-slate-400 truncate">{{ startup.tagline || startup.full_description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import allStartups from '~/content/startups.json'
import type { Startup } from '~/types/startup'

const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const router = useRouter()
const startups = allStartups as Startup[]

// State
const showDropdown = ref(false)
const selectedIndex = ref(0)
const containerRef = ref<HTMLElement | null>(null)

// Methods
function handleInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  emit('update:modelValue', val)
  showDropdown.value = true
  selectedIndex.value = 0
}

// Top 6 suggestions for compact view
const filteredSuggestions = computed(() => {
  if (!props.modelValue) return []
  const q = props.modelValue.toLowerCase()
  return startups.filter(s => 
    s.startup_name.toLowerCase().includes(q) || 
    (s.founder_name && s.founder_name.toLowerCase().includes(q)) ||
    (s.domain && s.domain.toLowerCase().includes(q))
  ).slice(0, 6)
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
    navigateToStartup(startup.trustmrr_link)
  } else {
    showDropdown.value = false
  }
}

function navigateToStartup(slug: string) {
  showDropdown.value = false
  router.push(`/startup/${slug}`)
}

function handleLogoError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23334155" width="100" height="100"/><text x="50" y="60" font-size="20" text-anchor="middle" fill="%2394a3b8">?</text></svg>'
}

// Reset selected index when query changes (handled in handleInput too, but good safety)
watch(() => props.modelValue, () => {
    // Only reset if we are typing, not just if prop changes externally (though equivalent here)
})
</script>
