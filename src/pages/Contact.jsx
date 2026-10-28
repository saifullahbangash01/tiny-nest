import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageLayout from "../components/Pagelayout";
import { SITE } from "../data/Siteinfo";


export default function Contact() {
  const [sent, setSent] = useState(false);
 
  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      f.get("subject") || "Website enquiry",
    )}&body=${encodeURIComponent(body)}`;
    e.currentTarget.reset();
    setSent(true);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact TinyNest",
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      email: SITE.email,
      telephone: SITE.phone,
      address: { "@type": "PostalAddress", streetAddress: SITE.address },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.email,
        telephone: SITE.phone,
        availableLanguage: ["English"],
      },
    },
  };

  const cards = [
    { icon: <Mail />, title: "Email", text: SITE.email, href: `mailto:${SITE.email}` },
    { icon: <Phone />, title: "Phone", text: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
    { icon: <MapPin />, title: "Address", text: SITE.address },
    { icon: <Clock />, title: "Opening hours", text: SITE.hours },
  ];

  return (
    <PageLayout
      seoTitle="Contact Us"
      description="Get in touch with TinyNest for help with orders, delivery, returns or product questions. We usually reply within one working day."
      eyebrow="WE'D LOVE TO HEAR FROM YOU"
      heading="Contact Us"
      intro="Questions about an order or a product? Send us a message."
      crumbs={[{ name: "Contact Us" }]}
      schema={schema}
    >
      <div className="contact-grid">
        <div className="contact-cards">
          {cards.map((c) => (
            <div className="contact-card" key={c.title}>
              <span className="contact-icon">{c.icon}</span>
              <div>
                <b>{c.title}</b>
                {c.href ? <a href={c.href}>{c.text}</a> : <span>{c.text}</span>}
              </div>
            </div>
          ))}
        </div>
        <form className="contact-form" onSubmit={onSubmit}>
          <h2>Send us a message</h2>
          <div className="field-grid">
            <label className="checkout-field">
              <span>Your name</span>
              <input name="name" required autoComplete="name" placeholder="Name" />
            </label>
            <label className="checkout-field">
              <span>Email address</span>
              <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
            </label>
            <label className="checkout-field field-wide">
              <span>Subject</span>
              <input name="subject" placeholder="How can we help?" />
            </label>
            <label className="checkout-field field-wide">
              <span>Message</span>
              <textarea name="message" required rows="5" placeholder="Write your message..." />
            </label>
          </div>
          <button type="submit" className="button detail-add place-order">SEND MESSAGE</button>
          {sent && (
            <p className="added-note" role="status">
              ✓ Thank you! Your email app should open so you can send your message.
            </p>
          )}
        </form>
      </div>
    </PageLayout>
  );
}