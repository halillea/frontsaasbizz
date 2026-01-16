# Articles Folder

Upload new article files here in JSON format.

## Article File Format

Each article should be a `.json` file with the following structure:

```json
{
  "title": "Your Article Title",
  "slug": "your-article-url-slug",
  "category": "Trends",
  "status": "pending",
  "author": "Author Name",
  "featured_image": "https://example.com/image.jpg",
  "excerpt": "A short summary of the article for previews (200 chars max)",
  "content": "Full article content in Markdown format.\n\n## Heading 2\n\nParagraph text..."
}
```

## Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | The article headline |
| `slug` | Yes | URL-friendly version for /news/[slug] |
| `category` | No | Trends, Growth, News, Guides, Interviews, Tools |
| `status` | No | Set to "pending" for review (default) |
| `author` | No | Author name (default: SaaSBizz Team) |
| `featured_image` | No | URL to header image |
| `excerpt` | Yes | Short preview text |
| `content` | Yes | Full article in Markdown |

## Workflow

1. Upload article JSON file to this folder
2. Admin will see it as "pending" in the Blog tab
3. Admin reviews and changes status to "published"
4. Article appears on /news page

## Markdown Support

Content field supports:
- `## Heading 2` and `### Heading 3`
- `**bold**` and `*italic*`
- `[Link text](url)`
- Bullet and numbered lists
- Code blocks with triple backticks
