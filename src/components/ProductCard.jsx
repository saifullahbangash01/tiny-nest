import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { imageUrl } from "../data/products";

export default function ProductCard({ product }) {
  return (
    <article className="product-card col p-3">
      <Link
        to={`/product/${product.slug}`}
        className="product-image"
        style={{ "--product-color": "#fff" }}
      >
        <img
          src={imageUrl(product.image, 780)}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width="780"
          height="930"
        />
        <span className="product-tag">{product.tag}</span>
        <span className="quick-add" aria-hidden="true">
          <ShoppingBag size={16} />
        </span>
      </Link>
      <div className="product-info">
        <div>
          <span className="product-rating">NEW FAVOURITE</span>
          <h3>
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>
        <span className="product-price">£{product.price.toFixed(2)}</span>
      </div>
      <div className="product-type product-caption">{product.type}</div>
    </article>
  );
}
