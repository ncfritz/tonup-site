import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Rendered once at build time into a static PNG.
export const dynamic = "force-static";
export const alt = "Ton Up: a darts scorer that takes the game seriously. T20, T20, T20 = 180.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [grotesk, mono] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/og/space-grotesk-latin-700-normal.woff")),
    readFile(join(process.cwd(), "src/fonts/og/jetbrains-mono-latin-700-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
          background: "#F4F3EF",
          color: "#111111",
          fontFamily: "Grotesk",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 40 }}>
          <div style={{ display: "flex", width: 44, height: 44, borderRadius: 22, border: "4px solid #111111", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 6, background: "#C8102E" }} />
          </div>
          Ton Up
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Mono", fontSize: 28, color: "#C8102E" }}>T20 · T20 · T20 =</div>
            <div style={{ fontFamily: "Mono", fontSize: 260, lineHeight: 0.9, letterSpacing: -10 }}>180</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 520, paddingBottom: 24 }}>
            <div style={{ fontSize: 52, lineHeight: 1.08 }}>A darts scorer that takes the game seriously.</div>
            <div style={{ fontFamily: "Mono", fontSize: 26, color: "#5C5B56" }}>tonup.app · iPhone</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Grotesk", data: grotesk, weight: 700, style: "normal" },
        { name: "Mono", data: mono, weight: 700, style: "normal" },
      ],
    },
  );
}
