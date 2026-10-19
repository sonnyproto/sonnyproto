import { substackUrl } from "@/data/site";

export function Subscribe() {
  if (!substackUrl) return null;

  return (
    <section className="subscribe" aria-labelledby="subscribe-title">
      <h2 id="subscribe-title">One new AI video prompt every week</h2>
      <p>Free prompts, the models behind them, and what I’m building. No spam.</p>
      <iframe
        src={`${substackUrl}/embed`}
        title="Subscribe to Sonny Proto on Substack"
        height="150"
        loading="lazy"
      />
    </section>
  );
}
