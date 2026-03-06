export default function Benefits() {
  const beneficios = [
    { icon: "🚀", titulo: "Entregas Puntuales", desc: "Tu regalo llega en el tiempo prometido." },
    { icon: "✨", titulo: "Personalización Total", desc: "Mensaje, empaque y detalle como lo imaginas." },
    { icon: "💎", titulo: "Calidad Garantizada", desc: "Materiales top para superar expectativas." },
    { icon: "💬", titulo: "Atención Inmediata", desc: "Respondemos rápido por WhatsApp." },
  ];

  return (
    <section
      id="por-que-nosotros"
      className="landing-section"
      style={{
        padding: "96px 0",
        background: "linear-gradient(135deg, #3d0015 0%, #8B1A2E 50%, #5a1a2e 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="landing-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            ¿Por qué elegirnos?
          </h2>
          <p style={{ color: "rgba(255,210,220,0.8)", fontSize: 17, maxWidth: 520, margin: "0 auto" }}>
            No solo vendemos regalos. Creamos momentos que viven en la memoria.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 28,
          }}
        >
          {beneficios.map((b) => (
            <div
              key={b.titulo}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: 36,
                textAlign: "center",
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 20, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>
                {b.icon}
              </div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 12 }}>
                {b.titulo}
              </h3>
              <p style={{ color: "rgba(255,210,220,0.82)", fontSize: 15, lineHeight: 1.7 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}