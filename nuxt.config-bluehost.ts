import allStartups from './content/startups.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    server: {
      hmr: {
        port: 24679
      }
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  css: ['~/assets/css/main.css'],

  // 1. Enable SSR for generating static HTML files
  ssr: true,

  nitro: {
    prerender: {
      // 2. We explicitly list routes to avoid the crawler hitting "null," or bad data
      crawlLinks: false,
      routes: [
        '/',
        // Generate a path for every startup using the clean profile URL
        ...allStartups.map(s => `/startup/${s.trustmrr_profile_url}`),
        // Generate a path for every valid founder name
        ...allStartups
          .filter(s => s.founder_name && s.founder_name !== 'null,' && s.founder_name.length > 1)
          .map(s => `/founder/${s.founder_name}`)
      ],
      // 3. Prevent the build from crashing if a single page fails
      failOnError: false
    }
  },

  // 4. Force trailing slashes so Bluehost finds folders easily
  router: {
    options: {
      trailingSlash: true
    }
  },

  // 5. Clean up the output structure for shared hosting
  experimental: {
    payloadExtraction: false
  },

  // 6. Image optimization settings
  image: {
    dir: 'public',
    quality: 80,
    format: ['webp', 'jpg'],
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'SaaSBizz - Verified SaaS Leaderboard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover verified SaaS startups ranked by revenue. Real MRR data from founders building in public.' },
        { property: 'og:site_name', content: 'SaaSBizz' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@saasbizz' }
      ],
      link: [
        { rel: 'canonical', href: 'https://saasbizz.com' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  }
})
