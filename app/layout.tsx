import type { Metadata } from "next";
import { headers } from "next/headers";
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

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto");
  const protocol = forwardedProtocol ?? (host?.startsWith("localhost") ? "http" : "https");
  const origin = host
    ? `${protocol}://${host}`
    : "https://setyo-agung-it-dashboard.sroczynskimontierth9.chatgpt.site";

  return {
    metadataBase: new URL(origin),
    title: "Setyo Agung Prabowo - IT Career Dashboard",
    description:
      "Portofolio Sistem Informasi, data, web development, dan IT support milik Setyo Agung Prabowo.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Setyo Agung Prabowo - IT Career Dashboard",
      description: "System Information, Data, Web Development, dan IT Support.",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1734, height: 907, alt: "Setyo Agung Prabowo - IT Career Dashboard" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Setyo Agung Prabowo - IT Career Dashboard",
      description: "System Information, Data, Web Development, dan IT Support.",
      images: [`${origin}/og.png`],
    },
  };
}

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
