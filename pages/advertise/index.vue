<template>
  <div class="max-w-2xl mx-auto py-12 px-4">
    <!-- Header/Intro -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-black text-white uppercase italic tracking-tight mb-4">
        Advertise on <span class="text-blue-500">SaaSBizz</span>
      </h1>
      <p class="text-slate-400 text-lg">
        Reach thousands of entrepreneurs and founders daily.
      </p>
    </div>

    <!-- Main Checkout Card -->
    <div class="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
      <!-- Ambient Glow decoration -->
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div class="relative z-10 space-y-8">
        <!-- Info Section -->
        <div>
          <h2 class="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span class="text-blue-500">🚀</span> How it works
          </h2>
          <p class="text-slate-400 leading-relaxed">
            Your startup appears in rotating sponsor slots on sidebars and mobile banners across all Saasbizz pages. 
            Sponsors rotate every 10 seconds to ensure high visibility and fair exposure.
          </p>
        </div>

        <!-- Status & Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Maximum Spots</div>
            <div class="text-2xl font-black text-white">20</div>
          </div>
          <div class="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
            <div class="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Availability</div>
            <div class="text-2xl font-black text-green-400">Spots Available</div>
          </div>
        </div>

        <!-- Pricing -->
        <div class="text-center py-8 border-y border-white/5">
          <div class="text-slate-500 text-sm font-medium mb-1">Monthly Subscription</div>
          <div class="flex items-center justify-center gap-2">
            <span class="text-5xl font-black text-white">$999</span>
            <span class="text-xl text-slate-500 font-medium">/ month</span>
          </div>
        </div>

        <!-- PayPal Button Container -->
        <div class="min-h-[150px]">
          <div id="paypal-button-container-P-6LY87750XT365015WNFLLZOQ"></div>
        </div>

        <p class="text-center text-xs text-slate-500 italic">
          Secure payment processed via PayPal. No hidden fees. Cancel anytime.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const hasRendered = ref(false)

useHead({
  title: 'Advertise - SaaSBizz',
  script: [
    {
      src: 'https://www.paypal.com/sdk/js?client-id=AWjiSeIg9VVJvWMs9BdmcdshPfMY4a31dAiTYDCgD7Cag2_SPO8W-V8zhSnvNmuEeDD0h89smU_1UF7e&vault=true&intent=subscription',
      'data-sdk-integration-source': 'button-factory',
      async: true,
      id: 'paypal-sdk-script'
    }
  ]
})

onMounted(() => {
  // Use a targeted approach to wait for both SDK and DOM container
  const checkPayPal = setInterval(() => {
    const paypal = (window as any).paypal
    const container = document.getElementById('paypal-button-container-P-6LY87750XT365015WNFLLZOQ')
    
    if (paypal && container && !hasRendered.value) {
      clearInterval(checkPayPal)
      renderPayPalButton(paypal)
    }
  }, 200)

  // Cleanup on unmounted if needed, but since it's a static-ish page it's usually fine
})

function renderPayPalButton(paypal: any) {
  if (hasRendered.value) return
  hasRendered.value = true

  console.log('SaaSBizz: Initiating PayPal button render...')
  
  paypal.Buttons({
    style: {
      shape: 'rect',
      color: 'gold', // Gold often looks better in premium designs
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
      hasRendered.value = false // Allow retry on error
    }
  }).render('#paypal-button-container-P-6LY87750XT365015WNFLLZOQ')
    .catch((err: any) => {
      console.error('PayPal Render Catch:', err)
      // Some "zoid" errors are benign if it's just a duplicate render attempt
      if (!err.message?.includes('zoid')) {
        hasRendered.value = false
      }
    })
}
</script>
