<template>
  <nav 
    v-if="totalPages > 1" 
    class="flex items-center justify-center gap-2 mt-6" 
    :aria-label="ariaLabel"
  >
    <button
      @click="$emit('prev')"
      :disabled="currentPage === 1"
      class="px-4 py-2 text-sm font-medium rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      :class="themeColor === 'white' 
        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' 
        : 'bg-slate-800/50 border-white/5 text-slate-300 hover:bg-slate-700/50'"
      :aria-label="`Previous page of ${itemName}`"
    >
      Previous
    </button>
    <span class="text-sm text-slate-400" aria-live="polite">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <button
      @click="$emit('next')"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 text-sm font-medium rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      :class="themeColor === 'white' 
        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' 
        : 'bg-slate-800/50 border-white/5 text-slate-300 hover:bg-slate-700/50'"
      :aria-label="`Next page of ${itemName}`"
    >
      Next
    </button>
  </nav>
</template>

<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { themeColor } = useTheme()

defineProps<{
  currentPage: number
  totalPages: number
  itemName?: string
  ariaLabel?: string
}>()

defineEmits<{
  prev: []
  next: []
}>()
</script>
