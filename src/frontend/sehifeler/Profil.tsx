// Profil səhifəsi — istifadəçinin ad-soyad/email-i redaktə etdiyi və
// parolunu dəyişdiyi şəxsi kabinet.

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut, User, Mail, Lock, Save, KeyRound, X, ArrowLeft } from "lucide-react";
import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/backend/supabase";
import { useSessiya } from "@/backend/qarmaqlar/useSessiya";
import {
  parolDeyisSxemi,
  profilSxemi,
  type ParolDeyisDeyerleri,
  type ProfilDeyerleri,
} from "@/backend/sxemler/auth";

const Profil = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { istifadeci, profil, yuklenir, setProfil } = useSessiya();
  const [redakteRejimi, setRedakteRejimi] = useState(false);
  const [parolPaneli, setParolPaneli] = useState(false);

  // Daxil olmayıbsa giriş səhifəsinə at.
  useEffect(() => {
    if (!yuklenir && !istifadeci) navigate("/giris", { replace: true });
  }, [yuklenir, istifadeci, navigate]);

  // Profil forması
  const profilForm = useForm<ProfilDeyerleri>({
    resolver: zodResolver(profilSxemi),
    values: {
      adSoyad: profil?.ad_soyad ?? "",
      email: profil?.email ?? istifadeci?.email ?? "",
    },
  });

  // Parol dəyişdirmə forması
  const parolForm = useForm<ParolDeyisDeyerleri>({
    resolver: zodResolver(parolDeyisSxemi),
  });

  const profilSaxla = async (d: ProfilDeyerleri) => {
    if (!istifadeci) return;
    const { data, error } = await supabase
      .from("profiller")
      .update({ ad_soyad: d.adSoyad, email: d.email })
      .eq("istifadeci_id", istifadeci.id)
      .select()
      .maybeSingle();

    if (error) {
      toast.error(error.message);
      return;
    }
    // Email auth-da da yenilənsin (təsdiq tələb edə bilər)
    if (d.email !== istifadeci.email) {
      await supabase.auth.updateUser({ email: d.email });
    }
    if (data) setProfil(data as typeof profil);
    setRedakteRejimi(false);
    toast.success(t("profile.updated"));
  };

  const parolSaxla = async (d: ParolDeyisDeyerleri) => {
    const { error } = await supabase.auth.updateUser({ password: d.yeniParol });
    if (error) {
      toast.error(error.message);
      return;
    }
    parolForm.reset();
    setParolPaneli(false);
    toast.success(t("profile.passwordUpdated"));
  };

  const cixis = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  if (yuklenir || !istifadeci) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">{t("auth.loading")}</p>
      </div>
    );
  }

  // Avatar baş hərfləri
  const ad = profil?.ad_soyad || istifadeci.email || "";
  const sozler = ad.split(/\s+/).filter(Boolean);
  const basHerfleri = sozler.length >= 2
    ? (sozler[0][0] + sozler[1][0]).toLocaleUpperCase("az-AZ")
    : (sozler[0]?.[0] ?? "?").toLocaleUpperCase("az-AZ");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <YuxariPanel />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana səhifəyə qayıt
          </Link>

          {/* Başlıq + avatar */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-20 w-20 rounded-full bg-gradient-warm text-background flex items-center justify-center text-2xl font-semibold ring-4 ring-gold/40 shadow-gold">
              {basHerfleri}
            </div>
            <div>
              <h1 className="font-serif text-3xl font-medium text-foreground">
                Salam!
              </h1>
              <p className="text-base text-foreground/80 font-medium mt-1">
                {profil?.ad_soyad || "Ad Soyadı"}
              </p>
            </div>
          </div>

          {/* Profil məlumatları kartı */}
          <div className="bg-card rounded-2xl p-6 ring-1 ring-border shadow-soft mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-xl font-medium text-foreground">
                {t("profile.personalInfo")}
              </h2>
              {!redakteRejimi ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setRedakteRejimi(true)}
                >
                  {t("profile.edit")}
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setRedakteRejimi(false);
                    profilForm.reset();
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  {t("profile.cancel")}
                </Button>
              )}
            </div>

            <form onSubmit={profilForm.handleSubmit(profilSaxla)} className="space-y-4">
              <div className="space-y-2">
                <Label>{t("auth.fullName")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...profilForm.register("adSoyad")}
                    disabled={!redakteRejimi}
                    className="pl-10"
                  />
                </div>
                {profilForm.formState.errors.adSoyad && (
                  <p className="text-xs text-destructive">
                    {profilForm.formState.errors.adSoyad.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{t("auth.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    {...profilForm.register("email")}
                    disabled={!redakteRejimi}
                    className="pl-10"
                  />
                </div>
                {profilForm.formState.errors.email && (
                  <p className="text-xs text-destructive">
                    {profilForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              {redakteRejimi && (
                <Button type="submit" className="w-full bg-gradient-warm hover:shadow-gold">
                  <Save className="h-4 w-4 mr-2" />
                  {t("profile.save")}
                </Button>
              )}
            </form>
          </div>

          {/* Parol dəyişdirmə kartı (eyni səhifədə açılır) */}
          <div className="bg-card rounded-2xl p-6 ring-1 ring-border shadow-soft mb-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-medium text-foreground">
                {t("profile.changePassword")}
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => setParolPaneli((v) => !v)}
              >
                <KeyRound className="h-4 w-4 mr-1" />
                {parolPaneli ? t("profile.cancel") : t("profile.changePassword")}
              </Button>
            </div>

            {parolPaneli && (
              <form
                onSubmit={parolForm.handleSubmit(parolSaxla)}
                className="space-y-4 mt-5 pt-5 border-t border-border"
              >
                <div className="space-y-2">
                  <Label>{t("profile.newPassword")}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      {...parolForm.register("yeniParol")}
                      className="pl-10"
                      placeholder="ən azı 6 simvol"
                    />
                  </div>
                  {parolForm.formState.errors.yeniParol && (
                    <p className="text-xs text-destructive">
                      {parolForm.formState.errors.yeniParol.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>{t("auth.passwordConfirm")}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      {...parolForm.register("parolTesdiqi")}
                      className="pl-10"
                      placeholder="yeni parolu təkrar yaz"
                    />
                  </div>
                  {parolForm.formState.errors.parolTesdiqi && (
                    <p className="text-xs text-destructive">
                      {parolForm.formState.errors.parolTesdiqi.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full bg-gradient-warm hover:shadow-gold">
                  {t("profile.submit")}
                </Button>
              </form>
            )}
          </div>

          {/* Çıxış */}
          <Button
            variant="outline"
            onClick={cixis}
            className="w-full rounded-full border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t("profile.logout")}
          </Button>
        </div>
      </main>

      <AltPanel />
    </div>
  );
};

export default Profil;
