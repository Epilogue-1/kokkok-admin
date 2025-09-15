import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase 프로젝트
      {
        protocol: "https",
        hostname: "zrkselfyyqkkqcmxhjlt.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "omrikgqmembehcfnvsce.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // 소셜 로그인 아바타(구글)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
