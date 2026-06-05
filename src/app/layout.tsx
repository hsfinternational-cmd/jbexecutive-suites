import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { property } from "@/lib/data";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  title: {
    default: "JB Executive Suites | Comfortable Accommodation in Buwate, Mulawa",
    template: "%s | JB Executive Suites",
  },
  description:
    "Stay at JB Executive Suites in Buwate, Mulawa. Enjoy clean self-contained rooms, breakfast, secure parking, free Wi-Fi, DSTV and 24/7 CCTV surveillance. Book directly by phone or WhatsApp.",
  openGraph: {
    title: "JB Executive Suites",
    description:
      "Clean, comfortable and secure accommodation in Buwate, Mulawa with breakfast, parking, Wi-Fi and direct WhatsApp booking.",
    type: "website",
    images: ["/images/property/exterior-main-building.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JB Executive Suites",
    description: property.tagline,
    images: ["/images/property/exterior-main-building.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
