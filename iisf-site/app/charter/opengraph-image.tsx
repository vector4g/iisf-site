import { ImageResponse } from "next/og";

export const alt =
  "Charter of Fundamental Intersectional Safety Rights — IISF";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #05060a 0%, #0c1220 50%, #0a1628 100%)",
          color: "#f1f5f9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 80,
            height: 4,
            background: "linear-gradient(90deg, #22d3ee, #3b82f6)",
            borderRadius: 4,
            marginBottom: 32,
          }}
        />

        <div
          style={{
            fontSize: 16,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "#22d3ee",
            marginBottom: 16,
          }}
        >
          IISF Charter
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          Charter of Fundamental Intersectional Safety Rights
        </div>

        <div
          style={{
            fontSize: 20,
            color: "#94a3b8",
            lineHeight: 1.5,
            maxWidth: 800,
            marginBottom: 40,
          }}
        >
          Sensory Safety · Kinetic Equity · Algorithmic Accountability
        </div>

        <div style={{ display: "flex", gap: 24, fontSize: 14, color: "#64748b" }}>
          <span>The Grandin Standard</span>
          <span>·</span>
          <span>The Heumann Standard</span>
          <span>·</span>
          <span>The Crenshaw Standard</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

