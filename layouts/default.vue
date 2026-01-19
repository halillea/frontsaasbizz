<template>
  <div class="min-h-screen bg-[#030712] font-sans text-slate-200 selection:bg-blue-500/30 selection:text-blue-200">
    <!-- Skip to content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none"
    >
      Skip to main content
    </a>

    <!-- Sponsor Banner (hidden on admin) -->
    <div v-if="!isAdminPage" class="bg-slate-900 text-white py-6 px-4 text-center border-b border-slate-800 relative z-50" role="banner">
      <a
        href="https://saasitron.com"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex flex-col md:flex-row items-center justify-center gap-3 hover:text-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md"
        aria-label="SAASitron - Ship your SaaS in days with the ultimate boilerplate kit (opens in new tab)"
      >
        <span class="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Main Sponsor</span>
        <span class="text-base md:text-lg font-medium">
          <span class="font-bold text-blue-400">SAASitron:</span>
          Stop coding from scratch. Ship your SaaS in days with the ultimate boilerplate kit.
        </span>
        <span class="group-hover:translate-x-1 transition-transform text-lg" aria-hidden="true">→</span>
      </a>
    </div>

    <!-- Main Layout Container -->
    <main id="main-content" class="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-6" role="main">
      <!-- Ticker Band -->
      <SaasBizzIndex />
      
      <div :class="isAdminPage ? 'grid grid-cols-1' : 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'">

        <!-- Center Column (Navigation + Content) -->
        <div :class="isAdminPage ? 'col-span-1' : 'col-span-1 lg:col-span-9 flex flex-col gap-6'">
          <!-- Redesigned Header (Constrained to Center Column) -->
          <header class="sticky top-0 z-40 backdrop-blur-xl bg-[#030712]/80 border-b border-white/5 rounded-2xl px-6 py-4" role="banner">
            <nav class="flex items-center justify-between" aria-label="Main navigation">
              <!-- Left side placeholder to keep logo centered -->
              <div class="flex-1 hidden md:block"></div>

              <!-- Centered Logo -->
              <NuxtLink
                to="/"
                class="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                aria-label="SaaSBizz - Go to homepage"
              >
                <img 
                  src="/apple-touch-icon.png" 
                  alt="SaaSBizz Logo" 
                  class="w-8 h-8 rounded shadow-lg"
                  width="32"
                  height="32"
                >
                <span class="text-xl font-bold tracking-tight text-white">SaaSBizz</span>
              </NuxtLink>

              <!-- Right Aligned Content -->
              <div class="flex-1 flex items-center justify-end gap-5">
                <ThemeSwitcher />
                <a
                  href="/advertise/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[8px] uppercase font-bold tracking-widest text-slate-500 hover:text-blue-400 transition-colors focus:outline-none"
                  aria-label="Advertise on SaaSBizz (opens in new tab)"
                >
                  Advertise
                </a>
              </div>
            </nav>
          </header>

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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
              <!-- Column 1: Navigation -->
              <div class="space-y-6">
                <h4 class="text-white font-black uppercase italic tracking-wider text-sm">Navigation</h4>
                <ul class="space-y-3 text-sm font-medium text-slate-400">
                  <li><NuxtLink to="/search" class="hover:text-blue-400 transition-colors">Search</NuxtLink></li>
                  <li><NuxtLink to="/advertise" class="hover:text-blue-400 transition-colors">Advertise</NuxtLink></li>
                  <li><a href="#categories" class="hover:text-blue-400 transition-colors">Categories</a></li>
                  <li><NuxtLink to="/recent" class="hover:text-blue-400 transition-colors">Recently Added</NuxtLink></li>
                  <li><NuxtLink to="/tos" class="hover:text-blue-400 transition-colors">Terms of Service</NuxtLink></li>
                </ul>
              </div>

              <!-- Column 2: Browse Startups -->
              <div class="space-y-6">
                <h4 class="text-white font-black uppercase italic tracking-wider text-sm">Browse Startups</h4>
                <div class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm font-medium text-slate-400">
                  <NuxtLink to="/?search=ai" class="hover:text-blue-400 transition-colors">Artificial Intelligence</NuxtLink>
                  <NuxtLink to="/?search=saas" class="hover:text-blue-400 transition-colors">SaaS</NuxtLink>
                  <NuxtLink to="/?search=developer" class="hover:text-blue-400 transition-colors">Developer Tools</NuxtLink>
                  <NuxtLink to="/?search=fintech" class="hover:text-blue-400 transition-colors">Fintech</NuxtLink>
                  <NuxtLink to="/?search=marketing" class="hover:text-blue-400 transition-colors">Marketing</NuxtLink>
                  <NuxtLink to="/?search=ecommerce" class="hover:text-blue-400 transition-colors">E-commerce</NuxtLink>
                  <NuxtLink to="/?search=productivity" class="hover:text-blue-400 transition-colors">Productivity</NuxtLink>
                  <NuxtLink to="/?search=design" class="hover:text-blue-400 transition-colors">Design Tools</NuxtLink>
                  <NuxtLink to="/?search=no-code" class="hover:text-blue-400 transition-colors">No-Code</NuxtLink>
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
          <TransitionGroup 
            name="stagger-list" 
            tag="div" 
            class="space-y-3"
          >
            <div 
              v-for="(ad, index) in currentRightAds" 
              :key="ad.id"
              class="transition-all duration-500"
              :style="{ transitionDelay: `${index * 50}ms` }"
            >
              <AdCard :ad="ad" :index="index" />
            </div>
          </TransitionGroup>
        </aside>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAds } from '~/composables/useAds'

const { adGroupIndex, currentRightAds } = useAds()
const route = useRoute()

const isHomePage = computed(() => route.path === '/')
const isAdminPage = computed(() => route.path === '/admin' || route.path === '/login')
</script>

<style scoped>
/* Staggered List Transitions */
.stagger-list-enter-from,
.stagger-list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.stagger-list-leave-active {
  position: absolute;
  width: 100%; /* Ensure exiting items don't collapse width */
}
</style>
