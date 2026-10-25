import { ImageResponse } from "next/og";
import { people } from "@/content";

export const alt = "The Outcast Syndicate: separate tracks, one cut";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand card for shared links: the four lanes, one clip live.
export default function OpengraphImage() {
  const lanes = [
    { x: 80, w: 300 },
    { x: 260, w: 420 },
    { x: 140, w: 240 },
    { x: 420, w: 360 },
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f2eb",
          color: "#111111",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 800, lineHeight: 0.9, letterSpacing: -3 }}>
          <span>THE OUTCAST</span>
          <span style={{ fontWeight: 300 }}>SYNDICATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {people.map((p, i) => (
            <div key={p.slug} style={{ display: "flex", alignItems: "center", height: 44, borderTop: "1px solid rgba(17,17,17,.2)" }}>
              <span style={{ width: 70, fontSize: 22, fontWeight: 700 }}>{p.track}</span>
              <div
                style={{
                  marginLeft: lanes[i].x,
                  width: lanes[i].w,
                  height: 30,
                  background: i === 1 ? "#c8ff00" : "#111111",
                  border: "2px solid #111111",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
