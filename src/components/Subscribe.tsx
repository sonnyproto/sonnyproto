import { substackUrl } from "@/data/site";

export function Subscribe() {
  if (!substackUrl) return null;

  return (
    <section className="subscribe" aria-labelledby="subscribe-title">
      <h2 id="subscribe-title">Get new AI video prompts by email</h2>
      <p>I’ll email you when a new prompt is up, with the models behind it. No spam.</p>
      <iframe
        src={`${substackUrl}/embed`}
        title="Subscribe to Sonny Proto on Substack"
        height="150"
        loading="lazy"
      />
    </section>
  );
}
