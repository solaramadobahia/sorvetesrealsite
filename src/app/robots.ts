import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://sorvetesreal.com.br/sitemap.xml",
    host: "https://sorvetesreal.com.br",
  };
}
