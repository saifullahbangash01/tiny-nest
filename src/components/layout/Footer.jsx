import { Link } from "react-router-dom";

function Brand() {
  return (
    <Link to="/" className="brand footer-brand" aria-label="TinyNest home">
      <img
        className="brand-logo"
        src={`${import.meta.env.BASE_URL}assets/logo/tinynest-logo-header.webp`}
        alt="TinyNest"
        width="125"
        height="92"
      />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="footer koddid-footer">
      <div className="footer-main section-wrap container">
        <div className="footer-about">
          <Brand />
          <p>
            Thoughtful clothes, toys and little essentials, made for childhood's
            everyday adventures.
          </p>
          <div className="socials">
            <a href="#facebook" aria-label="Facebook">
              f
            </a>
            <a href="#instagram" aria-label="Instagram">
              ig
            </a>
            <a href="#pinterest" aria-label="Pinterest">
              p
            </a>
            <a href="#youtube" aria-label="YouTube">
              yt
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h3>SHOP</h3>
          <Link to="/shop">All Products</Link>
          <Link to="/shop?category=baby">Baby</Link>
          <Link to="/shop?category=kids">Kids</Link>
          <Link to="/shop?category=toys">Toys</Link>
          <Link to="/shop?category=bath-care">Bath & Care</Link>
        </div>
        <div className="footer-column">
          <h3>CUSTOMER SERVICE</h3>
          <Link to="/contact">Contact Us</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/">Shipping & Delivery</Link>
          <Link to="/">Returns & Refunds</Link>
          <Link to="/">Size Guide</Link>
        </div>
        <div className="footer-column">
          <h3>INFORMATION</h3>
          <Link to="/#story">About Us</Link>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms & Conditions</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/">Sitemap</Link>
        </div>
        <div className="footer-newsletter" id="newsletter">
          <h3>NEWSLETTER</h3>
          <p>Subscribe to get updates on new arrivals & exclusive offers.</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Enter your email"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Copyright 2026 TinyNest. All rights reserved.</span>
      </div>
    </footer>
  );
}
