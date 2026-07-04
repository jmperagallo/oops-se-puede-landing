// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
});

// 🎯 METADATA COMPLETA CON SEO Y FAVICONS
export const metadata: Metadata = {
  title: {
    default: "OOPS! SE PUEDE | Pastelería y Cafetería Keto Premium",
    template: "%s | OOPS! SE PUEDE",
  },
  description:
    "Pastelería y cafetería Keto, sin azúcar y sin gluten en Concón. Disfruta de comida real, café de especialidad y postres sin culpas. ¡Visítanos!",
  keywords: [
    "pastelería keto",
    "cafetería sin gluten",
    "comida saludable Concón",
    "postres keto",
    "café de especialidad",
    "sin azúcar",
    "sin lactosa",
    "celiacos",
    "diabéticos",
    "oops se puede",
  ],
  authors: [{ name: "OOPS! SE PUEDE" }],
  creator: "OOPS! SE PUEDE",
  publisher: "OOPS! SE PUEDE",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://www.oops.cl"),
  alternates: {
    canonical: "https://www.oops.cl",
  },
  openGraph: {
    title: "OOPS! SE PUEDE | Pastelería y Cafetería Keto Premium",
    description:
      "Pastelería Keto, sin azúcar y sin gluten en Concón. Disfruta de comida real y café de especialidad.",
    url: "https://www.oops.cl",
    siteName: "OOPS! SE PUEDE",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "https://www.oops.cl/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OOPS! SE PUEDE - Pastelería Keto Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OOPS! SE PUEDE | Pastelería y Cafetería Keto Premium",
    description:
      "Pastelería Keto, sin azúcar y sin gluten en Concón. Disfruta de comida real y café de especialidad.",
    images: ["https://www.oops.cl/og-image.jpg"],
  },
  // 🟢 FAVICONS
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

// 🎯 VIEWPORT (para móviles)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F8F6F2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="bg-brand-ivory text-brand-dark font-sans antialiased flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}