import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nguyễn Hồng Sơn | Full Stack Vibe Coder',
  description: 'Profile cá nhân của Nguyễn Hồng Sơn - Full Stack Vibe Coder, Kotoba Studio & MewMC Minecraft Server.',
  icons: {
    icon: '/avatar.gif',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark h-screen overflow-hidden">
      <body className="antialiased selection:bg-indigo-500 selection:text-white h-screen max-h-screen w-full flex items-center justify-center p-1 sm:p-2 overflow-hidden select-none">
        {children}
      </body>
    </html>
  );
}