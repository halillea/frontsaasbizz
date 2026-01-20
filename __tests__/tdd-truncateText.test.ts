/**
 * TDD: truncateText function
 * 
 * RED Phase: Write failing tests first
 */

import { describe, it, expect } from 'vitest'
import { truncateText } from '../utils/helpers'

describe('truncateText (TDD)', () => {
    it('returns empty string for null input', () => {
        expect(truncateText(null, 10)).toBe('')
    })

    it('returns empty string for undefined input', () => {
        expect(truncateText(undefined, 10)).toBe('')
    })

    it('returns original text if shorter than maxLength', () => {
        expect(truncateText('Hello', 10)).toBe('Hello')
    })

    it('truncates text longer than maxLength with ellipsis', () => {
        expect(truncateText('Hello World', 5)).toBe('Hello...')
    })

    it('handles exact length (no truncation needed)', () => {
        expect(truncateText('Hello', 5)).toBe('Hello')
    })

    it('handles maxLength of 0', () => {
        expect(truncateText('Hello', 0)).toBe('...')
    })

    it('handles maxLength of 1', () => {
        expect(truncateText('Hello', 1)).toBe('H...')
    })

    it('trims whitespace before truncating', () => {
        expect(truncateText('  Hello World  ', 5)).toBe('Hello...')
    })

    it('handles empty string input', () => {
        expect(truncateText('', 10)).toBe('')
    })
})
