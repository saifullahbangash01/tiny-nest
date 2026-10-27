import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { products } from "../data/products";

const CartContext = createContext(null);
const KEY = "tinynest-cart";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

function reducer(state, a) {
  switch (a.type) {
    case "add": {
      const id = `${a.slug}__${a.size}`;
      if (state.some((i) => i.id === id))
        return state.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + a.quantity } : i,
        );
      return [...state, { id, slug: a.slug, size: a.size, quantity: a.quantity }];
    }
    case "setQty":
      return state.map((i) =>
        i.id === a.id ? { ...i, quantity: Math.max(1, a.quantity) } : i,
      );
    case "remove":
      return state.filter((i) => i.id !== a.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [raw, dispatch] = useReducer(reducer, [], load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(raw));
    } catch {}
  }, [raw]);

  const value = useMemo(() => {
    const items = raw
      .map((i) => ({ ...i, product: products.find((p) => p.slug === i.slug) }))
      .filter((i) => i.product);
    return {
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: items.reduce((s, i) => s + i.product.price * i.quantity, 0),
      addItem: (slug, size, quantity = 1) =>
        dispatch({ type: "add", slug, size, quantity }),
      setQty: (id, quantity) => dispatch({ type: "setQty", id, quantity }),
      removeItem: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [raw]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);