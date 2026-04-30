// Auth formaları üçün zod validasiya sxemləri.
import { z } from "zod";

// Daxil olma forması: yalnız email + parol.
export const girisSxemi = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Düzgün email daxil edin" })
    .max(255),
  parol: z
    .string()
    .min(6, { message: "Parol ən azı 6 simvol olmalıdır" })
    .max(72),
});
export type GirisDeyerleri = z.infer<typeof girisSxemi>;

// Qeydiyyat forması: ad-soyad + email + parol + parol təsdiqi.
export const qeydiyyatSxemi = z
  .object({
    adSoyad: z
      .string()
      .trim()
      .min(2, { message: "Ad Soyad ən azı 2 simvol olmalıdır" })
      .max(80),
    email: z
      .string()
      .trim()
      .email({ message: "Düzgün email daxil edin" })
      .max(255),
    parol: z
      .string()
      .min(6, { message: "Parol ən azı 6 simvol olmalıdır" })
      .max(72),
    parolTesdiqi: z.string().min(6).max(72),
  })
  .refine((d) => d.parol === d.parolTesdiqi, {
    message: "Parollar uyğun gəlmir",
    path: ["parolTesdiqi"],
  });
export type QeydiyyatDeyerleri = z.infer<typeof qeydiyyatSxemi>;

// Profilin redaktəsi.
export const profilSxemi = z.object({
  adSoyad: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
});
export type ProfilDeyerleri = z.infer<typeof profilSxemi>;

// Parol dəyişdirmə forması.
export const parolDeyisSxemi = z
  .object({
    yeniParol: z
      .string()
      .min(6, { message: "Parol ən azı 6 simvol olmalıdır" })
      .max(72),
    parolTesdiqi: z.string().min(6).max(72),
  })
  .refine((d) => d.yeniParol === d.parolTesdiqi, {
    message: "Parollar uyğun gəlmir",
    path: ["parolTesdiqi"],
  });
export type ParolDeyisDeyerleri = z.infer<typeof parolDeyisSxemi>;
