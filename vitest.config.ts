import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: 'happy-dom',
        include: ['**/__tests__/**/*.{test,spec}.{js,ts}'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['utils/**/*.ts', 'composables/useAds.ts'],
            exclude: ['node_modules', '.nuxt', 'dist'],
            thresholds: {
                global: {
                    branches: 70,
                    functions: 70,
                    lines: 70,
                    statements: 70
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
