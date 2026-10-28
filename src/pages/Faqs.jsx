 
import PageLayout from "../components/Pagelayout";
const faqs = [
  ["How long does delivery take?", "Orders are prepared in 1–2 working days. UK standard delivery then takes 3–5 working days and express takes 1–2 working days."],
  ["Is shipping free?", "Yes, standard UK shipping is free on orders over £50. Costs for other orders are shown at checkout."],
  ["Can I return an item?", "Yes. Unworn items with tags can be returned within 30 days of delivery. See our Returns & Refunds page for details."],
  ["How do I choose the right size?", "Check our Size Guide and measure your child's height and weight. If they're between sizes, we recommend sizing up."],
  ["Are your products safe for babies?", "We choose soft, durable materials and follow age guidance on every product. Always supervise young children with toys and bath items."],
  ["How do I track my order?", "We email a tracking link as soon as your order ships. Contact us if you haven't received it within 3 working days."],
  ["Which payment methods do you accept?", "Secure payment options are shown at checkout. We never store your full card details."],
  ["Do you ship internationally?", "Yes, to selected countries including the US, Canada and Australia. Delivery takes about 7–14 working days."],
  ["Can I change or cancel my order?", "Contact us as soon as possible. If your order hasn't shipped yet we'll gladly change or cancel it."],
  ["How can I contact you?", "Use our Contact page or email us. We usually reply within one working day."],
];

export default function FAQs() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <PageLayout
      seoTitle="FAQs – Frequently Asked Questions"
      description="Answers to common questions about TinyNest orders, delivery, returns, sizing, safety and payments."
      eyebrow="HELP"
      heading="Frequently Asked Questions"
      intro="Quick answers to the things parents ask us most."
      crumbs={[{ name: "FAQs" }]}
      schema={schema}
    >
      <div className="faq-list">
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </PageLayout>
  );
}