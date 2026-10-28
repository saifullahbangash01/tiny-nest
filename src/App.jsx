import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/productDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import FAQs from "./pages/Faqs";
import { Blog } from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";

export default function App() {
  return (
    <CartProvider>
      <div className="app-shell min-vh-100 bg-white text-slate-900">
        <ScrollToTop />
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
}
