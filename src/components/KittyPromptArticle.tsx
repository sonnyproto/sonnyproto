import { CopyPrompt } from "@/components/CopyPrompt";

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

      <section className="blog-section" aria-labelledby="kitty-tools">
        <h2 id="kitty-tools">What I used</h2>
        <ul>
          {/* TODO: swap in your affiliate links. */}
          <li><a href="https://example.com">TODO tool</a> — what it did in this video</li>
          <li><a href="https://example.com">TODO model</a> — what it did in this video</li>
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
