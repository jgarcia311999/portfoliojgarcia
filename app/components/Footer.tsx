import { Locale, contentByLocale } from "../data/content";

export function Footer({ locale }: { locale: Locale }) {
  const content = contentByLocale[locale];
  const nav = [
    { href: "#work", label: content.nav.projects },
    { href: "#services", label: content.nav.services },
    { href: "#about", label: content.nav.about },
    { href: "#contact", label: content.nav.contact },
  ];

  return (
    <footer id="contact" className="site-footer">
      <div className="footer-shell">
        <div className="footer-wordmark">{content.footer.wordmark}</div>

        <div className="footer-contact-card">
          <p className="section-kicker">{content.footer.contactKicker}</p>
          <h3 className="footer-contact-title">{content.footer.contactTitle}</h3>
          <p className="footer-contact-body">{content.footer.contactBody}</p>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">{content.footer.copy}</p>

          <nav className="footer-nav">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer-social">
            <a href="https://github.com/jgarcia311999">{content.footer.social.github}</a>
            <a href="#">{content.footer.social.linkedin}</a>
            <a href="mailto:hola@jgarcia3199.dev">{content.footer.social.email}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
