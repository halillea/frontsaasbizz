---
description: Create a new API endpoint in the server directory
---

## Create New API Endpoint

### Template for POST endpoint:
Create file at `server/api/[endpoint-name].post.ts`:

```typescript
import { promises as fs } from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Validate required fields
    if (!body.required_field) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields'
        })
    }

    const dataPath = path.resolve(process.cwd(), 'content/data.json')

    try {
        // Read existing data
        let data = []
        try {
            const fileData = await fs.readFile(dataPath, 'utf-8')
            data = JSON.parse(fileData)
        } catch (e) {
            data = []
        }

        // Prepare new entry
        const newEntry = {
            id: Date.now(),
            created_at: new Date().toISOString(),
            ...body
        }

        // Save
        data.push(newEntry)
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8')

        return { success: true, message: 'Saved successfully' }
    } catch (error: any) {
        console.error('API Error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to process request'
        })
    }
})
```

### Checklist:
- [ ] Create the JSON data file in `content/` directory
- [ ] Add proper error handling
- [ ] Log important actions for debugging
- [ ] Test with POST request
