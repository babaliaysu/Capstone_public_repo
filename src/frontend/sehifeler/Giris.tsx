// Daxil olma səhifəsi — yalnız email + parol.
// Uğurdan sonra ana səhifəyə avtomatik yönləndirir.

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mountain, Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/backend/supabase";
import { girisSxemi, type GirisDeyerleri } from "@/backend/sxemler/auth";

const Giris = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [yuklenir, setYuklenir] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GirisDeyerleri>({ resolver: zodResolver(girisSxemi) });

  // Mövcud sessiya varsa, dərhal ana səhifəyə yönləndir.
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s) navigate("/", { replace: true });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (d: GirisDeyerleri) => {
    setYuklenir(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: d.email,
      password: d.parol,
    });
    setYuklenir(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("auth.successSignin"));
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-forest">
      <div className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-accent/20 blur-3xl" />

      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-background/80 hover:text-background transition-colors text-sm font-medium z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("auth.back")}
      </Link>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Mountain className="h-8 w-8 text-gold" />
            <span className="font-serif text-3xl font-semibold text-background">Kəndim</span>
          </div>

          <div className="bg-card rounded-2xl shadow-elegant p-8 ring-1 ring-border">
            <div className="text-center mb-6">
              <h1 className="font-serif text-2xl font-semibold text-foreground">
                {t("auth.signinTitle")}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">{t("auth.signinSubtitle")}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="pl-10"
                    placeholder="sen@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="parol">{t("auth.password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="parol"
                    type="password"
                    {...register("parol")}
                    className="pl-10"
                    placeholder="••••••••"
                  />
                </div>
                {errors.parol && (
                  <p className="text-xs text-destructive">{errors.parol.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={yuklenir}
                className="w-full bg-gradient-warm hover:shadow-gold"
              >
                {yuklenir ? t("auth.loading") : t("auth.signin")}
              </Button>
            </form>

            <p className="text-sm text-center mt-6 text-muted-foreground">
              {t("auth.noAccount")}{" "}
              <Link to="/qeydiyyat" className="text-primary font-semibold hover:underline">
                {t("nav.signup")}
              </Link>
            </p>

            <p className="text-xs text-muted-foreground text-center mt-6">{t("auth.terms")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Giris;
