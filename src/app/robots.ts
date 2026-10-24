import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.PUBLIC_SITE_URL || "https://medrelex.com";

  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/platform",
        "/healthcare-professionals",
        "/privacy-trust",
        "/about",
        "/contact",
        "/privacy-notice",
      ],
      disallow: ["/thank-you", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
