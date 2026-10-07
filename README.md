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
parameters. `/sitemap.xml` lists only this URL, and `/robots.txt` advertises the
sitemap. Each future page should declare its own canonical URL in its page
metadata and be added to the sitemap.

After deploying these changes:

1. Enable **Always Use HTTPS** in Cloudflare under **SSL/TLS → Edge Certificates**.
   HTTP currently serves the homepage rather than redirecting to HTTPS.
2. Confirm the live homepage has the canonical tag and `/sitemap.xml` returns XML.
   Confirm `http://sonnyproto.com/` redirects to `https://sonnyproto.com/`.
3. Submit `https://sonnyproto.com/sitemap.xml` in Google Search Console.
4. Inspect `https://sonnyproto.com/` in Search Console and request indexing.
   Compare Google's selected canonical after Google recrawls the page; duplicate
   URL variants are expected to remain excluded from the index.
