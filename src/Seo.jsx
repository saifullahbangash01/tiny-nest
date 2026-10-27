import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BRAND = "TinyNest";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

 
export default function Seo({ title, description, schema, image, type = "website", noindex = false }) {
  const { pathname } = useLocation();
  const schemaText = schema ? JSON.stringify(schema) : "";

  useEffect(() => {
    const url = window.location.origin + pathname;
    const fullTitle = `${title} | ${BRAND}`;
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex,nofollow" : "index,follow");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:site_name", BRAND);
    if (image) setMeta("property", "og:image", image);
    setMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;

    let script = document.getElementById("page-jsonld");
    if (schemaText) {
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "page-jsonld";
        document.head.appendChild(script);
      }
      script.textContent = schemaText;
    } else if (script) script.remove();

    return () => document.getElementById("page-jsonld")?.remove();
  }, [title, description, image, type, noindex, pathname, schemaText]);

  return null;
}