import { ArrowLeft, ArrowRight, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { imageUrl } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, count, subtotal, setQty, removeItem } = useCart();

  return (
    <main id="top" className="page-main">
      <section className="page-banner cart-banner">
        <div>
          <span className="eyebrow">YOUR LITTLE FINDS</span>
          <h1>The bag.</h1>
          <p>A few lovely things, all in one place.</p>
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Your bag</span>
          </div>
        </div>
      </section>
      <section className="section-wrap cart-layout container row">
        <div className="cart-items col-12 col-lg-8">
          <div className="cart-heading">
            <h2>
              Your bag <span>({count} {count === 1 ? "item" : "items"})</span>
            </h2>
            <Link to="/shop">
              KEEP SHOPPING <ArrowRight size={14} />
            </Link>
          </div>

          {items.length === 0 && (
            <p className="empty-category">Your bag is empty. Let's find something lovely!</p>
          )}

          {items.map(({ id, product, size, quantity }) => (
            <article className="cart-item" key={id}>
              <Link to={`/product/${product.slug}`} className="cart-item-image">
                <img src={imageUrl(product.image, 360)} alt={product.name} />
              </Link>
              <div className="cart-item-info">
                <span className="eyebrow">{product.type.toUpperCase()}</span>
                <Link to={`/product/${product.slug}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p>Size: {size}</p>
                <button className="remove-item" onClick={() => removeItem(id)}>
                  Remove
                </button>
              </div>
              <div className="cart-item-action">
                <b>£{(product.price * quantity).toFixed(2)}</b>
                <div className="quantity-control">
                  <button onClick={() => setQty(id, quantity - 1)} aria-label="Decrease quantity">
                    <Minus size={13} />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQty(id, quantity + 1)} aria-label="Increase quantity">
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </article>
          ))}

          <div className="cart-note">
            <span>✳</span>
            <p>Free delivery on orders over £50</p>
          </div>
        </div>

        <aside className="order-summary col-12 col-lg-4">
          <span className="eyebrow">YOUR ORDER</span>
          <h2>Order summary</h2>
          <div>
            <span>Subtotal</span>
            <b>£{subtotal.toFixed(2)}</b>
          </div>
          <div>
            <span>Shipping</span>
            <span>{subtotal >= 50 ? "Free" : "Calculated at checkout"}</span>
          </div>
          <div className="summary-total">
            <b>Total</b>
            <b>
              £{subtotal.toFixed(2)} <small>GBP</small>
            </b>
          </div>
          <Link className="button detail-add" to={items.length ? "/checkout" : "/shop"}>
            {items.length ? "CONTINUE TO CHECKOUT" : "START SHOPPING"} <ArrowRight size={15} />
          </Link>
          <div className="summary-promise">
            <Truck size={16} /> Free shipping over £50
          </div>
          <div className="summary-promise">
            <ShieldCheck size={16} /> Safe & secure checkout
          </div>
          <Link className="summary-back" to="/shop">
            <ArrowLeft size={13} /> BACK TO SHOPPING
          </Link>
        </aside>
      </section>
    </main>
  );
}
