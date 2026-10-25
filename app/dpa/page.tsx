import type { Metadata } from "next";

export const metadata: Metadata = { title: "Data Processing Agreement - The Outcast Syndicate" };

export default function DpaPage() {
  return (
    <>
      <nav className="nav"><div className="nav-inner"><a href="/" className="nav-brand">The Outcast Syndicate</a><div className="nav-links"><a href="/#services">Services</a><a href="/#work">Work</a><a href="/#contact">Contact</a></div></div></nav>
      <div className="wrap">
        <section className="hero" style={{ paddingBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 1.2rem + 2.5vw, 3.2rem)" }}>Data Processing Agreement</h1>
          <p className="hero-sub">Last updated October 2026</p>
        </section>

        <section className="section legal-section">
          <div className="legal-body">
            <h3>1. Purpose</h3>
            <p>This Data Processing Agreement ("DPA") governs how The Outcast Syndicate ("Processor") handles personal data on behalf of clients ("Controller") during the delivery of contracted services.</p>

            <h3>2. Scope</h3>
            <p>This DPA applies when we process personal data as part of a project, including but not limited to: handling customer databases, processing user records, managing content that contains personal information, or performing data entry involving personal data.</p>

            <h3>3. Types of Data Processed</h3>
            <ul>
              <li>Names and contact details</li>
              <li>Business records and customer data</li>
              <li>Content and files shared for project delivery</li>
              <li>Any other personal data required for the contracted work</li>
            </ul>

            <h3>4. Processing Obligations</h3>
            <p>We will:</p>
            <ul>
              <li>Process data only as instructed by the client and only for the purpose of delivering the agreed services</li>
              <li>Not use client data for any other purpose</li>
              <li>Not share, sell, or disclose data to third parties unless required for service delivery or by law</li>
              <li>Ensure all team members handling data are bound by confidentiality</li>
            </ul>

            <h3>5. Security Measures</h3>
            <p>We implement appropriate technical and organizational measures including:</p>
            <ul>
              <li>Encrypted file transfer and storage</li>
              <li>Access limited to team members assigned to the project</li>
              <li>Secure communication channels</li>
              <li>Regular deletion of data after project completion</li>
            </ul>

            <h3>6. Sub-processors</h3>
            <p>We may use sub-processors (e.g. cloud storage, hosting) to deliver services. We ensure sub-processors provide adequate data protection. A list of sub-processors is available on request.</p>

            <h3>7. Data Retention and Deletion</h3>
            <p>Client data is retained only for the duration of the project plus 90 days. After that, all data is permanently deleted unless the client requests extended retention in writing.</p>

            <h3>8. Data Breach Notification</h3>
            <p>In the event of a data breach affecting client data, we will notify the client within 48 hours of becoming aware, providing details of the breach, affected data, and remedial actions taken.</p>

            <h3>9. Client Rights</h3>
            <p>The client may request access to, correction of, or deletion of their data at any time. We will comply within 7 business days.</p>

            <h3>10. Return of Data</h3>
            <p>Upon project completion or termination, we will return all client data in a standard format and delete our copies within 30 days, providing confirmation of deletion on request.</p>
          </div>
        </section>

        <footer className="footer"><div className="footer-links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/dpa">Data Processing</a><a href="/refund">Refund Policy</a><a href="/support">Contact &amp; Support</a><a href="/faq">FAQ</a></div><p>&copy; {new Date().getFullYear()} The Outcast Syndicate</p></footer>
      </div>
    </>
  );
}
