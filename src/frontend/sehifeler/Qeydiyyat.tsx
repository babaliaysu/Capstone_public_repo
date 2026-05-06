// Qeydiyyat — Premium split-screen glassmorphic dizayn (qızıl aksent dominant).

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mountain, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/backend/supabase";
import { qeydiyyatSxemi, type QeydiyyatDeyerleri } from "@/backend/sxemler/auth";
import xinaliqDag from "@/frontend/medialar/banner/xinaliq-mountains.jpg";

const Qeydiyyat = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [yuklenir, setYuklenir] = useState(false);
  const [parolGoster, setParolGoster] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QeydiyyatDeyerleri>({ resolver: zodResolver(qeydiyyatSxemi) });

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s) navigate("/", { replace: true });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (d: QeydiyyatDeyerleri) => {
    setYuklenir(true);
    const { error } = await supabase.auth.signUp({
      email: d.email,
      password: d.parol,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { ad_soyad: d.adSoyad },
      },
    });
    setYuklenir(false);
    if (error) {
      if (error.message.includes("already")) {
        toast.error("Bu email artıq qeydiyyatdadır. Daxil ol bölməsinə keç.");
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success(t("auth.successSignup"));
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-forest">
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-background/80 hover:text-background transition-colors text-sm font-medium z-30"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("auth.back")}
      </Link>

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* SOL — forma (qeydiyyatda forma sola, görsel sağa) */}
        <div className="relative flex items-center justify-center p-6 lg:p-12 order-2 lg:order-1">
          <div className="pointer-events-none absolute top-10 -left-10 w-72 h-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 right-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />

          <div className="w-full max-w-md relative">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Mountain className="h-7 w-7 text-gold" />
              <span className="font-serif text-2xl font-semibold text-background">Kəndim</span>
            </div>

            <div className="rounded-3xl bg-background/10 backdrop-blur-2xl border border-background/20 shadow-elegant p-8">
              <div className="text-center mb-6">
                <h1 className="font-serif text-3xl font-medium text-background">
                  Bizə <span className="italic text-gold">qoşul</span>
                </h1>
                <p className="text-sm text-background/70 mt-2">
                  Hesab yarat və kəndin nəfəsini yaşa
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adSoyad" className="text-background/90 text-xs font-medium">
                    {t("auth.fullName")}
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-background/50 group-focus-within:text-gold transition-colors" />
                    <Input
                      id="adSoyad"
                      {...register("adSoyad")}
                      className="pl-10 h-11 bg-background/5 border-background/20 text-background placeholder:text-background/40 focus-visible:ring-gold focus-visible:border-gold/50"
                      placeholder="Adın Soyadın"
                    />
                  </div>
                  {errors.adSoyad && (
                    <p className="text-xs text-destructive">{errors.adSoyad.message}</p>
                  )}
                </div>

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
                      className="pl-10 h-11 bg-background/5 border-background/20 text-background placeholder:text-background/40 focus-visible:ring-gold focus-visible:border-gold/50"
                      placeholder="sen@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="pl-10 pr-10 h-11 bg-background/5 border-background/20 text-background placeholder:text-background/40 focus-visible:ring-gold focus-visible:border-gold/50"
                        placeholder="ən az 6"
                      />
                      <button
                        type="button"
                        onClick={() => setParolGoster((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-background/50 hover:text-gold"
                        tabIndex={-1}
                      >
                        {parolGoster ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.parol && (
                      <p className="text-xs text-destructive">{errors.parol.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parolTesdiqi" className="text-background/90 text-xs font-medium">
                      {t("auth.passwordConfirm")}
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-background/50 group-focus-within:text-gold transition-colors" />
                      <Input
                        id="parolTesdiqi"
                        type={parolGoster ? "text" : "password"}
                        {...register("parolTesdiqi")}
                        className="pl-10 h-11 bg-background/5 border-background/20 text-background placeholder:text-background/40 focus-visible:ring-gold focus-visible:border-gold/50"
                        placeholder="təkrar"
                      />
                    </div>
                    {errors.parolTesdiqi && (
                      <p className="text-xs text-destructive">{errors.parolTesdiqi.message}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={yuklenir}
                  className="w-full h-11 bg-gold text-gold-foreground hover:bg-gold/90 hover:shadow-gold font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-100"
                >
                  {yuklenir ? t("auth.loading") : t("auth.signup")}
                </Button>
              </form>

              <p className="text-sm text-center mt-6 text-background/70">
                {t("auth.haveAccount")}{" "}
                <Link
                  to="/giris"
                  className="text-gold font-semibold hover:underline underline-offset-4"
                >
                  {t("nav.login")}
                </Link>
              </p>
            </div>

            <p className="text-xs text-background/50 text-center mt-6">{t("auth.terms")}</p>
          </div>
        </div>

        {/* SAĞ — brend mənzərə (qızıl tonlu overlay) */}
        <div className="hidden lg:flex relative overflow-hidden items-end p-12 order-1 lg:order-2">
          <img
            src={xinaliqDag}
            alt="Xınalıq dağları"
            className="absolute inset-0 w-full h-full object-cover scale-110 animate-slow-zoom-rev"
          />
          <div className="absolute inset-0 bg-gradient-to-tl from-primary/95 via-primary/60 to-gold/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--gold)/0.35),transparent_60%)]" />

          <div className="relative z-10 space-y-4 max-w-md ml-auto text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/15 backdrop-blur-md border border-background/30">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-semibold uppercase tracking-wider text-background">
                Xoş gəlmisən
              </span>
            </div>
            <h2 className="font-serif text-4xl xl:text-5xl font-medium text-background leading-tight drop-shadow-2xl">
              Yeni <span className="italic text-gold">macəra</span> başlayır
            </h2>
            <p className="text-background/85 text-base leading-relaxed">
              120+ kənddə yerli ailələrin evində unudulmaz təcrübələri kəşf et — sadəcə bir hesabla.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slow-zoom-rev {
          0%, 100% { transform: scale(1.1) translate(0, 0); }
          50% { transform: scale(1.18) translate(1%, -1%); }
        }
        .animate-slow-zoom-rev {
          animation: slow-zoom-rev 24s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Qeydiyyat;
