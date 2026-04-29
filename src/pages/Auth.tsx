import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mountain, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // signin
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");

  // signup
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");

  useEffect(() => {
    // Set up auth listener FIRST
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate("/dashboard", { replace: true });
    });
    // Then check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: siEmail,
      password: siPassword,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Xoş gəldin!");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: suEmail,
      password: suPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: suName },
      },
    });
    setLoading(false);
    if (error) {
      if (error.message.includes("already")) {
        toast.error("Bu email artıq qeydiyyatdadır. Daxil ol bölməsinə keç.");
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Hesab yaradıldı! Email-ini yoxla.");
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-forest">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-accent/20 blur-3xl" />

      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-background/80 hover:text-background transition-colors text-sm font-medium z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        Ana səhifə
      </Link>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Mountain className="h-8 w-8 text-gold" />
            <span className="font-serif text-3xl font-semibold text-background">Yurd</span>
          </div>

          <div className="bg-card rounded-2xl shadow-elegant p-8 ring-1 ring-border">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Daxil ol</TabsTrigger>
                <TabsTrigger value="signup">Qeydiyyat</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="si-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="si-email"
                        type="email"
                        required
                        value={siEmail}
                        onChange={(e) => setSiEmail(e.target.value)}
                        className="pl-10"
                        placeholder="sen@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="si-pass">Şifrə</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="si-pass"
                        type="password"
                        required
                        value={siPassword}
                        onChange={(e) => setSiPassword(e.target.value)}
                        className="pl-10"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-warm hover:shadow-gold">
                    {loading ? "Yüklənir..." : "Daxil ol"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="su-name">Ad Soyad</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="su-name"
                        required
                        value={suName}
                        onChange={(e) => setSuName(e.target.value)}
                        className="pl-10"
                        placeholder="Adın Soyadın"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="su-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="su-email"
                        type="email"
                        required
                        value={suEmail}
                        onChange={(e) => setSuEmail(e.target.value)}
                        className="pl-10"
                        placeholder="sen@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="su-pass">Şifrə</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="su-pass"
                        type="password"
                        required
                        minLength={6}
                        value={suPassword}
                        onChange={(e) => setSuPassword(e.target.value)}
                        className="pl-10"
                        placeholder="ən azı 6 simvol"
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-warm hover:shadow-gold">
                    {loading ? "Yüklənir..." : "Qeydiyyatdan keç"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Davam etməklə Yurd-un istifadə şərtlərini qəbul edirsən.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
