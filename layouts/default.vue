<template>
  <div class="min-h-screen bg-[--color-bg-main] font-sans text-slate-200 selection:bg-blue-500/30 selection:text-blue-200">
    <!-- Mobile Ad Ticker - Keeping for mobile optimized experience, or consider hiding if Market Bar covers it -->
    <MobileAdTicker v-if="!isAdminPage" class="lg:hidden" />
    
    <!-- Mobile padding -->
    <div :class="{ 'pt-10 lg:pt-0': !isAdminPage }">
    
    <!-- Skip to content -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none"
    >
      Skip to main content
    </a>

    <!-- Unified Calm Header -->
    <header 
      v-if="!isAdminPage" 
      class="sticky top-0 z-50 w-full transition-all duration-300 border-b border-white/5 backdrop-blur-md bg-[#020617]/80 supports-[backdrop-filter]:bg-[#020617]/80"
      role="banner"
    >
      <div class="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <!-- LEFT: Logo -->
        <NuxtLink 
          to="/" 
          class="flex items-center gap-3 shrink-0 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          aria-label="SaaSBizz Home"
        >
          <img 
            src="/apple-touch-icon.png" 
            alt="SaaSBizz Logo" 
            class="w-8 h-8 rounded-lg shadow-none border border-white/10 group-hover:border-blue-500/50 transition-colors duration-300"
            width="32"
            height="32"
          >
          <div class="flex flex-col">
            <span class="font-black text-xl tracking-tight text-white leading-none font-outfit">SaaSBizz</span>
          </div>
        </NuxtLink>

        <!-- CENTER: Navigation (Desktop) -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink to="/topmrr" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">Top MRR</NuxtLink>
          <NuxtLink to="/category" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">Categories</NuxtLink>
          <NuxtLink to="/search" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">Search</NuxtLink>
        </nav>

        <!-- RIGHT: Actions -->
        <div class="flex items-center gap-4 shrink-0">
          <ThemeSwitcher />
          <!-- Primary CTA (Radius 8px standardized) -->
          <a
            href="/advertise/"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all text-slate-500 hover:text-blue-400"
            aria-label="Advertise on SaaSBizz"
          >
            Advertise
          </a>
        </div>
      </div>
    </header>
    
    <div v-if="!isAdminPage" class="relative z-40 mt-3">
      <div class="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-[--market-bar-bg] border border-white/5 rounded-xl overflow-hidden shadow-sm">
          <SaasBizzIndex />
        </div>
      </div>
    </div>

    <!-- Main Layout Container -->
    <main id="main-content" class="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-3" role="main">
      
      <div :class="isAdminPage ? 'grid grid-cols-1' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'">
        <!-- Center Column -->
        <div :class="isAdminPage ? 'col-span-1' : 'col-span-1 lg:col-span-10 flex flex-col gap-8'">
          
          <ErrorBoundary>
            <slot />
          </ErrorBoundary>

          <!-- Footer (Large Module radius: rounded-2xl if it had a bg, but standard section spacing) -->
          <footer class="mt-24 pt-16 border-t border-white/5 pb-16">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div class="space-y-6 text-center">
                <h4 class="text-white font-black uppercase italic tracking-wider text-sm font-outfit">Navigation</h4>
                <ul class="space-y-3 text-sm font-medium text-slate-400">
                  <li><NuxtLink to="/search" class="hover:text-blue-400 transition-colors">Search</NuxtLink></li>
                  <li><NuxtLink to="/advertise" class="hover:text-blue-400 transition-colors">Advertise</NuxtLink></li>
                  <li><NuxtLink to="/category/saas" class="hover:text-blue-400 transition-colors">Categories</NuxtLink></li>
                  <li><NuxtLink to="/recent" class="hover:text-blue-400 transition-colors">Recently Added</NuxtLink></li>
                  <li><NuxtLink to="/tos" class="hover:text-blue-400 transition-colors">Terms of Service</NuxtLink></li>
                </ul>
              </div>
              <div class="space-y-6 text-center">
                <h4 class="text-white font-black uppercase italic tracking-wider text-sm font-outfit">Browse Startups</h4>
                <div class="flex flex-col gap-3 text-sm font-medium text-slate-400">
                  <NuxtLink to="/category/ai" class="hover:text-blue-400 transition-colors">Artificial Intelligence</NuxtLink>
                  <NuxtLink to="/category/saas" class="hover:text-blue-400 transition-colors">SaaS</NuxtLink>
                  <NuxtLink to="/category/developer-tools" class="hover:text-blue-400 transition-colors">Developer Tools</NuxtLink>
                  <NuxtLink to="/category/fintech" class="hover:text-blue-400 transition-colors">Fintech</NuxtLink>
                  <NuxtLink to="/category/marketing" class="hover:text-blue-400 transition-colors">Marketing</NuxtLink>
                </div>
              </div>
              <div class="space-y-6 text-center">
                <h4 class="text-white font-black uppercase italic tracking-wider text-sm font-outfit">More Categories</h4>
                <div class="flex flex-col gap-3 text-sm font-medium text-slate-400">
                  <NuxtLink to="/category/ecommerce" class="hover:text-blue-400 transition-colors">E-commerce</NuxtLink>
                  <NuxtLink to="/category/productivity" class="hover:text-blue-400 transition-colors">Productivity</NuxtLink>
                  <NuxtLink to="/category/design-tools" class="hover:text-blue-400 transition-colors">Design Tools</NuxtLink>
                  <NuxtLink to="/category/no-code" class="hover:text-blue-400 transition-colors">No-Code</NuxtLink>
                  <NuxtLink to="/login" class="hover:text-blue-400 transition-colors">Login</NuxtLink>
                </div>
              </div>
            </div>
            <div class="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
              <span>© 2026 SaaSBizz. Verified MRR Leaderboard.</span>
              <div class="flex items-center gap-6">
                <ThemeSwitcher />
                <a href="https://x.com/1Halille" target="_blank" rel="noopener noreferrer" class="hover:text-slate-400">Twitter (X)</a>
                <a href="https://www.linkedin.com/in/halille-azami-33b432165/" target="_blank" rel="noopener noreferrer" class="hover:text-slate-400">LinkedIn</a>
              </div>
            </div>
            <div class="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] text-slate-500">
              <span>Built by</span>
              <a href="https://x.com/1Halille" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
                <img src="/halille-azami.jpg" alt="Halille Azami" class="w-5 h-5 rounded-full border border-slate-700">
                <span class="font-medium">Halille Azami</span>
              </a>
              <span>with</span>
              <span class="font-medium text-blue-400">Antigravity</span>
              <span>&</span>
              <span class="font-medium text-amber-400">Claude Code</span>
            </div>
          </footer>
        </div>

        <!-- Right Sidebar Ads -->
        <aside v-if="!isAdminPage" class="hidden lg:block lg:col-span-2 space-y-4 sticky top-24" role="complementary" aria-label="Featured tools">
           <!-- Removed Agent.ai banner from header -> ensure it appears here if needed or allow AdCard loop to handle it -->
           <!-- The AdLoop logic likely handles the ads including Agent.ai if it's in the JSON/Logic. -->
          <div :key="adGroupIndex" class="space-y-4 animate-fade-in">
            <div 
              v-for="(ad, index) in currentRightAds" 
              :key="ad.id"
            >
              <AdCard :ad="ad" :index="index" />
            </div>
          </div>
        </aside>

      </div>
    </main>
    </div>
    
    <Analytics />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Analytics } from '@vercel/analytics/nuxt'
import { useAds } from '~/composables/useAds'
import { useTheme } from '~/composables/useTheme'

const { themeColor } = useTheme()
const { adGroupIndex, currentRightAds } = useAds()
const route = useRoute()

const isHomePage = computed(() => route.path === '/')
const isAdminPage = computed(() => route.path === '/admin' || route.path === '/login')
</script>

<style scoped>
/* Simple Blunt Fade Animation - No layout shifts */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
</style>
