
# Kənd Turizmi Platforması — Ana Səhifə (Dashboard)

Bu mərhələdə yalnız **landing / ana səhifə** qurulur. Backend, qeydiyyat, elan formaları, rezervasiya məntiqi sonrakı mərhələlərə saxlanılır — amma bütün düymələr və naviqasiya gələcək səhifələr üçün hazırlanır (placeholder route-larla).

## Vizual istiqamət

- **Üslub:** Premium kənd — Airbnb + National Geographic hissi. Sadə görünməsin, lüks və davətkar olsun.
- **Rəng paleti (HSL semantic tokens):**
  - Background: isti krem `hsl(40 30% 96%)`
  - Foreground (mətn): dərin tünd qəhvəyi `hsl(25 25% 12%)`
  - Primary: terrakota / kərpic `hsl(15 55% 45%)`
  - Accent: zeytun yaşılı `hsl(85 25% 35%)`
  - Muted: yumşaq qum `hsl(35 20% 88%)`
  - Gold accent (premium hiss): `hsl(40 60% 55%)`
- **Şriftlər (Google Fonts):** Başlıqlar üçün **Fraunces** (premium serif, kənd + lüks hissi), mətn üçün **Inter** (təmiz, oxunaqlı).
- **3D yanaşma:** İnteraktiv, amma fərah — yığcam Three.js (`@react-three/fiber` + `drei`) hero səhnəsi. Ağır model yox, **stilizə edilmiş float edən kənd elementləri** (kiçik ev, ağac, dağ siluetləri, buludlar) yumşaq hərəkətlə fırlanır, mouse hərəkətinə cavab verir. Qalan bölmələrdə parallaks və float effektləri.

## Sayt arxitekturası (bu mərhələ üçün route-lar)

```
/                    → Ana səhifə (qurulur)
/listings            → Ev axtarışı nəticələri (placeholder)
/host                → "Evini yerləşdir" səhifəsi (placeholder)
/auth                → Giriş / Qeydiyyat (placeholder)
/dashboard           → İstifadəçi şəxsi kabineti (placeholder, qeydiyyatdan sonra)
```

## Ana səhifə bölmələri (yuxarıdan aşağı)

1. **Naviqasiya (sticky, şəffaf → scroll-da bərk)**
   - Sol: Logo (sadə wordmark + kiçik ev/dağ ikonu)
   - Orta: `Kəndlər` · `Ev tap` · `Fəaliyyətlər` · **`Evini yerləşdir`** (mərkəzdə vurğulanmış mətn-link, kəndli üçün giriş)
   - Sağ: Dil seçici (AZ / RU / EN dropdown), `Daxil ol` düyməsi

2. **Hero (tam ekran, 3D interaktiv)**
   - Sol tərəfdə böyük başlıq: *"Azərbaycanın kəndlərini kəşf et"* (Fraunces, 72px+)
   - Alt başlıq: kənd təcrübəsi haqqında qısa cümlə
   - Sağ tərəfdə **interaktiv 3D səhnə** — float edən ev, dağ siluetləri, buludlar, mouse-a cavab verən parallaks
   - Aşağıda **axtarış paneli** (glass-morphism kart): Region/Kənd · Tarix · Qonaq sayı · Axtar düyməsi

3. **Populyar kəndlər (scroll-snap karusel)**
   - 6-8 kart: Xınalıq, Lahıc, Qəbələ, İsmayıllı, Şəki, Quba və s.
   - Hər kart: foto (placeholder), ad, qısa təsvir, ev sayı, hover-da scale + gold border

4. **Necə işləyir? (3 addım, izometrik ikonlarla)**
   - 01 Axtar · 02 Seç · 03 Yaşa
   - Hər addım üçün float edən kiçik 3D ikon

5. **Tövsiyə olunan evlər (premium kart şəbəkəsi)**
   - 6 ev kartı: foto, kənd adı, qiymət, reytinq ulduzları, otaq sayı
   - Hover-da yumşaq qalxma + parallaks foto effekti
   - Qeyd: hələlik mock data, qeydiyyatdan sonra "sənin maraqlarına uyğun" başlığı ilə şəxsiləşəcək

6. **Fəaliyyətlər (interaktiv tab/pill-lər)**
   - Atçılıq · Yürüyüş · Yerli mətbəx · Əl işləri · Balıq tutmaq · Bağ işləri
   - Hər birinə klik → uyğun evlərə filterlə yönləndirmə (gələcəkdə)

7. **Kəndli üçün CTA banneri (orta bölmə, vurğulanmış)**
   - Böyük başlıq: *"Evin var? Qonaq qəbul et, qazanc əldə et."*
   - Qısa izah + `Evini yerləşdir` düyməsi → `/host`
   - Fonda yumşaq paralaks kənd mənzərəsi

8. **Rəylər (carousel)**
   - Əvvəlki qonaqların qısa sitatları + ulduz reytinqi

9. **Footer**
   - 4 sütun: Haqqımızda · Kəşf et · Kəndlilər üçün · Əlaqə
   - Sosial şəbəkə ikonları, dil seçici təkrar, copyright

## Çoxdilli sistem (AZ / RU / EN)

- **`react-i18next`** + `i18next-browser-languagedetector`
- 3 JSON tərcümə faylı: `src/i18n/locales/{az,ru,en}.json`
- Default dil: **AZ**, seçim `localStorage`-da saxlanır
- Naviqasiyada dil dropdown (bayraqlarla)

## Texniki yığım

- **Three.js**: `three@0.160`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122` (versiyaları context-də göstərildiyi kimi sabit)
- **i18n**: `react-i18next`, `i18next`, `i18next-browser-languagedetector`
- **Animasiya**: `tailwindcss-animate` + custom keyframes (fade-in, float, parallax) — `index.css` və `tailwind.config.ts`-də
- **Ikonlar**: `lucide-react` (artıq quraşdırılıb)
- **Şriftlər**: Google Fonts `<link>` `index.html`-də (Fraunces + Inter)

## Fayl strukturu

```
src/
  pages/
    Index.tsx                  (tam yenidən yazılır)
    Host.tsx                   (placeholder "tezliklə")
    Listings.tsx               (placeholder)
    Auth.tsx                   (placeholder)
    Dashboard.tsx              (placeholder)
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      LanguageSwitcher.tsx
    home/
      Hero.tsx
      HeroScene3D.tsx          (Three.js səhnə)
      SearchPanel.tsx
      PopularVillages.tsx
      HowItWorks.tsx
      RecommendedHomes.tsx
      Activities.tsx
      HostCTA.tsx
      Testimonials.tsx
    ui/...                     (mövcud shadcn komponentləri)
  i18n/
    config.ts
    locales/
      az.json
      ru.json
      en.json
  assets/
    villages/                  (imagegen ilə yaradılan kənd fotoları)
    homes/                     (ev fotoları)
App.tsx                        (yeni route-lar əlavə olunur)
index.css                      (premium kənd design tokens)
tailwind.config.ts             (yeni rənglər + keyframe-lər)
index.html                     (Google Fonts, meta SEO)
```

## SEO

- `<title>`: "Kəndlər — Azərbaycan kənd turizmi" (<60 simvol)
- Meta description (3 dildə dəyişən, default AZ)
- Tək `<h1>` Hero-da
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`
- Bütün şəkillərdə `alt` (kənd adı + təsvir)
- Responsive viewport (artıq var)

## Yaradılacaq şəkillər (imagegen, premium tier hero üçün)

- 6 kənd fotosu (Xınalıq, Lahıc, Şəki və s. atmosferində)
- 6 ev/interyer fotosu (premium kənd evləri)
- 1 hero fon teksturası (yumşaq dağ siluetləri)

## Bu mərhələdə **DAXİL DEYİL** (gələcək addımlar)

- Lovable Cloud (auth, database, email göndərmə) — yalnız UI hazırdır
- Elan yerləşdirmə formu məntiqi (yalnız placeholder səhifə)
- Rezervasiya axını və 3% komissiya hesablaması
- Tövsiyə alqoritmi (mock data ilə görünüş hazırdır)
- İstifadəçi şəxsi kabineti məzmunu

Növbəti mərhələdə Lovable Cloud aktiv edib auth + database + elan formu + rezervasiya emailini quracağıq.
