import { useEffect } from "react";
import {
  ArrowRight,
  Headphones,
  Heart,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";
import hero1 from "../assets/bannerimages/hero1.webp";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import shopCategories from "../data/category";
import ShopCards from "../components/ShopCards";

function SectionTitle({ title, link = "Shop All Products" }) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        <span className="title-underline" />
      </div>
      <div className="product-tabs">
        <button className="selected">Best Sellers</button>
        <button>New Arrivals</button>
        <button>Featured</button>
      </div>
      <Link className="home-section-link" to="/shop">
        {link} <ArrowRight size={14} />
      </Link>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = "TinyNest | Baby & Kids Clothing, Toys and Accessories";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Shop thoughtful baby and kids clothes, toys, bath care and accessories at TinyNest. Soft little favourites, made for everyday adventures.",
      );
  }, []);

  return (
    <main id="top" className="koddid-home">
      <section className="koddid-hero">
        <img
          src={hero1}
          srcSet=""
          sizes="100vw"
          width="1600"
          height="700"
          fetchPriority="high"
          decoding="async"
          alt="Two happy babies in colorful little outfits"
        />
        <div className="hero-center-wash" />
        <div className="koddid-hero-copy">
          <Heart size={23} className="hero-heart" />
          <span>PREMIUM QUALITY FOR LITTLE ONES</span>
          <h1>
            Clothing
            <br />
            <em>Safe Toys</em>
          </h1>
          <p>
            Stylish <i /> Comfortable <i /> Safe
          </p>
          <Link to="/shop" className="hero-shop-button">
            Shop Now <ArrowRight size={15} />
          </Link>
        </div>
        <div className="hero-dots" aria-hidden="true">
          <i className="dot-active" />
          <i />
          <i />
        </div>
      </section>
      <section className="koddid-promises wrap container">
        {[
          {
            icon: <Heart />,
            title: "Premium Quality",
            text: "Soft, safe & durable materials",
            tone: "pink",
          },
          {
            icon: <ShieldCheck />,
            title: "Safe for Kids",
            text: "Tested & certified for safety",
            tone: "mint",
          },
          {
            icon: <Truck />,
            title: "Fast Delivery",
            text: "Quick & reliable delivery",
            tone: "yellow",
          },
          {
            icon: <Tag />,
            title: "Best Prices",
            text: "Affordable prices for all",
            tone: "lavender",
          },
        ].map((item) => (
          <div className="promise-item" key={item.title}>
            <span className={`promise-icon ${item.tone}`}>{item.icon}</span>
            <div>
              <b>{item.title}</b>
              <span>{item.text}</span>
            </div>
          </div>
        ))}
      </section>
      {/* Shop by category section  */}
      <section
        className="shop-cat section-wrap"
        aria-labelledby="shop-cat-title"
      >
        <div className="shop-cat-head">
          <Sparkles className="shop-cat-deco" size={20} aria-hidden="true" />
          <h2 id="shop-cat-title">SHOP BY CATEGORY</h2>
          <Heart className="shop-cat-deco" size={22} aria-hidden="true" />
        </div>
        <div className="shop-cat-divider" aria-hidden="true">
          <i />
          <Heart size={12} fill="currentColor" />
          <i />
        </div>

        <div className="shop-cat-grid">
          {shopCategories.map((c) => (
            <Link
              key={c.slug}
              to={`/shop?category=${c.slug}`}
              className="shop-cat-item"
            >
              <span className="shop-cat-circle" style={{ background: c.bg }}>
                <img
                  src={c.image}
                  alt={c.label}
                  loading="lazy"
                  width="215"
                  height="215"
                />
              </span>
              <b>{c.label.toUpperCase()}</b>
              <small>
                Shop Now <ArrowRight size={13} aria-hidden="true" />
              </small>
            </Link>
          ))}
        </div>
      </section>
      {/* end */}
      <section className="koddid-categories section-wrap container">
        <Link
          className="koddid-category category-clothes"
          to="/shop?category=kids"
        >
          <img
            loading="lazy"
            decoding="async"
            width="900"
            height="600"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjdfehJz9sDBNRcGu5ytD0QLFe73h2sz0rC4yr8ux2Zg&s=10"
            alt="Baby clothes and overalls"
          />
          <div className="category-text">
            <h2>
              Clothing
              <br />& Toys
            </h2>
            <span>
              Shop Collection <ArrowRight size={14} />
            </span>
          </div>
        </Link>
        <Link
          className="koddid-category category-bath"
          to="/shop?category=bath-care"
        >
          <img
            loading="lazy"
            decoding="async"
            width="900"
            height="600"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJV-FZW6m3J313Oj2kQyvqpFOSx0hhvBZGsYowKOTW1w&s=10"
            alt="Baby bath accessories and a rubber duck"
          />
          <div className="category-text">
            <h2>
              Bath
              <br />& Accessory
            </h2>
            <span>
              Shop Collection <ArrowRight size={14} />
            </span>
          </div>
        </Link>
      </section>
      <section className="koddid-recommended section-wrap container" id="shop">
        <SectionTitle title="Recommended For You" link="View All Products" />
        <div className="product-grid row row-cols-2 row-cols-md-4 row-cols-xl-6 g-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <Link className="all-products-button" to="/shop">
          View All Products <ArrowRight size={14} />
        </Link>
      </section>
      {/* shop by age and collection section */} 
        <ShopCards />
      {/* end */}
      <section className="koddid-arrivals section-wrap container">
        <img
          loading="lazy"
          decoding="async"
          width="600"
          height="440"
          src={`${import.meta.env.BASE_URL}assets/images/products/arrivals.jfif`}
          alt="A happy child with a favorite soft toy"
        />

        <div className="arrivals-copy">
          <span>New Arrivals</span>
          <h2>Every Week!</h2>
          <p>
            Discover the latest trends in kids fashion,
            <br />
            toys & more.
          </p>
          <Link to="/shop">
            Explore Now <ArrowRight size={14} />
          </Link>
        </div>
        
      </section>
      
      <section className="koddid-service-strip">
        <div className="section-wrap container">
          {[
            {
              icon: <ShieldCheck />,
              title: "100% Secure Payment",
              text: "Pay with confidence",
            },
            {
              icon: <RefreshCw />,
              title: "Easy Returns",
              text: "Hassle free returns",
            },
            {
              icon: <Heart />,
              title: "Loved by Parents",
              text: "Trusted by thousands",
            },
            {
              icon: <Headphones />,
              title: "24/7 Customer Support",
              text: "We're here to help",
            },
          ].map((item) => (
            <div className="service-item" key={item.title}>
              {item.icon}
              <div>
                <b>{item.title}</b>
                <span>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
