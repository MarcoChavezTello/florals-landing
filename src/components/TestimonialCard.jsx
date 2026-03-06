export default function TestimonialCard({ src, index, onClick }) {
  return (
    <div
      onClick={() => onClick(index)}
      style={{
        flexShrink: 0,
        width: "clamp(220px, 28vw, 320px)",
        height: "clamp(260px, 34vw, 380px)",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "zoom-in",
        position: "relative",
        boxShadow: "0 6px 24px rgba(180,30,60,0.12)",
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 20px 50px rgba(180,30,60,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(180,30,60,0.12)";
      }}
    >
      <img
        src={src}
        alt={`Entrega ${index + 1}`}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      {/* Fallback si la imagen no carga */}
      <div style={{ display: "none", width: "100%", height: "100%", background: "linear-gradient(135deg,#fce4ec,#f8bbd0)", alignItems: "center", justifyContent: "center", fontSize: 56 }}>
        🌹
      </div>

      {/* Overlay sutil al hover */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(61,0,21,0.35) 0%, transparent 50%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, textAlign: "center", color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 600, letterSpacing: 0.5, pointerEvents: "none" }}>
        Ver entrega →
      </div>
    </div>
  );
}
