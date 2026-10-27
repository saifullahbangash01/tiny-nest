import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { searchProducts } from "../utils/Search";

const PER_PAGE = 20;

const categories = [
  { id: "all", name: "All Categories" },
  { id: "baby", name: "Baby" },
  { id: "kids", name: "Kids" },
  { id: "toys", name: "Toys" },
  { id: "girls", name: "Girls" },
  { id: "boys", name: "Boys" },
  { id: "outfits", name: "Outfits" },
  { id: "footwear", name: "Footwear" },
  { id: "bath-care", name: "Bath & Care" },
  { id: "accessories", name: "Accessories" },
];

 
function getPageList(total, current) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((n) => pages.add(n));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((n) => pages.add(n));
  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const list = [];
  sorted.forEach((n, i) => {
    if (i && n - sorted[i - 1] > 1) list.push("…");
    list.push(n);
  });
  return list;
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("Featured");
  const activeCategory = searchParams.get("category") || "all";
  const q = (searchParams.get("q") || "").trim();
  const activeCategoryName =
    categories.find((item) => item.id === activeCategory)?.name ||
    "All Categories";

  const searched = useMemo(() => searchProducts(products, q), [q]);

  const shownProducts = useMemo(() => {
    const filtered = searched.filter(
      (product) =>
        activeCategory === "all" || product.category === activeCategory,
    );
    if (sort === "Price: low to high")
      return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low")
      return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [searched, activeCategory, sort]);
 
  const totalPages = Math.max(1, Math.ceil(shownProducts.length / PER_PAGE));
  const requested = parseInt(searchParams.get("page"), 10) || 1;
  const page = Math.min(Math.max(1, requested), totalPages);
  const start = (page - 1) * PER_PAGE;
  const pageProducts = shownProducts.slice(start, start + PER_PAGE);

  const goToPage = (n) => {
    const next = new URLSearchParams(searchParams);
    if (n <= 1) next.delete("page");
    else next.set("page", String(n));
    setSearchParams(next);
  };

  useEffect(() => {
    const base = q ? `Search: ${q}` : activeCategoryName;
    document.title = `${base}${page > 1 ? ` – Page ${page}` : ""} | TinyNest Kids Store`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        `Shop ${activeCategoryName.toLowerCase()} at TinyNest. Discover thoughtful clothes, toys and essentials for little ones.`,
      );
  }, [activeCategoryName, q, page]);

  const chooseCategory = (category) => {
    const next = {};
    if (category !== "all") next.category = category;
    if (q) next.q = q;
    setSearchParams(next);  
  };

  const changeSort = (value) => {
    setSort(value);
    if (searchParams.has("page")) goToPage(1);
  };

  const title = q
    ? `Results for “${q}”`
    : activeCategory === "all"
      ? "Shop All Products"
      : activeCategoryName;

  return (
    <main id="top" className="page-main">
      <section className="page-banner shop-banner">
        <div>
          <span className="eyebrow">
            {q ? "SEARCH" : "A LITTLE SOMETHING FOR EVERY DAY"}
          </span>
          <h1>{title}</h1>
          <p>Little favorites for their very big little world.</p>
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{q ? "Search" : activeCategoryName}</span>
          </div>
        </div>
      </section>

      <section className="section-wrap shop-content container">
        <div className="shop-toolbar">
          <div>
            <span className="eyebrow">{activeCategoryName.toUpperCase()}</span>
            <p>{shownProducts.length} lovely little finds</p>
          </div>
          <label className="sort-control">
            <SlidersHorizontal size={15} />
            <span>SORT</span>
            <select
              aria-label="Sort products"
              value={sort}
              onChange={(event) => changeSort(event.target.value)}
            >
              <option>Featured</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
            </select>
          </label>
        </div>

        <div className="shop-layout row">
          <div className="shop-products col-12 col-lg-9">
            {pageProducts.length ? (
              <div className="product-grid row row-cols-2 row-cols-md-3 row-cols-xl-3">
                {pageProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <p className="empty-category">
                {q
                  ? `No products found for “${q}”. Try another word or `
                  : "More little favorites are on their way."}
                {q && <Link to="/shop">browse all products</Link>}
              </p>
            )}

            {totalPages > 1 && (
              <nav className="pagination" aria-label="Pagination">
                <button
                  type="button"
                  className="page-btn page-arrow"
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                {getPageList(totalPages, page).map((item, i) =>
                  item === "…" ? (
                    <span key={`dots-${i}`} className="page-dots" aria-hidden="true">
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      className={`page-btn ${item === page ? "page-active" : ""}`}
                      onClick={() => goToPage(item)}
                      aria-label={`Page ${item}`}
                      aria-current={item === page ? "page" : undefined}
                    >
                      {item}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  className="page-btn page-arrow"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </nav>
            )}

            <div className="pagination-note">
              {shownProducts.length
                ? `SHOWING ${start + 1}–${start + pageProducts.length} OF ${shownProducts.length} PRODUCTS`
                : "SHOWING 0 PRODUCTS"}{" "}
              <span>
                <ArrowDown size={13} />
              </span>
            </div>
          </div>
          <aside className="shop-filters col-12 col-lg-3" aria-label="Product categories">
            <h2>Categories</h2>
            <span className="eyebrow">SHOP BY</span>
            {categories.map((category) => {
              const count =
                category.id === "all"
                  ? searched.length
                  : searched.filter(
                      (product) => product.category === category.id,
                    ).length;
              return (
                <button
                  key={category.id}
                  className={
                    activeCategory === category.id ? "filter-active" : ""
                  }
                  aria-pressed={activeCategory === category.id}
                  onClick={() => chooseCategory(category.id)}
                >
                  {category.name}
                  <span>{count}</span>
                </button>
              );
            })}
          </aside>
        </div>
      </section>
    </main>
  );
}