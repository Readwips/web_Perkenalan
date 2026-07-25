import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const siteOrigin = isGitHubPages
  ? "https://readwips.github.io/web_Perkenalan"
  : "https://setyo-agung-it-dashboard.sroczynskimontierth9.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "Setyo Agung Prabowo - IT Career Dashboard",
  description:
    "Portofolio Sistem Informasi, data, web development, dan IT support milik Setyo Agung Prabowo.",
  icons: {
    icon: `${siteOrigin}/favicon.svg`,
    shortcut: `${siteOrigin}/favicon.svg`,
  },
  openGraph: {
    title: "Setyo Agung Prabowo - IT Career Dashboard",
    description: "System Information, Data, Web Development, dan IT Support.",
    type: "website",
    url: siteOrigin,
    images: [{ url: `${siteOrigin}/og.png`, width: 1734, height: 907, alt: "Setyo Agung Prabowo - IT Career Dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Setyo Agung Prabowo - IT Career Dashboard",
    description: "System Information, Data, Web Development, dan IT Support.",
    images: [`${siteOrigin}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
