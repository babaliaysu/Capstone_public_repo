// Regionlar səhifəsi — interaktiv Azərbaycan xəritəsi.
// Hover: region path-ı tündləşir + tooltip.
// Klik: /regionlar/:slug səhifəsinə keçid.

import { useState } from "react";
import { Link } from "react-router-dom";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { REGIONLAR } from "@/backend/melumat/regionlar";

const Regionlar = () => {
  const [hover, setHover] = useState<string | null>(null);

  const hoverliRegion = REGIONLAR.find((r) => r.slug === hover);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <YuxariPanel />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
              Regionlara görə kəşf et
            </h1>
            <p className="mt-3 text-muted-foreground">
              Azərbaycanın kənd turizmi xəritəsi — region üzərinə klik et və o bölgədəki
              elanlara bax.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
            {/* Sol: interaktiv SVG xəritə */}
            <div className="relative bg-secondary/50 rounded-2xl p-6 ring-1 ring-border shadow-soft">
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Xəzər dənizi fonu */}
                <rect width="1000" height="600" fill="hsl(200 60% 92%)" rx="12" />
                {/* Xəzər */}
                <path
                  d="M 920,290 L 1000,250 L 1000,560 L 880,540 L 870,500 L 850,440 L 870,380 L 920,360 Z"
                  fill="hsl(200 70% 78%)"
                />

                {REGIONLAR.map((r) => {
                  const aktiv = hover === r.slug;
                  return (
                    <Link key={r.slug} to={`/regionlar/${r.slug}`}>
                      <path
                        d={r.d}
                        onMouseEnter={() => setHover(r.slug)}
                        onMouseLeave={() => setHover(null)}
                        fill={
                          aktiv
                            ? "hsl(145 45% 22%)"
                            : "hsl(90 35% 65%)"
                        }
                        stroke="hsl(60 25% 97%)"
                        strokeWidth={2}
                        className="transition-all duration-300 cursor-pointer hover:opacity-100"
                        style={{
                          filter: aktiv
                            ? "drop-shadow(0 4px 12px hsl(145 45% 22% / 0.5))"
                            : "none",
                        }}
                      />
                    </Link>
                  );
                })}

                {/* Tooltip */}
                {hoverliRegion && (
                  <g
                    transform={`translate(${hoverliRegion.merkez[0]}, ${hoverliRegion.merkez[1]})`}
                    style={{ pointerEvents: "none" }}
                  >
                    <rect
                      x={-70}
                      y={-22}
                      width={140}
                      height={28}
                      rx={6}
                      fill="hsl(140 30% 10%)"
                    />
                    <text
                      x={0}
                      y={-3}
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="600"
                      fill="hsl(50 40% 96%)"
                      fontFamily="Inter, sans-serif"
                    >
                      {hoverliRegion.ad}
                    </text>
                  </g>
                )}
              </svg>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Stilizə edilmiş xəritə — region üzərinə klik et.
              </p>
            </div>

            {/* Sağ: regionların adlar siyahısı (qrid) */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {REGIONLAR.map((r) => (
                <Link
                  key={r.slug}
                  to={`/regionlar/${r.slug}`}
                  onMouseEnter={() => setHover(r.slug)}
                  onMouseLeave={() => setHover(null)}
                  className={`block group py-2 border-b border-border transition-colors ${
                    hover === r.slug ? "border-primary" : "hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {r.ad}
                    </span>
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {r.qisaTesvir}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <AltPanel />
    </div>
  );
};

export default Regionlar;
