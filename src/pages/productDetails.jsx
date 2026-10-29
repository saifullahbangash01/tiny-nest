import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Heart, Minus, Plus, ShieldCheck, Star, Truck,} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/useCart";
import { imageUrl, products } from "../data/products";
 

function Stars({ value }) {
  return (
    <span className="stars" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={14} fill={n <= Math.round(value) ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

const SIZES = ["0-3 months", "3-6 months", "6-12 months", "12-18 months", "18-24 months"];

export default function ProductDetails() {
  const { slug } = useParams();
  return <ProductDetailsInner key={slug} slug={slug} />;
}

function ProductDetailsInner({ slug }) {
  const product = products.find((item) => item.slug === slug);
  const { addItem } = useCart();
  const [size, setSize] = useState("12-18 months");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeInfo, setActiveInfo] = useState("description");
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  
const [activeImage, setActiveImage] = useState(product?.image || "");

const [reviews, setReviews] = useState(product?.reviews || []);

  const [newRating, setNewRating] = useState(5);
  const avg = reviews.length ? reviews.reduce((n, r) => n + r.rating, 0) / reviews.length : 0;

  useEffect(() => {
    if (!product) return;
    document.title = `${product.name} | TinyNest Kids Store`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        `${product.shortDescription || product.description} Shop ${product.name} at TinyNest, with easy delivery and 30-day returns.`,
      );
  }, [product]);
 
  const related = useMemo(() => {
    if (!product) return [];
    const others = products.filter((p) => p.slug !== product.slug);
    const same = others.filter((p) => p.category === product.category);
    const rest = others.filter((p) => p.category !== product.category);
    return [...same, ...rest].slice(0, 4);
  }, [product]);

  if (!product) return <Navigate to="/shop" replace />;

  const submitReview = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setReviews([
      {
        name: String(form.get("name")).trim(),
        rating: newRating,
        text: String(form.get("text")).trim(),
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      },
      ...reviews,
    ]);
    setNewRating(5);
    setReviewFormOpen(false);
  };

  const handleAdd = () => {
    addItem(product.slug, size, quantity);
    setAdded(true);
  };
 
const galleryImages = product.thumbnails?.length ? product.thumbnails : [product.image];
const currentIndex = galleryImages.indexOf(activeImage);

const handlePrevImage = () => {
  const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  setActiveImage(galleryImages[prevIndex]);
   
  if (prevIndex < thumbStartIndex) {
    setThumbStartIndex(prevIndex);
  } else if (prevIndex >= thumbStartIndex + 5) {
    setThumbStartIndex(Math.max(0, galleryImages.length - 5));
  }
};

const handleNextImage = () => {
  const nextIndex = (currentIndex + 1) % galleryImages.length;
  setActiveImage(galleryImages[nextIndex]);
  
  // Keep active thumbnail within the visible window of 4
  if (nextIndex >= thumbStartIndex + 5) {
    setThumbStartIndex(Math.min(nextIndex - 4, galleryImages.length - 6));
  } else if (nextIndex < thumbStartIndex) {
    setThumbStartIndex(nextIndex);
  }
};


  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription || product.description,
    image: imageUrl(product.image, 1200),
    sku: product.slug,
    brand: { "@type": "Brand", name: "TinyNest" },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <main id="top" className="page-main">
      <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      <div className="section-wrap product-detail-wrap container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
        <div className="product-detail row">
                
        <div className="detail-gallery col-12 col-lg-6" style={{ "--product-color": product.color }}>
    <div className="detail-main-image pt-4">
      <img
        src={imageUrl(activeImage || product.image, 1200)}
        alt={product.name}
      />
      {product.tag && <span className="product-tag">{product.tag}</span>}

      {/* Arrow Buttons Overlay (Only if multiple images exist) */}
      {galleryImages.length > 1 && (
        <>
          <button
            type="button"
            className="gallery-arrow gallery-arrow-left"
            onClick={handlePrevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="gallery-arrow gallery-arrow-right"
            onClick={handleNextImage}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>

    {/* Thumbnails */}
    {/* Thumbnails (Showing 4 at a time) */}
    <div className="detail-thumbnails">
      {galleryImages.slice(thumbStartIndex, thumbStartIndex + 5).map((thumbnail, index) => {
        const actualIndex = thumbStartIndex + index;
        return (
          <button
            key={`${thumbnail}-${actualIndex}`}
            type="button"
            className={activeImage === thumbnail ? "thumbnail-active" : ""}
            onClick={() => setActiveImage(thumbnail)}
            aria-label={`View ${product.name}, image ${actualIndex + 1}`}
            aria-pressed={activeImage === thumbnail}
          >
            <img
              src={imageUrl(thumbnail, 240)}
              alt={`${product.name} view ${actualIndex + 1}`}
              loading="lazy"
            />
          </button>
        );
      })}

      <div className="detail-note">
        MADE FOR LITTLE MOMENTS <Heart size={15} />
      </div>
    </div>
  </div>

          <section className="detail-copy col-12 col-lg-6">
            <span className="eyebrow">{product.type.toUpperCase()}</span>
            <h1>{product.name}</h1>
            <button type="button" className="detail-rating rating-link" onClick={() => setActiveInfo("reviews")}>
              {reviews.length ? (
                <>
                  <Stars value={avg} />
                  <span>
                    {avg.toFixed(1)} · {reviews.length} review{reviews.length > 1 ? "s" : ""}
                  </span>
                </>
              ) : (
                <span>No reviews yet</span>
              )}
            </button>
            <div className="detail-price">
              £{product.price.toFixed(2)} <span>GBP</span>
            </div>
            <p className="detail-description">{product.shortDescription || product.description}</p>
            <div className="detail-rule" />
            <div className="option-heading">
              <span>SIZE</span>
              <button type="button">
                Size guide <ArrowRight size={13} />
              </button>
            </div>
            <div className="size-options">
              {SIZES.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={size === option ? "size-selected" : ""}
                  onClick={() => setSize(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="quantity-row">
              <span>QUANTITY</span>
              <div>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <button type="button" className="button detail-add" onClick={handleAdd}>
              ADD TO BAG — £{(product.price * quantity).toFixed(2)} <ArrowRight size={15} />
            </button>
            {added && (
              <p className="added-note" role="status">
                ✓ Added to your bag. <Link to="/cart">View bag</Link>
              </p>
            )}
            <div className="detail-promises">
              <span>
                <Truck size={17} /> Free shipping over £50
              </span>
              <span>
                <ShieldCheck size={17} /> Easy little returns within 30 days
              </span>
            </div>
          </section>
        </div>

        <section className="product-information" aria-label="Product information">
          <div className="detail-tabs" role="tablist" aria-label="Product details">
            {[
              { id: "description", label: "Description" },
              { id: "delivery", label: "Delivery Information" },
              { id: "specifications", label: "Specifications" },
              { id: "reviews", label: `Reviews (${reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeInfo === tab.id}
                className={activeInfo === tab.id ? "detail-tab-active" : ""}
                onClick={() => setActiveInfo(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="detail-tab-content" role="tabpanel">
            {activeInfo === "description" && (
              <div className="info-copy">
                <h2>About this product</h2>
                {(
                    Array.isArray(product.longDescription)
                      ? product.longDescription
                      : [product.longDescription || product.description]
                  ).map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
              </div>
            )}
            {activeInfo === "delivery" && (
              <div className="info-copy">
                <h2>Delivery & returns</h2>
                <p>
                  Orders are prepared within 1–2 working days. Standard UK delivery is free on
                  orders over £50; delivery options and costs are shown at checkout.
                </p>
                <p>Changed your mind? Unworn items can be returned within 30 days of delivery.</p>
              </div>
            )}
            {activeInfo === "specifications" && (
              <div className="info-copy">
                <h2>Product specifications</h2>
                <dl>
                  <div><dt>Product</dt><dd>{product.name}</dd></div>
                  <div><dt>Collection</dt><dd>{product.type}</dd></div>
                  {Object.entries(product.specifications || {}).map(([label, value]) => (
                    <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                  ))}
                  <div><dt>SKU</dt><dd>{product.slug.toUpperCase()}</dd></div>
                </dl>
              </div>
            )}
            {activeInfo === "reviews" && (
              <div className="info-copy reviews-wrap">
                <div className="reviews-top">
                  <div>
                    <h2>Customer reviews</h2>
                    {reviews.length ? (
                      <p className="reviews-summary">
                        <Stars value={avg} /> {avg.toFixed(1)} out of 5 · {reviews.length} review
                        {reviews.length > 1 ? "s" : ""}
                      </p>
                    ) : (
                      <p>There are no reviews for this little favourite yet.</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="review-button"
                    onClick={() => setReviewFormOpen((open) => !open)}
                  >
                    {reviewFormOpen ? "Close" : "Write a review"}
                  </button>
                </div>
                {reviewFormOpen && (
                  <form className="review-form" onSubmit={submitReview}>
                    <div className="rating-picker" role="radiogroup" aria-label="Your rating">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          role="radio"
                          aria-checked={newRating === n}
                          aria-label={`${n} star${n > 1 ? "s" : ""}`}
                          onClick={() => setNewRating(n)}
                        >
                          <Star size={22} fill={n <= newRating ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                    <label>
                      Your name
                      <input name="name" required placeholder="Name" />
                    </label>
                    <label>
                      Your review
                      <textarea name="text" required rows="3" placeholder="Tell other parents what you think" />
                    </label>
                    <button type="submit" className="review-button">
                      Submit review
                    </button>
                  </form>
                )}
                <ul className="review-list">
                  {reviews.map((r, i) => (
                    <li key={i}>
                      <div className="review-meta">
                        <Stars value={r.rating} />
                        <b>{r.name}</b>
                        <span>{r.date}</span>
                      </div>
                      <p>{r.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {related.length > 0 && (
          <section className="koddid-recommended related-products" aria-label="Recommended products">
            <div className="section-heading">
              <div>
                <h2>You May Also Like</h2>
                <span className="title-underline" />
              </div>
            </div>
            <div className="product-grid row row-cols-2 row-cols-md-3 row-cols-xl-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}

        <Link className="back-to-shop" to="/shop">
          <ArrowLeft size={15} /> BACK TO THE LITTLE SHOP
        </Link>
      </div>
    </main>
  );
}
