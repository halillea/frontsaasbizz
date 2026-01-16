<template>
  <div v-if="error" class="min-h-[50vh] flex items-center justify-center">
    <div class="text-center p-8 glass-card rounded-2xl max-w-md">
      <div class="text-4xl mb-4">⚠️</div>
      <h2 class="text-xl font-bold text-white mb-2">Something went wrong</h2>
      <p class="text-slate-400 text-sm mb-6">{{ errorMessage }}</p>
      <button
        @click="retry"
        class="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0B1120] active:scale-95"
        aria-label="Try again"
      >
        Try Again
      </button>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)
const errorMessage = ref('An unexpected error occurred. Please try again.')

onErrorCaptured((err: Error) => {
  error.value = err
  errorMessage.value = err.message || 'An unexpected error occurred. Please try again.'
  console.error('ErrorBoundary caught:', err)
  return false
})

const retry = () => {
  error.value = null
  errorMessage.value = 'An unexpected error occurred. Please try again.'
}
</script>
