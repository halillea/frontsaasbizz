<template>
  <article class="glass-card rounded-3xl p-8 min-h-[60vh]">
    <header class="mb-10">
      <h1 class="text-4xl font-black text-white tracking-tight mb-4">Terms of Service</h1>
      <p class="text-slate-400 text-sm">Last updated: January 15, 2026</p>
    </header>

    <div class="prose prose-invert max-w-none space-y-8">
      <section>
        <h2 class="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
        <p class="text-slate-400 leading-relaxed">
          By accessing and using SaaSBizz ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-white mb-4">2. Description of Service</h2>
        <p class="text-slate-400 leading-relaxed">
          SaaSBizz provides a leaderboard and directory of verified SaaS startups with publicly shared revenue data. The revenue figures displayed are sourced from public disclosures and third-party verification services. We do not guarantee the accuracy of any financial data displayed.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-white mb-4">3. User Conduct</h2>
        <p class="text-slate-400 leading-relaxed">
          Users agree not to use the Service for any unlawful purpose or in any way that could damage, disable, or impair the Service. Users may not attempt to gain unauthorized access to any portion of the Service, or any systems or networks connected to the Service.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-white mb-4">4. Intellectual Property</h2>
        <p class="text-slate-400 leading-relaxed">
          All content on SaaSBizz, including but not limited to text, graphics, logos, and software, is the property of SaaSBizz or its content suppliers and is protected by international copyright laws.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-white mb-4">5. Disclaimer of Warranties</h2>
        <p class="text-slate-400 leading-relaxed">
          The Service is provided "as is" without warranty of any kind, express or implied. SaaSBizz does not warrant that the Service will be uninterrupted, secure, or error-free. Revenue data is provided for informational purposes only and should not be used as the sole basis for any financial decisions.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-white mb-4">6. Limitation of Liability</h2>
        <p class="text-slate-400 leading-relaxed">
          In no event shall SaaSBizz be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-white mb-4">7. Advertising</h2>
        <p class="text-slate-400 leading-relaxed">
          SaaSBizz displays third-party advertisements. We are not responsible for the content of these advertisements or the products/services they promote. Clicking on advertisements is at your own risk.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-white mb-4">8. Changes to Terms</h2>
        <p class="text-slate-400 leading-relaxed">
          SaaSBizz reserves the right to modify these terms at any time. Continued use of the Service after any such changes constitutes your acceptance of the new terms.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-white mb-4">9. Contact Information</h2>
        <p class="text-slate-400 leading-relaxed">
          For any questions regarding these Terms of Service, please contact us at <a href="mailto:info@saasbizz.com" class="text-blue-400 hover:underline">info@saasbizz.com</a>.
        </p>
      </section>
    </div>

    <div class="mt-12 pt-8 border-t border-white/10">
      <NuxtLink to="/" class="text-blue-400 hover:underline font-medium">
        ← Back to Home
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Terms of Service - SaaSBizz',
  description: 'Terms of Service for SaaSBizz - the verified SaaS leaderboard.',
  ogTitle: 'Terms of Service - SaaSBizz',
  ogDescription: 'Terms of Service for SaaSBizz - the verified SaaS leaderboard.',
})
</script>
