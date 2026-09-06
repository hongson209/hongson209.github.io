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
    <html lang="vi" className="dark min-h-screen lg:h-screen overflow-x-hidden lg:overflow-hidden" suppressHydrationWarning={true}>
      <body className="antialiased selection:bg-indigo-500 selection:text-white min-h-screen lg:h-screen lg:max-h-screen w-full flex items-start lg:items-center justify-center p-2 sm:p-4 lg:p-2 overflow-x-hidden overflow-y-auto lg:overflow-hidden select-none" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}