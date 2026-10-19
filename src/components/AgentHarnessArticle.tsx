import { VmaArchitecture } from "@/components/VmaArchitecture";

export function AgentHarnessArticle() {
  return (
    <div className="blog-prose">
      <section className="blog-section" aria-labelledby="article-system-design">
        <h2 id="article-system-design">How tasks and updates move</h2>
        <p>
          Votrix Managed Agents (VMA) is a multi-tenant agent harness. The API
          saves accepted input before handing the task to Cloud Tasks. An async
          worker runs the agent and its sandbox tools. The request returns once
          accepted, so your app can start watching results.
        </p>
        <VmaArchitecture />
        <p>
          SSE reads saved events independently of the worker. Temporary text
          previews arrive through PostgreSQL notifications; saved events carry
          the history that a reconnect can replay.
        </p>
      </section>

      <section className="blog-section" aria-labelledby="article-openrouter">
        <h2 id="article-openrouter">OpenRouter integration</h2>
        <p>
          The runtime sends model calls through OpenRouter. Agents choose from
          VMA’s model catalog, so different model providers share the same agent
          execution path.
        </p>
        <p>
          Each Account owns a dedicated OpenRouter inference key, stored
          encrypted. A Session keeps its assigned Account, and each turn uses
          that Account’s key. The platform’s management credential provisions
          and manages those keys; it is not used for inference.
        </p>
        <p>
          Every model request carries the VMA Session ID as OpenRouter’s{" "}
          <code>session_id</code>. This groups calls from the same conversation
          in OpenRouter and connects provider usage to the Session that produced
          it. The runtime also handles model-specific routing, prompt-cache
          settings, and retries for transient failures.
        </p>
      </section>

      <section className="blog-section" aria-labelledby="article-events">
        <h2 id="article-events">Let the page reconnect</h2>
        <p>
          VMA sends progress over SSE (Server-Sent Events). Each saved Session
          event has a sequence number, so the frontend can{" "}
          <a href="https://docs.vma.votrixai.com/docs/streaming">
            resume reading
          </a>{" "}
          from its last event after a disconnect.
        </p>
      </section>

      <section className="blog-section" aria-labelledby="article-spending">
        <h2 id="article-spending">Track whose work costs money</h2>
        <p>
          Usage comes from OpenRouter’s reported USD snapshots. VMA exposes
          Account totals and cumulative spending for a Session, so you can
          attribute model costs to the work that produced them.
        </p>
        <p>
          VMA’s{" "}
          <a href="https://docs.vma.votrixai.com/docs/accounts">Accounts</a>{" "}
          group usage and spending. You can use that information in your own
          plans and billing logic. An Account tracks costs; it does not give a
          user permission to access data. Your application still owns pricing
          and final bills.
        </p>
      </section>
      <p>
        The{" "}
        <a href="https://docs.vma.votrixai.com/docs/api">VMA API docs</a>{" "}
        have the full resource model and examples.
      </p>
    </div>
  );
}
