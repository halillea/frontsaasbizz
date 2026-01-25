<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
    <div class="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 text-slate-500">
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </slot>
    </div>
    
    <h3 v-if="title" class="text-base font-semibold text-white mb-1 font-outfit">{{ title }}</h3>
    <p v-if="description" class="text-sm text-slate-400 max-w-sm mx-auto">{{ description }}</p>
    
    <div v-if="$slots.action" class="mt-6">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>
