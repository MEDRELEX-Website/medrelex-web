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
  title: "Medrelex | Healthcare Intelligence & Workflow Platform",
  description: "Advanced healthcare data interoperability, clinical workflows, and intelligence platform.",
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
        className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-50 font-sans"
        suppressHydrationWarning
      >
        <SiteHeader />
        <div className="flex flex-1 flex-col" suppressHydrationWarning>{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
