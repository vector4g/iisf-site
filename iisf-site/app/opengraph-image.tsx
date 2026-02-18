import { ImageResponse } from "next/og";

export const alt =
  "International Intersectional Safety Foundation — Guardians of the Algorithm";
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
        {/* Accent bar */}
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
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "#94a3b8",
            marginBottom: 16,
          }}
        >
          IISF
        </div>

        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          International Intersectional Safety Foundation
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#94a3b8",
            lineHeight: 1.5,
            maxWidth: 800,
            marginBottom: 40,
          }}
        >
          Guardians of the Algorithm — The Grandin, Heumann, and Crenshaw Standards
        </div>

        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "#22d3ee",
          }}
        >
          intersectionalsafety.org
        </div>
      </div>
    ),
    { ...size }
  );
}

