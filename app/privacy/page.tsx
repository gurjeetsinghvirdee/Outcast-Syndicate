import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy - The Outcast Syndicate" };

export default function PrivacyPage() {
  return (
    <>
      <nav className="nav"><div className="nav-inner"><a href="/" className="nav-brand">The Outcast Syndicate</a><div className="nav-links"><a href="/#services">Services</a><a href="/#work">Work</a><a href="/#contact">Contact</a></div></div></nav>
      <div className="wrap">
        <section className="hero" style={{ paddingBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 1.2rem + 2.5vw, 3.2rem)" }}>Privacy Policy</h1>
          <p className="hero-sub">Last updated October 2026</p>
        </section>

        <section className="section legal-section">
          <div className="legal-body">
            <h3>1. Introduction</h3>
            <p>The Outcast Syndicate ("we", "us", "our") is a freelance services team. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or engage our services.</p>

            <h3>2. Information We Collect</h3>
            <p><strong>Contact form data:</strong> Name, email address, service preference, and your message.</p>
            <p><strong>Project-related data:</strong> Files, briefs, credentials, or other materials you share with us during a project.</p>
            <p><strong>Communication data:</strong> Emails, messages, and call records related to our work.</p>
            <p>We do not use cookies, analytics trackers, or any third-party tracking scripts on this website.</p>

            <h3>3. How We Use Your Information</h3>
            <ul>
              <li>To respond to your enquiries</li>
              <li>To deliver the services you hire us for</li>
              <li>To communicate about project progress and billing</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h3>4. Data Sharing</h3>
            <p>We do not sell, rent, or trade your personal information. We may share data only with:</p>
            <ul>
              <li>Team members directly working on your project</li>
              <li>Service providers essential to delivery (e.g. hosting, payment processors) under strict confidentiality</li>
              <li>Legal authorities if required by law</li>
            </ul>

            <h3>5. Data Retention</h3>
            <p>Contact form submissions are retained in our email for the duration of communication. Project files are retained for 90 days after project completion, then deleted unless you request otherwise.</p>

            <h3>6. Data Security</h3>
            <p>We use reasonable security measures including encrypted email, secure file sharing, and access controls. However, no method of transmission over the internet is 100% secure.</p>

            <h3>7. Third-Party Services</h3>
            <p>This site is hosted on Vercel. YouTube thumbnails are loaded from YouTube servers. No other third-party services are embedded on this website.</p>

            <h3>8. Your Rights</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>To exercise these rights, email us. We will respond within 7 business days.</p>

            <h3>9. Children</h3>
            <p>Our services are not directed to individuals under 18. We do not knowingly collect data from minors.</p>

            <h3>10. Changes</h3>
            <p>We may update this policy. Changes will be posted on this page with a revised date.</p>
          </div>
        </section>

        <footer className="footer"><div className="footer-links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/dpa">Data Processing</a><a href="/refund">Refund Policy</a><a href="/support">Contact &amp; Support</a><a href="/faq">FAQ</a></div><p>&copy; {new Date().getFullYear()} The Outcast Syndicate</p></footer>
      </div>
    </>
  );
}
