<template>
  <div class="max-w-2xl mx-auto py-12 px-4">
    <!-- Header -->
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 class="text-4xl font-black text-white uppercase italic tracking-tight mb-2">
        Sold Out!
      </h1>
      <p class="text-slate-400 text-lg">
        All advertising spots are currently taken.
      </p>
    </div>

    <!-- Info Card -->
    <div class="glass-card rounded-3xl p-8 relative overflow-hidden">
      <!-- Ambient Glow decoration -->
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-amber-600/10 blur-[80px] rounded-full pointer-events-none"></div>

      <div class="relative z-10 space-y-6">
        <!-- Status Message -->
        <div class="text-center py-6 border-b border-white/5">
          <div class="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-2">Current Status</div>
          <div class="text-2xl font-black text-white">20/20 Spots Filled</div>
        </div>

        <!-- Waitlist Form (before submission) -->
        <div v-if="!submitted" class="space-y-6">
          <div>
            <h2 class="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <span class="text-blue-500">📋</span> Join the Waiting List
            </h2>
            <p class="text-slate-400 leading-relaxed">
              Be the first to know when a spot becomes available. 
              Waitlist members get priority access to advertising packages.
            </p>
          </div>
          
          <form @submit.prevent="submitWaitlist" class="space-y-4">
            <!-- Name Field (Required) -->
            <div class="space-y-2">
              <label for="name" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Name <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Your full name"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
              >
            </div>

            <!-- Email Field (Required) -->
            <div class="space-y-2">
              <label for="email" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="your@email.com"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
              >
            </div>

            <!-- Mobile Phone Field (Optional) -->
            <div class="space-y-2">
              <label for="phone" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Mobile Phone <span class="text-slate-600">(Optional)</span>
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
              >
              <p class="text-xs text-slate-500">We'll send you a text when a spot opens up</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="isSubmitting" class="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
              {{ isSubmitting ? 'Joining...' : 'Join Waiting List' }}
            </button>
          </form>
        </div>

        <!-- Success Message (after submission) -->
        <div v-else class="text-center py-8 space-y-4">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 text-green-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="text-green-400 font-bold text-xl italic tracking-tight uppercase">You're on the list!</div>
          <p class="text-slate-400 max-w-sm mx-auto">
            We'll notify you at <span class="text-white font-medium">{{ submittedEmail }}</span> as soon as an advertising spot becomes available.
          </p>
        </div>

        <!-- Divider -->
        <div class="border-t border-white/5 pt-6">
          <p class="text-slate-500 text-sm text-center">
            Questions? Contact us at <a href="mailto:contact@totakeaction.com" class="text-blue-400 hover:underline">contact@totakeaction.com</a>
          </p>
        </div>

        <!-- Return Button -->
        <NuxtLink
          to="/"
          class="block w-full text-center bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl transition-colors font-semibold"
        >
          Return to SaaSBizz
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

definePageMeta({
  layout: 'noads'
})

useHead({
  title: 'Sold Out - Advertising - SaaSBizz',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const form = reactive({
  name: '',
  email: '',
  phone: ''
})

const isSubmitting = ref(false)
const submitted = ref(false)
const submittedEmail = ref('')

async function submitWaitlist() {
  if (!form.name || !form.email) return
  
  isSubmitting.value = true
  
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone || null
      })
    })

    if (!response.ok) throw new Error('Failed to join waitlist')

    submittedEmail.value = form.email
    submitted.value = true
  } catch (error) {
    console.error('Waitlist submission error:', error)
    alert('Failed to join waitlist. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
