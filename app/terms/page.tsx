import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service - The Outcast Syndicate" };

export default function TermsPage() {
  return (
    <>
      <nav className="nav"><div className="nav-inner"><a href="/" className="nav-brand">The Outcast Syndicate</a><div className="nav-links"><a href="/#services">Services</a><a href="/#work">Work</a><a href="/#contact">Contact</a></div></div></nav>
      <div className="wrap">
        <section className="hero" style={{ paddingBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 1.2rem + 2.5vw, 3.2rem)" }}>Terms of Service</h1>
          <p className="hero-sub">Last updated October 2026</p>
        </section>

        <section className="section legal-section">
          <div className="legal-body">
            <h3>1. Agreement</h3>
            <p>By engaging The Outcast Syndicate for any service, you agree to these terms. If you do not agree, please do not use our services.</p>

            <h3>2. Services</h3>
            <p>We provide freelance services including web development, video editing, copywriting, data entry, technical writing, UI/UX design, graphic design, SEO, social media management, app development, and automation. The exact scope is agreed before work begins.</p>

            <h3>3. Project Scope and Approval</h3>
            <p>All deliverables, timelines, and pricing are confirmed in writing (email or message) before work starts. Changes to scope may result in revised pricing and timelines, communicated before proceeding.</p>

            <h3>4. Pricing</h3>
            <p>All prices are quoted in USD unless otherwise agreed. Pricing is project-based or hourly as discussed before starting.</p>

            <h3>5. Payment</h3>
            <p>For projects under $200: full payment upfront. For larger projects: 50% advance before work begins, remaining 50% upon delivery. Custom schedules can be arranged for long-term engagements. We accept PayPal, Wise, and cryptocurrency. Payment details are shared on the invoice.</p>

            <h3>6. Intellectual Property</h3>
            <p>Upon full payment, all deliverables and intellectual property rights transfer to the client, unless otherwise agreed in writing. We reserve the right to showcase completed work in our portfolio unless the client explicitly requests otherwise.</p>

            <h3>7. Confidentiality</h3>
            <p>All client information, business details, and project materials are treated as confidential. We will not share your information with any third party without written consent.</p>

            <h3>8. Revisions</h3>
            <p>Each project includes 2-3 rounds of revisions at no extra cost. Additional revisions beyond the agreed scope are charged at our standard hourly rate.</p>

            <h3>9. Timelines</h3>
            <p>Estimated delivery dates are shared before starting. Delays caused by the client (late feedback, missing materials) may extend the timeline. We will communicate any delays from our side promptly.</p>

            <h3>10. Limitation of Liability</h3>
            <p>Our total liability for any claim shall not exceed the amount paid for the specific project. We are not liable for indirect, incidental, or consequential damages including lost profits or data.</p>

            <h3>11. Termination</h3>
            <p>Either party may terminate a project with written notice. Payment is due for all work completed up to the termination date. See our Refund Policy for details.</p>

            <h3>12. Governing Law</h3>
            <p>These terms are governed by the laws of India. Disputes will be resolved through mutual discussion first, then arbitration if needed.</p>

            <h3>13. Changes</h3>
            <p>We may update these terms. Changes apply to new projects only and will be posted on this page.</p>
          </div>
        </section>

        <footer className="footer"><div className="footer-links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/dpa">Data Processing</a><a href="/refund">Refund Policy</a><a href="/support">Contact &amp; Support</a><a href="/faq">FAQ</a></div><p>&copy; {new Date().getFullYear()} The Outcast Syndicate</p></footer>
      </div>
    </>
  );
}
