import { useEffect, useRef, useState } from "react";
import {
  Headphones,
  Menu,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { imageUrl, products } from "../../data/products";
import { searchProducts } from "../../utils/Search";

const navigation = [
  { label: "HOME", to: "/", active: (l) => l.pathname === "/" && !l.hash },
  {
    label: "SHOP",
    to: "/shop",
    active: (l) => l.pathname === "/shop" && !l.search,
  },
  { label: "BABY", to: "/shop?category=baby", category: "baby" },
  { label: "KIDS", to: "/shop?category=kids", category: "kids" },
  { label: "TOYS", to: "/shop?category=toys", category: "toys" },
  {
    label: "BATH & CARE",
    to: "/shop?category=bath-care",
    category: "bath-care",
  },
  {
    label: "ACCESSORIES",
    to: "/shop?category=accessories",
    category: "accessories",
  },
  { label: "ABOUT US", to: "/#story", active: (l) => l.hash === "#story" },
  {
    label: "CONTACT US",
    to: "/contact",
    active: (l) => l.hash === "#newsletter",
  },
];

function Brand({ onClick }) {
  return (
    <Link
      to="/"
      aria-label="Tiny Nest home"
      className="brand"
      onClick={onClick}
    >
      <img
        className="brand-logo"
        src="/assets/logo/tinynest-logo-header.webp"
        alt="TinyNest"
        width="150"
        height="110"
      />
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { count, subtotal } = useCart();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const suggestions = query.trim()
    ? searchProducts(products, query).slice(0, 5)
    : [];
 
  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get("q") || "");
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  // bahar click par dropdown band
  useEffect(() => {
    const onDown = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };
  const selectedCategory = new URLSearchParams(location.search).get("category");
  const closeMenu = () => setMenuOpen(false);
 
  useEffect(
    () => setMenuOpen(false),
    [location.pathname, location.search, location.hash],
  );
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // drawer khula ho to page scroll lock + Esc se close
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <div className="announcement">
        <span>
          <Truck aria-hidden="true" /> FREE SHIPPING on orders over £50
        </span>
        <span>
          <RefreshCw aria-hidden="true" /> 30 DAY EASY RETURNS
        </span>
        <span>
          <ShieldCheck aria-hidden="true" /> SAFE & SECURE CHECKOUT
        </span>
        <span>
          <Headphones aria-hidden="true" /> SUPPORT 24/7
        </span>
      </div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-main wrap container">
          <button
            className="icon-button mobile-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
          >
            <Menu />
          </button>
          <Brand />
          <div className="search-wrap" ref={searchRef}>
            <form className="search-box" role="search" onSubmit={submitSearch}>
              <input
                aria-label="Search products"
                placeholder="Search for products..."
                value={query}
                autoComplete="off"
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
              />
              <button
                type="submit"
                className="search-submit"
                aria-label="Search products"
              >
                <Search size={18} aria-hidden="true" />
              </button>
            </form>
            {searchOpen && query.trim() && (
              <div className="search-dropdown" role="listbox">
                {suggestions.length ? (
                  <>
                    {suggestions.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/product/${p.slug}`}
                        className="search-item"
                        role="option"
                      >
                        <img
                          src={imageUrl(p.image, 120)}
                          alt=""
                          width="44"
                          height="44"
                        />
                        <span>
                          <b>{p.name}</b>
                          <small>{p.type}</small>
                        </span>
                        <em>£{p.price.toFixed(2)}</em>
                      </Link>
                    ))}
                    <Link
                      to={`/shop?q=${encodeURIComponent(query.trim())}`}
                      className="search-all"
                    >
                      See all results for “{query.trim()}”
                    </Link>
                  </>
                ) : (
                  <p className="search-empty">
                    No products found for “{query.trim()}”
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="header-actions">
            <button
              className="icon-button account-action"
              aria-label="My account"
            >
              <UserRound size={23} aria-hidden="true" />
            </button>
            <Link
              className="icon-button bag-action"
              to="/cart"
              aria-label={`My cart, ${count} items`}
            >
              <ShoppingBag size={23} aria-hidden="true" />
              <span className="bag-count">{count}</span>
              <span className="bag-details">
                <b>MY CART</b>
                <small>£{subtotal.toFixed(2)}</small>
              </span>
            </Link>
          </div>
        </div>

        <div
          className={`nav-overlay ${menuOpen ? "show" : ""}`}
          onClick={closeMenu}
          aria-hidden="true"
        />
        <nav
          id="main-nav"
          className={`main-nav ${menuOpen ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <div className="drawer-head">
            <Brand onClick={closeMenu} />
            <button
              className="icon-button"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
          {navigation.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.label === "HOME"}
              onClick={closeMenu}
              className={() => {
                const isActive = item.category
                  ? location.pathname === "/shop" &&
                    selectedCategory === item.category
                  : (item.active?.(location) ?? false);
                return isActive ? "active" : "";
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
    </>
  );
}
