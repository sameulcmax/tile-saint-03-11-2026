import { fontSources } from "./mediaSources";

export function registerSiteAssets() {
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/svg+xml";
  favicon.href = "/favicon.svg";
  document.head.appendChild(favicon);

  // Runtime root URLs keep fonts correct on deep links in the single-file build.
  if ("FontFace" in window && "fonts" in document) {
    const fonts = [
      {
        family: "Albert Sans",
        file: "albert-sans",
        weight: "100 900",
        style: "normal",
      },
      {
        family: "Barlow",
        file: "barlow-bold",
        weight: "700",
        style: "normal",
      },
    ];
    for (const font of fonts) {
      const face = new FontFace(
        font.family,
        `url("/fonts/${font.file}.woff2"), url("${fontSources[font.file]}")`,
        {
          weight: font.weight,
          style: font.style,
          display: "swap",
        },
      );
      document.fonts.add(face);
      void face.load().catch(() => undefined);
    }
  }

  if (window.location.pathname === "/") {
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = "/images-client/home1.webp";
    document.head.appendChild(preload);
  }
}
