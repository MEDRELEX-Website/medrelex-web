import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://medrelex.com"),
  title: {
    default: "MEDRELEX | Longitudinal Health Intelligence",
    template: "%s | MEDRELEX",
  },
  description:
    "MEDRELEX is developing a private health intelligence platform to connect health information over time and help people and healthcare teams see the bigger picture.",
  openGraph: {
    title: "MEDRELEX | Longitudinal Health Intelligence",
    description:
      "MEDRELEX is developing a private health intelligence platform to connect health information over time and help people and healthcare teams see the bigger picture.",
    url: "https://medrelex.com",
    siteName: "MEDRELEX",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Strip extension-injected attributes (e.g. bis_skin_checked) before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{const clean=()=>{document.querySelectorAll('[bis_skin_checked]').forEach(el=>el.removeAttribute('bis_skin_checked'));};clean();const obs=new MutationObserver(m=>{m.forEach(r=>{if(r.type==='attributes'&&r.attributeName==='bis_skin_checked'){r.target.removeAttribute('bis_skin_checked');}});});obs.observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:['bis_skin_checked']});}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#F8FAFC] text-[#172B4D] font-sans selection:bg-[#36978F]/20 selection:text-[#0A192F]"
        suppressHydrationWarning
      >
        <SiteHeader />
        <main id="main-content" className="flex flex-1 flex-col" suppressHydrationWarning>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
