// Ana səhifə — bütün ana səhifə bölmələrini birləşdirir.
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { Banner } from "@/frontend/komponentler/anasehife/Banner";
import { PopulyarKendler } from "@/frontend/komponentler/anasehife/PopulyarKendler";
import { NeceIsleyir } from "@/frontend/komponentler/anasehife/NeceIsleyir";
import { TovsiyeEvler } from "@/frontend/komponentler/anasehife/TovsiyeEvler";
import { Fealiyyetler } from "@/frontend/komponentler/anasehife/Fealiyyetler";
import { KendliCagirisi } from "@/frontend/komponentler/anasehife/KendliCagirisi";
import { Reyler } from "@/frontend/komponentler/anasehife/Reyler";

const AnaSehife = () => {
  return (
    <div className="min-h-screen bg-background">
      <YuxariPanel />
      <main>
        <Banner />
        <PopulyarKendler />
        <NeceIsleyir />
        <TovsiyeEvler />
        <Fealiyyetler />
        <KendliCagirisi />
        <Reyler />
      </main>
      <AltPanel />
    </div>
  );
};

export default AnaSehife;
