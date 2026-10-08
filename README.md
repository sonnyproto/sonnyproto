# Sonny Proto Links

A minimal personal social index built with Next.js and a monochrome editorial layout.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm run start
```

Social destinations are maintained in `src/data/links.ts`.

## Search indexing

The production URL is `https://sonnyproto.com`, defined in `src/data/site.ts`.
The homepage declares this canonical URL, including when visited with query
parameters. `/sitemap.xml` lists the homepage and `/projects/vma`, and
`/robots.txt` advertises the sitemap. Each future page should declare its own
canonical URL in its page metadata and be added to the sitemap.

Homepage metadata identifies both Sonny Proto and `@sonnyproto`. Open Graph and
Twitter previews use the existing portrait. The homepage also includes
`ProfilePage` / `Person` JSON-LD, with `sameAs` derived from the same five social
links shown on the page. Keep profile claims factual and visible; do not add
unverified jobs, awards, follower counts, or ratings to the structured data.

The professional focus is AI engineering and agent infrastructure. The homepage
links to a VMA project page that explains documented APIs, session resources,
event streaming, and usage attribution. Project details are maintained in
`src/data/projects.ts`; the project page has its own metadata and canonical.
Article drafts and SEO working files under `artifacts/seo/` are local review
artifacts, ignored by Git, and are not public routes.

After deploying these changes:

1. Keep **Always Use HTTPS** enabled in Cloudflare under **SSL/TLS → Edge Certificates**.
   Cloudflare handles the HTTP-to-HTTPS redirect before requests reach the app.
2. Confirm the live homepage has the canonical tag and `/sitemap.xml` returns XML.
   Confirm `http://sonnyproto.com/` redirects to `https://sonnyproto.com/`.
3. Submit `https://sonnyproto.com/sitemap.xml` in Google Search Console.
4. Inspect `https://sonnyproto.com/` in Search Console and request indexing.
   Compare Google's selected canonical after Google recrawls the page; duplicate
   URL variants are expected to remain excluded from the index.
