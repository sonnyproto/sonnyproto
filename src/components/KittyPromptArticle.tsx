import { ArticleImage, ImageGallery, type ArticleImageProps } from "@/components/ArticleMedia";
import { CopyPrompt } from "@/components/CopyPrompt";
import {
  bridgeOriginal,
  bridgeRevised,
  bridgeShotRevision,
  bridgeTimingPatch,
  throneEnglishRewrite,
  throneOriginal,
  throneSeated
} from "@/data/catknight1-prompts";

const references = {
  kitten: {
    src: "/media/catknight1/dark-knight.png",
    alt: "Three views of a cream kitten with a pink bow, black armor, a red cape, and a battle axe",
    width: 2048,
    height: 1156,
    caption: "Image 1 — The dark knight before the helmet. Preserve the kitten's identity, bow, armor, cape, and axe."
  },
  helmet: {
    src: "/media/catknight1/helmeted-knight.png",
    alt: "The same armored kitten wearing a curved-horn black helmet with a red crest and visible eyes and muzzle",
    width: 2048,
    height: 1156,
    caption: "Image 2 — The completed helmeted knight. Keep the eyes and muzzle visible, with the bow on the same side."
  },
  throne: {
    src: "/media/catknight1/infernal-throne.png",
    alt: "An enormous curved black throne above broad stone steps, surrounded by orange-red infernal flames",
    width: 2048,
    height: 1152,
    caption: "Image 3 — The infernal throne. The architecture sets the scale; the kitten stays small."
  },
  identity: {
    src: "/media/catknight1/hero-identity.png",
    alt: "Identity reference of the young East Asian male protagonist with short black hair and a dark shirt",
    width: 1672,
    height: 941,
    caption: "Image 4 — The protagonist's facial identity. Keep the same face, hair, proportions, and natural skin texture."
  },
  sword: {
    src: "/media/catknight1/hero-greatsword.png",
    alt: "Side-profile reference of the protagonist in dark clothing holding an enormous steel greatsword",
    width: 760,
    height: 459,
    caption: "Image 5 — Profile and greatsword reference. In the throne scene, the left arm is missing and only the right hand holds the sword."
  }
} satisfies Record<string, ArticleImageProps>;

const revisions = [
  {
    title: "Bridge — original six-shot prompt",
    description: "The first 10-second version gives the crying and emotional turn more screen time. The five-shot version above replaces its shot list and adds the timing emphasis below.",
    name: "Bridge — original · 10s / 6 shots",
    prompt: bridgeOriginal
  },
  {
    title: "Bridge — replacement shot list",
    description: "The complete five-shot replacement. This is a patch for the original prompt; it is already incorporated into the recommended version above.",
    name: "Bridge — five-shot timing revision",
    prompt: bridgeShotRevision
  },
  {
    title: "Bridge — additional timing emphasis",
    description: "The final timing instruction: keep the emotional turn brief and give the shadow transformation more time. Also included in the recommended version.",
    name: "Bridge — timing emphasis",
    prompt: bridgeTimingPatch
  },
  {
    title: "Throne — original 14-second confrontation",
    description: "An earlier six-shot version with audible crying and roaring. The kitten begins in front of the throne. Use it as a separate alternate; its sound, staging, and helmet instructions differ from the seated revision.",
    name: "Throne — original · 14s / 6 shots",
    prompt: throneOriginal
  },
  {
    title: "Throne — alternate English rewrite",
    description: "The original English rewrite adds a close-up of the remaining hand and ends with the kitten standing on the throne seat. It does not include the sitting action. Use the main prompt above for the seated ending.",
    name: "Throne — standing alternate · 18s / 7 shots",
    prompt: throneEnglishRewrite
  }
];

export function KittyPromptArticle() {
  return (
    <div className="blog-prose">
      <p className="blog-callout">
        A little knight loses a companion at a broken bridge. Its grief becomes darkness.
        At an infernal throne, the companion returns — and finds a kitten that no longer answers.
      </p>
      <p>
        These are the complete English prompts and reference images for two Cat Knight scenes.
        Start with the two full prompts below. Earlier versions and timing revisions are included
        at the end, each with its own copy button.
      </p>

      <section className="blog-section" aria-labelledby="reference-pack">
        <h2 id="reference-pack">The reference pack</h2>
        <p>
          The five images below are numbered to match the throne prompt. Open any image for the
          full-resolution original, then upload the references in that order. They define the
          characters and location; the prompt asks for newly staged footage rather than animated
          reference sheets.
        </p>
        <ImageGallery images={[references.kitten, references.helmet]} />
        <ArticleImage {...references.throne} />
        <ImageGallery images={[references.identity, references.sword]} />
        <p className="prompt-note">
          The bridge scene uses a separate two-image setup: a silver-armored kitten identity
          reference and a kneeling-at-the-broken-bridge reference. Those two images are not part
          of this five-image pack. Supply your own matching bridge references for that scene.
        </p>
      </section>

      <section className="blog-section" aria-labelledby="bridge-prompt">
        <p className="section-label">Scene 01 / 10 seconds / 5 shots</p>
        <h2 id="bridge-prompt">Grief becomes a shadow</h2>
        <p>
          The kitten stays kneeling. Crying turns into anger within one three-second shot,
          leaving the rest of the sequence for its own shadow to stretch, darken, and rise as
          mist. The darkness must visibly come from the kitten.
        </p>
        <p>
          This full version combines the original character, environment, sound, and visual
          directions with the revised five-shot timeline and final timing instructions.
        </p>
        <CopyPrompt name="Scene 1 — Broken bridge · full prompt" prompt={bridgeRevised} />
      </section>

      <section className="blog-section" aria-labelledby="throne-prompt">
        <p className="section-label">Scene 02 / 18 seconds / 7 shots</p>
        <h2 id="throne-prompt">The throne gives no answer</h2>
        <p>
          The man breaks down in a completely inaudible scream. Above him, the kitten turns,
          sits on the throne, and puts on its helmet without a trace of sympathy. Its stillness
          carries the scene.
        </p>
        <p>
          Use Images 1–5 from the pack above. This is the full English translation of the seated
          revision, including the shot timings, prop continuity, slow-motion directions, sound
          withdrawal, and negative prompt.
        </p>
        <CopyPrompt name="Scene 2 — Infernal throne · seated / full prompt" prompt={throneSeated} />
      </section>

      <section className="blog-section" aria-labelledby="production-notes">
        <h2 id="production-notes">What to keep consistent</h2>
        <ul>
          <li><strong>Frame and time.</strong> Both prompts request 16:9, hard cuts, and a 24fps final look. The bridge runs 10 seconds; the throne runs 18 seconds.</li>
          <li><strong>Scale.</strong> In the throne scene, the man is about 175 cm tall and the kitten about 50 cm. The seat and backrest provide the scale cues.</li>
          <li><strong>The missing arm.</strong> Keep the left upper arm missing, the right hand on the greatsword, and the sword tip on the floor. Image 5 supplies the profile and weapon design.</li>
          <li><strong>The sitting action.</strong> Head, shoulders, weight shift, then knees. Finish sitting before the helmet action. The kitten stays seated through the final wide shot.</li>
          <li><strong>The helmet.</strong> Both paws lift a physical prop. Keep the eyes and muzzle exposed, the bow on one side, and the axe resting nearby during the action.</li>
          <li><strong>Slow motion.</strong> The throne prompt asks for the look of 120fps capture played at 24fps for the scream, and 48–60fps played at 24fps for the kitten. These describe the desired motion; they are not a record of verified generation settings.</li>
          <li><strong>Sound.</strong> The bridge includes crying and restrained ambience. The seated throne scene has no character voices or music; the fire nearly disappears during the scream.</li>
        </ul>
        <p>
          Use the reference-image inputs in your video generator and keep their numbering aligned
          with the prompt. Duration and output controls vary by model; the prompts describe the
          intended sequence rather than a guaranteed set of interface settings.
        </p>
      </section>

      <section className="blog-section" aria-labelledby="prompt-history">
        <h2 id="prompt-history">Earlier versions &amp; revisions</h2>
        <p>
          All earlier prompt blocks are preserved below in English. The replacement shot list
          and timing emphasis are patches; the other entries are complete alternate prompts.
        </p>
        <div className="prompt-history">
          {revisions.map(({ title, description, name, prompt }) => (
            <details key={name}>
              <summary>{title}</summary>
              <p>{description}</p>
              <CopyPrompt name={name} prompt={prompt} />
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
