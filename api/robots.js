import { getRequestOrigin } from "../src/utils/requestOrigin.js";

export default function handler(req, res) {
  const origin = getRequestOrigin(req);
  if (!origin) {
    res.status(500).send("Unable to determine the site URL.");
    return;
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.status(200).send(`User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`);
}
