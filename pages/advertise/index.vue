<template>
  <div class="max-w-2xl mx-auto py-12 px-4">
    <!-- Header/Intro -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
        <span class="animate-pulse">🔥</span> Pre-Launch Offer — Limited Time Only
      </div>
      <h1 class="text-4xl font-black text-white uppercase italic tracking-tight mb-4">
        Advertise on <span class="text-blue-500">SaaSBizz</span>
      </h1>
      <p class="text-slate-400 text-lg max-w-xl mx-auto">
        Reach thousands of entrepreneurs and founders daily. Lock in the pre-launch price before it's gone.
      </p>
    </div>

    <!-- Scarcity Banner -->
    <div class="bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-8 text-center">
      <div class="flex items-center justify-center gap-3 flex-wrap">
        <span class="text-amber-400 font-bold">⏰ Only 5 pre-launch spots available</span>
        <span class="text-slate-500">•</span>
        <span class="text-slate-400">One-time offer, never again at this price</span>
      </div>
    </div>

    <!-- How it Works -->
    <div class="glass-card rounded-2xl p-6 mb-8">
      <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
        <span class="text-blue-500">🚀</span> How it works
      </h2>
      <p class="text-slate-400 leading-relaxed text-sm">
        Your startup appears in rotating sponsor slots on sidebars and mobile banners across all SaaSBizz pages. 
        Sponsors rotate every 10 seconds to ensure high visibility and fair exposure.
      </p>
    </div>

    <!-- Single Pricing Box -->
    <div class="glass-card rounded-2xl p-8 relative overflow-hidden border-2 border-blue-500/50 ring-2 ring-blue-500/20 mb-8">
      <!-- Ambient Glow -->
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>
      
      <!-- Badge -->
      <div class="absolute top-0 left-0 bg-blue-500 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-br-xl">
        Pre-Launch Deal
      </div>
      <div class="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-bl-xl">
        5 Spots Only
      </div>

      <div class="relative z-10">
        <!-- Pricing -->
        <div class="text-center mb-6 mt-4">
          <div class="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Monthly Subscription</div>
          <div class="flex items-center justify-center gap-3">
            <span class="text-2xl text-slate-500 line-through font-medium">$1,500</span>
            <span class="text-5xl font-black text-white">$799</span>
            <span class="text-xl text-slate-500 font-medium">/ month</span>
          </div>
          <div class="mt-2 text-sm text-green-400 font-medium">Save $701/month — Pre-launch only!</div>
        </div>

        <!-- Features -->
        <ul class="text-sm text-slate-400 space-y-2 mb-6 max-w-sm mx-auto">
          <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Sidebar placement on all pages</li>
          <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Mobile banner ads</li>
          <li class="flex items-center gap-2"><span class="text-green-400">✓</span> 10-second rotation visibility</li>
          <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Lock in this rate forever</li>
        </ul>

        <!-- Divider -->
        <div class="border-t border-white/10 pt-6 mb-4">
          <p class="text-center text-xs text-slate-500 mb-4">
            After pre-launch, this same service will be <span class="text-white font-bold">$1,500/month</span>
          </p>
        </div>

        <!-- PayPal Button Container -->
        <div class="min-h-[150px]">
          <div id="paypal-button-container-P-7DLHD6JHZQ2YG"></div>
        </div>

        <p class="text-center text-xs text-slate-500 italic mt-4">
          Secure payment processed via PayPal. No hidden fees. Cancel anytime.
        </p>
      </div>
    </div>

    <!-- Trust/Security Footer -->
    <div class="text-center space-y-2">
      <p class="text-xs text-slate-600">
        Questions? <a href="mailto:contact@totakeaction.com" class="text-blue-400 hover:underline">contact@totakeaction.com</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const hasRendered = ref(false)

useHead({
  title: 'Advertise - SaaSBizz Pre-Launch Offer',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ],
  script: [
    {
      src: 'https://www.paypal.com/sdk/js?client-id=AWjiSeIg9VVJvWMs9BdmcdshPfMY4a31dAiTYDCgD7Cag2_SPO8W-V8zhSnvNmuEeDD0h89smU_1UF7e&vault=true&intent=subscription',
      'data-sdk-integration-source': 'button-factory',
      async: true,
      id: 'paypal-sdk-script'
    }
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

  // Wait for PayPal SDK and render button
  const checkPayPal = setInterval(() => {
    const paypal = (window as any).paypal
    const container = document.getElementById('paypal-button-container-P-7DLHD6JHZQ2YG')
    
    if (paypal && container && !hasRendered.value) {
      clearInterval(checkPayPal)
      renderPayPalButton(paypal)
    }
  }, 200)
})

function renderPayPalButton(paypal: any) {
  if (hasRendered.value) return
  hasRendered.value = true

  console.log('SaaSBizz: Initiating PayPal button render...')
  
  paypal.Buttons({
    style: {
      shape: 'rect',
      color: 'gold',
      layout: 'vertical',
      label: 'subscribe'
    },
    createSubscription: function (data: any, actions: any) {
      return actions.subscription.create({
        plan_id: 'P-6LY87750XT365015WNFLLZOQ'
      })
    },
    onApprove: function (data: any, actions: any) {
      alert('Subscription successful! ID: ' + data.subscriptionID)
      navigateTo('/advertise/success')
    },
    onError: function (err: any) {
      console.error('PayPal Render Error:', err)
      hasRendered.value = false
    }
  }).render('#paypal-button-container-P-7DLHD6JHZQ2YG')
    .catch((err: any) => {
      console.error('PayPal Render Catch:', err)
      if (!err.message?.includes('zoid')) {
        hasRendered.value = false
      }
    })
}
</script>
