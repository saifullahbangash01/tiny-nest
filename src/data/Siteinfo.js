
export const SITE = {
  name: "TinyNest",
  email: "hello@tinynest.co.uk",
  phone: "+44 20 0000 0000",
  address: "12 Little Lane, London, UK",
  hours: "Mon–Fri, 9am–5pm (UK time)",
};

export const siteLinks = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" },
      { label: "Baby", to: "/shop?category=baby" },
      { label: "Kids", to: "/shop?category=kids" },
      { label: "Toys", to: "/shop?category=toys" },
      { label: "Bath & Care", to: "/shop?category=bath-care" },
      { label: "Accessories", to: "/shop?category=accessories" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "FAQs", to: "/faqs" },
      { label: "Shipping & Delivery", to: "/shipping-delivery" },
      { label: "Returns & Refunds", to: "/returns-refunds" },
      { label: "Size Guide", to: "/size-guide" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms-and-conditions" },
      { label: "Sitemap", to: "/sitemap" },
    ],
  },
];