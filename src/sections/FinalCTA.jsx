import { CONFIG } from '../config'
import { whatsappLink } from '../utils/whatsapp'

export default function FinalCTA() {
  return (
    <section
      className="landing-section"
      style={{
        padding: "100px 0",
        background: "linear-gradient(135deg, #fff5f7 0%, #fce4ec 50%, #f8bbd0 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="landing-container" style={{ maxWidth: 780, position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>💌</div>

        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 800,
            color: "#3d0015",
            lineHeight: 1.25,
            marginBottom: 20,
          }}
        >
          Hoy es el día perfecto para sorprender
        </h2>

        <p
          style={{
            color: "#7a3a4a",
            fontSize: 18,
            lineHeight: 1.7,
            marginBottom: 44,
            maxWidth: 560,
            margin: "0 auto 44px",
          }}
        >
          No esperes una ocasión especial. El amor se celebra todos los días. Escríbenos y creamos el regalo perfecto juntos.
        </p>

        <a
          href={whatsappLink(CONFIG.NUMERO_WHATSAPP, "¡Hola! Quiero sorprender a alguien especial hoy 💕")}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            color: "#fff",
            padding: "20px 52px",
            borderRadius: 50,
            textDecoration: "none",
            fontSize: 19,
            fontWeight: 900,
            boxShadow: "0 10px 35px rgba(37,211,102,0.4)",
          }}
        >
          Escríbenos por WhatsApp
        </a>

        <p style={{ color: "#9a6070", fontSize: 14, marginTop: 20 }}>
          Respondemos en menos de 5 minutos ⚡
        </p>
      </div>
    </section>
  );
}