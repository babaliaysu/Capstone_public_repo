-- İstifadəçi profilləri cədvəli
CREATE TABLE public.profiller (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  istifadeci_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  ad_soyad TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  yaradilma_tarixi TIMESTAMPTZ NOT NULL DEFAULT now(),
  yenilenme_tarixi TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiller ENABLE ROW LEVEL SECURITY;

-- RLS: hər kəs öz profilini görə bilər
CREATE POLICY "Istifadeci oz profilini gore biler"
ON public.profiller FOR SELECT
USING (auth.uid() = istifadeci_id);

CREATE POLICY "Istifadeci oz profilini yarada biler"
ON public.profiller FOR INSERT
WITH CHECK (auth.uid() = istifadeci_id);

CREATE POLICY "Istifadeci oz profilini yenileye biler"
ON public.profiller FOR UPDATE
USING (auth.uid() = istifadeci_id);

-- Yenilənmə tarixi üçün funksiya
CREATE OR REPLACE FUNCTION public.yenilenme_tarixini_tezele()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.yenilenme_tarixi = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiller_yenilenme_tarixi
BEFORE UPDATE ON public.profiller
FOR EACH ROW
EXECUTE FUNCTION public.yenilenme_tarixini_tezele();

-- Yeni qeydiyyatdan keçən istifadəçi üçün avtomatik profil
CREATE OR REPLACE FUNCTION public.yeni_istifadeci_qeydiyyati()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiller (istifadeci_id, ad_soyad, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'ad_soyad', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER auth_user_qeydiyyati
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.yeni_istifadeci_qeydiyyati();