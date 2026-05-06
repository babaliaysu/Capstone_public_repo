-- Boş gün aralıqları üçün sütun əlavə et (ev sahibi müraciətləri və elanlara)
ALTER TABLE public.ev_sahibi_muracietleri
  ADD COLUMN IF NOT EXISTS bos_gun_baslama DATE,
  ADD COLUMN IF NOT EXISTS bos_gun_bitme DATE;

ALTER TABLE public.elanlar
  ADD COLUMN IF NOT EXISTS bos_gun_baslama DATE,
  ADD COLUMN IF NOT EXISTS bos_gun_bitme DATE;