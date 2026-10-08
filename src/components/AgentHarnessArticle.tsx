export function AgentHarnessArticle() {
  return (
    <div className="blog-prose">
      <p className="blog-callout">
        Making an agent work for yourself and exposing it to unrelated customers
        are different engineering problems.
      </p>
      <p>
        For personal use, you want the model to call tools, maintain context, and
        deliver a result. A product must also answer: Who can access each task?
        Whose credentials do its tools receive? How are execution environments
        separated? What happens after a disconnect? Who pays for the work?
      </p>
      <p>
        I built Votrix Managed Agents (VMA). Here, I want to explain the boundaries
        I care about and how its public resource model expresses them. OpenClaw
        alone cannot establish that most harnesses are unsuitable for
        multi-tenancy. The useful question is what your chosen runtime handles and
        what your product still needs to own.
      </p>

      <section className="blog-section" aria-labelledby="article-session-access">
        <h2 id="article-session-access">
          Separate sessions do not establish authorization
        </h2>
        <p>
          Consider a <strong>hypothetical example</strong>. Customer A uploads a
          financial spreadsheet. Customer B uploads brand material. Both ask an
          agent to generate a report. Giving them separate Sessions routes their
          work, but does not establish that B cannot read A’s report.
        </p>
        <p>
          The application backend must check whether the current user may access
          that Session and its attachments. Tools need credentials with the
          appropriate scope. Sharing rules for files, memory, and execution
          environments must be explicit. A request cannot be authorized merely
          because the client supplied a <code>session_id</code>, however long that
          ID is.
        </p>
        <p>
          Likewise, giving two agents separate working directories does not
          establish filesystem isolation. Sandboxing constrains execution,
          application authorization governs access to resources, and credential
          scope limits what tools can do. <strong>These boundaries need to work
          together.</strong>
        </p>
      </section>

      <section className="blog-section" aria-labelledby="article-openclaw-boundary">
        <h2 id="article-openclaw-boundary">
          OpenClaw has an explicit trust boundary
        </h2>
        <p>
          OpenClaw documents one trusted operator domain per Gateway, suitable
          for one operator or a mutually trusting team. A <code>sessionKey</code>
          {" "}selects routing; it is not a tenant authorization token. Unrelated,
          mutually untrusted customers sharing one Gateway fall outside that
          supported boundary.{" "}
          <a href="https://docs.openclaw.ai/gateway/security/trust-model">
            [Trust model]
          </a>
        </p>
        <p>
          Its multi-agent routing supports separate workspaces and session state
          within a Gateway. The documentation also explains that a workspace is a
          default working directory; hard isolation requires sandboxing.
          Organizing multiple agents is distinct from authorizing multiple
          tenants.{" "}
          <a href="https://docs.openclaw.ai/concepts/multi-agent">
            [Multi-agent routing]
          </a>
        </p>
        <p>
          OpenClaw also has experimental <strong>Fleet</strong>: one complete
          Gateway cell per tenant, with separate state, credentials, and
          workspaces. This is worth evaluating when your product hosts independent
          OpenClaw instances. Fleet manages their lifecycle on one host. Shared
          ingress, tenant self-service, billing, and management across machines
          still need an upper control plane. Tenants must trust the host and
          operator.{" "}
          <a href="https://docs.openclaw.ai/gateway/multi-tenant-hosting">
            [Multi-tenant hosting and Fleet]
          </a>
        </p>
      </section>

      <section className="blog-section" aria-labelledby="article-responsibilities">
        <h2 id="article-responsibilities">
          The responsibilities beyond execution
        </h2>
        <p>
          I approach this as a division of responsibilities. The table below
          compares architectural concerns rather than scoring any framework. A
          particular product may cover several layers.
        </p>
        <div className="blog-table-wrap">
          <table>
            <caption>
              Agent execution and multi-tenant product responsibilities: a
              conceptual comparison
            </caption>
            <thead>
              <tr>
                <th scope="col">Concern</th>
                <th scope="col">Execution layer</th>
                <th scope="col">Product or platform contract</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Identity and access</th>
                <td>Route a message to an agent and Session</td>
                <td>
                  Establish which tasks, files, and tools a user may access
                </td>
              </tr>
              <tr>
                <th scope="row">Execution boundaries</th>
                <td>Run tools with workspace and sandbox settings</td>
                <td>
                  Define isolation for credentials, files, networks, and hosts
                </td>
              </tr>
              <tr>
                <th scope="row">Lifecycle</th>
                <td>Start, continue, and stop work</td>
                <td>Pin versions, reclaim resources, and define recovery</td>
              </tr>
              <tr>
                <th scope="row">State and events</th>
                <td>Produce messages, tool results, and status</td>
                <td>Persist history, resume delivery, and handle duplicates</td>
              </tr>
              <tr>
                <th scope="row">Usage and spending</th>
                <td>Generate model and tool costs</td>
                <td>Attribute usage, enforce limits, and define settlement</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Choosing a harness does not automatically resolve the right-hand
          column. With a managed platform, you still need to establish who owns
          each responsibility, which behaviors its public contract defines, and
          what you must implement.
        </p>
      </section>

      <section className="blog-section" aria-labelledby="article-vma-resources">
        <h2 id="article-vma-resources">VMA makes execution choices explicit</h2>
        <p>
          VMA’s top-level access boundary is the <strong>Organization</strong>.
          Requests authenticate with <code>x-api-key</code>; the key selects one
          Organization and can access only its resources. Missing resources and
          resources outside that scope both return <code>404 not_found</code>.
          Keep the key on a trusted backend. This boundary does not define the
          permissions of every end user in your application.{" "}
          <a href="https://docs.vma.votrixai.com/docs/api">[API contract]</a>
        </p>
        <p>
          Within that Organization, an Agent defines models, instructions, tools,
          and Skills. An Environment defines the sandbox setup. A Session
          connects an Agent version, an Environment, an Account, and any attached
          Files or Memory Stores. Agent changes create versions, while existing
          Sessions retain their starting choices.{" "}
          <a href="https://docs.vma.votrixai.com/docs/core-concepts">
            [Resource model]
          </a>
        </p>

        <figure className="blog-diagram">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 760 580"
            role="img"
            aria-labelledby="vma-resource-title vma-resource-description"
          >
            <title id="vma-resource-title">
              Application identity and the VMA resource model
            </title>
            <desc id="vma-resource-description">
              Customers A and B access an application backend. The backend owns
              user authentication, authorization, and resource ownership mapping.
              It uses a server-held API key to access one VMA Organization.
              Inside that Organization, an Agent version, Environment, Account,
              and optional Files or Memory Stores connect to a Session. The
              Session produces ordered events and output Files. Account denotes
              usage and spending attribution only. This diagram does not imply
              separate end-user authorization boundaries within one Organization.
            </desc>
            <defs>
              <marker
                id="vma-resource-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#777" />
              </marker>
            </defs>
            <g fill="#fff" stroke="#c8c8c4" strokeWidth="1">
              <rect x="170" y="24" width="160" height="44" rx="3" />
              <rect x="430" y="24" width="160" height="44" rx="3" />
              <rect x="115" y="106" width="530" height="67" rx="3" />
              <rect
                x="32"
                y="211"
                width="696"
                height="350"
                rx="4"
                stroke="#777"
              />
              <rect x="58" y="282" width="140" height="69" rx="3" />
              <rect x="216" y="282" width="144" height="69" rx="3" />
              <rect x="378" y="282" width="144" height="69" rx="3" />
              <rect x="540" y="282" width="162" height="69" rx="3" />
              <rect
                x="239"
                y="400"
                width="282"
                height="53"
                rx="3"
                stroke="#171717"
              />
              <rect x="239" y="514" width="282" height="42" rx="3" />
            </g>
            <g
              fill="none"
              stroke="#777"
              strokeWidth="1.2"
              markerEnd="url(#vma-resource-arrow)"
            >
              <path d="M250 68 V86 H320 V105" />
              <path d="M510 68 V86 H440 V105" />
              <path d="M380 173 V210" />
              <path d="M128 351 V375 H290 V399" />
              <path d="M288 351 V389 H350 V399" />
              <path d="M450 351 V389 H410 V399" />
              <path d="M621 351 V375 H470 V399" />
              <path d="M380 453 V513" />
            </g>
            <g fill="#171717" textAnchor="middle" fontSize="16">
              <text x="250" y="52">Customer A</text>
              <text x="510" y="52">Customer B</text>
              <text x="380" y="133" fontWeight="600">
                Application backend
              </text>
              <text x="380" y="156" fontSize="13" fill="#656565">
                Authentication · authorization · resource ownership
              </text>
              <text x="380" y="242" fontWeight="600">VMA Organization</text>
              <text x="380" y="265" fontSize="12" fill="#656565">
                Access boundary selected by the server-held API key
              </text>
              <text x="128" y="309">Agent version</text>
              <text x="128" y="331" fontSize="12" fill="#656565">
                Model · tools · Skills
              </text>
              <text x="288" y="309">Environment</text>
              <text x="288" y="331" fontSize="12" fill="#656565">
                Sandbox setup
              </text>
              <text x="450" y="309">Account</text>
              <text x="450" y="331" fontSize="12" fill="#656565">
                Usage / spend
              </text>
              <text x="621" y="309" fontSize="14">Files / Memory Stores</text>
              <text x="621" y="331" fontSize="12" fill="#656565">
                Optional attachments
              </text>
              <text x="380" y="433" fontWeight="600">
                Session: pinned choices
              </text>
              <text x="380" y="541">Events / output Files</text>
            </g>
          </svg>
          <figcaption>
            Conceptual integration: the application authorizes customers before
            accessing VMA resources. A Session connects execution choices and
            produces ordered events and Files. This example uses one
            Organization; it does not give A and B independent authorization
            boundaries. Account represents usage and spending attribution.
          </figcaption>
        </figure>

        <p>
          <strong>Account</strong> is an important distinction. It separates
          usage attribution and spending control. A Session keeps its Account for
          its lifetime; omitting it selects the Organization’s default Account.
          You can organize Accounts by customer or workflow, but{" "}
          <strong>
            two Accounts do not turn one Organization into two authorization
            domains
          </strong>
          . The application still needs to map end users to the Sessions and
          resources they may access.{" "}
          <a href="https://docs.vma.votrixai.com/docs/accounts">[Accounts]</a>
        </p>
        <p>
          Streaming also corresponds to an event history that can be read again.
          VMA Session events carry an increasing <code>seq</code>. Clients can
          page through them over HTTP or follow them through SSE. Store the
          highest processed sequence, reconnect with <code>after_seq</code> or{" "}
          <code>Last-Event-ID</code>, and skip events already processed.{" "}
          <a href="https://docs.vma.votrixai.com/docs/session-events">
            [Session events]
          </a>{" "}
          <a href="https://docs.vma.votrixai.com/docs/streaming">
            [Resuming a stream]
          </a>
        </p>
        <p>
          This helps a frontend continue showing progress. Resumable event
          delivery does not establish exactly-once business effects. Charging a
          customer, sending an email, or writing to an external system still
          requires application-level idempotency and retry design.
        </p>
      </section>

      <section className="blog-section" aria-labelledby="article-system-design">
        <h2 id="article-system-design">A brief look at the system design</h2>
        <p>
          At a high level, VMA separates the HTTP contract from agent execution.
          FastAPI routers resolve the authenticated Organization and pass
          requests to services. Those services validate the selected resources
          and use persistence queries scoped to that Organization for public
          resource access.
        </p>
        <p>
          The runtime uses Deep Agents with LangGraph and a sandbox backend
          connected to the Session’s E2B sandbox. It receives the inputs needed
          for a turn and reports results through the service layer, which writes
          the public event history.
        </p>
        <p>
          That history and execution checkpoints have different jobs. Clients
          read ordered events to display messages, tool activity, and status; the
          graph uses checkpoints to carry execution state between turns. Resuming
          the UI stream is separate from resuming the agent.
        </p>
        <p>
          In configured cloud mode, the service commits the accepted input and
          dispatches a Cloud Task for turn execution. Inline mode executes the
          turn in the API process instead.
        </p>
        <figure className="blog-diagram">
          <div className="blog-callout">
            <p>
              <strong>Request:</strong> FastAPI routers → services →
              Organization-scoped persistence
            </p>
            <p>
              <strong>Turn:</strong> Dispatch → Deep Agents / LangGraph →
              Session sandbox (E2B)
            </p>
            <p>
              <strong>State:</strong> Public events for clients; execution
              checkpoints for the graph
            </p>
          </div>
          <figcaption>
            Conceptual implementation flow. Dispatch uses Cloud Tasks where
            configured.
          </figcaption>
        </figure>
      </section>

      <section className="blog-section" aria-labelledby="article-application-work">
        <h2 id="article-application-work">What the application still owns</h2>
        <p>
          A clear platform boundary makes integration decisions easier to
          inspect. For a VMA integration, I would keep these responsibilities in
          the application architecture:
        </p>
        <ul>
          <li>
            <strong>End-user authentication and authorization.</strong> Derive
            allowed resources from the authenticated identity. Do not trust
            resource IDs supplied by a client.
          </li>
          <li>
            <strong>Tenant and resource mapping.</strong> Decide what may be
            shared and what must remain separate. Establish the relationship
            between Organization scope and your product’s tenants.
          </li>
          <li>
            <strong>Commercial settlement.</strong> Account provides usage and
            spending attribution. Your product defines subscriptions, pricing,
            allowance policies, and final bills.
          </li>
          <li>
            <strong>Operational validation.</strong> Test cross-tenant access,
            credential and file scope, interruption and recovery, and duplicate
            events. Plan monitoring and resource lifecycle management.
          </li>
        </ul>
        <p>
          These are integration concerns that need explicit decisions. This
          article explains public resource contracts and a brief implementation
          outline; it provides no isolation, throughput, or cost benchmarks. A
          deployment still needs validation against its own threat model and
          operating requirements.
        </p>
      </section>

      <section className="blog-section" aria-labelledby="article-selection">
        <h2 id="article-selection">Choose around what you are delivering</h2>
        <p>
          For an assistant used by yourself or a trusted team, focus first on
          tools and usability. For independently hosted OpenClaw instances,
          evaluate Fleet and plan ingress, administration, and operations. For
          an agent API embedded in an existing product, inspect the contracts for
          identity, resources, execution, state, and spending.
        </p>
        <p>
          I want VMA’s resource model to make that last kind of integration easier
          to reason about. Start with the{" "}
          <a href="https://docs.vma.votrixai.com/docs/api">
            VMA API documentation
          </a>
          , inspect the actual interfaces, and decide whether its division of
          responsibilities fits your product.
        </p>
      </section>

      <section className="blog-section" aria-labelledby="article-sources">
        <h2 id="article-sources">Sources</h2>
        <ul>
          <li>
            OpenClaw:{" "}
            <a href="https://docs.openclaw.ai/gateway/security/trust-model">
              Security trust model
            </a>
            ,{" "}
            <a href="https://docs.openclaw.ai/concepts/multi-agent">
              Multi-agent routing
            </a>
            , and{" "}
            <a href="https://docs.openclaw.ai/gateway/multi-tenant-hosting">
              Multi-tenant hosting / Fleet
            </a>
          </li>
          <li>
            VMA:{" "}
            <a href="https://docs.vma.votrixai.com/docs/api">API Reference</a>,{" "}
            <a href="https://docs.vma.votrixai.com/docs/core-concepts">
              Core Concepts
            </a>
            , and{" "}
            <a href="https://docs.vma.votrixai.com/docs/accounts">Accounts</a>
          </li>
          <li>
            VMA:{" "}
            <a href="https://docs.vma.votrixai.com/docs/session-events">
              Session Events
            </a>{" "}
            and{" "}
            <a href="https://docs.vma.votrixai.com/docs/streaming">
              Event Streaming
            </a>
          </li>
        </ul>
        <p>
          Product contract details come from these public documents; the brief
          system design reflects the implementation. The A/B example,
          comparison table, and diagrams explain architecture; they are not
          observed customer cases or benchmarks.
        </p>
      </section>
    </div>
  );
}
