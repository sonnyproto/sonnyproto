import posthog from "posthog-js";
import { posthogHost, posthogKey } from "@/data/site";

// Only production builds report, so local development sends nothing.
if (process.env.NODE_ENV === "production") {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: "history_change",
    person_profiles: "identified_only"
  });
}
