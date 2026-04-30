// Tezliklə gələcək bölmələr üçün placeholder səhifə.
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Construction } from "lucide-react";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { Button } from "@/components/ui/button";

const TezlikleGelir = ({ pageTitle }: { pageTitle: string }) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <YuxariPanel />
      <main className="flex-1 flex items-center justify-center pt-32 pb-20">
        <div className="container mx-auto px-6 text-center max-w-xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-warm shadow-gold mb-8 animate-float">
            <Construction className="h-9 w-9 text-primary-foreground" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            {pageTitle}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-foreground mb-4">
            {t("comingSoon.title")}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">{t("comingSoon.subtitle")}</p>
          <Link to="/">
            <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("comingSoon.back")}
            </Button>
          </Link>
        </div>
      </main>
      <AltPanel />
    </div>
  );
};

export default TezlikleGelir;
