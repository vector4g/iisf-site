const DEFAULT_LOCAL_AGENT_URL = "http://localhost:3141";
const DEFAULT_PRODUCTION_AGENT_URL = "https://iisf-agent-production.up.railway.app";

type AgentUrlSource = "env" | "default-local" | "default-production";

function isLocalhostUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
  } catch {
    return /localhost|127\.0\.0\.1/i.test(url);
  }
}

export function resolveAgentServerConfig() {
  const isProduction = process.env.NODE_ENV === "production";
  const configuredUrl = process.env.VOLTAGENT_URL?.trim();

  let urlSource: AgentUrlSource = "env";
  if (!configuredUrl) {
    urlSource = isProduction ? "default-production" : "default-local";
  }

  const rawUrl =
    configuredUrl ||
    (isProduction ? DEFAULT_PRODUCTION_AGENT_URL : DEFAULT_LOCAL_AGENT_URL);

  const agentUrl = rawUrl.replace(/\/$/, "");
  const agentSecret = process.env.IISF_AGENT_SECRET || "";
  const usesLocalhost = isLocalhostUrl(agentUrl);

  let configError: string | null = null;
  if (!agentSecret) {
    configError = "IISF_AGENT_SECRET is not configured";
  } else if (isProduction && usesLocalhost) {
    configError =
      "VOLTAGENT_URL points to localhost in production. Set VOLTAGENT_URL to your Railway URL.";
  }

  return {
    agentUrl,
    agentSecret,
    usesLocalhost,
    isProduction,
    urlSource,
    configError,
  };
}

