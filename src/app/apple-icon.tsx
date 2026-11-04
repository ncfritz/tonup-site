import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#111111" }}>
        <div style={{ display: "flex", width: 132, height: 132, borderRadius: 66, border: "12px solid #F4F3EF", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", width: 64, height: 64, borderRadius: 32, border: "12px solid #F4F3EF", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", width: 22, height: 22, borderRadius: 11, background: "#C8102E" }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
