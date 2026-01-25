import allStartups from './content/startups.json'

// Merged Nuxt config optimized for Vercel deployment
// Combines Vercel performance features with existing SEO and styling
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Vite HMR for development
  vite: {
    server: {
      hmr: {
        port: 24679
      }
    }
  },

  // Modules: Tailwind + Image + Fonts (Vercel optimization)
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxt/fonts'],

  // CRITICAL: Main CSS file
  css: ['~/assets/css/main.css'],

  // Enable SSR for static generation
  ssr: true,

  // Server-side configuration (secrets)
  runtimeConfig: {
    resendApiKey: '' // Overridden by NUXT_RESEND_API_KEY environment variable
  },

  // Vercel-optimized Nitro configuration
  nitro: {
    preset: 'vercel', // Optimizes for Vercel serverless/edge runtime
    prerender: {
      crawlLinks: true, // Auto-discover links (Vercel handles well)
      routes: [
        '/',
        ...allStartups.map(s => `/startup/${s.trustmrr_link}`),
        ...allStartups
          .filter(s => s.founder_name && s.founder_name !== 'null,' && s.founder_name.length > 1)
          .map(s => `/founder/${s.founder_name}`)
      ],
      failOnError: false
    }
  },

  // Vercel performance optimizations
  experimental: {
    payloadExtraction: true, // Shrinks HTML by extracting data to JSON
    sharedPrerenderData: true // Reuses data across pages (faster builds)
  },

  // Vercel Edge Image Optimization
  image: {
    provider: 'vercel', // Zero-config edge optimization
    format: ['avif', 'webp'], // AVIF is ~30% smaller than WebP
    quality: 80,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'SaaSBizz - Verified SaaS Leaderboard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover verified SaaS startups ranked by revenue. Real MRR data from founders building in public.' },
        // OpenGraph tags
        { property: 'og:site_name', content: 'SaaSBizz' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        // Twitter tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@saasbizz' }
      ],
      link: [
        // Preconnect for faster font loading
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // SEO
        { rel: 'canonical', href: 'https://saasbizz.com' },
        // Favicons
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  }
})