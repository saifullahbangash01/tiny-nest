import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ages = [
  {
    title: "0-2 Years",
    text: "Soft, safe & adorable",
    image: `${import.meta.env.BASE_URL}assets/age/0-2.webp`,
    tone: "pink",
  },
  {
    title: "2-4 Years",
    text: "Play, Learn & Explore",
    image: `${import.meta.env.BASE_URL}assets/age/2-4.webp`,
    tone: "yellow",
  },
  {
    title: "4-8 Years",
    text: "Fun styles for active days",
    image: `${import.meta.env.BASE_URL}assets/age/4-8.webp`,
    tone: "blue",
  },
  {
    title: "8-12 Years",
    text: "Trendy looks for confident kids",
    image: `${import.meta.env.BASE_URL}assets/age/8-12.webp`,
    tone: "purple",
  },
];

const collections = [
  {
    title: "School Essentials",
    text: "Smart looks for bright minds",
    image: `${import.meta.env.BASE_URL}assets/collections/school.webp`,
    tone: "blue",
  },
  {
    title: "Party Outfits",
    text: "Make every moment special",
    image: `${import.meta.env.BASE_URL}assets/collections/party.webp`,
    tone: "pink",
  },
  {
    title: "Everyday Basics",
    text: "Comfort they'll love every day",
    image: `${import.meta.env.BASE_URL}assets/collections/basics.webp`,
    tone: "mint",
  },
  {
    title: "Denim Collection",
    text: "Cool, classic & always in style",
    image: `${import.meta.env.BASE_URL}assets/collections/denim.webp`,
    tone: "purple",
  },
];

function CardsSection({ title, items, viewAll = "/shop" }) {
  return (
    <section className="promo-section section-wrap">
      <div className="promo-head">
        <h2>{title}</h2>
        <Link to={viewAll} className="promo-viewall">
          View All <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-3 g-lg-4">
        {items.map((item) => (
          <div className="col" key={item.title}>
            <div className={`promo-card tone-${item.tone}`}>
              <div className="promo-copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="promo-btn">
                  Shop Now <ArrowRight size={18} aria-hidden="true" />
                </span>
              </div>
              <img src={item.image} alt="" loading="lazy" decoding="async" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ShopCards() {
  return (
    <>
      <CardsSection title="Shop by Age" items={ages} />
      <CardsSection title="Shop Our Collections" items={collections} />
    </>
  );
}