/* Axicon Developers — Concrete / Brass Editorial
   This page treats architecture as the hero, uses asymmetrical editorial rhythm, and reserves Oxide Brass for wayfinding and actions. */
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Instagram, Linkedin, Menu, MoveDown, Plus, X } from "lucide-react";

const HERO_VIDEO = "/download-scrub.mp4";
const PROJECT_IMAGES = [
  "/manus-storage/axicon-project-01_5c810859.png",
  "/manus-storage/axicon-project-02_b8de233c.png",
  "/manus-storage/axicon-project-03_201ba5a0.png",
];
const MARK = "/manus-storage/axicon-mark_86170f26.png";

const projects = [
  { number: "01", name: "The Line House", place: "Al Barsha South · Dubai", type: "Private Residence", image: PROJECT_IMAGES[0], copy: "A low-slung residence shaped by shade, stone, and long views." },
  { number: "02", name: "Meraas Court", place: "Jumeirah Village · Dubai", type: "Collection of 18 Homes", image: PROJECT_IMAGES[1], copy: "Quiet courtyards and sun-washed interiors, made for a slower rhythm." },
  { number: "03", name: "Atelier No. 7", place: "Al Furjan · Dubai", type: "Design-led Apartments", image: PROJECT_IMAGES[2], copy: "Tactile material, generous light, and a new standard of everyday living." },
];

function ScrollVideoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrubFrameRef = useRef<number | null>(null);
  const layoutFrameRef = useRef<number | null>(null);
  const targetTime = useRef(0);
  const displayedTime = useRef(0);
  const lastFrameTime = useRef<number | null>(null);
  const seekPending = useRef(false);
  const readyRef = useRef(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const progressValueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.muted = true;
    const onMetadata = () => {
      readyRef.current = true;
      scheduleScrub();
    };
    const onSeeked = () => {
      seekPending.current = false;
      scheduleScrub();
    };
    video.addEventListener("loadedmetadata", onMetadata);
    video.addEventListener("seeked", onSeeked);

    const tick = (timestamp: number) => {
      scrubFrameRef.current = null;
      const duration = video.duration || 10;
      const elapsed = lastFrameTime.current === null ? 1 / 60 : Math.min((timestamp - lastFrameTime.current) / 1000, 0.05);
      lastFrameTime.current = timestamp;
      if (readyRef.current && Number.isFinite(duration) && !seekPending.current) {
        const nextTime = targetTime.current * duration;
        const atEndpoint = targetTime.current === 0 || targetTime.current === 1;
        if (atEndpoint) {
          displayedTime.current = nextTime;
        } else {
          const smoothing = 1 - Math.exp(-14 * elapsed);
          displayedTime.current += (nextTime - displayedTime.current) * smoothing;
        }
        if (Math.abs(video.currentTime - displayedTime.current) > 0.033) {
          seekPending.current = true;
          try {
            video.currentTime = displayedTime.current;
          } catch {
            seekPending.current = false;
          }
        }
        if (Math.abs(nextTime - displayedTime.current) > 0.01 && !seekPending.current) scheduleScrub();
      }
    };

    function scheduleScrub() {
      if (scrubFrameRef.current === null) scrubFrameRef.current = requestAnimationFrame(tick);
    }

    const update = () => {
      layoutFrameRef.current = null;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const next = Math.min(1, Math.max(0, -rect.top / travel));
      targetTime.current = next;
      const progress = progressRef.current;
      const progressValue = progressValueRef.current;
      if (progress) progress.style.transform = `scaleX(${next})`;
      if (progressValue) progressValue.textContent = `${String(Math.round(next * 100)).padStart(2, "0")}%`;
      scheduleScrub();
    };
    const scheduleUpdate = () => {
      if (layoutFrameRef.current === null) layoutFrameRef.current = requestAnimationFrame(update);
    };
    const onScroll = () => {
      scheduleUpdate();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    return () => {
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", scheduleUpdate);
      if (scrubFrameRef.current !== null) cancelAnimationFrame(scrubFrameRef.current);
      if (layoutFrameRef.current !== null) cancelAnimationFrame(layoutFrameRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="hero-chapter">
      <div className="hero-pin">
        <video ref={videoRef} className="hero-video" src={HERO_VIDEO} poster={PROJECT_IMAGES[0]} playsInline preload="auto" aria-label="A house transforming from an empty plot into a finished modern residence" />
        <div className="hero-wash" />
        <div className="hero-gridline hero-gridline-left" />
        <div className="hero-gridline hero-gridline-right" />
        <div className="hero-topline"><span>AXICON / 01</span><span>EST. 2014 · DUBAI</span></div>
        <div className="hero-copy">
          <p className="eyebrow light">BUILDING VISIONS · CREATING LEGACIES</p>
          <h1>Axicon<br /><em>Developers</em></h1>
          <p className="hero-note">From first line to final light,<br />we make space for what matters.</p>
        </div>
        <div className="hero-bottomline">
          <div className="scroll-cue"><MoveDown size={15} strokeWidth={1.2} /><span>SCROLL TO EXPLORE</span></div>
          <div className="progress-line"><span ref={progressRef} /></div>
          <span ref={progressValueRef} className="progress-value">00%</span>
        </div>
      </div>
    </section>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const next = window.scrollY > window.innerHeight * 0.55;
      setScrolled((current) => current === next ? current : next);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);
  const links = [["About", "about"], ["Projects", "projects"], ["Approach", "approach"], ["Contact", "contact"]];
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <a className="brand" href="#experience" aria-label="Axicon Developers home"><img src={MARK} alt="" /><span>AXICON <i>DEVELOPERS</i></span></a>
    <nav className={open ? "nav-open" : ""} aria-label="Primary navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={13} /></a>)}</nav>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={20} /> : <Menu size={20} />}</button>
  </header>;
}

export default function Home() {
  const [sent, setSent] = useState(false);
  return <div className="site-shell">
    <Header />
    <ScrollVideoHero />
    <main>
      <section id="about" className="about-section page-section">
        <div className="section-marker"><span>02</span><span>THE AXICON POINT OF VIEW</span></div>
        <div className="about-layout">
          <div><p className="eyebrow">ABOUT AXICON</p><h2>We build<br /><em>more than</em><br />properties.</h2></div>
          <div className="about-copy"><p className="lead">We create thoughtfully designed spaces where architecture, quality, and modern living come together.</p><p>Axicon Developers is a Dubai-based development studio with a clear belief: the best addresses are felt before they are explained. We work with considered architects, enduring materials, and an exacting eye for the details that make a building feel like home.</p><a className="text-link" href="#approach">Our approach <ArrowDownRight size={16} /></a></div>
        </div>
        <div className="stats"><div><strong>10<span>+</span></strong><small>YEARS OF CRAFT</small></div><div><strong>04</strong><small>ACTIVE DEVELOPMENTS</small></div><div><strong>01</strong><small>CONSIDERED APPROACH</small></div><div><strong>∞</strong><small>LONG-TERM VALUE</small></div></div><div className="pull-quote"><span className="pull-quote-rule" /><p>“The detail is not the detail.<br /><em>It makes the design.</em>”</p><small>— CHARLES EAMES / A PRINCIPLE WE KEEP</small></div>
      </section>

      <section id="projects" className="projects-section page-section dark-panel">
        <div className="section-marker light-marker"><span>03</span><span>SELECTED WORK</span></div>
        <div className="section-heading"><div><p className="eyebrow light">FEATURED PROJECTS</p><h2>Spaces with<br /><em>staying power.</em></h2></div><p>Three studies in living well.<br />More coming into view.</p></div>
        <div className="project-list">{projects.map((project, i) => <article className={`project-card card-${i + 1}`} key={project.name}><div className="project-image-wrap"><img src={project.image} alt={`${project.name}, ${project.type}`} loading="lazy" /><span className="project-number">{project.number}</span><a href="#contact" className="project-arrow" aria-label={`Enquire about ${project.name}`}><ArrowUpRight size={19} /></a></div><div className="project-meta"><div><p className="eyebrow light">{project.type}</p><h3>{project.name}</h3><p>{project.place}</p></div><p className="project-description">{project.copy}</p></div></article>)}</div>
      </section>

      <section id="approach" className="approach-section page-section">
        <div className="section-marker"><span>04</span><span>THE AXICON STANDARD</span></div>
        <div className="approach-layout"><div className="approach-intro"><p className="eyebrow">WHY AXICON</p><h2>Made to be<br /><em>lived in.</em></h2><p>Good architecture is not decoration. It is the quiet intelligence behind the way a day unfolds.</p></div><div className="principles">{["Stone chosen for weather", "Light that travels deep", "Joinery without compromise", "Rooms between rooms", "A promise kept in detail", "Value beyond the handover"].map((item, i) => <div className="principle" key={item}><span>0{i + 1}</span><h3>{item}</h3><Plus size={16} /></div>)}</div></div>
      </section>

      <section className="cta-section"><div className="cta-inner"><p className="eyebrow light">THE NEXT CHAPTER</p><h2>Your next address<br /><em>starts here.</em></h2><p>Discover premium spaces designed for modern living.</p><a className="button-brass" href="#contact">Explore our projects <ArrowUpRight size={16} /></a></div><div className="cta-stamp">AX / 2024<br /><span>BUILT TO LAST</span></div></section>

      <section id="contact" className="contact-section page-section"><div className="section-marker"><span>05</span><span>START A CONVERSATION</span></div><div className="contact-layout"><div className="contact-intro"><p className="eyebrow">CONTACT</p><h2>Let’s make<br /><em>room for more.</em></h2><p>For project enquiries, partnerships, or a considered conversation about your next address, we’d love to hear from you.</p><div className="contact-details"><div><small>CALL</small><a href="tel:+97144550144">+971 4 455 0144</a></div><div><small>WRITE</small><a href="mailto:hello@axicondevelopers.com">hello@axicondevelopers.com</a></div><div><small>FIND US</small><span>Al Quoz Creative Zone<br />Dubai, UAE</span></div></div></div><form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}><label>Full name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@company.com" /></label><label>Phone number<input placeholder="+971" /></label><label>Project / property interest<select defaultValue=""><option value="" disabled>Select an option</option><option>The Line House</option><option>Meraas Court</option><option>Atelier No. 7</option><option>Partnership enquiry</option></select></label><label>Message<textarea rows={4} placeholder="Tell us a little about what you are looking for..." /></label><button className="form-submit" type="submit">{sent ? "Inquiry received" : "Submit inquiry"}<ArrowUpRight size={17} /></button>{sent && <p className="form-success" role="status">Thank you. A member of our team will be in touch shortly.</p>}</form></div></section>
    </main>
    <footer className="site-footer"><div className="footer-top"><a className="brand footer-brand" href="#experience"><img src={MARK} alt="" /><span>AXICON <i>DEVELOPERS</i></span></a><p>Building visions.<br /><em>Creating legacies.</em></p><div className="footer-social"><a href="#contact" aria-label="Instagram"><Instagram size={18} /></a><a href="#contact" aria-label="LinkedIn"><Linkedin size={18} /></a></div></div><div className="footer-bottom"><span>© 2024 Axicon Developers</span><span>Dubai · United Arab Emirates</span><span>Built with intention <ArrowUpRight size={13} /></span></div></footer>
  </div>;
}
