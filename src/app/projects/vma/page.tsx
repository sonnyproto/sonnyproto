import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { vmaProject } from "@/data/projects";
import { profileImage, siteUrl } from "@/data/site";

const title = "VMA — Multi-Tenant AI Agent Infrastructure | Sonny Proto";
const canonical = `${siteUrl}${vmaProject.path}`;

export const metadata: Metadata = {
  title,
  description: vmaProject.description,
  alternates: { canonical },
  openGraph: {
    title,
    description: vmaProject.description,
    url: canonical,
    siteName: "Sonny Proto",
    type: "website",
    images: [profileImage]
  },
  twitter: {
    card: "summary",
    title,
    description: vmaProject.description,
    creator: "@sonnyproto",
    images: [profileImage.url]
  }
};

const capabilities = [
  {
    title: "Organization-scoped APIs",
    description:
      "An API key selects the Organization it can access. Resource lookups stay within that boundary; missing and out-of-scope resources return the same not-found response.",
    href: "https://docs.vma.votrixai.com/docs/api"
  },
  {
    title: "Sandboxed sessions and versioned agents",
    description:
      "A Session connects an Agent version, an Environment, an Account, and attached Files or Memory Stores. It keeps its selected resources while follow-up work continues.",
    href: "https://docs.vma.votrixai.com/docs/core-concepts"
  },
  {
    title: "Resumable event streams",
    description:
      "Each Session has an ordered event history. Clients can follow progress over SSE, save the latest sequence, and resume after disconnecting.",
    href: "https://docs.vma.votrixai.com/docs/streaming"
  },
  {
    title: "Usage attribution and spending controls",
    description:
      "Accounts group Agent usage and spending. Each Session keeps one Account, so applications can attribute work to a customer, team, or workflow.",
    href: "https://docs.vma.votrixai.com/docs/accounts"
  }
];

export default function VmaProject() {
  return (
    <>
      <Header />
      <main className="project-page" id="top">
        <Link className="back-link" href="/#projects">← All projects</Link>
        <p className="section-label">Votrix Managed Agents / VMA</p>
        <h1>Infrastructure for multi-tenant AI agents.</h1>
        <p className="project-lead">{vmaProject.description}</p>
        <p className="project-byline">Created by Sonny Proto · AI Engineer</p>

        <section className="project-detail" aria-labelledby="resource-model-title">
          <h2 id="resource-model-title">From an agent loop to a product API.</h2>
          <p>
            VMA exposes Agent work through reusable resources: Agents, Environments,
            Sessions, Accounts, Files, and Memory Stores. A product backend can
            define work, start a sandboxed Session, follow its events, and collect
            the resulting files.
          </p>
          <p>
            My engineering focus is the system around the model: API boundaries,
            session lifecycle, durable state, tool execution, and usage controls.
            VMA brings that work together behind one public API contract.
          </p>
        </section>

        <section className="project-capabilities" aria-label="Documented VMA capabilities">
          {capabilities.map((capability) => (
            <article key={capability.title}>
              <h2>{capability.title}</h2>
              <p>{capability.description}</p>
              <a href={capability.href}>Read the public contract <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </section>

        <section className="project-detail" aria-labelledby="integration-title">
          <h2 id="integration-title">Keep the integration boundaries explicit.</h2>
          <p>
            A product still owns its end-user authentication, authorization,
            resource mapping, and customer-facing billing. Accounts attribute
            usage and spending; they do not create an independent authorization
            boundary inside an Organization.
          </p>
          <p>
            These capabilities describe VMA&apos;s public API contract. Performance,
            isolation requirements, and operational behavior should be evaluated
            for the application being built.
          </p>
          <div className="project-actions">
            <a href={vmaProject.docsUrl}>Explore the VMA API <span aria-hidden="true">↗</span></a>
            <Link href="/">About Sonny Proto <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </main>
      <footer className="project-footer">
        <p>Sonny Proto / @sonnyproto</p>
        <Link href="/">Home ↑</Link>
      </footer>
    </>
  );
}
