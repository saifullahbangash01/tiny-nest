import { useState } from "react";
import { Send } from "lucide-react";
 
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  };

  return (
    <div className="arrivals-newsletter">
      <h3>Join our newsletter</h3>
      <p>Get new arrivals and little offers straight to your inbox.</p>
      <form onSubmit={onSubmit} noValidate={false}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setDone(false);
          }}
          placeholder="Your email address"
          aria-label="Email address"
          autoComplete="email"
        />
        <button type="submit">
          Subscribe <Send size={13} aria-hidden="true" />
        </button>
      </form>
      {done && (
        <small className="newsletter-ok" role="status">
          ✓ Thank you for subscribing!
        </small>
      )}
    </div>
  );
}