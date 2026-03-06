import { useEffect, useState } from 'react'
import { CONFIG } from '../config'
import { whatsappLink } from '../utils/whatsapp'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(180,60,80,0.08)" : "none",
      }}
    >
      <div
        className="landing-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 70,
        }}
      >
        {/* Logo */}
        <a
          href="#inicio"
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
        >
          <span style={{ fontSize: 28 }}>🌹</span>
          <span
            style={{
              fontFamily: "'Georgia', serif",
              fontWeight: 700,
              fontSize: 20,
              color: scrolled ? "#8B1A2E" : "#fff",
              letterSpacing: 0.5,
            }}
          >
            {CONFIG.NOMBRE_DEL_NEGOCIO}
          </span>
        </a>

        {/* Desktop Links */}
        <div
          className="landing-desktopNav"
          style={{ display: "flex", gap: 28, alignItems: "center" }}
        >
          {CONFIG.NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                textDecoration: "none",
                color: scrolled ? "#5a1a2e" : "rgba(255,255,255,0.9)",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              {item.label}
            </a>
          ))}

          <a
            href={whatsappLink(CONFIG.NUMERO_WHATSAPP, "¡Hola! Quiero hacer un pedido 💕")}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(135deg, #c0392b, #8B1A2E)",
              color: "#fff",
              padding: "10px 22px",
              borderRadius: 50,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 700,
              boxShadow: "0 4px 15px rgba(180,30,60,0.35)",
            }}
          >
            📱 WhatsApp
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="landing-mobileBtn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 26,
            color: scrolled ? "#8B1A2E" : "#fff",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="landing-mobileMenu"
          style={{
            background: "#fff",
            padding: "16px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {CONFIG.NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: "#5a1a2e",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}