import { Link, useLocation } from "react-router-dom"; 
import Seo from "../Seo";
 
export default function PageLayout({
  seoTitle,
  description,
  eyebrow,
  heading,
  intro,
  crumbs = [],
  schema,
  type,
  children,
}) {
  const { pathname } = useLocation();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const trail = [{ name: "Home", to: "/" }, ...crumbs];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: origin + (c.to || pathname),
    })),
  };
  const allSchema = [breadcrumbSchema, ...(schema ? [].concat(schema) : [])];

  return (
    <main id="top" className="page-main">
      <Seo title={seoTitle || heading} description={description} schema={allSchema} type={type} />
      <section className="page-banner shop-banner">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{heading}</h1>
          {intro && <p>{intro}</p>}
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            {trail.map((c, i) => (
              <span key={c.name} className="crumb">
                {c.to && i < trail.length - 1 ? <Link to={c.to}>{c.name}</Link> : <span>{c.name}</span>}
                {i < trail.length - 1 && <span>/</span>}
              </span>
            ))}
          </nav>
        </div>
      </section>
      <div className="section-wrap content-page">{children}</div>
    </main>
  );
}