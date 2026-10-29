import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { imageUrl } from "../data/products";
import { useCart } from "../context/useCart";

function Field({ label, type = "text", placeholder, wide = false, required = true }) {
  return (
    <label className={`checkout-field ${wide ? "field-wide" : ""}`}>
      <span>{label}</span>
      <input type={type} placeholder={placeholder || label} required={required} />
    </label>
  );
}

export default function Checkout() {
  const { items, count, subtotal, clear } = useCart();
  const [orderNumber, setOrderNumber] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!items.length) return;
    setOrderNumber(`TN-${Date.now().toString().slice(-6)}`);
    clear();  
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const head = (
    <div className="checkout-head section-wrap">
      <Link to="/" className="checkout-brand">
        <img
          className="brand-logo"
          src="/assets/logo/tinynest-logo-header.webp"
          alt="TinyNest"
          width="125"
          height="92"
        />
      </Link>
      <span>
        <LockKeyhole size={14} /> SAFE & SECURE CHECKOUT
      </span>
    </div>
  );

  // Success screen
  if (orderNumber) {
    return (
      <main id="top" className="page-main checkout-page">
        {head}
        <div className="section-wrap order-success" role="status">
          <CheckCircle2 size={64} />
          <h1>Order placed successfully!</h1>
          <p>
            Thank you for shopping with TinyNest. Your order <b>{orderNumber}</b> is confirmed
            and we'll email you the updates soon.
          </p>
          <div className="order-success-actions">
            <Link to="/shop" className="button detail-add">
              CONTINUE SHOPPING <ArrowRight size={15} />
            </Link>
            <Link to="/" className="summary-back">
              <ArrowLeft size={13} /> BACK TO HOME
            </Link>
          </div>
        </div>
      </main>
    );
  }
 
  if (!items.length) {
    return (
      <main id="top" className="page-main checkout-page">
        {head}
        <div className="section-wrap order-success">
          <h1>Your bag is empty</h1>
          <p>Add a few lovely things before checking out.</p>
          <div className="order-success-actions">
            <Link to="/shop" className="button detail-add">
              START SHOPPING <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="top" className="page-main checkout-page">
      {head}
      <div className="section-wrap checkout-layout container row">
        <section className="checkout-form col-12 col-lg-8">
          <div className="breadcrumbs">
            <Link to="/cart">Your cart</Link>
            <span>/</span>
            <span>Checkout</span>
          </div>
          <h1>Complete your order</h1>
          <form onSubmit={handleSubmit}>
            <div className="checkout-step">
              <span>01</span>
              <div>
                <h2>Contact details</h2>
                <p>Where should we send your order updates?</p>
              </div>
            </div>
            <Field label="Email address" type="email" placeholder="you@example.com" wide />
            <div className="checkout-step">
              <span>02</span>
              <div>
                <h2>Delivery address</h2>
                <p>Enter the address for your delivery.</p>
              </div>
            </div>
            <div className="field-grid">
              <Field label="First name" />
              <Field label="Last name" />
              <Field label="Address" wide />
              <Field label="Apartment, suite, etc. (optional)" wide required={false} />
              <Field label="City" />
              <Field label="Postcode" />
              <label className="checkout-field field-wide">
                <span>Country / region</span>
                <select defaultValue="United Kingdom">
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Pakistan</option>
                  <option>India</option>
                  <option>Dubai</option>
                </select>
              </label>
            </div>
            <label className="save-address">
              <input type="checkbox" /> Save these details for next time
            </label>
            <div className="checkout-step payment-step">
              <span>03</span>
              <div>
                <h2>Payment</h2>
                <p>Payment options will appear here at checkout.</p>
              </div>
            </div>
            <div className="payment-placeholder">
              <ShieldCheck size={18} />
              <span>Your payment is protected with secure encryption.</span>
            </div>
            <button type="submit" className="button detail-add place-order">
              PLACE YOUR ORDER <ArrowRight size={15} />
            </button>
            <Link to="/cart" className="summary-back">
              <ArrowLeft size={13} /> BACK TO CART
            </Link>
          </form>
        </section>

        <aside className="checkout-summary col-12 col-lg-4">
          <span className="eyebrow">YOUR ORDER</span>
          <h2>Order summary ({count})</h2>
          {items.map(({ id, product, size, quantity }) => (
            <div className="checkout-item" key={id}>
              <div className="checkout-item-photo">
                <img src={imageUrl(product.image, 240)} alt={product.name} />
                <span>{quantity}</span>
              </div>
              <div>
                <h3>{product.name}</h3>
                <p>{size}</p>
              </div>
              <b>£{(product.price * quantity).toFixed(2)}</b>
            </div>
          ))}
          <div className="checkout-sum-line">
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <div className="checkout-sum-line">
            <span>Shipping</span>
            <span>{subtotal >= 50 ? "Free" : "Calculated next"}</span>
          </div>
          <div className="checkout-sum-line checkout-total">
            <b>Total</b>
            <b>
              £{subtotal.toFixed(2)} <small>GBP</small>
            </b>
          </div>
          <p className="checkout-thanks">
            Thanks for choosing TinyNest. We can't wait for your little one's new favorites to
            arrive.
          </p>
        </aside>
      </div>
    </main>
  );
}
