import './globals.css';

const favicon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23030304'/%3E%3Ccircle cx='32' cy='32' r='25' fill='none' stroke='%237C3AED' stroke-width='2.5' stroke-linecap='round' stroke-dasharray='135 22' transform='rotate(-125 32 32)'/%3E%3Ctext x='32' y='44' font-size='34' text-anchor='middle' fill='%23A78BFA' font-family='serif'%3E龍%3C/text%3E%3C/svg%3E";

export const metadata = {
  title: '紫龍 Purple Dragon — Omakase · Cologne',
  description:
    'Purple Dragon — a two-Michelin-star omakase sushi counter in the heart of Cologne. Ten seats, twenty courses, one unforgettable evening.',
  icons: { icon: favicon },
  openGraph: {
    type: 'website',
    title: '紫龍 Purple Dragon — Omakase · Cologne',
    description:
      'A two-Michelin-star omakase sushi counter in the heart of Cologne. Ten seats, twenty courses, one unforgettable evening.',
    images: [
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&h=630&fit=crop&q=80',
    ],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = { themeColor: '#030304' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Serif+JP:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
