export function getRequestOrigin(req) {
  const forwardedHost = req.headers["x-forwarded-host"];
  const hostHeader = Array.isArray(forwardedHost)
    ? forwardedHost[0]
    : forwardedHost;
  const host = (hostHeader || req.headers.host || "").split(",")[0].trim();

  if (!/^[a-z0-9.-]+(?::\d+)?$/i.test(host)) return null;

  const forwardedProto = req.headers["x-forwarded-proto"];
  const protocol = forwardedProto === "http" ? "http" : "https";
  return `${protocol}://${host}`;
}
