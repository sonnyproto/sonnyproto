# Sonny Proto

Personal site built with Next.js. Run `npm run dev`, `npm run typecheck`, and `npm run build` locally.

## Blogs

- Coding Blog: `/blog` — posts with `section: "coding"`.
- Video Blog: `/video-blog` — posts with `section: "video"`.
- KNIGHT: `/video-blog/knight` — the overview for all knight stories, titled **KNIGHT** with **Films & prompts** below it. Video posts with `series: "knight"` appear newest first. The previous `/video-blog/cats` and `/video-blog/catknight` entries redirect here permanently and preserve incoming query parameters.
- Cat Knight I: `/video-blog/catknight1`. The earlier article URL has been removed, without a redirect.

Article metadata lives in `src/data/posts.ts`. Each entry points to a React content component. Drafts appear only in local development and are excluded from production pages and the sitemap. Fill in the content and assets, update the publication date, and set `draft: false` when ready to publish.

The published Cat Knight article is `src/components/CatKnightPromptArticle.tsx`. Its one selected complete English prompt lives in `src/data/catknight1-prompts.ts`; throne and outdoor reference images live in `public/media/catknight1/`. The throne prompt uses its five numbered images; the outdoor pack is a separate set. Unpublished revisions are stored outside this public repository. Earlier Git commits may still contain previously published versions. Keep the existing `CopyPrompt` component: it includes the copy interaction and PostHog event.

### Rich article content

Write normal JSX paragraphs, headings, links and lists inside `.blog-prose`. Add section IDs to the post's `contents` array to populate its table of contents. Media components can be mixed with text and prompts in any order:

```tsx
import { ArticleImage, ImageGallery, ArticleVideo, ArticleAudio } from "@/components/ArticleMedia";
import { CopyPrompt } from "@/components/CopyPrompt";

<ArticleImage src="/media/catknight1/character.png" alt="Cat knight character sheet"
  width={1600} height={900} caption="Character reference" />

<ImageGallery images={[
  { src: "/media/catknight1/bridge.png", alt: "Broken stone bridge", width: 1600, height: 900 },
  { src: "/media/catknight1/throne.png", alt: "Infernal throne", width: 1600, height: 900 }
]} />

<ArticleVideo title="Cat Knight I" src="/media/catknight1/film.mp4"
  poster="/media/catknight1/poster.jpg" caption="The finished film" />

// Alternatively, use youtubeId="YOUR_VIDEO_ID" instead of src and poster.
// Set orientation="portrait" for a vertical video.
<ArticleAudio src="/media/catknight1/reference.wav" title="Voice reference" />
<CopyPrompt name="Scene 1" prompt="Paste the complete prompt here." />
```

Put local files under `public/media/`; reference their URLs with `/media/` (without `public`). HTTPS asset URLs also work; remote images are displayed directly. Images open at full size in a new tab. Videos and audio require an explicit play action and do not preload the media. An optional `cover` image on a post appears on its Video Blog card.

### Instagram handoff

- Comment keyword to configure in Business Suite: **KNIGHT**.
- Video call to action: **Comment KNIGHT**.
- Campaign: `knight` for the overview entry point.
- Link for the automatic reply:
  `https://sonnyproto.com/video-blog/knight?utm_source=instagram&utm_medium=social&utm_campaign=knight`
- Individual article: `https://sonnyproto.com/video-blog/catknight1`.
- Collection card clicks emit `series_post_clicked` with `series` and `post_slug` in PostHog. This measures the selected article, not which Instagram post generated the visit.

Pushing to `main` triggers the existing Cloudflare deployment. A draft article still returns 404 in production.
