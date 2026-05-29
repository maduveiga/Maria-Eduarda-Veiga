import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import hero1 from './assets/hero_1.mp4'
import hero2 from './assets/hero_2.mp4'
import hero3 from './assets/hero_3.mp4'
import hero4 from './assets/hero_4.mp4'
import hero5 from './assets/hero_5.mp4'
import hero6 from './assets/hero_6.mp4'
import logoMadu from './assets/logo_madu.png'
import reel1 from './assets/reel_1.mp4'
import reel2 from './assets/reel_2.mov'
import reel3 from './assets/reel_3.mp4'
import reel4 from './assets/reel_4.mp4'
import reel5 from './assets/reel_5.mp4'
import reel6 from './assets/reel_6.mp4'
import reel7 from './assets/reel_7.mp4'
import reel8 from './assets/reel_8.mp4'
import wineImg from './assets/portfolio_wine.png'
import flatlayImg from './assets/portfolio_flatlay.png'
import foodsVid from './assets/foods.mp4'
import maduImg from './assets/madu_natural.png'
import './App.css'

// ─── Contatos reais ────────────────────────────────────────────────────────────
const CONTATOS = {
  whatsapp: 'https://wa.me/5547989192263?text=Olá%20Maria%20Eduarda!%20Vi%20seu%20portfólio%20e%20adorei',
  instagram: 'https://instagram.com/m4du.oficial',
  tiktok: 'https://tiktok.com/@mariadudaveiga',
  email: 'mailto:mari4edu.oficial@gmail.com',
}

// ─── Scroll Progress ─────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <motion.div className="scroll-progress" style={{ scaleX, zIndex: 9999 }} />
}

function Loader() {
  return (
    <motion.div 
      className="page-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="loader-content">
        <span className="serif italic">M.E.V</span>
        <div className="loader-bar" />
      </div>
    </motion.div>
  )
}

function Typewriter({ text, className = '', delay = 0, speed = 85 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!inView) return
    let i = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i))
        i++
        if (i > text.length) clearInterval(interval)
      }, speed)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [inView, text, delay, speed])

  return (
    <span ref={ref} className={`typewriter ${className}`}>
      <span className="typewriter-text" data-text={displayed}>{displayed}</span>
      {displayed.length < text.length && <span className="typewriter-cursor">|</span>}
    </span>
  )
}

// ─── Texto scramble ao aparecer ────────────────────────────────────────────────
function ScrambleText({ text, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [displayed, setDisplayed] = useState(text)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const ran = useRef(null)

  useEffect(() => {
    if (!inView) return
    let iter = 0
    clearInterval(ran.current)
    setTimeout(() => {
      ran.current = setInterval(() => {
        setDisplayed(
          text.split('').map((c, i) => {
            if (c === ' ') return ' '
            if (i < iter) return text[i]
            return chars[Math.floor(Math.random() * chars.length)]
          }).join('')
        )
        if (iter >= text.length) clearInterval(ran.current)
        iter += 0.5
      }, 28)
    }, delay * 1000)
    return () => clearInterval(ran.current)
  }, [inView, text, delay])

  return <span ref={ref} className={className}>{displayed}</span>
}

// ─── FadeUp genérico ───────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ y: 60, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  )
}

// ─── Contador animado ─────────────────────────────────────────────────────────
function AnimCounter({ target, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const num = parseInt(target.replace(/\D/g, ''))
    let start = 0
    const step = Math.ceil(num / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= num) { setCount(num); clearInterval(timer) }
      else setCount(start)
    }, 40)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

// ─── Dados ─────────────────────────────────────────────────────────────────────
const projetos = [
  { id: 1, titulo: 'VINTAGE TALES', categoria: 'Lentes que Inspiram · Cinematografia', ano: '', img: wineImg },
  { id: 2, titulo: 'GOLDEN HOUR', categoria: 'Filme de Marca · Edição de Vídeo', ano: '', img: flatlayImg },
  { id: 3, titulo: 'TASTY FOODS', categoria: 'Comercial · Direção Criativa', ano: '', img: foodsVid },
]

const habilidades = [
  { label: 'Criação de Conteúdo', valor: 98 },
  { label: 'Social Media Estratégico', valor: 95 },
  { label: 'Edição de Vídeo Cinematográfica', valor: 95 },
  { label: 'Landing Pages & Sites 3D', valor: 85 },
  { label: 'Especialista em IA & Prompts', valor: 90 },
]

// ─── Ícones SVG ───────────────────────────────────────────────────────────────
const IconInstagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4.5"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
)
const IconTikTok = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.82a8.18 8.18 0 004.78 1.52V6.88a4.85 4.85 0 01-1.01-.19z"/>
  </svg>
)
const IconWhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.549 4.107 1.513 5.836L.057 23.215a.5.5 0 00.63.63l5.379-1.456A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.807 9.807 0 01-4.99-1.364l-.357-.213-3.714 1.006 1.006-3.714-.213-.357A9.807 9.807 0 012.182 12C2.182 6.573 6.573 2.182 12 2.182S21.818 6.573 21.818 12 17.427 21.818 12 21.818z"/>
  </svg>
)
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="2" y="4" width="20" height="16" rx="3"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
)
const Logo = () => (
  <div className="logo-official-container">
    <img src={logoMadu} alt="Logo Maria Eduarda Veiga" className="logo-official" />
    <span className="logo-official-name serif italic">Maria Eduarda Veiga</span>
  </div>
)

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [rolou, setRolou] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    const fn = () => setRolou(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navItems = [
    ['#projetos', 'Projetos'],
    ['#sobre', 'Sobre Mim'],
    ['#contato', 'Contato'],
  ]

  return (
    <>
      <motion.nav className={`navbar ${rolou ? 'navbar--scrolled' : ''}`}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#topo" className="nav-logo-wrap"><Logo /></a>
        <div className="nav-links">
          {navItems.map(([href, label]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
          <a href={CONTATOS.whatsapp} target="_blank" rel="noopener noreferrer" className="nav-cta magnetic" data-cursor="CHAT">
            Fale Comigo
          </a>
        </div>
        <button className="nav-burger" aria-label="Menu" onClick={() => setMenuAberto(v => !v)}>
          <span className={menuAberto ? 'open' : ''}></span>
          <span className={menuAberto ? 'open' : ''}></span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuAberto && (
          <motion.div className="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu__top serif italic">M.E.V</div>
            {navItems.map(([href, label], i) => (
              <motion.a key={href} href={href}
                onClick={() => setMenuAberto(false)}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >{label}</motion.a>
            ))}
            <div className="mobile-menu__social">
              <a href={CONTATOS.instagram} target="_blank" rel="noopener noreferrer"><IconInstagram /></a>
              <a href={CONTATOS.tiktok} target="_blank" rel="noopener noreferrer"><IconTikTok /></a>
              <a href={CONTATOS.whatsapp} target="_blank" rel="noopener noreferrer"><IconWhatsApp /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const videos = [hero1, hero2, hero3, hero4, hero5, hero6]

  return (
    <section className="hero" ref={ref} id="topo">
      <motion.div className="hero__bg" style={{ scale, opacity: useTransform(scrollYProgress, [0, 0.8], [1, 0]) }}>
        <div className="hero__video-grid">
          {videos.map((v, i) => (
            <video 
              key={i} 
              src={v} 
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="metadata"
              loading="lazy"
              style={{ objectFit: 'cover' }}
              className={`hero__video-item item-${i+1}`} 
            />
          ))}
        </div>
        <div className="hero__bg-overlay" />
      </motion.div>

      <div className="hero__grain" />

      <motion.div className="hero__content" style={{ opacity, y: textY }}>
        <motion.span className="hero__eyebrow"
          initial={{ letterSpacing: '0.6em', opacity: 0 }}
          animate={{ letterSpacing: '0.3em', opacity: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
        >
          PORTFÓLIO · MARIA EDUARDA VEIGA · 2026
        </motion.span>

        <div className="hero__headline-wrap headline-typewriter">
          <div className="hero__line-mask">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Typewriter text="Arquitetura Visual" delay={0.5} />
            </motion.h1>
          </div>
          <div className="hero__line-mask">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <span className="typewriter">
                que&nbsp;<span className="gold-highlight">conecta</span>&nbsp;e&nbsp;<span className="gold-highlight">converte</span>
              </span>
            </motion.h1>
          </div>
        </div>

        <motion.div className="hero__actions"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <a href={CONTATOS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary magnetic" data-cursor="CHAT ↗">
            Iniciar Conversa <IconArrow />
          </a>
          <a href="#projetos" className="btn-ghost">Ver Projetos</a>
        </motion.div>
      </motion.div>

      {/* Redes sociais flutuando na lateral */}
      <motion.div className="hero__socials"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <a href={CONTATOS.instagram} target="_blank" rel="noopener noreferrer" data-cursor="INSTAGRAM" title="Instagram"><IconInstagram /></a>
        <a href={CONTATOS.tiktok} target="_blank" rel="noopener noreferrer" data-cursor="TIKTOK" title="TikTok"><IconTikTok /></a>
        <a href={CONTATOS.whatsapp} target="_blank" rel="noopener noreferrer" data-cursor="WHATSAPP" title="WhatsApp"><IconWhatsApp /></a>
        <div className="hero__socials-line" />
      </motion.div>

      <motion.div className="hero__scroll"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
      >
        <span>Scroll</span>
        <div className="hero__scroll-line">
          <motion.div className="hero__scroll-dot"
            animate={{ y: [0, 48, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          />
        </div>
        <div className="hero__scroll-symbol serif">⊞</div>
      </motion.div>
    </section>
  )
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function Marquee() {
  const itens = ['DIREÇÃO CRIATIVA', 'EDIÇÃO DE VÍDEO', 'STORYTELLING', 'COLOR GRADING', 'DIREÇÃO DE ARTE', 'CONTEÚDO DIGITAL', 'MARIA EDUARDA VEIGA']
  const dobrado = [...itens, ...itens]
  return (
    <div className="marquee">
      <motion.div className="marquee__track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        {dobrado.map((item, i) => (
          <span key={i} className="marquee__item">
            {item} <span className="marquee__dot">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Manifesto ────────────────────────────────────────────────────────────────
function Manifesto() {
  return (
    <section className="manifesto section-padding" id="sobre">
      <div className="container">
        <div className="manifesto__grid">
          <FadeUp className="manifesto__aside">
            <span className="label-tag">O MANIFESTO</span>
            <div className="manifesto__line" />
          </FadeUp>
          <div className="manifesto__body">
            <FadeUp delay={0.1}>
              <p className="manifesto__signature serif italic">
                Meu projeto profissional é definido por intenção, excelência e a busca incessante
                pelo momento perfeito: aquele que faz o espectador parar de rolar o
                feed e simplesmente <em className="gold">sentir</em>.
              </p>
              <h2 className="serif manifesto__headline">
                Comida é mais do que deleite.<br />
                É uma linguagem silenciosa de{' '}
                <em className="gold">emoção</em>,<br />
                memória e criatividade pura.
              </h2>
            </FadeUp>
            <FadeUp delay={0.25}>
              <p className="manifesto__text">
                Sou Maria Eduarda Veiga e não apenas edito vídeos, eu transformo momentos, 
                pratos e detalhes de forma viva e única. Eu idealizo
                atmosferas, desenho silêncios e conto a história que acontece antes
                da primeira mordida: o vapor subindo de um caldo perfeito, a forma
                como o azeite dourado captura a luz, a lentidão elegante de um bom
                vinho sendo servido.
              </p>
              <p className="manifesto__text">
                Cada projeto é uma nova oportunidade de criar algo profundamente
                cinematográfico, emocionalmente ressonante e culturalmente consciente.
                Cada frame deve parecer uma memória que vale a pena guardar.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <a href="#projetos" className="cta-link">
                EXPLORAR PROJETOS SELECIONADOS <IconArrow />
              </a>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Reels Grid ──────────────────────────────────────────────────────────────
function ReelsGrid() {
  const reels = [reel1, reel2, reel3, reel4, reel5, reel6, reel7, reel8]
  return (
    <section className="reels-section section-padding">
      <div className="container">
        <FadeUp>
          <div className="reels-header-wrap" style={{ textAlign: 'center', marginBottom: '8rem', paddingTop: '2rem' }}>
            <h2 className="reels-title-main serif italic">Momentos em Movimento</h2>
          </div>
        </FadeUp>
        <div className="reels-container">
          <div className="reels-grid">
            {reels.map((r, i) => (
              <div key={i} className="reel-card">
                <video src={r} muted loop playsInline onMouseEnter={e => e.target.play()} onMouseLeave={e => {e.target.pause(); e.target.currentTime = 0}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Portfólio Reel ───────────────────────────────────────────────────────────
function PortfolioReel() {
  const [ativo, setAtivo] = useState(null)

  return (
    <section className="portfolio section-padding" id="projetos">
      <div className="container">
        <FadeUp>
          <div className="portfolio__header">
            <span className="label-tag">PROJETOS SELECIONADOS</span>
            <h2 className="serif portfolio__title">
              <ScrambleText text="Um Olhar Apurado" />
            </h2>
          </div>
        </FadeUp>
      </div>

      <div className="reel">
        {projetos.map((proj, i) => (
          <motion.div
            key={proj.id}
            className={`reel__item ${ativo === i ? 'reel__item--active' : ''}`}
            onHoverStart={() => setAtivo(i)}
            onHoverEnd={() => setAtivo(null)}
            data-cursor="EXPLORAR"
          >
            <div className="reel__media">
              {proj.img.includes('.mp4') || proj.img.includes('.MOV') || proj.img.includes('.mov') ? (
                <video src={proj.img} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <motion.img src={proj.img} alt={proj.titulo}
                  animate={{ scale: ativo === i ? 1.06 : 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <div className="reel__overlay" />
            </div>

            <motion.div className="reel__meta"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <span className="reel__year">{proj.ano}</span>
              <h3 className="reel__title serif">{proj.titulo}</h3>
              <span className="reel__cat">{proj.categoria}</span>
            </motion.div>

            <motion.div className="reel__number"
              animate={{ opacity: ativo === i ? 0.18 : 0.07 }}
              transition={{ duration: 0.4 }}
            >0{proj.id}</motion.div>

            <motion.div className="reel__progress"
              animate={{ scaleX: ativo === i ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── Números / Stats ─────────────────────────────────────────────────────────
function Numeros() {
  const stats = [
    { valor: '40', sufixo: '+', label: 'Projetos Entregues' },
    { valor: '1', sufixo: '+ ano', label: 'de Experiência' },
    { valor: '100', sufixo: 'k+', label: 'Visualizações Combinadas' },
    { valor: '20', sufixo: '+', label: 'Marcas Atendidas' },
  ]
  return (
    <div className="stats">
      {stats.map((s, i) => (
        <FadeUp key={s.label} delay={i * 0.12} className="stat">
          <span className="stat__value serif gold">
            <AnimCounter target={s.valor} suffix={s.sufixo} />
          </span>
          <span className="stat__label">{s.label}</span>
        </FadeUp>
      ))}
    </div>
  )
}

// ─── Sobre / About ────────────────────────────────────────────────────────────
function Sobre() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section className="about section-padding" ref={ref}>
      <div className="container">
        <div className="about__grid">
          {/* Foto real */}
          <div className="about__portrait-wrap">
            <motion.div className="about__portrait" style={{ y: imgY }}>
              <img src={maduImg} alt="Maria Eduarda Veiga" />
            </motion.div>
            <div className="about__portrait-badge glass serif italic">
              Web Designer & Developer
            </div>
            {/* Elemento decorativo atrás */}
            <div className="about__portrait-deco" />
          </div>

          <div className="about__content">
            <FadeUp>
              <span className="label-tag">A DIRETORA</span>
              <h2 className="serif about__headline">
                Eu enquadro o mundo<br />
                <em className="gold">com propósito.</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="about__bio">
                Sou Maria Eduarda Veiga, uma visionária proativa dedicada a elevar a presença digital 
                de marcas através de lentes que inspiram e conectam. Atuando como Web Designer e Web Developer, 
                minha trajetória é marcada pela união entre o código e a estética refinada, buscando sempre 
                a expansão e a excelência estratégica.
              </p>
              <p className="about__bio">
                Especialista em criação de conteúdo e social media para o setor premium de gastronomia, 
                também trago expertise consolidada no desenvolvimento de ecossistemas digitais avançados, 
                incluindo Landing Pages de alto impacto e sites 3D imersivos. Como entusiasta da revolução 
                tecnológica, domino a engenharia de prompts e Inteligência Artificial para potencializar 
                a produtividade e a originalidade de cada entrega.
              </p>
            </FadeUp>
            <FadeUp delay={0.35}>
              <div className="skills">
                {habilidades.map((s, i) => (
                  <div key={s.label} className="skill">
                    <div className="skill__header">
                      <span>{s.label}</span>
                      <span className="gold">{s.valor}%</span>
                    </div>
                    <div className="skill__bar">
                      <motion.div className="skill__fill"
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${s.valor}%` }}
                        transition={{ duration: 1.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.5}>
              <div className="about__social-row">
                <a href={CONTATOS.instagram} target="_blank" rel="noopener noreferrer" className="social-pill">
                  <IconInstagram /> @m4du.oficial
                </a>
                <a href={CONTATOS.tiktok} target="_blank" rel="noopener noreferrer" className="social-pill">
                  <IconTikTok /> @mariadudaveiga
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contato ──────────────────────────────────────────────────────────────────
function Contato() {
  return (
    <section className="contact section-padding" id="contato">
      <div className="container">
        <FadeUp>
          <span className="label-tag">VAMOS CRIAR JUNTOS</span>
          <h2 className="serif contact__headline">
            Vamos construir algo<br />
            <em className="gold">extraordinário.</em>
          </h2>
          <p className="contact__sub">
            Disponível para parcerias estratégicas, campanhas de marca e projetos de expansão visual.
            Conecte-se comigo e vamos transformar sua presença digital.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="contact__minimal-grid">
            <a href={CONTATOS.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-icon-link" title="WhatsApp"><IconWhatsApp /></a>
            <a href={CONTATOS.instagram} target="_blank" rel="noopener noreferrer" className="contact-icon-link" title="Instagram"><IconInstagram /></a>
            <a href={CONTATOS.tiktok} target="_blank" rel="noopener noreferrer" className="contact-icon-link" title="TikTok"><IconTikTok /></a>
            <a href={CONTATOS.email} className="contact-icon-link" title="E-mail"><IconMail /></a>
          </div>
          <div className="contact__info-row serif italic">
            <span>{CONTATOS.email.replace('mailto:', '')}</span>
            <span className="gold">•</span>
            <span>+55 (47) 98919-2263</span>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Rodapé ───────────────────────────────────────────────────────────────────
function Rodape() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <span className="serif footer__name">Maria Eduarda Veiga</span>
          <span className="footer__tagline">Estrategista Visual · Content Creator</span>
        </div>
        <div className="footer__social">
          <a href={CONTATOS.instagram} target="_blank" rel="noopener noreferrer" title="Instagram"><IconInstagram /></a>
          <a href={CONTATOS.tiktok} target="_blank" rel="noopener noreferrer" title="TikTok"><IconTikTok /></a>
          <a href={CONTATOS.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp"><IconWhatsApp /></a>
          <a href={CONTATOS.email} title="E-mail"><IconMail /></a>
        </div>
        <div className="footer__right">
          <span className="footer__copy">© 2026 · Todos os direitos reservados</span>
          <span className="footer__location">Joinville - Santa Catarina, Brasil</span>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    })
    const raf = time => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    
    // Simula carregamento de assets críticos
    const timer = setTimeout(() => setLoading(false), 2200)
    
    return () => {
      lenis.destroy()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="app">
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Marquee />
      <Manifesto />
      <ReelsGrid />
      <PortfolioReel />
      <Numeros />
      <Sobre />
      <Contato />
      <Rodape />
    </div>
  )
}
