import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/header';
import { Metadata } from 'next';
import '@/styles/globals.scss';
import { inter, morse } from '@/fonts/fonts';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { Viewport } from 'next/dist/lib/metadata/types/metadata-interface';

export const viewport: Viewport = {
  themeColor: '#00ADB5',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  applicationName: 'Amateur Radio VE Exam Practice',
  title: {
    default: 'Amateur Radio Exam Practice',
    template: '%s | Amateur Radio Exam Practice',
  },
  description: 'Study for the Amateur Radio VE License',
  icons: {
    icon: '/logo/icon_512.png',
    shortcut: '/logo/icon_512.png',
  },
  creator: 'Jakob Kordež [S52KJ]',
  manifest: '/manifest.json',
  metadataBase: new URL('https://vep.f4iey.fr'),
  openGraph: {
    title: {
      default: 'Amateur Radio Exam Practice',
      template: '%s | Amateur Radio Exam Practice',
    },
    description: 'Study for the Amateur Radio VE License',
    url: 'https://vep.f4iey.fr',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} ${morse.variable}`}>
        <Header />

        <main>{children}</main>
        <ScrollToTopButton />

        <Analytics />
      </body>
    </html>
  );
}
