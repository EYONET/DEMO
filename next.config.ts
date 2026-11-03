import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseImagePattern = supabaseUrl
  ? (() => {
      const url = new URL(supabaseUrl);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("NEXT_PUBLIC_SUPABASE_URL must use HTTP or HTTPS.");
      }

      const protocol: "http" | "https" =
        url.protocol === "https:" ? "https" : "http";

      return {
        protocol,
        hostname: url.hostname,
        pathname: "/storage/v1/object/public/site-media/**",
      };
    })()
  : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        pathname: "/system/resources/thumbnails/027/484/635/small_2x/**",
      },
      ...(supabaseImagePattern ? [supabaseImagePattern] : []),
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
