import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact & Support - The Outcast Syndicate" };

export default function SupportPage() {
  return (
    <>
      <nav className="nav"><div className="nav-inner"><a href="/" className="nav-brand">The Outcast Syndicate</a><div className="nav-links"><a href="/#services">Services</a><a href="/#work">Work</a><a href="/#contact">Contact</a></div></div></nav>
      <div className="wrap">
        <section className="hero" style={{ paddingBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 1.2rem + 2.5vw, 3.2rem)" }}>Contact &amp; Support</h1>
          <p className="hero-sub">How to reach us and what to expect</p>
        </section>

        <section className="section legal-section">
          <div className="legal-body">
            <h3>General Enquiries</h3>
            <p>Use the contact form on our <a href="/#contact">homepage</a> for new project enquiries. Submissions go directly to our team inbox and we typically respond within 24 hours.</p>

            <h3>Existing Project Support</h3>
            <p>If you have an ongoing project with us, reply to any existing email thread or reach out to your assigned team contact directly. This ensures the right person sees your message first.</p>

            <h3>Urgent Requests</h3>
            <p>For time-sensitive issues (site down, critical bug, deadline change), mark your email as urgent. We prioritize these and aim to respond within 4 hours during business hours.</p>

            <h3>Business Hours</h3>
            <p>We operate Monday to Saturday, 10:00 AM to 8:00 PM IST (UTC+5:30). Messages received outside these hours are addressed the next business day.</p>

            <h3>Response Times</h3>
            <ul>
              <li>New enquiries: within 24 hours</li>
              <li>Project updates: within 12 hours</li>
              <li>Urgent issues: within 4 hours (business hours)</li>
              <li>Refund/billing queries: within 48 hours</li>
            </ul>

            <h3>Feedback and Complaints</h3>
            <p>We take feedback seriously. If you are not happy with our service, email us with details. We will acknowledge your complaint within 24 hours and provide a resolution within 5 business days.</p>

            <h3>Post-delivery Support</h3>
            <p>We offer 7 days of free support after project delivery for bug fixes and minor adjustments related to the delivered work. Extended support or maintenance can be arranged as a separate engagement.</p>
          </div>
        </section>

        <footer className="footer"><div className="footer-links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/dpa">Data Processing</a><a href="/refund">Refund Policy</a><a href="/support">Contact &amp; Support</a><a href="/faq">FAQ</a></div><p>&copy; {new Date().getFullYear()} The Outcast Syndicate</p></footer>
      </div>
    </>
  );
}
