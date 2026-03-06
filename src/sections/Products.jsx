import { CONFIG } from '../config'
import { whatsappLink } from '../utils/whatsapp'
import ProductCard from '../components/ProductCard'

export default function Products() {
  return (
    <section id="catalogo" className="landing-section" style={{ padding: "96px 0", background: "#fff9fa" }}>
      <div className="landing-container">

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span
            style={{
              background: "linear-gradient(135deg, #fce4ec, #f8bbd0)",
              color: "#8B1A2E",
              padding: "8px 24px",
              borderRadius: 50,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 1,
              display: "inline-block",
              marginBottom: 20,
            }}
          >
            🌹 NUESTROS DETALLES
          </span>

          <h2
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#3d0015",
              marginBottom: 16,
            }}
          >
            Regalos que roban corazones
          </h2>

          <p style={{ color: "#8a6070", fontSize: 17, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Cada detalle está creado con amor y cuidado para que tu regalo sea único e irrepetible.
          </p>
        </div>

        {/* ── Grid de productos ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 28,
          }}
        >
          {CONFIG.PRODUCTOS.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>

        {/* ── Botones de acción ── */}
        <div
          style={{
            textAlign: "center",
            marginTop: 56,
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Ver más → WhatsApp */}
          <a
            href={whatsappLink(CONFIG.NUMERO_WHATSAPP, "Hola! Quiero ver más productos disponibles 🎁")}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              color: "#8B1A2E",
              padding: "15px 36px",
              borderRadius: 50,
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 900,
              border: "2px solid #8B1A2E",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#8B1A2E";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#8B1A2E";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            💬 Ver más productos
          </a>

          {/* Descargar catálogo PDF */}
          <a
            href="/doc/catalogo.pdf"
            download="Catalogo-Detalles-con-Amor.pdf"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, #8B1A2E, #3d0015)",
              color: "#fff",
              padding: "15px 36px",
              borderRadius: 50,
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 900,
              boxShadow: "0 6px 20px rgba(139,26,46,0.35)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(139,26,46,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(139,26,46,0.35)";
            }}
          >
            📄 Descargar catálogo
          </a>
        </div>

      </div>
    </section>
  );
}
