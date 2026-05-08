// Daxil olma — Premium split-screen glassmorphic dizayn.
// Sol: brend mənzərəsi (dağ şəkli + tünd yaşıl overlay).
// Sağ: glassmorphic forma kartı.

import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mountain, Mail, Lock, ArrowLeft, Eye, EyeOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/backend/supabase";
import { girisSxemi, type GirisDeyerleri } from "@/backend/sxemler/auth";
import xinaliqDag from "@/frontend/medialar/banner/xinaliq-mountains.jpg";

const Giris = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  // Auth bitdikdən sonra geri qayıtmaq üçün hədəf URL.
  const redirect = params.get("redirect") || "/";
  const [yuklenir, setYuklenir] = useState(false);
  const [parolGoster, setParolGoster] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GirisDeyerleri>({ resolver: zodResolver(girisSxemi) });

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s) navigate(redirect, { replace: true });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate(redirect, { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, redirect]);

  const onSubmit = async (d: GirisDeyerleri) => {
    setYuklenir(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: d.email,
      password: d.parol,
    });
    setYuklenir(false);
    if (error) toast.error(error.message);
    else toast.success(t("auth.successSignin"));
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-forest">
      {/* Geri ox */}
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-background/80 hover:text-background transition-colors text-sm font-medium z-30"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("auth.back")}
      </Link>

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* SOL — brend mənzərə paneli */}
        <div className="hidden lg:flex relative overflow-hidden items-end p-12">
          <img
            src={xinaliqDag}
            alt="Xınalıq dağları"
            className="absolute inset-0 w-full h-full object-cover scale-110 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/95 via-primary/70 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--gold)/0.25),transparent_60%)]" />

          <div className="relative z-10 space-y-4 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/15 backdrop-blur-md border border-background/30">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-semibold uppercase tracking-wider text-background">
                Xoş gəldin
              </span>
            </div>
            <h2 className="font-serif text-4xl xl:text-5xl font-medium text-background leading-tight drop-shadow-2xl">
              Kəndin <span className="italic text-gold">nəfəsini</span> yaşa
            </h2>
            <p className="text-background/85 text-base leading-relaxed">
              Xınalıqdan Lahıca, dağ sularından üzüm bağlarına — hesabına daxil ol və yarımçıq qalan səyahətini davam etdir.
            </p>
          </div>
        </div>

        {/* SAĞ — Glassmorphic forma */}
        <div className="relative flex items-center justify-center p-6 lg:p-12">
          {/* Dekorativ aksent buludlar */}
          <div className="pointer-events-none absolute top-10 right-10 w-72 h-72 rounded-full bg-gold/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 -left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />

          <div className="w-full max-w-md relative">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Mountain className="h-7 w-7 text-gold" />
              <span className="font-serif text-2xl font-semibold text-background">Kəndim</span>
            </div>

            {/* Glassmorphic kart */}
            <div className="rounded-3xl bg-background/10 backdrop-blur-2xl border border-background/20 shadow-elegant p-8">
              <div className="text-center mb-7">
                <h1 className="font-serif text-3xl font-medium text-background">
                  Yenidən <span className="italic text-gold">salam</span>
                </h1>
                <p className="text-sm text-background/70 mt-2">
                  Hesabına daxil ol və səyahətə davam et
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-background/90 text-xs font-medium">
                    {t("auth.email")}
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-background/50 group-focus-within:text-gold transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="pl-10 h-11 bg-background/5 border-background/20 text-background placeholder:text-background/40 focus-visible:ring-gold focus-visible:border-gold/50 transition-all"
                      placeholder="sen@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parol" className="text-background/90 text-xs font-medium">
                    {t("auth.password")}
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-background/50 group-focus-within:text-gold transition-colors" />
                    <Input
                      id="parol"
                      type={parolGoster ? "text" : "password"}
                      {...register("parol")}
                      className="pl-10 pr-10 h-11 bg-background/5 border-background/20 text-background placeholder:text-background/40 focus-visible:ring-gold focus-visible:border-gold/50 transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setParolGoster((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-background/50 hover:text-gold transition-colors"
                      tabIndex={-1}
                    >
                      {parolGoster ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.parol && (
                    <p className="text-xs text-destructive">{errors.parol.message}</p>
                  )}
                </div>

                {/* Magnetic gradient button */}
                <Button
                  type="submit"
                  disabled={yuklenir}
                  className="w-full h-11 bg-gold text-gold-foreground hover:bg-gold/90 hover:shadow-gold font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-100"
                >
                  {yuklenir ? t("auth.loading") : t("auth.signin")}
                </Button>
              </form>

              <p className="text-sm text-center mt-6 text-background/70">
                {t("auth.noAccount")}{" "}
                <Link
                  to="/qeydiyyat"
                  className="text-gold font-semibold hover:underline underline-offset-4"
                >
                  {t("nav.signup")}
                </Link>
              </p>
            </div>

            <p className="text-xs text-background/50 text-center mt-6">{t("auth.terms")}</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1.1) translate(0, 0); }
          50% { transform: scale(1.18) translate(-1%, -1%); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 24s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Giris;
