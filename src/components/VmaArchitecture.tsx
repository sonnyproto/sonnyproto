type DiagramNode = {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  detail: string;
  note: string;
};

const labels = {
  app: { title: "Your app", detail: "Backend + UI", note: "Server-held API key" },
  api: { title: "VMA API", detail: "Organization check", note: "Save accepted input" },
  queue: { title: "Cloud Tasks", detail: "Async dispatch", note: "Queue a turn" },
  worker: { title: "Async worker", detail: "Deep Agents / LangGraph", note: "Tools → E2B sandbox" },
  events: { title: "Event log", detail: "PostgreSQL · seq", note: "Saved, replayable events" },
  previews: { title: "Live previews", detail: "LISTEN / NOTIFY", note: "Temporary text deltas" },
  stream: { title: "SSE endpoint", detail: "History + live updates", note: "Resume from last seq" }
};

function Node({ x, y, width, height, title, detail, note }: DiagramNode) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="2" />
      <text className="vma-hld-node-title" x={x + width / 2} y={y + 29}>
        {title}
      </text>
      <text className="vma-hld-node-detail" x={x + width / 2} y={y + 50}>
        {detail}
      </text>
      <text className="vma-hld-node-detail" x={x + width / 2} y={y + 68}>
        {note}
      </text>
    </g>
  );
}

function Diagram({ mobile }: { mobile: boolean }) {
  const id = mobile ? "vma-hld-mobile" : "vma-hld-desktop";
  const nodes = mobile
    ? [
        { ...labels.app, x: 85, y: 20, width: 190, height: 82 },
        { ...labels.api, x: 85, y: 132, width: 190, height: 82 },
        { ...labels.queue, x: 85, y: 244, width: 190, height: 82 },
        { ...labels.worker, x: 85, y: 356, width: 190, height: 82 },
        { ...labels.events, x: 12, y: 486, width: 156, height: 88 },
        { ...labels.previews, x: 192, y: 486, width: 156, height: 88 },
        { ...labels.stream, x: 85, y: 648, width: 190, height: 88 }
      ]
    : [
        { ...labels.app, x: 16, y: 32, width: 156, height: 88 },
        { ...labels.api, x: 207, y: 32, width: 156, height: 88 },
        { ...labels.queue, x: 398, y: 32, width: 156, height: 88 },
        { ...labels.worker, x: 589, y: 32, width: 156, height: 88 },
        { ...labels.events, x: 398, y: 235, width: 156, height: 88 },
        { ...labels.previews, x: 589, y: 235, width: 156, height: 88 },
        { ...labels.stream, x: 207, y: 235, width: 156, height: 88 }
      ];
  const paths = mobile
    ? [
        "M180 102V132",
        "M180 214V244",
        "M180 326V356",
        "M150 438V460H90V486",
        "M210 438V460H270V486",
        "M90 574V611H150V648",
        "M270 574V611H210V648",
        "M85 692H4V61H85"
      ]
    : [
        "M172 76H207",
        "M363 76H398",
        "M554 76H589",
        "M640 120V175H476V235",
        "M667 120V235",
        "M398 279H363",
        "M667 323V365H285V323",
        "M207 279H94V120"
      ];

  return (
    <svg
      className={`vma-hld-svg ${mobile ? "vma-hld-mobile" : "vma-hld-desktop"}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={mobile ? "0 0 360 760" : "0 0 760 390"}
      role="img"
      aria-labelledby={`${id}-title ${id}-description`}
    >
      <title id={`${id}-title`}>VMA asynchronous execution and SSE streaming</title>
      <desc id={`${id}-description`}>
        The application submits work to the VMA API, which checks Organization
        access and saves accepted input before dispatching through Cloud Tasks.
        An asynchronous worker runs Deep Agents and LangGraph with an E2B
        sandbox. The worker saves sequenced events to PostgreSQL and publishes
        temporary text previews through LISTEN and NOTIFY. A separate SSE
        endpoint combines event history and live previews for the application.
        Reconnection resumes from the last saved event sequence.
      </desc>
      <defs>
        <marker
          id={`${id}-arrow`}
          viewBox="0 0 8 8"
          refX="8"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0 0L8 4L0 8Z" fill="currentColor" />
        </marker>
      </defs>
      <g className="vma-hld-connections" markerEnd={`url(#${id}-arrow)`}>
        {paths.map((path) => <path key={path} d={path} />)}
      </g>
      {nodes.map((node) => <Node key={node.title} {...node} />)}
      {mobile ? (
        <text className="vma-hld-edge-label" transform="translate(20 306) rotate(-90)">
          SSE · resume from last seq
        </text>
      ) : (
        <g className="vma-hld-edge-label">
          <text x="140" y="203">SSE</text>
          <text x="540" y="161">Save events</text>
          <text x="480" y="352">Live previews</text>
        </g>
      )}
    </svg>
  );
}

export function VmaArchitecture() {
  return (
    <figure className="vma-hld">
      <Diagram mobile={false} />
      <Diagram mobile />
      <figcaption>
        Cloud dispatch mode. Saved events can be replayed; live previews are
        temporary.
      </figcaption>
    </figure>
  );
}
