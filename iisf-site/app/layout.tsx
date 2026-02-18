import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "International Intersectional Safety Foundation";
const SITE_URL = "https://intersectionalsafety.org";
const DEFAULT_DESCRIPTION =
  "Guardians of the Algorithm — IISF stewards the Charter of Fundamental Intersectional Safety Rights and the Grandin, Heumann, and Crenshaw Standards for sensory safety, kinetic equity, and algorithmic accountability.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,

  applicationName: SITE_NAME,
  keywords: [
    "intersectional safety",
    "algorithmic accountability",
    "sensory safety",
    "kinetic equity",
    "disability rights",
    "robotics safety",
    "sidewalk delivery robots",
    "Grandin Standard",
    "Heumann Standard",
    "Crenshaw Standard",
    "IISF",
    "human rights technology",
    "AI ethics",
    "accessible infrastructure",
    "501c3 nonprofit",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  formatDetection: { telephone: false },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/iisf-hero.png",
        width: 1200,
        height: 630,
        alt: "IISF — Charter of Fundamental Intersectional Safety Rights",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: ["/iisf-hero.png"],
  },

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

  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NonprofitOrganization",
  name: "International Intersectional Safety Foundation",
  alternateName: "IISF",
  url: SITE_URL,
  logo: `${SITE_URL}/iisf-logo.png`,
  description: DEFAULT_DESCRIPTION,
  foundingDate: "2024",
  sameAs: [] as string[],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "research partnerships",
    url: `${SITE_URL}/#contact`,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    "@type": "NonprofitOrganization",
    name: SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#05060a] text-slate-100`}
      >
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {children}
      </body>
    </html>
  );
}
