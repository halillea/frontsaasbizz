<template>
  <div class="max-w-md mx-auto py-16">
    <!-- Header -->
    <div class="text-center mb-10">
      <img 
        src="/apple-touch-icon.png" 
        alt="SaaSBizz Logo" 
        class="w-16 h-16 mx-auto rounded-2xl shadow-lg shadow-blue-500/30 mb-4"
      >
      <h1 class="text-3xl font-black text-white tracking-tight mb-2">
        Admin Login
      </h1>
      <p class="text-slate-400">
        Sign in to manage SaaSBizz
      </p>
    </div>

    <!-- Login Form -->
    <div class="glass-card rounded-3xl p-8">
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Username -->
        <div class="space-y-2">
          <label for="username" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
            Username
          </label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            required
            placeholder="Enter username"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
          >
        </div>

        <!-- Password -->
        <div class="space-y-2">
          <label for="password" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
            Password
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
          >
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-400 text-sm text-center">
          {{ error }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span v-if="isLoading" class="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
    </div>

    <!-- Back Link -->
    <div class="mt-8 text-center">
      <NuxtLink to="/" class="text-slate-400 hover:text-blue-400 text-sm transition-colors">
        ← Back to Homepage
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const isLoading = ref(false)
const error = ref('')

const form = reactive({
  username: '',
  password: ''
})

async function handleLogin() {
  isLoading.value = true
  error.value = ''
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Check credentials
  if (form.username === 'thepelican' && form.password === 'letsbegin-1984') {
    // Set auth token in session storage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('saasbizz-admin-auth', 'authenticated')
    }
    navigateTo('/admin')
  } else {
    error.value = 'Invalid username or password'
    isLoading.value = false
  }
}

useSeoMeta({
  title: 'Admin Login - SaaSBizz',
  robots: 'noindex, nofollow'
})
</script>
