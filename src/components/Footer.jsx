import { CONFIG } from '../config'
import { whatsappLink } from '../utils/whatsapp'

export default function Footer() {
  return (
    <footer style={{ background: "#1a0008", color: "#fff", padding: "64px 0 32px" }}>
      <div className="landing-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
            marginBottom: 56,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span style={{ fontSize: 32 }}>🌹</span>
              <span style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 800 }}>
                {CONFIG.NOMBRE_DEL_NEGOCIO}
              </span>
            </div>
            <p style={{ color: "#c4849a", lineHeight: 1.7, fontSize: 14, marginBottom: 24 }}>
              {CONFIG.SLOGAN}
            </p>

            <div style={{ display: "flex", gap: 14 }}>
              {[
                { href: CONFIG.INSTAGRAM, icon: "📸", label: "Instagram" },
                { href: CONFIG.FACEBOOK, icon: "👥", label: "Facebook" },
                {
                  href: whatsappLink(CONFIG.NUMERO_WHATSAPP, "Hola! Quiero saber más 💕"),
                  icon: "💬",
                  label: "WhatsApp",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: 42,
                    height: 42,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    textDecoration: "none",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#f8bbd0", fontWeight: 900, marginBottom: 20, fontSize: 15, letterSpacing: 1 }}>
              NAVEGAR
            </h4>
            {[
              { label: "Inicio", href: "#inicio" },
              { label: "Catálogo", href: "#catalogo" },
              { label: "¿Por qué nosotros?", href: "#por-que-nosotros" },
              { label: "Testimonios", href: "#testimonios" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  display: "block",
                  color: "#c4849a",
                  textDecoration: "none",
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div>
            <h4 style={{ color: "#f8bbd0", fontWeight: 900, marginBottom: 20, fontSize: 15, letterSpacing: 1 }}>
              CONTACTO
            </h4>
            {[
              { icon: "📍", text: CONFIG.DIRECCION },
              { icon: "📞", text: CONFIG.TELEFONO },
              { icon: "✉️", text: CONFIG.EMAIL },
            ].map((c) => (
              <div key={c.text} style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 16, marginTop: 1 }}>{c.icon}</span>
                <span style={{ color: "#c4849a", fontSize: 14, lineHeight: 1.5 }}>{c.text}</span>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ color: "#f8bbd0", fontWeight: 900, marginBottom: 20, fontSize: 15, letterSpacing: 1 }}>
              HORARIO
            </h4>
            {[
              { day: "Lun – Vie", hours: "9:00 AM – 7:00 PM" },
              { day: "Sábado", hours: "9:00 AM – 7:00 PM" },
              { day: "Domingo", hours: "10:00 AM – 5:00 PM" },
            ].map((h) => (
              <div key={h.day} style={{ marginBottom: 12 }}>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 800 }}>{h.day}</div>
                <div style={{ color: "#c4849a", fontSize: 13 }}>{h.hours}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p style={{ color: "#7a4055", fontSize: 13 }}>
            © 2026 {CONFIG.NOMBRE_DEL_NEGOCIO}. Todos los derechos reservados. Hecho con 💕
          </p>
          <p style={{ color: "#7a4055", fontSize: 12 }}>
            Privacidad · Términos · Cookies
          </p>
        </div>
      </div>
    </footer>
  );
}