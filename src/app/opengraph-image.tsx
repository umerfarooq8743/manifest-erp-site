import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.tagline} ERP for customs clearing and freight forwarding.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STEPS = ["BL", "ETA", "Job file", "GD", "Assessment", "D/O + NOC", "Gate pass", "Delivery", "Bill", "SOA", "Close"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #060a12 0%, #0b1526 55%, #06281f 100%)",
          color: "#edf1f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#059669" />
                <stop offset="1" stopColor="#0e7490" />
              </linearGradient>
            </defs>
            <path d="M8 1h13.5L31 10.5V24a7 7 0 0 1-7 7H8a7 7 0 0 1-7-7V8a7 7 0 0 1 7-7z" fill="url(#bg)" />
            <path d="M21.5 1v5.5a4 4 0 0 0 4 4H31z" fill="#fff" fillOpacity=".38" />
            <path d="M8.5 23.5V11.2c0-.5.6-.8 1-.4L16 17l6.5-6.2c.4-.4 1-.1 1 .4v12.3" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5 26.5h7" stroke="#fff" strokeOpacity=".7" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "36px", fontWeight: 700 }}>
            Manifest
            <span style={{ fontSize: "18px", letterSpacing: "4px", color: "#34d399", border: "1px solid rgba(52,211,153,.4)", borderRadius: "8px", padding: "4px 10px" }}>ERP</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: "72px", fontWeight: 700, letterSpacing: "-2px", lineHeight: 1.05 }}>{site.tagline}</div>
          <div style={{ fontSize: "30px", color: "#b6c0d0", maxWidth: "980px", lineHeight: 1.35 }}>
            The connected ERP for customs clearing and freight forwarding.
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {STEPS.map((step) => (
            <div key={step} style={{ display: "flex", fontSize: "20px", color: "#d1fae5", background: "rgba(52,211,153,.10)", border: "1px solid rgba(52,211,153,.28)", borderRadius: "999px", padding: "8px 16px" }}>
              {step}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
