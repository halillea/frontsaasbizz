/**
 * Fix corrupted founder names that contain 'followers' text
 * Pattern: "FounderMarc Lou233.2k followers on 𝕏" -> name: "Marc Lou", followers: 233200
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const jsonPath = join(__dirname, '../content/startups.json')

const startups = JSON.parse(readFileSync(jsonPath, 'utf-8'))

// Parse follower count (handles "233.2k", "1,067", etc.)
function parseFollowers(str) {
    if (!str) return null
    // Extract number portion (e.g., "233.2k" or "1,067")
    const match = str.match(/([\d,.]+)(k)?/i)
    if (!match) return null

    let num = parseFloat(match[1].replace(/,/g, ''))
    if (match[2] && match[2].toLowerCase() === 'k') {
        num = Math.round(num * 1000)
    }
    return num
}

let fixedCount = 0

const fixed = startups.map(s => {
    if (!s.founder_name || !s.founder_name.toLowerCase().includes('followers')) {
        return s
    }

    // Pattern: "FounderNAME###followers on 𝕏"
    // Remove "Founder" prefix, then split at the number before "followers"
    let name = s.founder_name

    // Remove "Founder" prefix if present
    if (name.startsWith('Founder')) {
        name = name.substring(7)
    }

    // Find where the follower count starts (first digit followed by more digits/k/. before "followers")
    const followersMatch = name.match(/^(.+?)([\d,.]+k?\s*followers.*)/i)

    if (followersMatch) {
        const cleanName = followersMatch[1].trim()
        const followersText = followersMatch[2]
        const followersCount = parseFollowers(followersText)

        console.log(`✓ Fixed: "${s.founder_name}" -> name: "${cleanName}", followers: ${followersCount}`)

        fixedCount++
        return {
            ...s,
            founder_name: cleanName,
            founder_followers: followersCount
        }
    }

    return s
})

// Write back
writeFileSync(jsonPath, JSON.stringify(fixed, null, 2))

console.log(`\n✅ Fixed ${fixedCount} corrupted founder names`)
console.log(`📁 Updated content/startups.json`)
