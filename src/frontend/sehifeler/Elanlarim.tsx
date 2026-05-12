// Elanlarım — İstifadəçinin göndərdiyi elanları göstərən səhifə
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ListPlus } from "lucide-react";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { Button } from "@/components/ui/button";

const Elanlarim = () => {
  const { t } = useTranslation();

  // TODO: Backend-dən istifadəçinin elanlarını yüklə
  const elanlar: any[] = [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <YuxariPanel />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-10">
            <h1 className="font-serif text-4xl font-medium text-foreground mb-2">
              Elanlarım
            </h1>
            <p className="text-muted-foreground">
              Göndərdiyiniz elanlarınızı idarə edin
            </p>
          </div>

          {elanlar.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-warm shadow-gold mb-8">
                <ListPlus className="h-9 w-9 text-primary-foreground" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                Elan yoxdur
              </p>
              <h2 className="font-serif text-3xl font-medium text-foreground mb-4">
                Hələ elan göndərməmisiniz
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Evinizi yerləşdirərək qonaq qəbul etməyə başlayın
              </p>
              <Link to="/#kendli-cagirisi">
                <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Elan göndər
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {elanlar.map((elan) => (
                <div key={elan.id} className="bg-card rounded-lg p-6 ring-1 ring-border">
                  {/* Elan kartları burada gösterilecek */}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <AltPanel />
    </div>
  );
};

export default Elanlarim;
