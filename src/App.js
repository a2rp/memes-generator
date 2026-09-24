import { useEffect, useState } from "react";
import {
  FaCode,
  FaCodepen,
  FaCoffee,
  FaFacebook,
  FaGithub,
  FaHeart,
  FaLinkedin,
  FaMailBulk,
  FaPatreon,
  FaYoutube,
} from "react-icons/fa";
import { FiArrowUp, FiImage, FiMenu, FiX } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemesGenerator from "./memesGenerator";
import styles from "./App.module.scss";

const footerLinks = [
  { label: "Portfolio", href: "https://www.ashishranjan.net/", icon: FaCode },
  { label: "GitHub", href: "https://github.com/a2rp", icon: FaGithub },
  { label: "CodePen", href: "https://codepen.io/ash1198", icon: FaCodepen },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", icon: FaLinkedin },
  { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", icon: FaFacebook },
  { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", icon: FaYoutube },
  { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: FaMailBulk },
  { label: "Support", href: "https://a2rp-donation-page.netlify.app/", icon: FaHeart },
  { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/a2rp", icon: FaCoffee },
  { label: "Patreon", href: "https://patreon.com/a2rp", icon: FaPatreon },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 260);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" onClick={closeMenu} aria-label="Meme Generator home">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Ashish Ranjan logo" />
          <span><small>React image tool</small><strong>Meme Generator</strong></span>
        </a>
        <button className={styles.menuButton} type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-expanded={mobileMenuOpen} aria-controls="main-navigation" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
          {mobileMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
        <nav id="main-navigation" className={`${styles.navigation} ${mobileMenuOpen ? styles.navigationOpen : ""}`} aria-label="Main navigation">
          <a href="#generator" onClick={closeMenu}><FiImage aria-hidden="true" /> Create a meme</a>
          <a href="#about" onClick={closeMenu}><FaCode aria-hidden="true" /> How it works</a>
          <a href="https://github.com/a2rp/memes-generator" target="_blank" rel="noopener noreferrer" onClick={closeMenu}><FaGithub aria-hidden="true" /> Source</a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="page-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Create something shareable</p>
            <h1 id="page-title">Turn a template into your next meme.</h1>
            <p className={styles.heroText}>Add top and bottom text, browse popular templates, and save your favourite result as a PNG.</p>
            <a className={styles.heroButton} href="#generator"><FiImage aria-hidden="true" /> Start creating</a>
          </div>
          <div className={styles.heroImage}>
            <img src={`${process.env.PUBLIC_URL}/preview.png`} alt="Meme generator preview" />
            <span>Simple controls. Quick results.</span>
          </div>
        </section>

        <MemesGenerator />

        <section id="about" className={styles.aboutSection} aria-labelledby="about-title">
          <p className={styles.eyebrow}>A small creative tool</p>
          <h2 id="about-title">Make the idea, then make it yours.</h2>
          <div className={styles.aboutCards}>
            <article><span>01</span><h3>Choose a template</h3><p>Load the latest templates from Imgflip and pick the image that fits your idea.</p></article>
            <article><span>02</span><h3>Add your text</h3><p>Keep the message short and readable with separate top and bottom text controls.</p></article>
            <article><span>03</span><h3>Save as PNG</h3><p>Download a clean image of any generated card directly from the browser.</p></article>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div><p className={styles.eyebrow}>Keep exploring</p><p className={styles.footerText}>More frontend experiments and practical projects.</p></div>
          <nav className={styles.socialLinks} aria-label="Social and support links">
            {footerLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}><Icon aria-hidden="true" /><span className={styles.srOnly}>{label}</span></a>)}
          </nav>
        </div>
        <div className={styles.footerBottom}>Copyright © {new Date().getFullYear()} <a href="https://www.ashishranjan.net" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></div>
      </footer>

      <button className={`${styles.topButton} ${showTopButton ? styles.topButtonVisible : ""}`} type="button" onClick={scrollToTop} aria-label="Go to top"><FiArrowUp aria-hidden="true" /></button>
      <ToastContainer position="bottom-right" autoClose={2800} theme="colored" />
    </div>
  );
}

export default App;