import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: 'happy-dom',
        pool: 'threads', // Use threads instead of forks to avoid Windows timeout issues
        include: ['**/__tests__/**/*.{test,spec}.{js,ts}'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['utils/**/*.ts', 'composables/useAds.ts'],
            exclude: ['node_modules', '.nuxt', 'dist'],
            thresholds: {
                global: {
                    branches: 25,
                    functions: 15,
                    lines: 25,
                    statements: 25
                }
            }
        }
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, '.'),
            '@': resolve(__dirname, '.')
        }
    }
})
