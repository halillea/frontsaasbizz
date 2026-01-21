/**
 * Find founders with corrupted names (containing 'followers')
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const jsonPath = join(__dirname, '../content/startups.json')

const startups = JSON.parse(readFileSync(jsonPath, 'utf-8'))

// Find all founders with 'followers' in their name
const errors = startups.filter(s =>
    s.founder_name && s.founder_name.toLowerCase().includes('followers')
)

console.log(`\n❌ Found ${errors.length} founders with corrupted names:\n`)
console.log('| ID | Startup | Corrupted Founder Name | Followers Field |')
console.log('|---|---|---|---|')

errors.forEach(e => {
    console.log(`| ${e.id} | ${e.startup_name} | ${e.founder_name} | ${e.founder_followers} |`)
})

// Write to file
const output = errors.map(e =>
    `ID: ${e.id}\nStartup: ${e.startup_name}\nCorrupted Name: ${e.founder_name}\nFollowers Field: ${e.founder_followers}\n---`
).join('\n')

writeFileSync(join(__dirname, '../founders-error.txt'), output)
console.log(`\n✅ Saved to founders-error.txt`)
