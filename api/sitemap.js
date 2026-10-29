import { getRequestOrigin } from "../src/utils/requestOrigin.js";

const productSlugs = [
  "winter-cap",
  "jog-pants",
  "hooded-jacket",
  "cotton-socks",
  "printed-tee",
  "cotton-romper",
  "rainbow-stacker",
  "bath-time-set",
  "girls-bath-time-set",
  "boys-bath-time-set",
  "girls-floral-summer-dress",
  "boys-casual-denim-set",
  "girls-sparkly-ballerina-flats",
  "boys-sporty-breathable-sneakers",
];
const blogSlugs = [
  "how-to-dress-baby-for-winter",
  "choosing-the-right-size",
  "playtime-toys-for-first-year",
];

function escapeXml(value) {
  return value.replace(/[<>&'"]/g, (character) => {
    const entities = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export default function handler(req, res) {
  const origin = getRequestOrigin(req);
  if (!origin) {
    res.status(500).send("Unable to determine the site URL.");
    return;
  }

  const paths = [
    "/",
    "/shop",
    "/contact",
    "/faqs",
    "/blog",
    ...productSlugs.map((slug) => `/product/${slug}`),
    ...blogSlugs.map((slug) => `/blog/${slug}`),
  ];
  const urls = paths
    .map((path) => `  <url><loc>${escapeXml(`${origin}${path}`)}</loc></url>`)
    .join("\n");

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.status(200).send(
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
}
