import type { Metadata } from "next";

export const metadata: Metadata = { title: "FAQ - The Outcast Syndicate" };

export default function FaqPage() {
  return (
    <>
      <nav className="nav"><div className="nav-inner"><a href="/" className="nav-brand">The Outcast Syndicate</a><div className="nav-links"><a href="/#services">Services</a><a href="/#work">Work</a><a href="/#contact">Contact</a></div></div></nav>
      <div className="wrap">
        <section className="hero" style={{ paddingBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 1.2rem + 2.5vw, 3.2rem)" }}>FAQ</h1>
          <p className="hero-sub">Common questions answered</p>
        </section>

        <section className="section legal-section">
          <div className="legal-body">
            <h3>What services do you offer?</h3>
            <p>Website development, video editing, copywriting, data entry, technical writing, UI/UX design, graphic design, SEO, social media management, app development, research, and automation scripting.</p>

            <h3>How do I start a project?</h3>
            <p>Fill out the contact form on our homepage with your requirements. We will get back to you within 24 hours with questions or a quote.</p>

            <h3>How much do you charge?</h3>
            <p>Pricing depends on the scope and complexity of the project. We provide a detailed quote after understanding your requirements. All prices are in USD.</p>

            <h3>What is your payment structure?</h3>
            <p>Projects under $200 require full payment upfront. Larger projects are split 50/50 - half upfront, half on delivery. We accept PayPal, Wise, and cryptocurrency.</p>

            <h3>How long does a project take?</h3>
            <p>Timelines vary by project. A landing page may take 3-5 days, a full web app 2-6 weeks, a video edit 2-7 days. We share estimated timelines before starting.</p>

            <h3>Do you offer revisions?</h3>
            <p>Yes. Every project includes 2-3 rounds of revisions at no extra cost. Additional revisions are charged at our hourly rate.</p>

            <h3>Can I see work in progress?</h3>
            <p>Absolutely. We share progress updates and previews at key milestones so you can give feedback early.</p>

            <h3>Who will work on my project?</h3>
            <p>Our team assigns the best-suited person based on the project type. You will have a single point of contact throughout.</p>

            <h3>Do you sign NDAs?</h3>
            <p>Yes. We are happy to sign an NDA before discussing sensitive projects. All client information is treated as confidential by default.</p>

            <h3>What if I am not happy with the result?</h3>
            <p>Use your included revision rounds first. If you are still unsatisfied, contact us within 7 days of delivery and we will work out a resolution. See our Refund Policy for details.</p>

            <h3>Do you offer ongoing support?</h3>
            <p>We provide 7 days of free post-delivery support for bug fixes. Ongoing maintenance and support can be arranged as a retainer.</p>

            <h3>Can you work with my existing team or codebase?</h3>
            <p>Yes. We can join your workflow, use your tools, and work within your existing codebase or brand guidelines.</p>

            <h3>What timezone do you work in?</h3>
            <p>IST (UTC+5:30), Monday to Saturday, 10 AM to 8 PM. We accommodate other timezones for async communication.</p>

            <h3>Do you work on weekends or holidays?</h3>
            <p>Rush and weekend work can be arranged for an additional fee. Standard projects follow our regular business hours.</p>
          </div>
        </section>

        <footer className="footer"><div className="footer-links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/dpa">Data Processing</a><a href="/refund">Refund Policy</a><a href="/support">Contact &amp; Support</a><a href="/faq">FAQ</a></div><p>&copy; {new Date().getFullYear()} The Outcast Syndicate</p></footer>
      </div>
    </>
  );
}
