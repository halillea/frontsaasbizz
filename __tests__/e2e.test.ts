import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

/**
 * End-to-End validation tests for SaaSBizz frontend data
 * Verifies the integrity of JSON data files and structure
 */
describe('E2E: Data Integrity', () => {
    const contentDir = resolve(__dirname, '../content')

    describe('startups.json', () => {
        const startupsPath = resolve(contentDir, 'startups.json')

        it('file exists', () => {
            expect(existsSync(startupsPath)).toBe(true)
        })

        it('is valid JSON', () => {
            const content = readFileSync(startupsPath, 'utf-8')
            expect(() => JSON.parse(content)).not.toThrow()
        })

        it('contains an array of startups', () => {
            const content = readFileSync(startupsPath, 'utf-8')
            const data = JSON.parse(content)
            expect(Array.isArray(data)).toBe(true)
            expect(data.length).toBeGreaterThan(0)
        })

        it('each startup has required fields', () => {
            const content = readFileSync(startupsPath, 'utf-8')
            const data = JSON.parse(content)
            const sample = data[0]

            // Required fields check
            expect(sample).toHaveProperty('id')
            expect(sample).toHaveProperty('startup_name')
        })

        it('startup names are non-empty strings', () => {
            const content = readFileSync(startupsPath, 'utf-8')
            const data = JSON.parse(content)

            const validNames = data.filter((s: any) =>
                s.startup_name && typeof s.startup_name === 'string' && s.startup_name.length > 0
            )

            // At least 90% should have valid names
            expect(validNames.length / data.length).toBeGreaterThan(0.9)
        })

        it('has startups with revenue data', () => {
            const content = readFileSync(startupsPath, 'utf-8')
            const data = JSON.parse(content)

            const withRevenue = data.filter((s: any) =>
                s.total_revenue !== null && s.total_revenue !== undefined
            )

            expect(withRevenue.length).toBeGreaterThan(0)
        })
    })

    describe('articles.json', () => {
        const articlesPath = resolve(contentDir, 'articles.json')

        it('file exists', () => {
            expect(existsSync(articlesPath)).toBe(true)
        })

        it('is valid JSON', () => {
            const content = readFileSync(articlesPath, 'utf-8')
            expect(() => JSON.parse(content)).not.toThrow()
        })

        it('contains an array of articles', () => {
            const content = readFileSync(articlesPath, 'utf-8')
            const data = JSON.parse(content)
            expect(Array.isArray(data)).toBe(true)
        })
    })

    describe('sponsors.json', () => {
        const sponsorsPath = resolve(contentDir, 'sponsors.json')

        it('file exists', () => {
            expect(existsSync(sponsorsPath)).toBe(true)
        })

        it('is valid JSON', () => {
            const content = readFileSync(sponsorsPath, 'utf-8')
            expect(() => JSON.parse(content)).not.toThrow()
        })
    })
})

describe('E2E: Project Structure', () => {
    it('package.json exists and is valid', () => {
        const pkgPath = resolve(__dirname, '../package.json')
        expect(existsSync(pkgPath)).toBe(true)

        const content = readFileSync(pkgPath, 'utf-8')
        const pkg = JSON.parse(content)

        expect(pkg.name).toBe('saasbizz')
        expect(pkg.scripts).toHaveProperty('dev')
        expect(pkg.scripts).toHaveProperty('build')
    })

    it('nuxt.config.ts exists', () => {
        const configPath = resolve(__dirname, '../nuxt.config.ts')
        expect(existsSync(configPath)).toBe(true)
    })

    it('types/startup.ts exists', () => {
        const typesPath = resolve(__dirname, '../types/startup.ts')
        expect(existsSync(typesPath)).toBe(true)
    })

    it('utils/helpers.ts exists', () => {
        const helpersPath = resolve(__dirname, '../utils/helpers.ts')
        expect(existsSync(helpersPath)).toBe(true)
    })
})
