import { permanentRedirect } from "next/navigation";

// Stable public discovery URL for search engines, AI agents and shared links.
// The canonical, language-specific page is /en/founder.
export default function FounderAlias() {
  permanentRedirect("/en/founder");
}
