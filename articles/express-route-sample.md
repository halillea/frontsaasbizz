To implement a high-performance, SEO-optimized blog route in Express.js, you need to combine **Server-Side Rendering (SSR)**, **Markdown parsing**, and **Metadata injection**.

This sample uses `js-yaml` for parsing frontmatter, `marked` for HTML conversion, and assumes you are using a templating engine like **EJS**.

### 1. Project Setup

First, install the necessary lightweight dependencies:

```bash
npm install express marked js-yaml fs-extra

```

### 2. The Article Structure

Place your articles in a `/content` folder as `.md` files.
**File:** `/content/my-first-post.md`

```markdown
---
title: "Optimizing Node.js for SEO"
description: "Learn how to make your Express server rank higher in 2026."
date: "2026-01-16"
image: "/images/seo-node.webp"
keywords: "Node.js, SEO, Express"
---
# Why SEO Matters...
Article content goes here.

```

---

### 3. The Express.js Route logic

This code reads the file, extracts the metadata for Google, and converts the content for the user.

```javascript
const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const matter = require('js-yaml-front-matter'); // Parses the YAML header
const { marked } = require('marked');          // Converts MD to HTML

const app = express();
app.set('view engine', 'ejs');

// 1. Simple In-Memory Cache for speed
const blogCache = new Map();

app.get('/blog/:slug', async (req, res) => {
    const slug = req.params.slug;
    const filePath = path.join(__dirname, 'content', `${slug}.md`);

    try {
        // Check cache first (Speed optimization)
        if (blogCache.has(slug)) {
            return res.render('post', blogCache.get(slug));
        }

        // 2. Check if file exists to prevent "Soft 404s"
        if (!await fs.pathExists(filePath)) {
            return res.status(404).render('404', { title: 'Post Not Found' });
        }

        // 3. Read and Parse content
        const fileContent = await fs.readFile(filePath, 'utf8');
        const data = matter.loadFront(fileContent);
        
        const postData = {
            title: data.title,
            description: data.description,
            date: data.date,
            image: data.image,
            keywords: data.keywords,
            body: marked.parse(data.__content), // The actual article HTML
            url: `https://yourdomain.com/blog/${slug}`
        };

        // 4. Save to cache and render
        blogCache.set(slug, postData);
        res.render('post', postData);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

```

---

### 4. The EJS Template (`views/post.ejs`)

This is the most critical part for SEO. You must place the variables correctly in the `<head>`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title><%= title %></title>
    <meta name="description" content="<%= description %>">
    <meta name="keywords" content="<%= keywords %>">
    <link rel="canonical" href="<%= url %>">

    <meta property="og:title" content="<%= title %>">
    <meta property="og:description" content="<%= description %>">
    <meta property="og:image" content="<%= image %>">
    <meta property="og:type" content="article">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "<%= title %>",
      "image": "<%= image %>",
      "datePublished": "<%= date %>",
      "description": "<%= description %>",
      "author": { "@type": "Person", "name": "Your Brand Name" }
    }
    </script>
</head>
<body>
    <article>
        <%- body %>
    </article>
</body>
</html>

```

---

### Why this works for your specific use case:

* **No DB Latency:** Reading 900-word files from disk (or cache) is significantly faster than a MongoDB or SQL query, improving your **LCP (Largest Contentful Paint)**.
* **Crawler Friendly:** Because you use `res.render`, the HTML is fully formed when Googlebot hits the page. It doesn't have to wait for JavaScript to execute.
* **Security:** By using `js-yaml-front-matter` and `marked`, you are using standard, audited libraries rather than writing your own regex parsers.
* **Lightweight:** Your 100kb images can be referenced in the markdown and served via `express.static`, keeping the server memory footprint tiny.
