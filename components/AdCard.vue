<template>
  <a
    :href="ad.href || '#'"
    target="_blank"
    rel="noopener noreferrer"
    class="block w-[240px] h-[120px] px-4 py-3 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500 text-center border border-white/5 bg-[#0f172a] hover:border-white/20 hover:scale-[1.01] overflow-hidden flex flex-col justify-center items-center"
    :aria-label="`${ad.name} - ${ad.copy}`"
  >
    <!-- Line 1: Logo + Name -->
    <div class="flex items-center justify-center gap-2 mb-1.5 w-full">
      <!-- Logo Image -->
      <img 
        v-if="ad.logoUrl" 
        :src="ad.logoUrl" 
        :alt="ad.name + ' logo'"
        class="w-8 h-8 rounded-lg object-contain p-0.5"
        @error="handleImageError"
      >
      <!-- Fallback Emoji -->
      <span 
        v-else-if="ad.emoji" 
        class="text-xl" 
        aria-hidden="true"
      >{{ ad.emoji }}</span>
      <!-- Sponsor Name -->
      <span class="font-bold text-sm text-white group-hover:text-blue-200 tracking-normal font-outfit truncate">{{ ad.name }}</span>
    </div>
    
    <!-- Line 2: Tagline -->
    <p class="text-[11px] leading-tight text-white/70 font-medium mb-1 line-clamp-2 w-full px-1">{{ ad.copy }}</p>
    
    <!-- Line 3: Domain -->
    <p v-if="ad.domain" class="text-[10px] text-white/50 font-bold uppercase tracking-wider">{{ ad.domain }}</p>
  </a>
</template>

<script setup lang="ts">
import type { Ad } from '~/types/startup'

defineProps<{
  ad: Ad
  index: number
}>()

// Handle broken logo images by hiding them
function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}
</script>
