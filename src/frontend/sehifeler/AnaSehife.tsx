// Ana səhifə — iki ekran:
//   1) Birinci3DSehife — 3D animasiyalı immersive Hero
//   2) Banner + qalan bölmələr (id="ikinci-sehife" — scroll hədəfi)

import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { Birinci3DSehife } from "@/frontend/komponentler/anasehife/Birinci3DSehife";
import { Banner } from "@/frontend/komponentler/anasehife/Banner";
import { PopulyarKendler } from "@/frontend/komponentler/anasehife/PopulyarKendler";
import { NeceIsleyir } from "@/frontend/komponentler/anasehife/NeceIsleyir";
import { TovsiyeEvler } from "@/frontend/komponentler/anasehife/TovsiyeEvler";
import { KendliCagirisi } from "@/frontend/komponentler/anasehife/KendliCagirisi";
import { Reyler } from "@/frontend/komponentler/anasehife/Reyler";

const AnaSehife = () => {
  return (
    <div className="min-h-screen bg-background">
      <YuxariPanel />
      <main>
        {/* 1-ci ekran: 3D animasiyalı giriş */}
        <Birinci3DSehife />

        {/* 2-ci ekran və qalan bölmələr */}
        <div id="ikinci-sehife">
          <Banner />
          <PopulyarKendler />
          <NeceIsleyir />
          <TovsiyeEvler />
          <KendliCagirisi />
          <div id="qonaq-reyleri">
            <Reyler />
          </div>
        </div>
      </main>
      <AltPanel />
    </div>
  );
};

export default AnaSehife;
