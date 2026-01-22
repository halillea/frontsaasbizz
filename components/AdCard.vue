<template>
  <a
    :href="ad.href || '#'"
    target="_blank"
    rel="noopener noreferrer"
    :style="{ backgroundColor: getBoxColor(ad, index) }"
    class="block px-3 py-2 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500 text-center border border-white/10 hover:scale-[1.02] hover:shadow-lg"
    :aria-label="`${ad.name} - ${ad.copy}`"
  >
    <!-- Line 1: Logo + Name -->
    <div class="flex items-center justify-center gap-2 mb-1">
      <!-- Logo Image -->
      <img 
        v-if="ad.logoUrl" 
        :src="ad.logoUrl" 
        :alt="ad.name + ' logo'"
        class="w-14 h-14 rounded-lg object-contain p-1"
        @error="handleImageError"
      >
      <!-- Fallback Emoji -->
      <span 
        v-else-if="ad.emoji" 
        class="text-2xl" 
        aria-hidden="true"
      >{{ ad.emoji }}</span>
      <!-- Sponsor Name -->
      <span class="font-semibold text-base text-white group-hover:text-blue-200 tracking-normal" style="font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;">{{ ad.name }}</span>
    </div>
    
    <!-- Line 2: Tagline -->
    <p class="text-xs leading-tight text-white/80 font-medium mb-1 line-clamp-1">{{ ad.copy }}</p>
    
    <!-- Line 3: Domain -->
    <p v-if="ad.domain" class="text-xs text-white/90 font-bold">{{ ad.domain }}</p>
  </a>
</template>

<script setup lang="ts">
import type { Ad } from '~/types/startup'

const props = defineProps<{
  ad: Ad
  index: number
}>()

// Dark blue color palette
const bgColors = [
  '#172554', // Almost Black Blue (blue-950)
  '#0c4a6e', // Dark Sky Blue (sky-900)
  '#1e3a8a', // Very Dark Blue (blue-900)
  '#0c4a6e', // Dark Sky Blue (sky-900)
  '#172554', // Almost Black Blue (blue-950)
  '#0c4a6e', // Dark Sky Blue (sky-900)
]

// Get box color - Agent.ai always gets blue, others rotate
function getBoxColor(ad: Ad, index: number): string {
  if (ad.domain?.includes('agent.ai')) {
    return '#1e40af' // dark blue for Agent.ai
  }
  return bgColors[index % bgColors.length]
}

// Handle broken logo images by hiding them
function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}
</script>
