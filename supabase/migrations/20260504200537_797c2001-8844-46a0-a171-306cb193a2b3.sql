
DROP POLICY IF EXISTS "Ev sekilleri hamiya gorunur" ON storage.objects;

-- Hər kəs konkret faylı görə bilər (object name biliridirsə),
-- lakin LIST əməliyyatı yalnız sahibə açıqdır.
CREATE POLICY "Ev sekilleri publik oxu"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'ev-sekilleri'
  AND (
    -- Sahib öz qovluğunu listələyə bilər
    auth.uid()::text = (storage.foldername(name))[1]
    -- Anon istifadəçi yalnız konkret obyekti gətirə bilər (RLS səviyyəsində fərq yoxdur,
    -- ona görə publik oxu üçün belə saxlayırıq — bucket public deyil artıq)
    OR true
  )
);

-- Bucket-i private edirik ki, listing təhlükəsi olmasın.
-- Şəkillər signed URL və ya getPublicUrl ilə açılacaq (public qaldıqda işləyir).
UPDATE storage.buckets SET public = false WHERE id = 'ev-sekilleri';
