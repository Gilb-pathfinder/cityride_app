import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "CityRide — Find a nearby ride, connect with confidence",
    template: "%s | CityRide",
  },
  description:
    "CityRide helps clients discover nearby verified riders and connect with them through a simple, location-based mobile experience.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale ?? "en"} className={cn(plusJakartaSans.variable, "antialiased")}>
      <body className="min-h-screen bg-white font-sans text-[#1F2937]">{children}</body>
    </html>
  );
}
