// Regionlar səhifəsi — Supabase regionlar cədvəlindən oxuyur.

import { useState } from "react";
import { Link } from "react-router-dom";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { useRegionlar } from "@/backend/qarmaqlar/useRegionlar";

const Regionlar = () => {
  const [hover, setHover] = useState<string | null>(null);
  const { regionlar, yuklenir } = useRegionlar();

  const hoverliRegion = regionlar.find((r) => r.slug === hover);

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

          {yuklenir ? (
            <div className="text-center text-muted-foreground py-20">Yüklənir...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
              {/* Sol: interaktiv SVG xəritə */}
              <div className="relative bg-secondary/50 rounded-2xl p-6 ring-1 ring-border shadow-soft">
                <svg
                  viewBox="0 0 1000 600"
                  className="w-full h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="1000" height="600" fill="hsl(200 60% 92%)" rx="12" />
                  <path
                    d="M 920,290 L 1000,250 L 1000,560 L 880,540 L 870,500 L 850,440 L 870,380 L 920,360 Z"
                    fill="hsl(200 70% 78%)"
                  />

                  {regionlar.map((r, i) => {
                    const aktiv = hover === r.slug;
                    return (
                      <Link key={r.slug} to={`/regionlar/${r.slug}`}>
                        <path
                          d={r.svg_path}
                          onMouseEnter={() => setHover(r.slug)}
                          onMouseLeave={() => setHover(null)}
                          fill={aktiv ? "hsl(145 45% 22%)" : "hsl(90 35% 65%)"}
                          stroke="hsl(60 25% 97%)"
                          strokeWidth={2}
                          className="transition-all duration-300 cursor-pointer hover:opacity-100 region-twinkle"
                          style={{
                            filter: aktiv
                              ? "drop-shadow(0 4px 16px hsl(42 75% 55% / 0.7))"
                              : "none",
                            animationDelay: `${i * 0.6}s`,
                          }}
                        />
                      </Link>
                    );
                  })}

                  {hoverliRegion && (
                    <g
                      transform={`translate(${hoverliRegion.merkez_x}, ${hoverliRegion.merkez_y})`}
                      style={{ pointerEvents: "none" }}
                    >
                      <rect x={-70} y={-22} width={140} height={28} rx={6} fill="hsl(140 30% 10%)" />
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
                {/* Növbə ilə "ulduz parlama" animasiyası — regionlara qızıl parıltı verir */}
                <style>{`
                  @keyframes region-twinkle {
                    0%, 100% { filter: drop-shadow(0 0 0 transparent); }
                    50% { filter: drop-shadow(0 0 14px hsl(42 75% 55% / 0.85)); }
                  }
                  .region-twinkle {
                    animation: region-twinkle 4s ease-in-out infinite;
                  }
                  .region-twinkle:hover { animation: none; }
                `}</style>
              </div>

              {/* Sağ: regionların adlar siyahısı */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {regionlar.map((r) => (
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
                      {r.qisa_tesvir}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <AltPanel />
    </div>
  );
};

export default Regionlar;
