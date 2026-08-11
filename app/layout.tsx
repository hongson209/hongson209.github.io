import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://hongson.is-a.dev"),
  title: "Hong Son — Minecraft Developer & Kotoba Studio",
  description: "Profile của Nguyễn Hồng Sơn, các dự án Kotoba Studio và công cụ tạo mini-font, gradient hex cho Minecraft.",
  other: { "codex-preview": "development" },
  icons: { icon: "/avatar.png", shortcut: "/avatar.png" },
  openGraph: {
    title: "Hong Son — Minecraft Developer",
    description: "Profile, Kotoba Studio và Minecraft Font Generator.",
    images: ["/avatar.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070809",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
