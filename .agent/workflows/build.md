---
description: Generate a static site build for production deployment
---
// turbo-all

## Build for Production

1. Generate static files:
```bash
npm run generate
```

2. Preview the production build locally:
```bash
npm run preview
```

3. Output will be in `.output/public/` directory

### Deployment Notes:
- All pages are pre-rendered as static HTML
- Upload `.output/public/` contents to your hosting
- No Node.js server required for static hosting
- Ensure trailing slashes are configured on your host
