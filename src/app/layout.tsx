import type { Metadata } from "next";
import { Oswald, Cairo, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "أداة تعلم منهجية برشلونة التكتيكية — Pitch & Pedagogy",
  description: "أداة تفاعلية للتعلم الذاتي والتحليل التكتيكي للعب الموضعي بأسلوب برشلونة (Juego de Posición)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${oswald.variable} ${cairo.variable} ${sourceSans.variable}`}>
      <body className="font-cairo bg-[#F7F5F0] text-[#1A1A1A] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
