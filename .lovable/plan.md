
# Kəndim — Yeni quruluş və 3D ana səhifə

İş 7 məntiqi səhifə/bölmə üzərində qurulacaq. Mövcud "AnaSehife" silinmir — **2-ci səhifə** olur. Yeni 3D animasiyalı "1-ci səhifə" yaradılır və o, kök yol (`/`) olur.

## 1) Yeni naviqasiya (`YuxariPanel`)

- Sol: **Kəndim** loqosu (kliklə `/`).
- Sağ menyu (yalnız bu bölmələr):
  `Regionlar` · `Hekayələr` · `Sevimlilər` · `FAQ` · `Elan yerləşdir`
- Sağ kənarda: **Dil seçici** (mövcud) + **Daxil ol** (giriş yoxdursa) və ya **avatar** (varsa).
- Köhnə "Kəndlər / Fəaliyyətlər / Ev sahibləri / Evini yerləşdir" silinir (yalnız "Elan yerləşdir" Sevimlilər yanında qalır).
- Mobil: sheet menyu eyni elementlərlə.

## 2) Səhifə #1 — `/` (yeni 3D Hero)

`react-three-fiber@^8.18` + `@react-three/drei@^9.122.0` + `three@^0.160` istifadə ediləcək.

Səhnə tərkibi (`Birinci3DSehife.tsx`):
- **Arxa plan**: yüklənmiş dağ-kənd şəkli (`xinaliq-mountains.jpg`) bir uzaq plane kimi yerləşir.
- **Buludlar**: drei `Cloud` × 5–6 ədəd, asta paralaks hərəkəti (sağa-sola sürüşür).
- **Kamera dolly**: `useFrame` ilə 0.05 sürətlə z oxunda yavaş-yavaş daxilə hərəkət edir (ping-pong) — "dağa yaxınlaşma" hissi.
- **Mərkəz mətni**: `Text3D` (drei) — "K", "ə", "n", "d", "i", "m" hərfləri bir-bir mərkəzə uçur (scale + opacity fade-in, hər hərf 150ms gecikmə ilə). Hover/move ilə yüngül 3D rotation (mouse parallax).
- **Alt karusel**: HTML overlay (3D-dən kənar, daha sadə və performant) — 4–5 elan kartı `marquee`/CSS keyframe ilə sağdan sola sonsuz dövr edir, kartlarda `transform: perspective(800px) rotateY(-12deg)` 3D effekt verir.
- **Aşağı ox**: scroll-hint, klik etdikdə smooth-scroll ilə 2-ci section-a düşür.

Eyni route (`/`) altında **iki section** dik düzülür:
1. `<Birinci3DSehife>` (100vh)
2. `<AnaSehife>` məzmunu (mövcud Banner + qalanları) — yəni indiki "AnaSehife" ikinci ekran kimi gəlir.

`Banner.tsx` daxilində mövcud uzun mətnlər (`hero.title`, `hero.subtitle`) **sağdan sola sürüşərək gələn** animasiyalı blok kimi yenidən qurulur (custom CSS keyframe `slide-in-right` artıq tailwind config-də var).

## 3) Geri qayıdışın bərpası

- `Giris.tsx`, `Qeydiyyat.tsx`, `Profil.tsx` üst sol küncündə **`← Ana səhifəyə qayıt`** linki (`<Link to="/">`).
- Eyni zamanda kart başlığında "Kəndim" loqosu da `/` ilə link olur.

## 4) Səhifə #3 — `/regionlar` (Azərbaycan xəritəsi)

- Yeni səhifə. Üstdə YuxariPanel (loqo + dil seçici).
- Solda **interaktiv SVG xəritə** — Azərbaycan rayonlarının sadələşdirilmiş SVG path-ları (statik fayl `src/frontend/medialar/xerite/azerbaijan-regions.svg`-i `bolgeler.ts`-dəki rayon adlarına uyğun manual SVG-də 8–10 əsas region kimi qruplaşdırırıq: Quba-Xaçmaz, Şəki-Zaqatala, Qəbələ-İsmayıllı, Lənkəran, Naxçıvan, Qarabağ, Abşeron, Dağlıq Şirvan).
- Hover → o region path-ının `fill`-i tündləşir + tooltip ilə ad göstərir.
- Klik → `/regionlar/:slug` səhifəsinə yönəldir.
- Sağda regionların adları (yüklənmiş İtaliya screenshot tərzində qrid).

`/regionlar/:slug` səhifəsi:
- Filter bar üstdə (5 dropdown): **Xidmətlər · Yerləşmə növü · Fəaliyyətlər · Gecəlik qiymət · Reytinq**.
- Breadcrumbs: `Ana səhifə › Regionlar › {Region adı}`.
- Aşağıda **listing kartlar grid** — hər kart: şəkil, başlıq, qiymət, reyting, məkan, **"Təklifə bax"** düyməsi.
- Statik mock data (`backend/melumat/elanlar.ts`-də 6–8 mock listing).

## 5) Səhifə #4 — `/elan/:id` (Elan detalı)

- Üstdə `← Axtarışa davam et` (`navigate(-1)`).
- Şəkillər qriddi (4–5 şəkil), sağda **sticky qiymət/sifariş kartı** (gecəlik qiymət, tarix seçimi, "Sifariş et" düyməsi — UI-only).
- Aşağıda: təsvir, otaqlar, xidmətlər (Wi-Fi/Mətbəx ikonlarla), ev sahibi əlaqəsi.
- **Google Maps**: `<iframe>` istifadə (API key tələb etmir) — `https://www.google.com/maps?q=<lat>,<lng>&output=embed`. Mock dataya `koordinat: [lat, lng]` əlavə olunur.

## 6) Səhifə #5 — `/evini-yerlesdir` (host form)

Mövcud "TezlikleGelir" əvəzlənir. Sadə multi-step UI form (UI-only, submit yox):
- Addım 1: Evin adı, region (BolgeSecici), tip
- Addım 2: Şəkil yükləmə placeholder, xidmətlər (XidmetSecici)
- Addım 3: Qiymət, təsvir
- Submit → toast "Tezliklə yoxlanılacaq".

## 7) Köhnə marshrutlar

`App.tsx`-də əlavələr:
- `/` → `Birinci3DSehife` + `AnaSehife` (eyni səhifədə iki section)
- `/regionlar`, `/regionlar/:slug`, `/elan/:id`, `/hekayeler`, `/sevimliler`, `/faq`, `/evini-yerlesdir` (real form).
- `Hekayələr`, `Sevimlilər`, `FAQ` — qısa placeholder səhifələr (sadə hero + content), eyni naviqasiya ilə.

## Texniki qeydlər

- Asılılıqlar: `bun add three@^0.160 @react-three/fiber@^8.18 @react-three/drei@^9.122.0`.
- 3D yüklənənə qədər `Suspense` fallback olaraq sadə şəkil göstərilir.
- Bütün yeni fayllar Azərbaycan dilində adlandırılır və şərhlər AZ-də yazılır.
- Köhnə komponentlərə yalnız naviqasiya keçidləri əlavə edilir, dizayn sxemi (rənglər/index.css) toxunulmur.

## Risklər

- 3D performans: hərflər `Text3D` ilə font tələb edir — drei-nin built-in `helvetiker` json-u yerinə CDN url verəcəyik (`https://threejs.org/examples/fonts/helvetiker_regular.typeface.json`). Əgər latın hərfləri çatmırsa "Kəndim" üçün "ə"-ni HTML overlay variantı ilə əvəzləyirik (Text3D Latin yalnız).
- Azərbaycan SVG xəritəsi: dəqiq coğrafi sərhədlər əvəzinə **stilizə edilmiş** path-lar (8–10 region) — interaktivlik üçün kifayət, sadə və sürətli.
- Google Maps iframe API key olmadan işləyir, kifayət edir.
