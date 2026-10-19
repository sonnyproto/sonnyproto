import { CopyPrompt } from "@/components/CopyPrompt";
import { ArticleVideo, ImageGallery, type ArticleVideoProps, type ArticleImageProps } from "@/components/ArticleMedia";

// Add the finished film and references here; assets can be local /media paths or HTTPS URLs.
const media: { film?: ArticleVideoProps; references: readonly ArticleImageProps[] } = {
  references: []
};

// TODO(sonny): replace every placeholder below before publishing.
const prompts = [
  {
    name: "Prompt 1 — TODO name",
    prompt: "TODO: paste the full prompt here."
  },
  {
    name: "Prompt 2 — TODO name",
    prompt: "TODO: paste the full prompt here."
  }
];

export function KittyPromptArticle() {
  return (
    <div className="blog-prose">
      <p className="blog-callout">
        TODO: one or two sentences on what the video shows and what readers will make.
      </p>

      <section className="blog-section" aria-labelledby="kitty-film">
        <h2 id="kitty-film">The film</h2>
        {media.film ? <ArticleVideo {...media.film} /> : (
          <p className="media-placeholder">The finished film will be added here before publication.</p>
        )}
      </section>

      <section className="blog-section" aria-labelledby="kitty-references">
        <h2 id="kitty-references">Reference images</h2>
        {media.references.length ? <ImageGallery images={media.references} /> : (
          <p className="media-placeholder">Character sheets, location references, and selected frames will be added here.</p>
        )}
      </section>

      <section className="blog-section" aria-labelledby="kitty-tools">
        <h2 id="kitty-tools">What I used</h2>
        <ul>
          {/* TODO: swap in your affiliate links. */}
          <li>TODO tool — what it did in this video</li>
          <li>TODO model — what it did in this video</li>
        </ul>
      </section>

      <section className="blog-section" aria-labelledby="kitty-prompts">
        <h2 id="kitty-prompts">The prompts</h2>
        {prompts.map((item) => <CopyPrompt key={item.name} {...item} />)}
      </section>

      <section className="blog-section" aria-labelledby="kitty-tips">
        <h2 id="kitty-tips">Tips</h2>
        <ul>
          <li>TODO: settings, aspect ratio, seeds, what to tweak.</li>
        </ul>
      </section>
    </div>
  );
}
