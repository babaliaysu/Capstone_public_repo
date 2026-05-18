// Rezervasiyalarım — İstifadəçinin rezervasiyalarını göstərən səhifə
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Calendar } from "lucide-react";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { Button } from "@/components/ui/button";

const Rezervasiyalar = () => {
  const { t } = useTranslation();

  // TODO: Backend-dən istifadəçinin rezervasiyalarını yüklə
  const rezervasiyalar: any[] = [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <YuxariPanel />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana səhifəyə qayıt
          </Link>

          <div className="mb-10">
            <h1 className="font-serif text-4xl font-medium text-foreground mb-2">
              Rezervasiyalarım
            </h1>
            <p className="text-muted-foreground">
              Etdiyiniz bütün rezervasiyalar
            </p>
          </div>

          {rezervasiyalar.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-warm shadow-gold mb-8">
                <Calendar className="h-9 w-9 text-primary-foreground" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                Rezervasiya yoxdur
              </p>
              <h2 className="font-serif text-3xl font-medium text-foreground mb-4">
                Hələ ev və kitməyətdən istifadə etməmisiniz
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Azərbaycan kəndlərində unudulmaz təcrübələr yaşayın
              </p>
              <Link to="/#ikinci-sehife">
                <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Ev tap
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {rezervasiyalar.map((rez) => (
                <div key={rez.id} className="bg-card rounded-lg p-6 ring-1 ring-border">
                  {/* Rezervasiya kartları burada gösterilecek */}
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

export default Rezervasiyalar;
