import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  CirclePlay,
  Menu,
  MoveUpRight,
  Network,
  Radio,
  ScanLine,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'
import './styles.css'

//Official ARXEN assets — unchanged, used exactly as uploaded.
//White variant sits on the dark navbar/footer backgrounds.
const LOGO_LOCKUP = '/assets/logos/logo-wordmark-white.png'
const LOGO_FOOTER = '/assets/logos/logo-wordmark-white.png'
const LOGO_COMPACT = '/assets/logos/logo-wordmark-white.png'

function Logo({ compact = false, footer = false }) {
  const src = footer ? LOGO_FOOTER : compact ? LOGO_COMPACT : LOGO_LOCKUP
  return (
    <a className={`brand-mark ${compact ? 'is-compact' : ''} ${footer ? 'is-footer' : ''}`} href="#top" aria-label="ARXEN home">
      <img src={src} alt="ARXEN AI Systems" />
    </a>
  )
}

function GridTexture() {
  return <div className="grid-texture" aria-hidden="true" />
}

function SectionEyebrow({ children, number }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-dot" />
      <span>{number ? `${number} / ` : ''}{children}</span>
    </div>
  )
}

function Navbar({ onMenu }) {
  return (
    <header className="navbar">
      <div className="nav-shell">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#systems">Systems</a>
          <a href="#approach">Approach</a>
          <a href="#intelligence">Intelligence</a>
          <a href="#about">About</a>
        </nav>
        <a className="nav-cta" href="#contact">Start a conversation <ArrowUpRight size={15} strokeWidth={1.6} /></a>
        <button className="menu-trigger" aria-label="Open menu" onClick={onMenu}><Menu size={23} /></button>
      </div>
    </header>
  )
}

function MobileMenu({ open, onClose }) {
  if (!open) return null
  return (
    <div className="mobile-menu" role="dialog" aria-label="Mobile navigation">
      <div className="mobile-menu-head"><Logo compact /><button onClick={onClose} aria-label="Close menu"><X size={25} /></button></div>
      <nav>
        <a href="#systems" onClick={onClose}>Systems <span>01</span></a>
        <a href="#approach" onClick={onClose}>Approach <span>02</span></a>
        <a href="#intelligence" onClick={onClose}>Intelligence <span>03</span></a>
        <a href="#about" onClick={onClose}>About <span>04</span></a>
      </nav>
      <a className="mobile-menu-contact" href="#contact" onClick={onClose}>Start a conversation <ArrowUpRight size={16} /></a>
    </div>
  )
}

function SignalCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let frame
    let width = 0
    let height = 0
    const dots = []
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const makeDots = () => {
      dots.length = 0
      for (let i = 0; i < 44; i++) dots.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.5 + .4, phase: Math.random() * 6.28 })
    }
    const draw = (time) => {
      ctx.clearRect(0, 0, width, height)
      const t = time / 1000
      const cx = width * .58
      const cy = height * .48
      const max = Math.max(width, height) * .61
      for (let i = 0; i < 15; i++) {
        const radius = max * (i + 1) / 15
        ctx.beginPath()
        ctx.arc(cx, cy, radius, Math.PI * 1.07, Math.PI * 1.93)
        ctx.strokeStyle = `rgba(143, 255, 154, ${.025 + (i % 3) * .008})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.moveTo(width * .08, height * .84)
      ctx.bezierCurveTo(width * .28, height * .72, width * .45, height * .24, width * .88, height * .18)
      ctx.strokeStyle = 'rgba(133, 249, 147, .21)'
      ctx.lineWidth = 1
      ctx.stroke()
      dots.forEach((dot) => {
        const x = dot.x * width
        const y = dot.y * height
        const pulse = .35 + Math.sin(t * 1.7 + dot.phase) * .25
        ctx.beginPath()
        ctx.arc(x, y, dot.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(178, 255, 179, ${Math.max(.1, pulse)})`
        ctx.fill()
      })
      frame = requestAnimationFrame(draw)
    }
    resize(); makeDots(); frame = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas className="signal-canvas" ref={canvasRef} aria-hidden="true" />
}

function Hero() {
  return (
    <section className="hero" id="top">
      <GridTexture />
      <div className="hero-glow" />
      <SignalCanvas />
      <div className="hero-shell">
        <div className="hero-copy">
          <SectionEyebrow>AI SYSTEMS / EST. 2024</SectionEyebrow>
          <h1>Intelligence,<br /><em>engineered.</em></h1>
          <p className="hero-description">We design and deploy intelligent systems that turn complex operations into a competitive advantage.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">Explore our systems <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#approach"><CirclePlay size={17} strokeWidth={1.5} /> See how we think</a>
          </div>
        </div>
        <div className="hero-meta">
          <span>SCROLL TO EXPLORE</span><span className="scroll-line" />
        </div>
      </div>
      <div className="hero-bottom-line"><span>BUILDING THE INFRASTRUCTURE OF INTELLIGENCE</span><span>01 — 04</span></div>
    </section>
  )
}

const systems = [
  { icon: Network, no: '01', title: 'Cognitive<br />Architecture', copy: 'Systems that understand context, learn continuously, and make sense of what others miss.' },
  { icon: Zap, no: '02', title: 'Autonomous<br />Operations', copy: 'Intelligent workflows that move at machine speed while staying aligned with human intent.' },
  { icon: ScanLine, no: '03', title: 'Signal<br />Intelligence', copy: 'From noise to next move. Find the patterns that shape markets, behavior, and momentum.' },
]

function Systems() {
  return (
    <section className="systems section-pad" id="systems">
      <div className="section-shell">
        <div className="section-intro">
          <SectionEyebrow number="01">WHAT WE BUILD</SectionEyebrow>
          <h2>Beyond automation.<br /><span>Advantage.</span></h2>
          <p>AI is not a feature. It is a new operating layer. We build the systems that make it real — from first principle to full scale.</p>
        </div>
        <div className="system-list">
          {systems.map(({ icon: Icon, no, title, copy }) => (
            <article className="system-card" key={no}>
              <div className="card-top"><span className="card-no">{no}</span><Icon size={28} strokeWidth={1.1} /></div>
              <h3 dangerouslySetInnerHTML={{ __html: title }} />
              <p>{copy}</p>
              <a href="#contact" aria-label={`Learn more about ${title.replace('<br />', ' ')}`}><MoveUpRight size={18} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section className="approach section-pad" id="approach">
      <GridTexture />
      <div className="section-shell approach-shell">
        <div className="approach-title"><SectionEyebrow number="02">OUR APPROACH</SectionEyebrow><h2>Make the<br /><em>complex</em><br />inevitable.</h2></div>
        <div className="approach-body">
          <p className="large-copy">The most powerful technology disappears into the work. We pair deep technical craft with a clear-eyed view of the business to build intelligence that feels inevitable.</p>
          <div className="approach-detail"><div className="detail-rule" /><p>Every engagement begins with a blank page and a sharp question: <strong>what becomes possible when intelligence is native to the operation?</strong></p></div>
          <a className="text-link green-link" href="#contact">Our point of view <ArrowUpRight size={16} /></a>
        </div>
      </div>
      <div className="approach-orbit" aria-hidden="true"><div className="orbit-core">A<span>X</span></div><i /><i /><i /></div>
    </section>
  )
}

function Intelligence() {
  return (
    <section className="intelligence section-pad" id="intelligence">
      <div className="section-shell">
        <div className="intel-head"><SectionEyebrow number="03">THE DIFFERENCE</SectionEyebrow><h2>Built for the<br /><em>edge.</em></h2></div>
        <div className="intel-grid">
          <div className="intel-statement"><p>Most organizations are asking AI to do more.</p><p className="faded">We ask it to see more.</p><div className="statement-line" /></div>
          <div className="intel-points">
            <div><span>01</span><div><h3>Native, not bolted on</h3><p>Intelligence designed into the architecture, not layered over the legacy.</p></div></div>
            <div><span>02</span><div><h3>Specific, not generic</h3><p>Purpose-built systems tuned to your world, your data, and your decisions.</p></div></div>
            <div><span>03</span><div><h3>Human, by design</h3><p>The best systems amplify judgment. They do not replace the people who have it.</p></div></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-glow" />
      <div className="section-shell contact-shell">
        <div><SectionEyebrow number="04">BEGIN HERE</SectionEyebrow><h2>Ready to build<br /><em>what's next?</em></h2></div>
        <div className="contact-side"><p>Tell us where you want to go. We'll help you figure out what it takes to get there.</p><a className="button button-primary" href="mailto:hello@arxen.ai">Start a conversation <ArrowUpRight size={17} /></a></div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="footer-shell">
        <div className="footer-brand"><Logo footer /><p>Infrastructure<br />for intelligence.</p></div>
        <div className="footer-links"><div><span>EXPLORE</span><a href="#systems">Systems</a><a href="#approach">Approach</a><a href="#intelligence">Intelligence</a></div><div><span>CONNECT</span><a href="mailto:hello@arxen.ai">Email us</a><a href="#contact">LinkedIn</a></div></div>
      </div>
      <div className="footer-bottom"><span>© 2024 ARXEN AI SYSTEMS</span><span>MADE FOR THE NEXT SYSTEM</span><a href="#top">Back to top <ChevronRight size={14} /></a></div>
    </footer>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <><Navbar onMenu={() => setMenuOpen(true)} /><MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} /><main><Hero /><Systems /><Approach /><Intelligence /><Contact /></main><Footer /></>
}

createRoot(document.getElementById('root')).render(<App />)
