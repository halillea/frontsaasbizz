<template>
  <div class="space-y-3" role="status" aria-label="Loading content">
    <div v-for="i in count" :key="i" class="animate-pulse">
      <div class="bg-slate-800/50 border border-white/5 rounded-xl p-3">
        <div class="flex items-center gap-4">
          <div class="w-6 h-4 bg-slate-700/50 rounded" />
          <div class="w-10 h-10 bg-slate-700/50 rounded-lg" />
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-slate-700/50 rounded w-1/3" />
            <div class="h-3 bg-slate-700/50 rounded w-2/3" />
          </div>
          <div class="hidden md:flex items-center gap-4">
            <div class="w-24 space-y-1">
              <div class="h-4 bg-slate-700/50 rounded" />
              <div class="h-2 bg-slate-700/50 rounded w-1/2" />
            </div>
            <div class="w-16 space-y-1">
              <div class="h-4 bg-slate-700/50 rounded" />
              <div class="h-2 bg-slate-700/50 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ count?: number }>(), {
  count: 5
})
</script>
