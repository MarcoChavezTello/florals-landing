import { useState, useEffect, useRef } from 'react'
import { CONFIG } from '../config'
import { whatsappLink } from '../utils/whatsapp'

// ─────────────────────────────────────────────────────────
// ✅ EDITABLE — agrega o quita rutas de imágenes aquí
// ─────────────────────────────────────────────────────────
const HERO_IMAGES = [
  CONFIG.IMAGEN_HERO,
  '/img/fondo1.jpg',
  '/img/fondo2.jpg',
  '/img/fondo3.jpg',
  '/img/fondo4.jpg',
  '/img/fondo5.jpg',
  '/img/fondo6.jpg',
  '/img/fondo7.jpg',
  '/img/fondo8.jpg',
  '/img/fondo9.jpg',
  '/img/fondo10.jpg',
]

const SLIDESHOW_INTERVAL = 5000 // ms entre cada imagen

const TRUST_ITEMS = [
  { icon: '💬', text: 'Respuesta en 5 min' },
  { icon: '🚀', text: 'Entrega el mismo día' },
  { icon: '🔒', text: 'Pago seguro' },
  { icon: '⭐', text: '4.9 / 5 en reseñas' },
  { icon: '🎁', text: '100% personalizado' },
]

const STATS = [
  { num: '2,000+', label: 'Clientes felices' },
  { num: '100%',   label: 'Personalizado'    },
  { num: '4.9★',  label: 'Calificación'     },
]

const PETALS = ['🌸', '🌹', '💕', '✨', '🌺', '💖']

// ─────────────────────────────────────────────────────────
// Hook: parallax offset basado en scrollY
// ─────────────────────────────────────────────────────────
function useParallax(strength = 0.35) {
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const handler = () => setOffset(window.scrollY * strength)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [strength])
  return offset
}

// ─────────────────────────────────────────────────────────
// Hook: anima un valor numérico de 0 → target
// ─────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800, active = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''))
    if (isNaN(numeric)) { setValue(target); return }
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * numeric))
      if (progress < 1) requestAnimationFrame(step)
      else setValue(target) // muestra el string original al final
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return value
}

// ─────────────────────────────────────────────────────────
// Componente: stat individual con count-up
// ─────────────────────────────────────────────────────────
function StatItem({ num, label, active }) {
  const displayed = useCountUp(num, 1800, active)
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 'clamp(22px,4vw,30px)', fontWeight: 900, color: '#fff', fontFamily: 'Georgia, serif' }}>
        {displayed}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,210,220,0.8)', marginTop: 4 }}>{label}</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────
export default function Hero() {
  const parallax      = useParallax(0.3)
  const [slide, setSlide]     = useState(0)
  const [prevSlide, setPrev]  = useState(null)
  const [fading, setFading]   = useState(false)
  const [entered, setEntered] = useState(false)
  const [statsActive, setStatsActive] = useState(false)
  const statsRef = useRef(null)

  // Animación de entrada al montar
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Slideshow automático con crossfade
  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return
    const timer = setInterval(() => {
      setPrev(slide)
      setFading(true)
      setTimeout(() => {
        setSlide(s => (s + 1) % HERO_IMAGES.length)
        setFading(false)
        setPrev(null)
      }, 700)
    }, SLIDESHOW_INTERVAL)
    return () => clearInterval(timer)
  }, [slide])

  // Activa count-up cuando los stats son visibles
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsActive(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const goToSlide = (i) => {
    if (i === slide) return
    setPrev(slide)
    setFading(true)
    setTimeout(() => { setSlide(i); setFading(false); setPrev(null) }, 700)
  }

  // Función de estilo para animaciones de entrada escalonadas
  const enter = (delay = 0) => ({
    opacity:   entered ? 1 : 0,
    transform: entered ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  return (
    <section
      id="inicio"
      className="landing-section"
      style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', width: '100%' }}
    >
      {/* ── Slideshow de fondos con crossfade ── */}
      {HERO_IMAGES.map((img, i) => (
        <div
          key={img}
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: `center ${parallax}px`,
            filter: 'brightness(0.45)',
            opacity: i === slide ? 1 : (i === prevSlide && fading ? 1 : 0),
            transition: i === slide
              ? 'opacity 0.8s ease'
              : (i === prevSlide ? 'opacity 0.8s ease' : 'none'),
          }}
        />
      ))}

      {/* ── Overlay de gradiente ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(135deg, rgba(90,10,30,0.72) 0%, rgba(180,30,60,0.4) 50%, rgba(20,0,10,0.82) 100%)' }} />

      {/* ── Emojis flotantes ── */}
      {PETALS.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute', zIndex: 2,
            fontSize: 24 + (i % 3) * 9,
            opacity: 0.13 + (i % 4) * 0.04,
            top: `${10 + i * 13}%`,
            left: i % 2 === 0 ? `${5 + i * 8}%` : `${75 + (i % 3) * 7}%`,
            animation: `landing-float ${3 + i}s ease-in-out infinite alternate`,
            pointerEvents: 'none', userSelect: 'none',
          }}
        >
          {p}
        </span>
      ))}

      {/* ── Contenido principal ── */}
      <div
        className="landing-container"
        style={{ position: 'relative', zIndex: 3, textAlign: 'center', paddingTop: 80, paddingBottom: 40 }}
      >
        {/* Eyebrow pill */}
        <div style={{ ...enter(0), display: 'inline-block', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 50, padding: '8px 26px', marginBottom: 28, backdropFilter: 'blur(8px)' }}>
          <span style={{ color: 'rgba(255,220,230,0.95)', fontSize: 13, letterSpacing: 2, fontWeight: 600 }}>
            💌 DETALLES QUE ENAMORAN
          </span>
        </div>

        {/* Título */}
        <h1
          style={{
            ...enter(120),
            fontFamily: "'Georgia', serif",
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.13,
            marginBottom: 22,
            textShadow: '0 4px 30px rgba(0,0,0,0.4)',
          }}
        >
          {CONFIG.NOMBRE_DEL_NEGOCIO}
        </h1>

        {/* Slogan */}
        <p
          style={{
            ...enter(240),
            fontSize: 'clamp(1rem, 2.4vw, 1.35rem)',
            color: 'rgba(255,230,235,0.9)',
            lineHeight: 1.7,
            maxWidth: 620,
            margin: '0 auto 48px',
          }}
        >
          {CONFIG.SLOGAN}
        </p>

        {/* Botones CTA */}
        <div style={{ ...enter(360), display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={whatsappLink(CONFIG.NUMERO_WHATSAPP, '¡Hola! Quiero hacer mi pedido especial 💕')}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'linear-gradient(135deg, #e74c3c, #8B1A2E)',
              color: '#fff',
              padding: 'clamp(14px,2vw,18px) clamp(28px,4vw,42px)',
              borderRadius: 50,
              textDecoration: 'none',
              fontSize: 'clamp(15px,2vw,17px)',
              fontWeight: 800,
              boxShadow: '0 8px 30px rgba(231,76,60,0.5)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(231,76,60,0.65)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(231,76,60,0.5)' }}
          >
            💌 Haz tu pedido ahora
          </a>

          <a
            href="#catalogo"
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              padding: 'clamp(14px,2vw,18px) clamp(28px,4vw,42px)',
              borderRadius: 50,
              textDecoration: 'none',
              fontSize: 'clamp(15px,2vw,17px)',
              fontWeight: 700,
              border: '2px solid rgba(255,255,255,0.4)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Ver Catálogo ✨
          </a>
        </div>

        {/* ── Trust bar ── */}
        <div
          style={{
            ...enter(480),
            marginTop: 36,
            display: 'flex',
            gap: 'clamp(12px, 3vw, 28px)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '16px 24px',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 16,
            backdropFilter: 'blur(10px)',
            maxWidth: 700,
            margin: '36px auto 0',
          }}
        >
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,225,232,0.88)', fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 600, whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: 'clamp(14px,2vw,17px)' }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>

        {/* ── Stats con count-up ── */}
        <div
          ref={statsRef}
          style={{
            ...enter(560),
            display: 'flex',
            gap: 'clamp(20px, 5vw, 52px)',
            justifyContent: 'center',
            marginTop: 52,
            flexWrap: 'wrap',
          }}
        >
          {STATS.map(s => (
            <StatItem key={s.label} num={s.num} label={s.label} active={statsActive} />
          ))}
        </div>
      </div>

      {/* ── Dots del slideshow ── */}
      {HERO_IMAGES.length > 1 && (
        <div
          style={{
            position: 'absolute', bottom: 68, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 8, zIndex: 4,
          }}
        >
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              style={{
                width: i === slide ? 24 : 8,
                height: 8,
                borderRadius: 50,
                border: 'none',
                cursor: 'pointer',
                background: i === slide ? '#fff' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.35s ease',
                padding: 0,
              }}
              aria-label={`Ir a imagen ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* ── Flecha scroll ── */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 4, animation: 'landing-bounce 2s infinite' }}>
        <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 24 }}>↓</div>
      </div>
    </section>
  )
}
