// Elanlarım — İstifadəçinin göndərdiyi elanları göstərən səhifə
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ListPlus, Clock, CheckCircle, XCircle } from "lucide-react";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { Button } from "@/components/ui/button";
import { supabase } from "@/backend/supabase";
import { useSessiya } from "@/backend/qarmaqlar/useSessiya";

type EvSahibiMuraciet = {
  id: string;
  ev_adi: string;
  bolge: string;
  rayon: string;
  tip: string;
  qiymet: number;
  tesvir: string;
  elaqe_telefon: string;
  status: string;
  yaradilma_tarixi: string;
};

const Elanlarim = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { istifadeci, yuklenir: sessiyaYuklenir } = useSessiya();
  const [elanlar, setElanlar] = useState<EvSahibiMuraciet[]>([]);
  const [yuklenir, setYuklenir] = useState(true);

  // Auth gate
  useEffect(() => {
    if (!sessiyaYuklenir && !istifadeci) {
      navigate("/giris?redirect=/elanlarim", { replace: true });
    }
  }, [sessiyaYuklenir, istifadeci, navigate]);

  // İstifadəçinin elanlarını yüklə
  useEffect(() => {
    if (!istifadeci) return;

    const elanlarYukle = async () => {
      setYuklenir(true);
      const { data, error } = await supabase
        .from("ev_sahibi_muracietleri")
        .select("*")
        .eq("istifadeci_id", istifadeci.id)
        .order("yaradilma_tarixi", { ascending: false });

      if (!error && data) {
        setElanlar(data as EvSahibiMuraciet[]);
      }
      setYuklenir(false);
    };

    elanlarYukle();
  }, [istifadeci]);

  const statusReng = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const statusIkon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const statusMetn = (status: string) => {
    switch (status) {
      case "pending":
        return "Gözləmədə";
      case "approved":
        return "Təsdiqlənib";
      case "rejected":
        return "Rədd edilib";
      default:
        return status;
    }
  };

  if (yuklenir) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <YuxariPanel />
        <main className="flex-1 flex items-center justify-center pt-32 pb-20">
          <p className="text-muted-foreground">Yüklənir...</p>
        </main>
        <AltPanel />
      </div>
    );
  }

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
                <div key={elan.id} className="bg-card rounded-2xl p-6 ring-1 ring-border shadow-soft hover:shadow-elegant transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl font-medium text-foreground mb-2">
                        {elan.ev_adi}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {elan.bolge}, {elan.rayon}
                      </p>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusReng(elan.status)}`}>
                      {statusIkon(elan.status)}
                      {statusMetn(elan.status)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Yerləşmə növü</p>
                      <p className="text-sm font-medium">{elan.tip}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Gecəlik qiymət</p>
                      <p className="text-sm font-medium">{elan.qiymet} ₼</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Göndərilmə tarixi</p>
                      <p className="text-sm font-medium">
                        {new Date(elan.yaradilma_tarixi).toLocaleDateString('az-AZ')}
                      </p>
                    </div>
                  </div>

                  {elan.tesvir && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {elan.tesvir}
                    </p>
                  )}

                  {elan.status === "pending" && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                      <p className="text-xs text-yellow-800 dark:text-yellow-200">
                        ⏳ Elanınız komandamız tərəfindən yoxlanılır. Təsdiq edildikdən sonra email bildirişi alacaqsınız.
                      </p>
                    </div>
                  )}

                  {elan.status === "approved" && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <p className="text-xs text-green-800 dark:text-green-200">
                        ✅ Elanınız təsdiqlənib və indi saytda göstərilir!
                      </p>
                    </div>
                  )}

                  {elan.status === "rejected" && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <p className="text-xs text-red-800 dark:text-red-200">
                        ❌ Elanınız təəssüf ki, təsdiq edilmədi. Daha ətraflı məlumat üçün email-inizi yoxlayın.
                      </p>
                    </div>
                  )}
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