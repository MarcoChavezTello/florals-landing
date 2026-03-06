import { useEffect, useState } from 'react'
import { CONFIG } from '../config'
import { whatsappLink } from '../utils/whatsapp'

export default function Promotion() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) return prev;
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section
      className="landing-section"
      style={{
        padding: "80px 0",
        background: "linear-gradient(135deg, #ff6b6b 0%, #c0392b 40%, #8B1A2E 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="landing-container" style={{ maxWidth: 760, position: "relative", zIndex: 1 }}>
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 50,
            display: "inline-block",
            padding: "8px 24px",
            marginBottom: 24,
            backdropFilter: "blur(8px)",
          }}
        >
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 800, letterSpacing: 1 }}>
            🔥 OFERTA ESPECIAL — TIEMPO LIMITADO
          </span>
        </div>

        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            color: "#fff",
            marginBottom: 12,
          }}
        >
          {CONFIG.TEXTO_PROMOCION}
        </h2>

        <div
          style={{
            fontSize: "clamp(3.5rem, 10vw, 6rem)",
            fontWeight: 900,
            color: "#fff",
            fontFamily: "Georgia, serif",
            marginBottom: 8,
          }}
        >
          {CONFIG.DESCUENTO} OFF
        </div>

        <p style={{ color: "rgba(255,220,220,0.9)", fontSize: 17, marginBottom: 36 }}>
          Oferta válida hasta el <strong>{CONFIG.FECHA_LIMITE}</strong>
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
          {[
            { val: pad(timeLeft.hours), label: "Horas" },
            { val: pad(timeLeft.minutes), label: "Min" },
            { val: pad(timeLeft.seconds), label: "Seg" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 16,
                padding: "16px 24px",
                backdropFilter: "blur(8px)",
                minWidth: 90,
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", fontFamily: "monospace" }}>
                {item.val}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,220,220,0.8)", marginTop: 4 }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <a
          href={whatsappLink(CONFIG.NUMERO_WHATSAPP, `Hola! Quiero aprovechar el ${CONFIG.DESCUENTO} de descuento 🎁`)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "#fff",
            color: "#8B1A2E",
            padding: "18px 48px",
            borderRadius: 50,
            textDecoration: "none",
            fontSize: 18,
            fontWeight: 900,
            boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
          }}
        >
          ¡Quiero mi descuento! →
        </a>
      </div>
    </section>
  );
}