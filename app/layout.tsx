import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { LOCALE_COOKIE_KEY, parseLocale, parseTheme, THEME_COOKIE_KEY } from "./lib/preferences";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jgarcia3199.dev"),
  title: "jgarcia3199 | Portfolio",
  description: "Portfolio personal de Jesús García: frontend, diseño, apps propias e IA aplicada.",
  openGraph: {
    title: "jgarcia3199 | Portfolio",
    description: "Frontend, diseño, apps propias e IA aplicada.",
    images: ["/og.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "jgarcia3199 | Portfolio",
    description: "Frontend, diseño, apps propias e IA aplicada.",
    images: ["/og.svg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value);
  const theme = parseTheme(cookieStore.get(THEME_COOKIE_KEY)?.value);

  return (
    <html
      lang={locale}
      data-theme={theme}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
