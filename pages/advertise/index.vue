<template>
  <div class="max-w-4xl mx-auto py-16 px-4">
    <!-- Minimal Header -->
    <div class="text-center mb-16">
      <h1 class="text-3xl md:text-4xl font-black text-white tracking-tight mb-4 font-outfit">
        Become a <span class="text-blue-500">Sponsor</span>
      </h1>
      <p class="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
        Position your brand in front of a verified audience of SaaS founders, investors, and indie hackers.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <!-- Left Column: Value Proposition -->
      <div class="space-y-8 py-4">
        <div>
          <h3 class="text-white font-bold text-lg mb-2">Why SaaSBizz?</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            We curate the best verified SaaS startups. Our audience consists of high-intent builders and buyers looking for tools to grow their businesses.
          </p>
        </div>

        <div class="space-y-6">
          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-lg bg-slate-800/50 border border-white/5 flex items-center justify-center text-xl shrink-0">
              🎯
            </div>
            <div>
              <h4 class="text-white font-bold text-sm mb-1">Targeted Reach</h4>
              <p class="text-slate-400 text-xs">Direct exposure to founders and decision-makers in the SaaS industry.</p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-lg bg-slate-800/50 border border-white/5 flex items-center justify-center text-xl shrink-0">
              👁️
            </div>
            <div>
              <h4 class="text-white font-bold text-sm mb-1">High Visibility</h4>
              <p class="text-slate-400 text-xs">Your ad appears in the sidebar and mobile ticker on every page.</p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-lg bg-slate-800/50 border border-white/5 flex items-center justify-center text-xl shrink-0">
              ✨
            </div>
            <div>
              <h4 class="text-white font-bold text-sm mb-1">Premium Association</h4>
              <p class="text-slate-400 text-xs">Align your brand with verified, high-revenue startups.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Simple Pricing Card -->
      <div class="bg-slate-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
        <!-- New Badge for 10 Spots -->
        <div class="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
          10 Spots Available
        </div>

        <div class="mb-8">
          <div class="text-sm font-medium text-slate-400 mb-2">Advert Pack 02</div>
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-bold text-white">$1,499</span>
            <span class="text-slate-500">/ month</span>
          </div>
          <p class="text-xs text-slate-500 mt-2">Recurring billing. Cancel anytime.</p>
        </div>

        <div class="space-y-4 mb-8">
          <div class="flex items-center gap-3 text-sm text-slate-300">
            <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span>Sidebar placement on all pages</span>
          </div>
          <div class="flex items-center gap-3 text-sm text-slate-300">
            <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span>Mobile ticker inclusion</span>
          </div>
          <div class="flex items-center gap-3 text-sm text-slate-300">
            <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span>Rotating visibility (10s intervals)</span>
          </div>
        </div>

        <!-- PayPal Hosted Button Form -->
        <div class="w-full relative z-20">
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="UFNPWXQVETBTA" />
            <input type="hidden" name="currency_code" value="USD" />
            
            <button 
              type="submit" 
              name="submit" 
              class="w-full bg-[#FFC439] hover:bg-[#F4BB2E] text-black font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group"
            >
              <span>Subscribe with</span>
              <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" alt="PayPal" class="h-5" />
            </button>
            <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
          </form>
        </div>
        
        <p class="text-center text-[10px] text-slate-600 mt-4">
          Secure breakdown via PayPal. No hidden fees.
        </p>
      </div>
    </div>

    <!-- Contact / Help -->
    <div class="mt-16 text-center border-t border-white/5 pt-8">
      <p class="text-sm text-slate-500">
        Need a custom arrangement? <a href="mailto:contact@totakeaction.com" class="text-blue-500 hover:text-blue-400 transition-colors">Contact us</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

useHead({
  title: 'Sponsor SaaSBizz',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

onMounted(async () => {
  // Check for soldout status and redirect if needed
  try {
    const response = await fetch('/api/settings')
    if (response.ok) {
      const settings = await response.json()
      if (settings.advertising_soldout) {
        navigateTo('/advertise/soldout')
        return
      }
    }
  } catch (e) {
    console.error('Failed to check soldout status:', e)
  }
})
</script>
