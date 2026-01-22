<template>
  <div class="max-w-2xl mx-auto py-12 px-4">
    <!-- Header -->
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 class="text-4xl font-black text-white uppercase italic tracking-tight mb-2">
        Payment Success!
      </h1>
      <p class="text-slate-400 text-lg">
        Thank you for choosing SaaSBizz. Please provide your business details to start your campaign.
      </p>
    </div>

    <!-- Form Card -->
    <div class="glass-card rounded-3xl p-8 relative overflow-hidden">
      <form v-if="!submitted" @submit.prevent="handleSubmit" class="space-y-6 relative z-10">
        <!-- Business Name -->
        <div class="space-y-2">
          <label for="business_name" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
            Business Name <span class="text-red-500">*</span>
          </label>
          <input
            id="business_name"
            v-model="form.business_name"
            type="text"
            required
            placeholder="e.g. Acme SaaS"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
          >
        </div>

        <!-- Main URL -->
        <div class="space-y-2">
          <label for="website_url" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
            Website URL <span class="text-red-500">*</span>
          </label>
          <input
            id="website_url"
            v-model="form.website_url"
            type="url"
            required
            placeholder="https://yourwebsite.com"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
          >
        </div>

        <!-- Logo URL -->
        <div class="space-y-2">
          <label for="logo_url" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
            Logo URL (Optional)
          </label>
          <input
            id="logo_url"
            v-model="form.logo_url"
            type="url"
            placeholder="https://yourwebsite.com/logo.png"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
          >
          <p class="text-xs text-slate-500">Direct link to your logo image (PNG, JPG, SVG)</p>
        </div>

        <!-- Tagline -->
        <div class="space-y-2">
          <label for="tagline" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
            Tagline (Optional)
          </label>
          <input
            id="tagline"
            v-model="form.tagline"
            type="text"
            maxlength="80"
            placeholder="Short catchy phrase (max 80 chars)"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
          >
          <p class="text-xs text-slate-500">{{ form.tagline.length }}/80 characters</p>
        </div>

        <!-- Description -->
        <div class="space-y-2">
          <label for="description" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
            Description (Optional)
          </label>
          <textarea
            id="description"
            v-model="form.description"
            rows="5"
            maxlength="500"
            placeholder="Describe your business, what you offer, and why users should click. This helps us understand your product better and create an effective ad."
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600 resize-none"
          ></textarea>
          <p class="text-xs text-slate-500">{{ form.description.length }}/500 characters</p>
        </div>

        <!-- Keywords (Tag Input) -->
        <div class="space-y-2">
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
            Keywords (Optional)
          </label>
          <div 
            class="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex flex-wrap gap-2 items-center min-h-[50px] focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-text"
            @click="focusKeywordInput"
          >
            <!-- Keyword Tags -->
            <span 
              v-for="(keyword, index) in keywordTags" 
              :key="index"
              class="inline-flex items-center gap-1 bg-slate-700 text-slate-200 text-sm px-3 py-1 rounded-lg"
            >
              {{ keyword }}
              <button 
                type="button" 
                @click.stop="removeKeyword(index)"
                class="text-slate-400 hover:text-white transition-colors"
                :aria-label="`Remove ${keyword}`"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </span>
            <!-- Input -->
            <input
              ref="keywordInputRef"
              v-model="keywordInput"
              type="text"
              placeholder="Type and press Enter..."
              class="flex-1 min-w-[150px] bg-transparent text-white focus:outline-none placeholder:text-slate-600"
              @keydown.enter.prevent="addKeyword"
              @keydown.backspace="handleBackspace"
            >
          </div>
          <p class="text-xs text-slate-500">Press Enter after each keyword to add it</p>
        </div>

        <!-- Contact Email -->
        <div class="space-y-2">
          <label for="contact_email" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
            Contact Email <span class="text-red-500">*</span>
          </label>
          <input
            id="contact_email"
            v-model="form.contact_email"
            type="email"
            required
            placeholder="you@company.com"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
          >
          <p class="text-xs text-slate-500">We'll send confirmation and updates to this email</p>
        </div>

        <!-- Contact Name -->
        <div class="space-y-2">
          <label for="contact_name" class="block text-xs font-bold text-slate-500 uppercase tracking-widest">
            Full Name (Optional)
          </label>
          <input
            id="contact_name"
            v-model="form.contact_name"
            type="text"
            placeholder="John Doe"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
          >
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span v-if="isSubmitting" class="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
          {{ isSubmitting ? 'Submitting...' : 'Submit Business Info' }}
        </button>
      </form>

      <!-- Post-Submission Message -->
      <div v-else class="text-center py-12 space-y-6 relative z-10">
        <div class="text-green-400 font-bold text-xl italic tracking-tight uppercase">Successfully Submitted!</div>
        <p class="text-slate-400 max-w-sm mx-auto">
          We've received your business information. Your ad will be reviewed and activated within 24-48 hours. 
          A confirmation has been sent to {{ form.contact_email }}.
        </p>
        <NuxtLink
          to="/"
          class="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl transition-colors font-semibold"
        >
          Return to SaaSBizz
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

definePageMeta({
  layout: 'noads'
})

const submitted = ref(false)
const isSubmitting = ref(false)

// Tag input state
const keywordTags = ref<string[]>([])
const keywordInput = ref('')
const keywordInputRef = ref<HTMLInputElement | null>(null)

const form = reactive({
  business_name: '',
  website_url: '',
  logo_url: '',
  tagline: '',
  description: '',
  keywords: '',
  contact_email: '',
  contact_name: ''
})

// Tag input functions
function addKeyword() {
  const keyword = keywordInput.value.trim()
  if (keyword && !keywordTags.value.includes(keyword)) {
    keywordTags.value.push(keyword)
    keywordInput.value = ''
  }
}

function removeKeyword(index: number) {
  keywordTags.value.splice(index, 1)
}

function handleBackspace() {
  if (keywordInput.value === '' && keywordTags.value.length > 0) {
    keywordTags.value.pop()
  }
}

function focusKeywordInput() {
  keywordInputRef.value?.focus()
}

async function handleSubmit() {
  isSubmitting.value = true
  
  // Convert tags array to comma-separated string
  form.keywords = keywordTags.value.join(', ')
  
  try {
    const response = await fetch('/api/submit-advert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    if (!response.ok) throw new Error('Failed to submit form')

    submitted.value = true
  } catch (error) {
    console.error('Submission error:', error)
    alert('Failed to submit your information. Please check your connection and try again.')
  } finally {
    isSubmitting.value = false
  }
}

useHead({
  title: 'Complete Your Ad - SaaSBizz',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
