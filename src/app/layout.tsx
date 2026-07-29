import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Itzel & Carlos - Galería Fotográfica',
    template: '%s | Itzel & Carlos',
  },
  description: 'Galería de fotografías de Itzel y Carlos. Explora nuestras mejores fotos.',
  keywords: ['fotografía', 'galería', 'fotos', 'Itzel', 'Carlos', 'fotografía de pareja'],
  authors: [{ name: 'Itzel & Carlos' }],
  openGraph: {
    title: 'Itzel & Carlos - Galería Fotográfica',
    description: 'Galería de fotografías de Itzel y Carlos.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Itzel & Carlos',
    images: ['/hero.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Itzel & Carlos - Galería Fotográfica',
    description: 'Galería de fotografías de Itzel y Carlos.',
    images: ['/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://itzelcarlos.com'),
};

export const viewport: Viewport = {
  themeColor: '#fafafa',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}