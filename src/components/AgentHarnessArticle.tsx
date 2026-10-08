export function AgentHarnessArticle() {
  return (
    <div className="blog-prose">
      <p>
        When different customers use an AI agent product, their files,
        permissions, and spending need clear boundaries. I built Votrix Managed
        Agents (VMA) as an API for running agents inside a product. These are
        four things I care about when building multi-tenant AI agents.
      </p>

      <section className="blog-section" aria-labelledby="article-api">
        <h2 id="article-api">1. An API your product can call</h2>
        <p>
          Your backend creates a Session, sends a task, and reads the results.
          Each Session keeps its chosen Agent version and execution environment,
          so changing an agent does not silently change existing sessions.
        </p>
        <p>
          OpenClaw also supports multi-tenant hosting through experimental{" "}
          <a href="https://docs.openclaw.ai/gateway/multi-tenant-hosting">
            Fleet
          </a>
          , which runs a complete Gateway for each tenant. That fits hosting
          independent assistants. VMA gives you resources to connect to your own
          application.
        </p>
      </section>

      <section className="blog-section" aria-labelledby="article-access">
        <h2 id="article-access">2. Keep customer access explicit</h2>
        <p>
          Say customer A uploads a private spreadsheet. Customer B should never
          see it just because they know its file or session ID.
        </p>
        <p>
          VMA checks resources against the Organization selected by your API
          key. Keep that key on your backend, which still checks each user’s
          permissions. An Organization is the API access boundary; a Session
          separates work. OpenClaw’s{" "}
          <a href="https://docs.openclaw.ai/gateway/security/trust-model">
            trust model
          </a>{" "}
          likewise requires separate Gateways for customers who do not trust
          each other.
        </p>
      </section>

      <section className="blog-section" aria-labelledby="article-spending">
        <h2 id="article-spending">3. Track whose work costs money</h2>
        <p>
          VMA’s{" "}
          <a href="https://docs.vma.votrixai.com/docs/accounts">Accounts</a>{" "}
          group usage and spending. You can use that information in your own
          plans and billing logic. An Account tracks costs; it does not give a
          user permission to access data. Your application still owns pricing
          and final bills.
        </p>
      </section>

      <section className="blog-section" aria-labelledby="article-events">
        <h2 id="article-events">4. Let the page reconnect</h2>
        <p>
          Closing a tab should not mean losing the task’s history. VMA records
          Session events with sequence numbers. The frontend can{" "}
          <a href="https://docs.vma.votrixai.com/docs/streaming">
            resume reading
          </a>{" "}
          from its last event after a disconnect. This recovers the event
          stream; your application still needs to handle retries of actions
          such as sending an email or charging a card.
        </p>
      </section>

      <p>
        <strong>Under the hood:</strong> FastAPI handles requests, and services
        check which Organization owns each resource. Deep Agents and LangGraph
        run the agent with tools in the Session’s E2B sandbox. Saved events
        feed the frontend.
      </p>
      <p>
        The{" "}
        <a href="https://docs.vma.votrixai.com/docs/api">VMA API docs</a>{" "}
        have the full resource model and examples.
      </p>
    </div>
  );
}
