import { describe, it, expect } from 'vitest'
import {
    parseRevenue,
    getFounderSlug,
    isValidFounder,
    formatFollowers,
    isValidGrowth,
    formatCurrency
} from '../utils/helpers'

describe('parseRevenue', () => {
    it('parses dollar string to number', () => {
        expect(parseRevenue('$116,350')).toBe(116350)
    })

    it('parses plain number string', () => {
        expect(parseRevenue('50000')).toBe(50000)
    })

    it('returns number as-is', () => {
        expect(parseRevenue(12345)).toBe(12345)
    })

    it('handles null', () => {
        expect(parseRevenue(null)).toBe(0)
    })

    it('handles undefined', () => {
        expect(parseRevenue(undefined)).toBe(0)
    })

    it('handles negative numbers', () => {
        expect(parseRevenue('-$5,000')).toBe(-5000)
    })

    it('handles decimal values', () => {
        expect(parseRevenue('$1,234.56')).toBe(1234.56)
    })
})

describe('getFounderSlug', () => {
    it('converts name to lowercase slug', () => {
        expect(getFounderSlug('John Doe')).toBe('john-doe')
    })

    it('handles special characters', () => {
        expect(getFounderSlug("Jane O'Brien")).toBe('jane-obrien')
    })

    it('handles multiple spaces', () => {
        expect(getFounderSlug('John   Doe')).toBe('john-doe')
    })

    it('handles null', () => {
        expect(getFounderSlug(null)).toBe('')
    })

    it('handles undefined', () => {
        expect(getFounderSlug(undefined)).toBe('')
    })

    it('handles empty string', () => {
        expect(getFounderSlug('')).toBe('')
    })

    it('trims whitespace', () => {
        expect(getFounderSlug('  John Doe  ')).toBe('john-doe')
    })
})

describe('isValidFounder', () => {
    it('returns true for valid name', () => {
        expect(isValidFounder('John Doe')).toBe(true)
    })

    it('returns false for null', () => {
        expect(isValidFounder(null)).toBe(false)
    })

    it('returns false for undefined', () => {
        expect(isValidFounder(undefined)).toBe(false)
    })

    it('returns false for "null," string', () => {
        expect(isValidFounder('null,')).toBe(false)
    })

    it('returns false for very short names', () => {
        expect(isValidFounder('AB')).toBe(false)
    })

    it('returns true for 3+ character names', () => {
        expect(isValidFounder('ABC')).toBe(true)
    })

    it('returns false for empty string', () => {
        expect(isValidFounder('')).toBe(false)
    })
})

describe('formatFollowers', () => {
    it('formats thousands with k suffix', () => {
        expect(formatFollowers(1910)).toBe('1.9k')
    })

    it('formats small numbers without suffix', () => {
        expect(formatFollowers(150)).toBe('150')
    })

    it('handles string input', () => {
        expect(formatFollowers('2500')).toBe('2.5k')
    })

    it('handles string with commas', () => {
        expect(formatFollowers('1,000')).toBe('1.0k')
    })

    it('returns 0 for null', () => {
        expect(formatFollowers(null)).toBe('0')
    })

    it('returns 0 for undefined', () => {
        expect(formatFollowers(undefined)).toBe('0')
    })

    it('handles exactly 1000', () => {
        expect(formatFollowers(1000)).toBe('1.0k')
    })

    it('handles 999 (just under threshold)', () => {
        expect(formatFollowers(999)).toBe('999')
    })

    it('returns original string for invalid non-numeric input', () => {
        expect(formatFollowers('not a number')).toBe('not a number')
    })
})

describe('isValidGrowth', () => {
    it('returns true for positive number', () => {
        expect(isValidGrowth(20)).toBe(true)
    })

    it('returns true for negative number', () => {
        expect(isValidGrowth(-5)).toBe(true)
    })

    it('returns true for zero', () => {
        expect(isValidGrowth(0)).toBe(true)
    })

    it('returns true for percentage string', () => {
        expect(isValidGrowth('15%')).toBe(true)
    })

    it('returns false for null', () => {
        expect(isValidGrowth(null)).toBe(false)
    })

    it('returns false for undefined', () => {
        expect(isValidGrowth(undefined)).toBe(false)
    })

    it('returns false for plain string without %', () => {
        expect(isValidGrowth('fifteen')).toBe(false)
    })
})

describe('formatCurrency', () => {
    it('formats number to currency string', () => {
        expect(formatCurrency(12000)).toBe('$12,000')
    })

    it('formats plain number string', () => {
        expect(formatCurrency('12000')).toBe('$12,000')
    })

    it('preserves existing $ formatted strings', () => {
        expect(formatCurrency('$12,000')).toBe('$12,000')
    })

    it('handles null', () => {
        expect(formatCurrency(null)).toBe('$0')
    })

    it('handles undefined', () => {
        expect(formatCurrency(undefined)).toBe('$0')
    })

    it('handles zero', () => {
        expect(formatCurrency(0)).toBe('$0')
    })

    it('formats string without $ symbol', () => {
        expect(formatCurrency('5,000')).toBe('$5,000')
    })

    it('handles large numbers', () => {
        expect(formatCurrency(1000000)).toBe('$1,000,000')
    })
})
