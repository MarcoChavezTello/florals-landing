import { useRef, useState, useEffect, useCallback } from 'react'
import TestimonialCard from '../components/TestimonialCard'

/* ── Genera el array de rutas de imágenes ── */
const TOTAL_ENTREGAS = 10
const ENTREGAS = Array.from({ length: TOTAL_ENTREGAS }, (_, i) => `/img/entrega${i + 1}.jpeg`)

/* ════════════════════════════════════════════
   Lightbox — imagen ampliada con navegación
════════════════════════════════════════════ */
function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  /* Teclado: ESC cierra, ← → navegan */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')    onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight')onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  /* Bloquea scroll del body mientras está abierto */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(10,0,6,0.92)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      {/* Contenedor imagen — click NO cierra */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Entrega ${currentIndex + 1}`}
          style={{
            maxWidth: '88vw',
            maxHeight: '84vh',
            borderRadius: 18,
            objectFit: 'contain',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            animation: 'scaleIn 0.22s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        />

        {/* Contador */}
        <div style={{ position: 'absolute', bottom: -36, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,200,210,0.7)', fontSize: 13, fontWeight: 600, letterSpacing: 1, whiteSpace: 'nowrap' }}>
          {currentIndex + 1} / {images.length}
        </div>

        {/* Prev */}
        <NavBtn direction="left" onClick={onPrev} disabled={currentIndex === 0} />

        {/* Next */}
        <NavBtn direction="right" onClick={onNext} disabled={currentIndex === images.length - 1} />
      </div>

      {/* Cerrar */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: 20, right: 20,
          background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%',
          width: 42, height: 42, cursor: 'pointer', color: '#fff', fontSize: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
        aria-label="Cerrar"
      >
        ✕
      </button>

      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes scaleIn { from { transform:scale(0.88); opacity:0 } to { transform:scale(1); opacity:1 } }
      `}</style>
    </div>
  )
}

function NavBtn({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [direction === 'left' ? 'left' : 'right']: -56,
        background: disabled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.15)',
        border: 'none', borderRadius: '50%',
        width: 44, height: 44, cursor: disabled ? 'default' : 'pointer',
        color: disabled ? 'rgba(255,255,255,0.2)' : '#fff',
        fontSize: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.28)' }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
      aria-label={direction === 'left' ? 'Anterior' : 'Siguiente'}
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  )
}

/* ════════════════════════════════════════════
   Sección principal
════════════════════════════════════════════ */
export default function Testimonials() {
  const trackRef  = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  /* Lightbox state */
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const isOpen = lightboxIndex !== null

  /* ── Actualiza flags de navegación del slider ── */
  const updateFlags = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateFlags()
    el.addEventListener('scroll', updateFlags, { passive: true })
    window.addEventListener('resize', updateFlags)
    return () => {
      el.removeEventListener('scroll', updateFlags)
      window.removeEventListener('resize', updateFlags)
    }
  }, [updateFlags])

  /* ── Scroll del slider ── */
  const scroll = (dir) => {
    const el = trackRef.current
    if (!el) return
    const amount = el.clientWidth * 0.75
    el.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' })
  }

  /* ── Lightbox helpers ── */
  const openLightbox  = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevPhoto     = () => setLightboxIndex((i) => Math.max(0, i - 1))
  const nextPhoto     = () => setLightboxIndex((i) => Math.min(ENTREGAS.length - 1, i + 1))

  return (
    <>
      {isOpen && (
        <Lightbox
          images={ENTREGAS}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}

      <section id="testimonios" className="landing-section" style={{ padding: '96px 0', background: '#fff', overflow: 'hidden' }}>
        <div className="landing-container" style={{ maxWidth: 1200 }}>

          {/* ── Header ── */}
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)', color: '#8B1A2E', padding: '8px 24px', borderRadius: 50, fontSize: 14, fontWeight: 800, display: 'inline-block', marginBottom: 20 }}>
              📸 NUESTRAS ENTREGAS
            </span>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#3d0015', marginBottom: 16 }}>
              Momentos que hemos creado
            </h2>
            <p style={{ color: '#8a6070', fontSize: 17, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Cada foto es una historia real. Así lucen los detalles que entregamos con amor. 💕
            </p>
          </div>

          {/* ── Slider wrapper ── */}
          <div style={{ position: 'relative' }}>

            {/* Botón Prev */}
            <SliderBtn direction="left" onClick={() => scroll('prev')} visible={canPrev} />

            {/* Track */}
            <div
              ref={trackRef}
              style={{
                display: 'flex',
                gap: 20,
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                paddingBottom: 12,
                paddingLeft: 4,
                paddingRight: 4,
                /* Oculta scrollbar visualmente en todos los navegadores */
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style>{`
                div::-webkit-scrollbar { display: none; }
              `}</style>

              {ENTREGAS.map((src, i) => (
                <div key={i} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
                  <TestimonialCard src={src} index={i} onClick={openLightbox} />
                </div>
              ))}
            </div>

            {/* Botón Next */}
            <SliderBtn direction="right" onClick={() => scroll('next')} visible={canNext} />

            {/* Fade edges */}
            {canPrev && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 12, width: 60, background: 'linear-gradient(to right, #fff, transparent)', pointerEvents: 'none' }} />}
            {canNext && <div style={{ position: 'absolute', right: 0, top: 0, bottom: 12, width: 60, background: 'linear-gradient(to left, #fff, transparent)', pointerEvents: 'none' }} />}
          </div>

          {/* ── Dots indicadores ── */}
          <Dots total={ENTREGAS.length} trackRef={trackRef} />

        </div>
      </section>
    </>
  )
}

/* ── Botones laterales del slider ── */
function SliderBtn({ direction, onClick, visible }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [direction === 'left' ? 'left' : 'right']: -20,
        zIndex: 10,
        background: '#fff',
        border: '2px solid #fce4ec',
        borderRadius: '50%',
        width: 46, height: 46,
        cursor: 'pointer',
        color: '#8B1A2E',
        fontSize: 22,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(180,30,60,0.15)',
        transition: 'all 0.25s ease',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#8B1A2E'; e.currentTarget.style.color = '#fff'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#8B1A2E'; }}
      aria-label={direction === 'left' ? 'Anterior' : 'Siguiente'}
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  )
}

/* ── Dots de progreso reactivos al scroll ── */
function Dots({ total, trackRef }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const handler = () => {
      const pct = el.scrollLeft / (el.scrollWidth - el.clientWidth)
      setActive(Math.round(pct * (total - 1)))
    }
    el.addEventListener('scroll', handler, { passive: true })
    return () => el.removeEventListener('scroll', handler)
  }, [total, trackRef])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === active ? 24 : 8,
            height: 8,
            borderRadius: 50,
            background: i === active ? '#8B1A2E' : '#f8bbd0',
            transition: 'all 0.35s ease',
            cursor: 'pointer',
          }}
          onClick={() => {
            const el = trackRef.current
            if (!el) return
            const pct = i / (total - 1)
            el.scrollTo({ left: pct * (el.scrollWidth - el.clientWidth), behavior: 'smooth' })
          }}
        />
      ))}
    </div>
  )
}
