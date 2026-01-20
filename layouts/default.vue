<template>
  <div class="min-h-screen bg-[#030712] font-sans text-slate-200 selection:bg-blue-500/30 selection:text-blue-200">
    <!-- Skip to content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none"
    >
      Skip to main content
    </a>

    <!-- Top Header & Sponsor Banner (Merged) -->
    <header 
      v-if="!isAdminPage" 
      class="bg-slate-900 text-white border-b border-slate-800 relative z-50 pt-4 pb-4" 
      role="banner"
    >
      <div class="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-2">
        <!-- LEFT: Logo & Brand -->
        <NuxtLink 
          to="/" 
          class="flex items-center gap-3 shrink-0 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
          aria-label="SaaSBizz Home"
        >
          <img 
            src="/apple-touch-icon.png" 
            alt="SaaSBizz Logo" 
            class="w-8 h-8 rounded shadow-lg group-hover:scale-105 transition-transform duration-300"
            width="32"
            height="32"
          >
          <div class="flex flex-col hidden sm:flex">
            <span class="font-black text-lg tracking-tight text-white leading-none group-hover:text-blue-200 transition-colors">SaaSBizz</span>
            <span class="text-[9px] uppercase tracking-[0.2em] text-blue-400 font-bold leading-none mt-0.5">Verified</span>
          </div>
        </NuxtLink>

        <!-- CENTER: Main Sponsor Banner -->
        <div class="flex-1 flex justify-center text-center">
          <a
            href="https://saasitron.com"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 hover:text-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md p-1"
            aria-label="SAASitron Sponsor Link (opens in new tab)"
          >

            <span class="text-sm md:text-base font-medium truncate max-w-[200px] md:max-w-none">
              <span class="font-bold text-blue-400">SAASitron:</span>
              <span class="hidden md:inline">Stop coding from scratch. Ship in days.</span>
              <span class="md:hidden">Ship your SaaS in days.</span>
            </span>
            <span class="group-hover:translate-x-1 transition-transform text-base" aria-hidden="true">→</span>
          </a>
        </div>

        <!-- RIGHT: Actions -->
        <div class="flex items-center gap-4 shrink-0">
          <ThemeSwitcher />
          <a
            href="/advertise/"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden md:flex text-[10px] uppercase font-bold tracking-widest transition-colors focus:outline-none border px-3 py-1.5 rounded-lg"
            :class="themeColor === 'white' 
              ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:text-blue-600' 
              : 'bg-slate-800/50 border-transparent text-slate-400 hover:text-white hover:border-slate-700'"
            aria-label="Advertise on SaaSBizz (opens in new tab)"
          >
            Advertise
          </a>
        </div>
      </div>
    </header>

    <!-- Main Layout Container -->
    <main id="main-content" class="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-6" role="main">
      <!-- Ticker Band -->
      <SaasBizzIndex />
      
      <div :class="isAdminPage ? 'grid grid-cols-1' : 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'">

        <!-- Center Column (Navigation + Content) -->
        <div :class="isAdminPage ? 'col-span-1' : 'col-span-1 lg:col-span-9 flex flex-col gap-6'">
          <!-- Old Header Removed -->

          <!-- Page Component Content -->
          <section class="relative">
            <!-- Ambient Glow -->
            <div v-if="isHomePage" class="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-500/20 blur-[100px] -z-10 rounded-full pointer-events-none mix-blend-screen"></div>
            
            <ErrorBoundary>
              <slot />
            </ErrorBoundary>
          </section>

          <!-- New Footer Section -->
          <footer class="mt-20 pt-12 border-t border-white/5 pb-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <!-- Column 1: Navigation (Center Aligned) -->
              <div class="space-y-6 text-center">
                <h4 class="text-white font-black uppercase italic tracking-wider text-sm">Navigation</h4>
                <ul class="space-y-3 text-sm font-medium text-slate-400">
                  <li><NuxtLink to="/search" class="hover:text-blue-400 transition-colors">Search</NuxtLink></li>
                  <li><NuxtLink to="/advertise" class="hover:text-blue-400 transition-colors">Advertise</NuxtLink></li>
                  <li><NuxtLink to="/category/saas" class="hover:text-blue-400 transition-colors">Categories</NuxtLink></li>
                  <li><NuxtLink to="/recent" class="hover:text-blue-400 transition-colors">Recently Added</NuxtLink></li>
                  <li><NuxtLink to="/tos" class="hover:text-blue-400 transition-colors">Terms of Service</NuxtLink></li>
                </ul>
              </div>

              <!-- Column 2: Browse Startups 1 (Center Aligned) -->
              <div class="space-y-6 text-center">
                <h4 class="text-white font-black uppercase italic tracking-wider text-sm">Browse Startups</h4>
                <div class="flex flex-col gap-3 text-sm font-medium text-slate-400">
                  <NuxtLink to="/category/ai" class="hover:text-blue-400 transition-colors">Artificial Intelligence</NuxtLink>
                  <NuxtLink to="/category/saas" class="hover:text-blue-400 transition-colors">SaaS</NuxtLink>
                  <NuxtLink to="/category/developer-tools" class="hover:text-blue-400 transition-colors">Developer Tools</NuxtLink>
                  <NuxtLink to="/category/fintech" class="hover:text-blue-400 transition-colors">Fintech</NuxtLink>
                  <NuxtLink to="/category/marketing" class="hover:text-blue-400 transition-colors">Marketing</NuxtLink>
                </div>
              </div>

              <!-- Column 3: Browse Startups 2 (Center Aligned) -->
              <div class="space-y-6 text-center">
                <h4 class="text-white font-black uppercase italic tracking-wider text-sm">More Categories</h4>
                <div class="flex flex-col gap-3 text-sm font-medium text-slate-400">
                  <NuxtLink to="/category/ecommerce" class="hover:text-blue-400 transition-colors">E-commerce</NuxtLink>
                  <NuxtLink to="/category/productivity" class="hover:text-blue-400 transition-colors">Productivity</NuxtLink>
                  <NuxtLink to="/category/design-tools" class="hover:text-blue-400 transition-colors">Design Tools</NuxtLink>
                  <NuxtLink to="/category/no-code" class="hover:text-blue-400 transition-colors">No-Code</NuxtLink>
                  <NuxtLink to="/login" class="hover:text-blue-400 transition-colors">Login</NuxtLink>
                </div>
              </div>
            </div>
            <div class="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
              <span>© 2026 SaaSBizz. Verified MRR Leaderboard.</span>
              <div class="flex items-center gap-6">
                <ThemeSwitcher />
                <a href="https://x.com/1Halille" target="_blank" rel="noopener noreferrer" class="hover:text-slate-400">Twitter (X)</a>
                <a href="https://www.linkedin.com/in/halille-azami-33b432165/" target="_blank" rel="noopener noreferrer" class="hover:text-slate-400">LinkedIn</a>
              </div>
            </div>
          </footer>
        </div>

        <!-- Right Sidebar Ads (hidden on admin) -->
        <aside v-if="!isAdminPage" class="hidden lg:block lg:col-span-3 space-y-3 sticky top-0 mt-4" role="complementary" aria-label="Featured tools">
          <!-- Optimized Blunt Transition: Keyed Div with Fade -->
          <div :key="adGroupIndex" class="space-y-3 animate-fade-in">
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
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
