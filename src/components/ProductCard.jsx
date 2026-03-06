import { useState, useEffect } from 'react'
import { CONFIG } from '../config'
import { whatsappLink } from '../utils/whatsapp'

/* ─────────────────────────────────────────
   Modal — optimizado para móvil y desktop
───────────────────────────────────────── */
function ImageModal({ producto, onClose }) {

  // Cierra con ESC + bloquea scroll del body
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="imgModalOverlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(20, 0, 10, 0.9)", 
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",   // bottom sheet en móvil
        justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
    >
      {/*
        Contenedor:
        - Móvil:   ancho 100%, sube desde abajo, bordes redondeados arriba
        - Desktop: centrado, maxWidth 640px, mismo estilo
      */}
      <div
        className="imgModalCard"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "24",
          overflow: "hidden",
          width: "100%",
          maxWidth: 760,
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          animation: "scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          position: "relative",
        }}
      >
        {/* Handle pill — indicador UX móvil */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px", flexShrink: 0 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "#e0c0c8" }} />
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14, right: 14,
            zIndex: 10,
            background: "rgba(0,0,0,0.5)",
            border: "none",
            borderRadius: "50%",
            width: 36, height: 36,
            cursor: "pointer",
            color: "#fff",
            fontSize: 17,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
          aria-label="Cerrar"
        >
          ✕
        </button>

        {/* ── Imagen ──
            height usa min() para ser grande en desktop y ajustarse en móvil.
            objectFit "cover" garantiza que la imagen siempre llene el espacio
            sin importar el tamaño de pantalla. Se eliminó onError para que
            nunca se oculte la imagen en móvil. */}
        <div
          className="imgModalMedia"
          style={{
            flexShrink: 0,
            width: "100%",
            height: "clamp(260px, 60vh, 560px)",   // ✅ grande en desktop, no se rompe en móvil
            overflow: "hidden",
            background: "linear-gradient(135deg, #fce4ec, #f8bbd0)",
            position: "relative",
            display: "flex",                       // ✅ centra la imagen si es contain
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",                // ✅ NO recorta, se ve completo (ideal para móvil)
              objectPosition: "center",
              display: "block",
            }}
          />

          {/* Badge precio */}
          <div style={{
            position: "absolute",
            bottom: 14,
            left: 14,
            background: "linear-gradient(135deg, #e74c3c, #8B1A2E)",
            color: "#fff",
            borderRadius: 50,
            padding: "5px 16px",
            fontSize: 14,
            fontWeight: 800,
            boxShadow: "0 4px 16px rgba(180,30,60,0.4)",
          }}>
            {producto.precio}
          </div>
        </div>

        {/* ── Texto + CTA ── */}
        <div style={{ padding: "20px 24px 28px", overflowY: "auto", flexShrink: 0 }}>
          <h3
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(17px, 4vw, 22px)",
              fontWeight: 800,
              color: "#3d0015",
              marginBottom: producto.descripcion ? 10 : 18,
              lineHeight: 1.3,
            }}
          >
            {producto.nombre}
          </h3>

          {producto.descripcion && (
            <p style={{ color: "#8a6070", fontSize: 15, lineHeight: 1.7, marginBottom: 18 }}>
              {producto.descripcion}
            </p>
          )}

          <a
            href={whatsappLink(
              CONFIG.NUMERO_WHATSAPP,
              `Hola! Me interesa el producto: *${producto.nombre}* (${producto.precio}) 💕`
            )}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              color: "#fff",
              padding: "15px",
              borderRadius: 14,
              textDecoration: "none",
              fontSize: "clamp(14px, 3.5vw, 16px)",
              fontWeight: 800,
              boxShadow: "0 6px 20px rgba(37,211,102,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(37,211,102,0.5)" }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,211,102,0.35)" }}
          >
            💬 Pedir por WhatsApp
          </a>
        </div>
      </div>

      <style>{`
      @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
      @keyframes scaleIn { from { transform: scale(0.92); opacity: 0 } to { transform: scale(1); opacity: 1 } }

      /* ✅ Móvil: centrado (NO bottom sheet) */
      @media (max-width: 640px) {
        .imgModalOverlay {
          align-items: center !important;   /* ✅ centrado vertical */
          justify-content: center !important;
          padding: 12px !important;
        }

        .imgModalCard {
          border-radius: 24px !important;   /* ✅ redondeado completo */
          width: 100% !important;
          max-width: 360px !important;      /* ✅ angosto para fotos verticales */
          max-height: 92dvh !important;
          animation: scaleIn 0.2s ease !important;
        }

        .imgModalMedia {
          height: clamp(240px, 52dvh, 420px) !important; /* ✅ visible sin romper */
        }
      }
    `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────
   Tarjeta de producto
───────────────────────────────────────── */
export default function ProductCard({ producto }) {
  const [hovered,   setHovered]   = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const msg = `Hola! Me interesa el producto: *${producto.nombre}* (${producto.precio}) 💕`

  return (
    <>
      {modalOpen && (
        <ImageModal producto={producto} onClose={() => setModalOpen(false)} />
      )}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#fff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: hovered
            ? "0 20px 50px rgba(180,30,60,0.2)"
            : "0 4px 20px rgba(0,0,0,0.07)",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Imagen — abre modal */}
        <div
          onClick={() => setModalOpen(true)}
          style={{ position: "relative", overflow: "hidden", height: 220, cursor: "zoom-in" }}
        >
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.5s ease",
              display: "block",
            }}
          />

          {/* Badge precio */}
          <div style={{ position: "absolute", top: 14, right: 14, background: "linear-gradient(135deg, #e74c3c, #c0392b)", color: "#fff", borderRadius: 50, padding: "4px 14px", fontSize: 13, fontWeight: 800, boxShadow: "0 3px 12px rgba(231,76,60,0.4)" }}>
            {producto.precio}
          </div>

          {/* Lupa hover */}
          {hovered && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(61,0,21,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 36, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}>🔍</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "20px 22px 22px" }}>
          <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 18, fontWeight: 800, color: "#3d0015", marginBottom: 16, lineHeight: 1.3 }}>
            {producto.nombre}
          </h3>

          <a
            href={whatsappLink(CONFIG.NUMERO_WHATSAPP, msg)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              background: "linear-gradient(135deg, #c0392b, #8B1A2E)",
              color: "#fff",
              padding: "13px",
              borderRadius: 12,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 0.3,
              boxShadow: hovered ? "0 8px 25px rgba(231,76,60,0.45)" : "0 4px 15px rgba(180,30,60,0.25)",
              transition: "all 0.3s ease",
            }}
          >
            💬 Pedir por WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
