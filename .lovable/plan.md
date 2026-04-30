# Kəndim — Funksional yenilənmə planı

Sayt adı **Yurd → Kəndim** olaraq dəyişəcək, axtarış paneli tam funksional olacaq, qeydiyyat/daxil olma və profil işləyəcək, qovluqlar Azərbaycan dilinə çevriləcək, kod şərhləri AZ dilində yazılacaq.

---

## 1. Brendinq dəyişikliyi

- Hər yerdə **Yurd → Kəndim** (Navbar, Auth, index.html title/meta, footer, i18n faylları AZ/EN/RU).

## 2. Axtarış paneli — tam funksional (`AxtarisPaneli`)

Yeni davranış: **Hara · Vaxt · Xidmət növü · Axtar** (Qonaqlar silinir).

### a) Hara (autocomplete)

- Komponent: `BolgeSecici.tsx`
- Yerli siyahı (kod içində massiv): Quba, Qusar, Xınalıq, Lahıc, Şəki, Qax, Qəbələ, İsmayıllı, Qobustan, Şamaxı, Qusar, Lerik, Lənkəran, Astara, Masallı, Tovuz, Gədəbəy, Daşkəsən, Naftalan, Naxçıvan, Ordubad, Şahbuz, Zaqatala, Balakən, Göygöl, Şuşa, Laçın, Kəlbəcər və s. (~30 ad).
- İki rejim:
  - **Boş input + fokus** → bütün bölgələr **kateqoriya** şəklində açılır (Şimal · Qərb · Cənub · Mərkəz · Naxçıvan · Qarabağ qruplarında).
  - **Yazmağa başlayanda** → uyğun olanlar süzgəcdən keçib dropdown-da göstərilir.
- Seçim olduqda input dolur, axtarış state-ə yazılır.

### b) Vaxt (tarix aralığı)

- Komponent: `TarixSecici.tsx` (shadcn `Calendar` + `Popover`)
- Düymədə təqvim ikonu. Klik → təqvim açılır.
- `mode="range"`. Mərhələlər:
  - İlkin label: **"Başlama tarixi"**
  - İstifadəçi başlanğıc seçir → həmin gün rənglənir, label **"Bitmə tarixi"** olur.
  - Bitmə seçildikdə aralıq vurğulanır, panel bağlanır, axtarış state-i yenilənir.
- `pointer-events-auto` Calendar-da.

### c) Xidmət növü (Qonaqlar əvəzinə)

- Komponent: `XidmetSecici.tsx`
- Klik → popover açılır:
  - Yuxarıda **axtarış inputu** (sürətli süzgəc).
  - Aşağıda kateqoriya çipləri/grid: **Atçılıq · Bələdçi · Dulusçuluq · Yürüyüş · Yerli mətbəx · Balıq tutmaq · Bağ işləri · Çay mərasimi · Aşıq musiqisi · Əl işləri · Arıçılıq · Çoban təcrübəsi**.
  - Çoxlu seçim mümkündür (chip toggle).
- Mənbə: indi sabit massiv (`src/melumat/xidmetler.ts`), sonra elanlar bazasından dinamik gələcək (TODO şərh kimi qeyd olunur).

### d) Axtar düyməsi

- State-i URL parametrlərinə yazıb `/elanlar?bolge=...&baslama=...&bitme=...&xidmet=...` səhifəsinə yönəldir (səhifə hələ Coming Soon olaraq qalır, sonra qurulacaq).

## 3. Auth — qeydiyyat/daxil olma + profil

### Daxil ol səhifəsi (`/giris`)

- Sahələr: **Email**, **Parol**, **Daxil ol** düyməsi.
- Aşağıda kiçik mətn: *"Hesabın yoxdur? **Qeydiyyat**"* — link `/qeydiyyat`-a aparır.
- Palitra: ağ kart + forest yaşıl aksent.

### Qeydiyyat səhifəsi (`/qeydiyyat`)

- **Fərqli palitra**: gold/bej dominant arxa fon (qeyd olunan fərqlilik üçün), kart isə krem rəngli.
- Sahələr: **Ad Soyad**, **Email**, **Parol**, **Parol təsdiqi**, **Qeydiyyatdan keç** düyməsi.
- Zod validasiya: parollar uyğun olmalı, parol ≥6, email format, ad ≥2 simvol.
- Aşağıda link: *"Hesabın var? **Daxil ol**"*.

### Davranış

- Uğurlu daxil olma/qeydiyyatdan sonra **avtomatik ana səhifəyə (`/`)** yönəlmə.
- `onAuthStateChange` listener `App.tsx`-ə qoyulur (qlobal session state).

### Navbar profil ikonu

- Daxil olmamış: **"Daxil ol"** düyməsi → `/giris`.
- Daxil olmuş: **dairəvi avatar** (ad-soyadın baş hərfləri, gold ring) → klik `/profil`-ə aparır.

### Profil səhifəsi (`/profil`)

- Göstərir: Ad Soyad, Email (read-only display + edit mode).
- **Məlumatları redaktə et** düyməsi → ad/email inputları aktivləşir, Saxla düyməsi.
- **Parolu dəyiş** düyməsi → **eyni səhifədə** aşağıda yeni konteyner açılır:
  - Yeni parol, Parol təsdiqi, Submit.
  - Submit → `supabase.auth.updateUser({ password })`.
- **Çıxış** düyməsi.

### Backend (Supabase migration)

- `profiller` cədvəli yaradılır:
  - `istifadeci_id` (uuid, auth.users referans, unique)
  - `ad_soyad` (text)
  - `email` (text)
- RLS:
  - Hər kəs yalnız öz profilini görə/redaktə edə bilər.
- Trigger: `handle_new_user` → qeydiyyatdan sonra avtomatik profil yaradır (raw_user_meta_data-dan ad_soyad götürür).

## 4. Hero və ümumi UI təmizlikləri

- Hero altındakı **"01 Hər birinin öz hekayəsi var · 02 · 03"** elementi və kənd siyahısı bölməsindəki nömrələmə **silinir**.
- Hero "120+ kənd · 26 region" və "4.9 · 2,400+ qonaq" pill-ləri qalır.

## 5. Qovluq və fayl adları → Azərbaycan dilində

Yenidən adlandırma xəritəsi (yalnız layihəyə aid kod, shadcn `src/components/ui` toxunulmur):

```text
src/pages/             →  src/sehifeler/
  Index.tsx            →    AnaSehife.tsx
  Auth.tsx             →    Giris.tsx (+ yeni Qeydiyyat.tsx, Profil.tsx)
  ComingSoon.tsx       →    TezlikleGelir.tsx
  NotFound.tsx         →    TapilmadiSehife.tsx

src/components/home/   →  src/komponentler/anasehife/
  Hero.tsx             →    Banner.tsx
  SearchPanel.tsx      →    AxtarisPaneli.tsx (+ BolgeSecici, TarixSecici, XidmetSecici)
  PopularVillages.tsx  →    PopulyarKendler.tsx
  RecommendedHomes.tsx →    TovsiyeEvler.tsx
  Activities.tsx       →    Fealiyyetler.tsx
  HowItWorks.tsx       →    NeceIsleyir.tsx
  HostCTA.tsx          →    KendliCagirisi.tsx
  Testimonials.tsx     →    Reyler.tsx
  HeroScene3D.tsx      →    silinir (artıq istifadə olunmur)

src/components/layout/ →  src/komponentler/maket/
  Navbar.tsx           →    YuxariPanel.tsx
  Footer.tsx           →    AltPanel.tsx
  LanguageSwitcher.tsx →    DilSecici.tsx

src/i18n/              →  src/dil/
src/hooks/             →  src/qarmaqlar/
src/lib/               →  src/kitabxana/
src/assets/            →  src/medialar/
  hero/                →    banner/
  homes/               →    evler/
  villages/            →    kendler/

Yeni:
src/melumat/           → sabit data (bolgeler.ts, xidmetler.ts)
src/komponentler/forma/ → BolgeSecici.tsx, TarixSecici.tsx, XidmetSecici.tsx
```

**Toxunulmaz** (avtogenerasiya / standart):

- `src/components/ui/*` (shadcn)
- `src/integrations/supabase/*`
- `src/main.tsx`, `src/App.tsx`, `src/index.css`, `vite.config.ts`, `tailwind.config.ts`
- `.env`, `supabase/config.toml`

`App.tsx` import yolları və route-lar yenilənir:

- `/` → `AnaSehife`
- `/giris` → `Giris`
- `/qeydiyyat` → `Qeydiyyat`
- `/profil` → `Profil` (qorunmuş route)
- `/elanlar` → `TezlikleGelir`
- `/evini-yerlesdir` → `TezlikleGelir`

## 6. Kod şərhləri

- Bütün yeni və redaktə olunan fayllarda funksiya/komponent təsvirləri Azərbaycan dilində şərhlərlə (`// ...` və JSDoc) yazılır ki, sonradan asanlıqla dəyişdirilə bilsin.

---

## Texniki qeydlər

- **Migration**: `profiller` cədvəli + RLS + `handle_new_user` trigger.
- **Auth ayarları**: `auto_confirm_email = true` ediləcək (plan tələbi: qeydiyyatdan dərhal sonra ana səhifəyə qayıtsın — email təsdiqi tələb olunmasın).
- **State**: Axtarış parametrləri `useState`-də saxlanılır, "Axtar" düyməsi URL query string-ə yönəldir.
- **Validation**: `zod` + `react-hook-form` qeydiyyat formasında.
- **UI**: shadcn Calendar `range` mode, Popover `pointer-events-auto`, Command (autocomplete üçün).
- **Risk**: Kütləvi qovluq adlandırılması — bütün importlar avtomatik yenilənəcək, build sonu yoxlanacaq.

---

## Toxunulmayacaq

- Mövcud dizayn-sistem (rənglər, gradientlər, font).
- Hero video.
- 3 dilli i18n quruluşu (yalnız brend mətnləri yenilənir).
  - Footer və digər təqdimat bölmələrinin vizualı.
    fronten faylllarini
    FRONTEND FAYLLARİNİ FRONTEND ADLİ QOVLUQ YARAT AYRİ ONUN İCİNE YERLESDİR BACKEND FAYİLLARİNİ DA AYRİ QOVLUQ YARAT BACKEND ADLİ ORA YERLESDİR