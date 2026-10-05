import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { siteUrl, contact } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const viewport: Viewport = {
  themeColor: '#05070A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Noah Ibrahim — Full-Stack Developer & DevOps Engineer',
  description:
    'Portfolio of Noah Ibrahim, an Abuja-based full-stack developer and First-Class Mechatronics Engineer building resilient web products, offline-first platforms, DevOps systems, and IoT solutions.',
  keywords: [
    'Noah Ibrahim',
    'Full-stack developer Nigeria',
    'Abuja software developer',
    'React developer',
    'Next.js developer',
    'Node.js developer',
    'DevOps engineer Nigeria',
    'MERN developer',
    'Mechatronics engineer',
    'Offline-first PWA',
    'IoT developer',
    'GInvoice',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Noah Ibrahim — Full-Stack Developer & DevOps Engineer',
    description:
      'Resilient web products, DevOps systems, offline-first platforms, and IoT solutions.',
    url: siteUrl,
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noah Ibrahim — Full-Stack Developer & DevOps Engineer',
    description:
      'Abuja-based full-stack developer and First-Class Mechatronics Engineer.',
  },
  icons: {
    icon: '/icons/favicon.svg',
    apple: '/icons/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: contact.name,
    email: contact.email,
    telephone: contact.phone,
    jobTitle: contact.role,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abuja',
      addressCountry: 'NG',
    },
    url: siteUrl,
    sameAs: [contact.github, contact.linkedin, contact.ginvoice],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Noah Ibrahim Portfolio',
    url: siteUrl,
  };

  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([person, website]) }}
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
