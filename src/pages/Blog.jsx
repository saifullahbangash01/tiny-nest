import { Link, Navigate, useParams } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { posts } from "../data/Posts";
 
 

const fmt = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export function Blog() {
  const origin = window.location.origin;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "TinyNest Blog",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.date,
      url: `${origin}/blog/${p.slug}`,
    })),
  };
  return (
    <PageLayout
      seoTitle="Blog – Parenting Tips & Baby Guides"
      description="Helpful guides for parents from TinyNest: dressing baby for the seasons, choosing sizes, toys and everyday tips."
      eyebrow="THE LITTLE JOURNAL"
      heading="Our Blog"
      intro="Tips, guides and ideas for happy little ones."
      crumbs={[{ name: "Blog" }]}
      schema={schema}
    >
     <div className="blog-grid">
  {posts.map((post) => (
    <article className="blog-card" key={post.slug}>
      <Link to={`/blog/${post.slug}`} className="blog-thumb">
        <img src={post.image} alt={post.title} />
      </Link>
      <div className="blog-card-body">
        <time dateTime={post.date}>{post.date} · {post.readTime}</time>
        <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
        <p>{post.excerpt}</p>
        <Link className="blog-more" to={`/blog/${post.slug}`}>Read more →</Link>
      </div>
    </article>
  ))}
</div>
    </PageLayout>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "TinyNest" },
    publisher: { "@type": "Organization", name: "TinyNest" },
    mainEntityOfPage: `${window.location.origin}/blog/${post.slug}`,
  };
  return (
    <PageLayout
      seoTitle={post.title}
      description={post.excerpt}
      eyebrow={`${fmt(post.date)} · ${post.readTime}`.toUpperCase()}
      heading={post.title}
      crumbs={[{ name: "Blog", to: "/blog" }, { name: post.title }]}
      schema={schema}
      type="article"
    >
      <article className="content-body">
        {post.body.map((t, i) => <p key={i}>{t}</p>)}
        <p><Link to="/blog">← Back to blog</Link></p>
      </article>
    </PageLayout>
  );
}