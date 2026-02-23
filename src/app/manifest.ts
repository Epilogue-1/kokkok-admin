import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "콕콕 어드민",
    short_name: "콕콕 어드민",
    description: "특별히 발탁된 정예 관리자들을 위한 콕콕 어드민 웹",
    start_url: "/",
    display: "standalone",
    background_color: "#B0B3C1",
    theme_color: "#B0B3C1",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
