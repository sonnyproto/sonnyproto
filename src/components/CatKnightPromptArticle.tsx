import { ArticleImage, ImageGallery, type ArticleImageProps } from "@/components/ArticleMedia";
import { CopyPrompt } from "@/components/CopyPrompt";
import { throneSeated } from "@/data/catknight1-prompts";

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

const outdoorReferences: readonly ArticleImageProps[] = [
  {
    src: "/media/catknight1/silver-knight.png",
    alt: "Front view, facial close-up, and profile of the cream kitten knight wearing silver plate armor and a pink bow",
    width: 2720,
    height: 1536,
    caption: "Outdoor A — The silver-armored kitten. Use the face, cream fur, pink bow, small proportions, armor, and sword as the character reference."
  },
  {
    src: "/media/catknight1/foggy-grassland.png",
    alt: "A wide expanse of wind-swept dark green grass fading into dense cool gray fog",
    width: 2048,
    height: 1152,
    caption: "Outdoor B — The foggy grassland. Use the grass texture, wind direction, layered mist, and cool gray-green palette for the outdoor setting."
  }
];

const stoneBridgeReference: ArticleImageProps = {
  src: "/media/catknight1/stone-bridge.png",
  alt: "A colossal weathered stone bridge with tall arches spanning a mist-filled ravine between rocky cliffs",
  width: 2048,
  height: 1152,
  caption: "Outdoor C — The ancient stone bridge. Use its weathered masonry, arches, cliff scale, and mist-filled ravine as the location reference."
};

const questions = [
  {
    question: "Which reference images should I upload?",
    answer: "For the throne prompt, use Images 1–5 in that order. Outdoor A–C are a separate reference pack for the earlier outdoor scenes."
  },
  {
    question: "How do I open the full-size reference images?",
    answer: "Select any reference image to open the original in a new tab. You can then save it from your browser."
  },
  {
    question: "Is the man's scream supposed to be silent?",
    answer: "Yes. The scream is visual only. There is no dialogue or character voice in this scene. Distant fire is the only ambience, and it fades toward silence during the scream."
  },
  {
    question: "Do I need to set the generator to 120fps?",
    answer: "No. The 120fps and 48–60fps figures describe the desired slow-motion look when played back at 24fps. They are creative motion directions, rather than a record of generation settings. Use your generator's own controls for output duration and frame rate; results can vary by model and version."
  }
];

export function CatKnightPromptArticle() {
  return (
    <div className="blog-prose">
      <section className="blog-section" aria-labelledby="outdoor-references">
        <h2 id="outdoor-references">Outdoor references</h2>
        <p>
          These images belong to the earlier outdoor scenes. The silver-armored kitten supplies
          the character identity; the grassland and stone bridge supply the environments. They
          form a separate pack from Images 1–5 in the throne references below.
        </p>
        <ImageGallery images={outdoorReferences} />
        <ArticleImage {...stoneBridgeReference} />
      </section>

      <p className="blog-callout">
        A wounded man faces his former companion at an infernal throne.
        The little knight turns, takes its seat, and gives him no answer.
      </p>
      <p>
        One complete English prompt for the Cat Knight throne scene, with its five numbered
        reference images and an additional outdoor reference pack. Keep each pack with its
        corresponding scene.
      </p>

      <section className="blog-section" aria-labelledby="reference-pack">
        <h2 id="reference-pack">Throne references</h2>
        <p>
          The five images below are numbered to match the throne prompt. Open any image for the
          full-resolution original, then upload the references in that order. They define the
          characters and location; the prompt asks for newly staged footage rather than animated
          reference sheets.
        </p>
        <ImageGallery images={[references.kitten, references.helmet]} />
        <ArticleImage {...references.throne} />
        <ImageGallery images={[references.identity, references.sword]} />
      </section>

      <section className="blog-section" aria-labelledby="throne-prompt">
        <p className="section-label">18 seconds / 16:9 / 7 shots</p>
        <h2 id="throne-prompt">The throne gives no answer</h2>
        <p>
          The man breaks down in a completely inaudible scream. Above him, the kitten turns,
          sits on the throne, and puts on its helmet without a trace of sympathy. Its stillness
          carries the scene.
        </p>
        <p>
          Use Images 1–5 from the pack above. The prompt includes the full shot timeline,
          character and prop continuity, slow-motion directions, sound design, and exclusions.
        </p>
        <CopyPrompt name="Cat Knight I — Infernal throne · full prompt" prompt={throneSeated} />
      </section>

      <section className="blog-section" aria-labelledby="questions">
        <h2 id="questions">Q&amp;A</h2>
        <div className="article-faq">
          {questions.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}
