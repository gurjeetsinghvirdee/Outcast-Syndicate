import type { Metadata } from "next";

export const metadata: Metadata = { title: "Refund Policy - The Outcast Syndicate" };

export default function RefundPage() {
  return (
    <>
      <nav className="nav"><div className="nav-inner"><a href="/" className="nav-brand">The Outcast Syndicate</a><div className="nav-links"><a href="/#services">Services</a><a href="/#work">Work</a><a href="/#contact">Contact</a></div></div></nav>
      <div className="wrap">
        <section className="hero" style={{ paddingBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 1.2rem + 2.5vw, 3.2rem)" }}>Refund Policy</h1>
          <p className="hero-sub">Last updated October 2026</p>
        </section>

        <section className="section legal-section">
          <div className="legal-body">
            <h3>1. Before Work Begins</h3>
            <p>If you cancel before we start working on your project, you are eligible for a full refund of any advance payment made.</p>

            <h3>2. Work in Progress</h3>
            <p>If you cancel after work has started, the refund is calculated based on the percentage of work not yet completed. Work already delivered or in progress is non-refundable.</p>

            <h3>3. After Delivery</h3>
            <p>Once final deliverables have been handed over and approved by the client, no refunds will be issued.</p>

            <h3>4. Revisions vs. Refunds</h3>
            <p>If you are not satisfied with the delivered work, we encourage you to use the included revision rounds (2-3 per project) before requesting a refund. We are committed to getting it right.</p>

            <h3>5. Quality Disputes</h3>
            <p>If you believe the delivered work does not meet the agreed specifications, contact us within 7 days of delivery. We will review the work against the original brief and either revise it or issue a partial refund.</p>

            <h3>6. Refund Timeline</h3>
            <p>Approved refunds are processed within 7 business days to the original payment method.</p>

            <h3>7. Non-refundable Items</h3>
            <ul>
              <li>Third-party costs incurred on your behalf (domain purchases, stock assets, software licenses)</li>
              <li>Rush or priority delivery fees</li>
              <li>Work completed and delivered per the agreed brief</li>
            </ul>

            <h3>8. How to Request a Refund</h3>
            <p>Email us with your project details and reason for the refund request. We will respond within 48 hours with a resolution.</p>
          </div>
        </section>

        <footer className="footer"><div className="footer-links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/dpa">Data Processing</a><a href="/refund">Refund Policy</a><a href="/support">Contact &amp; Support</a><a href="/faq">FAQ</a></div><p>&copy; {new Date().getFullYear()} The Outcast Syndicate</p></footer>
      </div>
    </>
  );
}
