import { describe, it, expect } from 'vitest'

/**
 * TDD Example: formatGrowth function
 * Following Red-Green-Refactor cycle
 */

// Import will fail initially - that's expected in TDD
import { formatGrowth } from '../utils/helpers'

describe('formatGrowth (TDD)', () => {
    describe('RED PHASE - Initial failing tests', () => {
        it('formats positive growth with + prefix', () => {
            expect(formatGrowth(15)).toBe('+15%')
        })

        it('formats negative growth with - prefix', () => {
            expect(formatGrowth(-5)).toBe('-5%')
        })

        it('formats zero growth', () => {
            expect(formatGrowth(0)).toBe('0%')
        })

        it('handles string percentage input', () => {
            expect(formatGrowth('20%')).toBe('+20%')
        })

        it('handles string with negative', () => {
            expect(formatGrowth('-10%')).toBe('-10%')
        })

        it('returns empty string for null', () => {
            expect(formatGrowth(null)).toBe('')
        })

        it('returns empty string for undefined', () => {
            expect(formatGrowth(undefined)).toBe('')
        })

        it('handles decimal values', () => {
            expect(formatGrowth(15.5)).toBe('+15.5%')
        })
    })
})
