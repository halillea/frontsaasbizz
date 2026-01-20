/**
 * @fileoverview Utility helper functions for SaaSBizz
 * @module utils/helpers
 */

/**
 * Parse revenue string like "$116,350" into number 116350.
 * If already a number, returns as is. Handles null/undefined gracefully.
 * 
 * @param val - Revenue value (string like "$12,000" or number)
 * @returns Parsed numeric value, or 0 if invalid
 * 
 * @example
 * parseRevenue("$116,350") // 116350
 * parseRevenue(50000)      // 50000
 * parseRevenue(null)       // 0
 */
export function parseRevenue(val: string | number | null | undefined): number {
  if (val === null || val === undefined) return 0
  if (typeof val === 'number') return val
  return Number(val.replace(/[^0-9.-]+/g, ''))
}

/**
 * Convert founder name to URL-safe slug.
 * Removes special characters and replaces spaces with hyphens.
 * 
 * @param name - Founder name (may be null/undefined)
 * @returns URL-safe slug, or empty string if invalid
 * 
 * @example
 * getFounderSlug("John Doe")    // "john-doe"
 * getFounderSlug("Jane O'Brien") // "jane-obrien"
 * getFounderSlug(null)          // ""
 */
export function getFounderSlug(name: string | null | undefined): string {
  if (!name) return ''
  return name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}

/**
 * Check if founder name is valid for display.
 * Filters out null values, the literal "null," string, and very short names.
 * 
 * @param founderName - Founder name to validate
 * @returns True if name is valid for display
 * 
 * @example
 * isValidFounder("John Doe") // true
 * isValidFounder("null,")    // false
 * isValidFounder("")         // false
 */
export function isValidFounder(founderName: string | null | undefined): boolean {
  return Boolean(
    founderName &&
    founderName !== 'null,' &&
    founderName.length > 2
  )
}

/**
 * Format follower count with K suffix for thousands.
 * 
 * @param count - Follower count (number or string)
 * @returns Formatted string (e.g., "1.9k", "150")
 * 
 * @example
 * formatFollowers(1910)   // "1.9k"
 * formatFollowers(150)    // "150"
 * formatFollowers("2500") // "2.5k"
 * formatFollowers(null)   // "0"
 */
export function formatFollowers(count: number | string | null | undefined): string {
  if (!count) return '0'
  const num = Number(String(count).replace(/,/g, ''))
  if (isNaN(num)) return String(count)
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toLocaleString()
}

/**
 * Check if growth value is valid for display.
 * Supports both string format ("20%") and numeric (20).
 * 
 * @param growth - Growth value to validate
 * @returns True if growth is displayable
 * 
 * @example
 * isValidGrowth(20)     // true
 * isValidGrowth("15%")  // true
 * isValidGrowth(null)   // false
 */
export function isValidGrowth(growth: string | number | null | undefined): boolean {
  if (growth === null || growth === undefined) return false
  if (typeof growth === 'number') return true
  return growth.includes('%')
}

/**
 * Format currency number to display string with $ symbol.
 * Handles both numeric and string inputs, adding commas for thousands.
 * 
 * @param val - Currency value (number or string)
 * @returns Formatted currency string (e.g., "$12,000")
 * 
 * @example
 * formatCurrency(12000)     // "$12,000"
 * formatCurrency("12000")   // "$12,000"
 * formatCurrency("$12,000") // "$12,000" (preserved)
 * formatCurrency(null)      // "$0"
 */
export function formatCurrency(val: number | string | null | undefined): string {
  if (val === null || val === undefined) return '$0'
  if (typeof val === 'number') {
    return '$' + val.toLocaleString()
  }
  // Return legacy strings as is if they already have $ symbol
  if (!val.includes('$')) {
    const num = parseRevenue(val)
    return '$' + num.toLocaleString()
  }
  return val
}

/**
 * Format growth value for display with +/- prefix and % suffix.
 * Standardizes both numeric and string growth inputs.
 * 
 * @param growth - Growth value (number like 15 or string like "20%")
 * @returns Formatted growth string (e.g., "+15%", "-5%", "0%")
 * 
 * @example
 * formatGrowth(15)     // "+15%"
 * formatGrowth(-5)     // "-5%"
 * formatGrowth("20%")  // "+20%"
 * formatGrowth(null)   // ""
 */
export function formatGrowth(growth: string | number | null | undefined): string {
  if (growth === null || growth === undefined) return ''

  let num: number

  if (typeof growth === 'number') {
    num = growth
  } else {
    // Parse string like "20%" or "-10%"
    const cleaned = growth.replace('%', '').trim()
    num = parseFloat(cleaned)
    if (isNaN(num)) return ''
  }

  if (num === 0) return '0%'
  if (num > 0) return `+${num}%`
  return `${num}%`
}

/**
 * Truncate text to a maximum length, adding ellipsis if truncated.
 * Trims whitespace before processing.
 * 
 * @param text - Text to truncate (may be null/undefined)
 * @param maxLength - Maximum number of characters before ellipsis
 * @returns Truncated text with "..." suffix, or original if short enough
 * 
 * @example
 * truncateText("Hello World", 8)  // "Hello..."
 * truncateText("Hi", 10)          // "Hi"
 * truncateText(null, 10)          // ""
 */
export function truncateText(text: string | null | undefined, maxLength: number): string {
  if (text === null || text === undefined) return ''

  const trimmed = text.trim()
  if (trimmed === '') return ''

  if (trimmed.length <= maxLength) return trimmed

  return trimmed.slice(0, maxLength) + '...'
}

