// FAQ — tez-tez verilən suallar (Accordion ilə).

import { YuxariPanel } from "@/frontend/komponentler/maket/YuxariPanel";
import { AltPanel } from "@/frontend/komponentler/maket/AltPanel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const SUALLAR = [
  {
    s: "Kəndim nədir?",
    c: "Kəndim — Azərbaycan kəndlərində yerli ailələrin evlərində unudulmaz təcrübələr təklif edən platformadır. Adi otellər deyil, əsl kənd həyatı.",
  },
  {
    s: "Necə rezervasiya edirəm?",
    c: "Bəyəndiyin elanı seçirsən, tarix və qonaq sayını göstərirsən, 'Sifariş et' düyməsinə basırsan. Ev sahibi 24 saat ərzində təsdiq edir.",
  },
  {
    s: "Komissiya nə qədərdir?",
    c: "Yalnız 3% xidmət haqqı qonağın gördüyü qiymətə əlavə olunur. Ev sahibinə əlavə yük yoxdur.",
  },
  {
    s: "Ev sahibi olub elan yerləşdirə bilərəm?",
    c: "Bəli — 'Evini yerləşdir' bölməsindən qeydiyyatdan keç, evinin məlumatlarını daxil et. Komandamız 48 saat ərzində yoxlayıb təsdiq edir.",
  },
  {
    s: "Ödəniş necə işləyir?",
    c: "Sorğu mərhələsində ödəniş alınmır. Ev sahibi təsdiq verdikdən sonra ödəniş səhifəsinə yönləndirilirsən.",
  },
  {
    s: "Lağv etmək olur?",
    c: "Hər elanın öz lağv siyasəti var. Sifariş etməzdən əvvəl elanın aşağısında 'Lağv siyasəti' bölməsini oxu.",
  },
];

const Faq = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <YuxariPanel />
    <main className="flex-1 pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-10">
          <HelpCircle className="h-8 w-8 text-primary mx-auto mb-3" />
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
            Tez-tez verilən suallar
          </h1>
        </div>
        <Accordion type="single" collapsible className="bg-card rounded-2xl p-2 ring-1 ring-border shadow-soft">
          {SUALLAR.map((q, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0">
              <AccordionTrigger className="px-4 text-left font-medium">
                {q.s}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground">
                {q.c}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
    <AltPanel />
  </div>
);

export default Faq;
