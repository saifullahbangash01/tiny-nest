import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, Link2, MessageCircle, Share2, User } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { posts } from "../data/posts";

const fmt = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

function Body({ items }) {
  return items.map((item, i) => {
    if (Array.isArray(item))
      return (
        <ul key={i}>
          {item.map((li) => <li key={li}>{li}</li>)}
        </ul>
      );
    if (item.startsWith("## ")) return <h2 key={i}>{item.slice(3)}</h2>;
    return <p key={i}>{item}</p>;
  });
}

export default function BlogDetails() {
  const { slug } = useParams();
  const index = posts.findIndex((p) => p.slug === slug);
  const post = posts[index];
  const articleRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Padhne ka progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const total = height - window.innerHeight * 0.6;
      setProgress(Math.min(100, Math.max(0, (-top / total) * 100)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${post.slug}` : "";
  const prev = posts[index - 1];
  const next = posts[index + 1];
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const author = post.author || "TinyNest Team";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const share = [
    { label: "Facebook", icon: <Share2 size={16} />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: "X (Twitter)", icon: <Share2 size={16} />, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}` },
    { label: "WhatsApp", icon: <MessageCircle size={16} />, href: `https://wa.me/?text=${encodeURIComponent(`${post.title}${url}`)}` },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    author: { "@type": "Organization", name: author },
    publisher: { "@type": "Organization", name: "TinyNest" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <PageLayout
      seoTitle={post.title}
      description={post.excerpt}
      eyebrow={(post.category || "Blog").toUpperCase()}
      heading={post.title}
      crumbs={[{ name: "Blog", to: "/blog" }, { name: post.title }]}
      schema={schema}
      type="article"
    >
      <div className="read-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <div className="post-layout">
        <article className="post" ref={articleRef}>
          <div className="post-meta">
            <span><User size={14} /> {author}</span>
            <time dateTime={post.date}>{fmt(post.date)}</time>
            <span><Clock size={14} /> {post.readTime}</span>
          </div>

          <div className={`post-hero tone-${index % 3}`} aria-hidden="true">
            <span>{post.title.charAt(0)}</span>
          </div>

          <p className="post-lead">{post.excerpt}</p>
          <div className="post-body">
            <Body items={post.body} />
          </div>

          <div className="share-row">
            <b>Share this post</b>
            <div>
              {share.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${s.label}`}>
                  {s.icon}
                </a>
              ))}
              <button type="button" onClick={copyLink} aria-label="Copy link">
                {copied ? <Check size={16} /> : <Link2 size={16} />}
              </button>
            </div>
            {copied && <small role="status">Link copied!</small>}
          </div>

          <nav className="post-nav" aria-label="More posts">
            {prev ? (
              <Link to={`/blog/${prev.slug}`} className="post-nav-prev">
                <small><ArrowLeft size={12} /> Previous</small>
                <span>{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/blog/${next.slug}`} className="post-nav-next">
                <small>Next <ArrowRight size={12} /></small>
                <span>{next.title}</span>
              </Link>
            ) : <span />}
          </nav>
        </article>

        <aside className="post-side" aria-label="Sidebar">
          <div className="post-cta">
            <h2>Shop little favourites</h2>
            <p>Soft, safe and made for everyday adventures.</p>
            <Link to="/shop" className="button detail-add">SHOP NOW <ArrowRight size={14} /></Link>
          </div>
          <div className="post-cta post-help">
            <h2>Need help sizing?</h2>
            <p>Check our size guide for the perfect fit.</p>
            <Link to="/size-guide">View size guide →</Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="related-posts" aria-label="Related posts">
          <h2>You may also like</h2>
          <div className="blog-grid related-blog-grid">
            {related.map((p, i) => (
              <article className="blog-card" key={p.slug}>
                <Link to={`/blog/${p.slug}`} className={`blog-thumb tone-${(i + 1) % 3}`} aria-hidden="true" tabIndex={-1}>
                  <span>{p.title.charAt(0)}</span>
                </Link>
                <div className="blog-card-body">
                  <time dateTime={p.date}>{fmt(p.date)} · {p.readTime}</time>
                  <h3><Link to={`/blog/${p.slug}`}>{p.title}</Link></h3>
                  <p>{p.excerpt}</p>
                  <Link className="blog-more" to={`/blog/${p.slug}`}>Read more →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </PageLayout>
  );
}