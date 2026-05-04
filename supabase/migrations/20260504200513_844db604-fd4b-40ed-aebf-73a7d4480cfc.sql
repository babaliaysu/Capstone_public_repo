
-- ============= REGIONLAR =============
CREATE TABLE public.regionlar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  ad TEXT NOT NULL,
  qisa_tesvir TEXT NOT NULL DEFAULT '',
  svg_path TEXT NOT NULL DEFAULT '',
  merkez_x INTEGER NOT NULL DEFAULT 0,
  merkez_y INTEGER NOT NULL DEFAULT 0,
  sira INTEGER NOT NULL DEFAULT 0,
  yaradilma_tarixi TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.regionlar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Regionlar hamiya gorunur"
ON public.regionlar FOR SELECT
USING (true);

-- ============= ELANLAR =============
CREATE TABLE public.elanlar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  baslq TEXT NOT NULL,
  tesvir TEXT NOT NULL DEFAULT '',
  region TEXT NOT NULL,
  rayon TEXT NOT NULL,
  region_slug TEXT NOT NULL,
  tip TEXT NOT NULL DEFAULT 'butov_ev',
  qiymet NUMERIC(10,2) NOT NULL DEFAULT 0,
  reyting NUMERIC(3,2) NOT NULL DEFAULT 0,
  rey_sayi INTEGER NOT NULL DEFAULT 0,
  qonaq INTEGER NOT NULL DEFAULT 1,
  yatag INTEGER NOT NULL DEFAULT 1,
  metr INTEGER NOT NULL DEFAULT 0,
  xidmetler TEXT[] NOT NULL DEFAULT '{}',
  imkanlar TEXT[] NOT NULL DEFAULT '{}',
  sekiller TEXT[] NOT NULL DEFAULT '{}',
  enlik NUMERIC(10,6),
  uzunluq NUMERIC(10,6),
  ev_sahibi TEXT NOT NULL DEFAULT '',
  sahib_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  aktivdir BOOLEAN NOT NULL DEFAULT true,
  yaradilma_tarixi TIMESTAMPTZ NOT NULL DEFAULT now(),
  yenilenme_tarixi TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_elanlar_region_slug ON public.elanlar(region_slug);
CREATE INDEX idx_elanlar_aktiv ON public.elanlar(aktivdir);

ALTER TABLE public.elanlar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Aktiv elanlar hamiya gorunur"
ON public.elanlar FOR SELECT
USING (aktivdir = true OR sahib_id = auth.uid());

CREATE POLICY "Daxil olmus istifadeci elan yarada biler"
ON public.elanlar FOR INSERT
WITH CHECK (auth.uid() = sahib_id);

CREATE POLICY "Sahib oz elanini yenileye biler"
ON public.elanlar FOR UPDATE
USING (auth.uid() = sahib_id);

CREATE POLICY "Sahib oz elanini sile biler"
ON public.elanlar FOR DELETE
USING (auth.uid() = sahib_id);

CREATE TRIGGER elanlar_yenilenme
BEFORE UPDATE ON public.elanlar
FOR EACH ROW EXECUTE FUNCTION public.yenilenme_tarixini_tezele();

-- ============= SEVIMLILER =============
CREATE TABLE public.sevimliler (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  istifadeci_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  elan_id UUID NOT NULL REFERENCES public.elanlar(id) ON DELETE CASCADE,
  yaradilma_tarixi TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (istifadeci_id, elan_id)
);

ALTER TABLE public.sevimliler ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Istifadeci oz sevimlilerini gorur"
ON public.sevimliler FOR SELECT
USING (auth.uid() = istifadeci_id);

CREATE POLICY "Istifadeci sevimli elave ede biler"
ON public.sevimliler FOR INSERT
WITH CHECK (auth.uid() = istifadeci_id);

CREATE POLICY "Istifadeci oz sevimlisini sile biler"
ON public.sevimliler FOR DELETE
USING (auth.uid() = istifadeci_id);

-- ============= REYLER =============
CREATE TABLE public.reyler (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  elan_id UUID NOT NULL REFERENCES public.elanlar(id) ON DELETE CASCADE,
  istifadeci_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ad_soyad TEXT NOT NULL DEFAULT '',
  ulduz INTEGER NOT NULL DEFAULT 5 CHECK (ulduz BETWEEN 1 AND 5),
  metn TEXT NOT NULL DEFAULT '',
  yaradilma_tarixi TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reyler_elan ON public.reyler(elan_id);

ALTER TABLE public.reyler ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reyler hamiya gorunur"
ON public.reyler FOR SELECT USING (true);

CREATE POLICY "Daxil olmus istifadeci rey yaza biler"
ON public.reyler FOR INSERT
WITH CHECK (auth.uid() = istifadeci_id);

CREATE POLICY "Muellif oz reyini yenileye biler"
ON public.reyler FOR UPDATE
USING (auth.uid() = istifadeci_id);

CREATE POLICY "Muellif oz reyini sile biler"
ON public.reyler FOR DELETE
USING (auth.uid() = istifadeci_id);

-- ============= HEKAYELER =============
CREATE TABLE public.hekayeler (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  istifadeci_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ad_soyad TEXT NOT NULL DEFAULT '',
  seher TEXT NOT NULL DEFAULT '',
  metn TEXT NOT NULL DEFAULT '',
  dil TEXT NOT NULL DEFAULT 'az',
  yaradilma_tarixi TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.hekayeler ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hekayeler hamiya gorunur"
ON public.hekayeler FOR SELECT USING (true);

CREATE POLICY "Daxil olmus istifadeci hekaye yaza biler"
ON public.hekayeler FOR INSERT
WITH CHECK (auth.uid() = istifadeci_id);

CREATE POLICY "Muellif oz hekayesini yenileye biler"
ON public.hekayeler FOR UPDATE
USING (auth.uid() = istifadeci_id);

CREATE POLICY "Muellif oz hekayesini sile biler"
ON public.hekayeler FOR DELETE
USING (auth.uid() = istifadeci_id);

-- ============= EV SAHIBI MURACIETLERI =============
CREATE TABLE public.ev_sahibi_muracietleri (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  istifadeci_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ev_adi TEXT NOT NULL,
  bolge TEXT NOT NULL,
  rayon TEXT NOT NULL DEFAULT '',
  tip TEXT NOT NULL DEFAULT 'butov_ev',
  qiymet NUMERIC(10,2) NOT NULL DEFAULT 0,
  tesvir TEXT NOT NULL DEFAULT '',
  elaqe_telefon TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'gozleyir',
  yaradilma_tarixi TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.ev_sahibi_muracietleri ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Istifadeci oz muracietini gorur"
ON public.ev_sahibi_muracietleri FOR SELECT
USING (auth.uid() = istifadeci_id);

CREATE POLICY "Daxil olmus istifadeci muraciet ede biler"
ON public.ev_sahibi_muracietleri FOR INSERT
WITH CHECK (auth.uid() = istifadeci_id);

-- ============= STORAGE BUCKET =============
INSERT INTO storage.buckets (id, name, public)
VALUES ('ev-sekilleri', 'ev-sekilleri', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Ev sekilleri hamiya gorunur"
ON storage.objects FOR SELECT
USING (bucket_id = 'ev-sekilleri');

CREATE POLICY "Istifadeci oz qovluguna sekil yukleye biler"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'ev-sekilleri'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Istifadeci oz sekilini yenileye biler"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'ev-sekilleri'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Istifadeci oz sekilini sile biler"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'ev-sekilleri'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ============= AUTH.USERS YARANANDA TRIGGER =============
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.yeni_istifadeci_qeydiyyati();
