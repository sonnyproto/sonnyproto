"use client";

import posthog from "posthog-js";
import { useState } from "react";

type CopyPromptProps = {
  name: string;
  prompt: string;
};

export function CopyPrompt({ name, prompt }: CopyPromptProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      posthog.capture("prompt_copied", { prompt_name: name });
    } catch {
      // Clipboard can be blocked in some in-app browsers; the text stays selectable.
    }
  }

  return (
    <figure className="copy-prompt">
      <figcaption>
        <span>{name}</span>
        <button type="button" onClick={copy}>{copied ? "Copied" : "Copy prompt"}</button>
      </figcaption>
      <pre tabIndex={0} aria-label={`${name} text`}>{prompt}</pre>
    </figure>
  );
}
