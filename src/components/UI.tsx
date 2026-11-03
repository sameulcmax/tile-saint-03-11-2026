import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { business } from "../data";
import { legacyImageSources } from "../mediaSources";

const clientImages: Record<string, string> = {
  "modern-living": "kitchen4.webp",
  "hero-living": "home2.webp",
  "hero-bathroom": "bathroom1.webp",
  "hero-floor": "home3.webp",
  story: "home4.webp",
  "flooring-service": "kitchen1.webp",
  "bathroom-service": "bathroom2.webp",
  "space-living": "home5.webp",
  "space-bathroom": "bathroom003.webp",
  "space-shower": "bathroom002.webp",
  "space-kitchen": "kitchen2.webp",
  "space-interior": "home6.webp",
  "work-marble": "kitchen3.webp",
  "work-living": "home7.webp",
  "work-dining": "home8.webp",
  "warm-living": "home9.webp",
  "neutral-room": "home10.webp",
  "bath-portrait": "bathroom4.webp",
  "bath-sunlight": "bathroom006.webp",
  "bath-dark": "bathroom007.webp",
  "shower-portrait": "bathroom7.webp",
  process: "entrance1.webp",
  "craft-detail": "entrance2.webp",
  "tile-pattern": "kitchen4.webp",
  "mosaic-pattern": "kitchen5.webp",
  "cta-kitchen": "kitchen001.webp",
  "material-ceramic": "kitchen002.webp",
  "material-porcelain": "kitchen3.webp",
  "material-marble": "kitchen4.webp",
  "material-granite": "kitchen5.webp",
  "material-specialty": "kitchen1.webp",
  "material-mosaic": "kitchen2.webp",
  kinnelon: "entrance1.webp",
  mahwah: "entrance2.webp",
  morristown: "home6.webp",
  parsippany: "home7.webp",
  butler: "home8.webp",
  "area-hero": "home9.webp",
};

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      className={`brand ${light ? "brand-light" : ""}`}
      to="/"
      aria-label="Tile Saint, LLC home"
    >
      <svg
        className="brand-symbol"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <path d="M24 2 34 12 24 22 14 12Z" fill="currentColor" />
        <path d="m12 14 10 10-10 10L2 24Z" fill="currentColor" />
        <path d="m36 14 10 10-10 10-10-10Z" fill="var(--red)" />
        <path d="m24 26 10 10-10 10-10-10Z" fill="currentColor" />
      </svg>
      <span className="brand-words">
        <span>
          TILE SAINT<span className="brand-llc">, LLC</span>
        </span>
        <small>PRECISION IN EVERY DETAIL</small>
      </span>
    </Link>
  );
}

type ActionProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "red" | "navy" | "light" | "outline" | "outline-dark";
  className?: string;
  arrow?: boolean;
};

export function Action({
  children,
  to,
  href,
  variant = "red",
  className = "",
  arrow = true,
}: ActionProps) {
  const content = (
    <>
      {children}
      {arrow && <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />}
    </>
  );
  return href ? (
    <a href={href} className={`button button-${variant} ${className}`}>
      {content}
    </a>
  ) : (
    <Link
      to={to || "/contact"}
      className={`button button-${variant} ${className}`}
    >
      {content}
    </Link>
  );
}

export function TextLink({
  children,
  to,
  className = "",
}: {
  children: ReactNode;
  to: string;
  className?: string;
}) {
  return (
    <Link to={to} className={`text-link ${className}`}>
      {children}
      <ArrowRight size={19} strokeWidth={1.4} aria-hidden="true" />
    </Link>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  children,
  centered = false,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  children?: ReactNode;
  centered?: boolean;
}) {
  return (
    <Reveal className={`section-heading ${centered ? "heading-centered" : ""}`}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {children && <div className="section-heading-action">{children}</div>}
    </Reveal>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Photo({
  name,
  alt,
  className = "",
  eager = false,
  position,
  preserveOriginal = false,
}: {
  name: string;
  alt: string;
  className?: string;
  eager?: boolean;
  position?: string;
  preserveOriginal?: boolean;
}) {
  return (
    <img
      src={
        preserveOriginal && legacyImageSources[name]
          ? legacyImageSources[name]
          : `/images-client/${clientImages[name] ?? "home1.webp"}`
      }
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : undefined}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  alt,
  children,
  className = "",
  preserveOriginal = false,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  image: string;
  alt: string;
  children?: ReactNode;
  className?: string;
  preserveOriginal?: boolean;
}) {
  return (
    <section className={`page-hero ${className}`}>
      <Photo
        name={image}
        alt={alt}
        eager
        className="page-hero-image"
        preserveOriginal={preserveOriginal}
      />
      <div className="page-hero-shade" />
      <div className="container page-hero-content">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        {text && <p>{text}</p>}
        {children}
      </div>
    </section>
  );
}

export function Breadcrumbs({
  current,
  parent,
}: {
  current: string;
  parent?: { name: string; path: string };
}) {
  return (
    <nav className="breadcrumbs container" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span>/</span>
      {parent && (
        <>
          <Link to={parent.path}>{parent.name}</Link>
          <span>/</span>
        </>
      )}
      <span aria-current="page">{current}</span>
    </nav>
  );
}

export function SEO({
  title,
  description,
  path = "",
  service,
}: {
  title: string;
  description: string;
  path?: string;
  service?: string;
}) {
  useEffect(() => {
    document.title = `${title} | Tile Saint, LLC`;
    const url = `${business.url}${path || "/"}`;
    const tags: [string, string, string][] = [
      ["name", "description", description],
      ["property", "og:title", `${title} | Tile Saint, LLC`],
      ["property", "og:description", description],
      ["property", "og:url", url],
      ["property", "og:type", "website"],
      ["property", "og:site_name", business.name],
      [
        "property",
        "og:image",
        `${business.url}/images-client/${clientImages["modern-living"]}`,
      ],
      ["name", "twitter:card", "summary_large_image"],
    ];
    tags.forEach(([attribute, value, content]) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    });
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
    let structured = document.querySelector("#business-schema");
    if (!structured) {
      structured = document.createElement("script");
      structured.id = "business-schema";
      structured.setAttribute("type", "application/ld+json");
      document.head.appendChild(structured);
    }
    const localBusiness = {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${business.url}/#business`,
      name: business.name,
      url: business.url,
      telephone: "+1-646-491-2546",
      email: business.email,
      description:
        "Professional residential tile installation and custom bathroom remodeling.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kinnelon",
        addressRegion: "NJ",
        addressCountry: "US",
      },
      founder: { "@type": "Person", name: business.owner },
      areaServed: [
        "Kinnelon",
        "Mahwah",
        "Morristown",
        "Parsippany",
        "Butler",
      ].map((name) => ({ "@type": "City", name: `${name}, New Jersey` })),
    };
    structured.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        localBusiness,
        ...(service
          ? [
              {
                "@type": "Service",
                name: service,
                provider: { "@id": `${business.url}/#business` },
                url,
                areaServed: "Northern New Jersey",
              },
            ]
          : []),
      ],
    });
  }, [title, description, path, service]);
  return null;
}

// Keep keyboard focus inside a modal, then restore it to the opening control.
export function useModalFocus(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const getControls = () =>
      Array.from(
        ref.current?.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input,select,textarea,[tabindex="0"]',
        ) || [],
      ).filter((el) => el.getClientRects().length > 0);
    const timer = window.setTimeout(() => {
      if (!ref.current?.contains(document.activeElement)) {
        getControls()[0]?.focus({ preventScroll: true });
      }
    }, 40);
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
      if (event.key === "Tab") {
        const controls = getControls();
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", keydown);
      previous?.focus({ preventScroll: true });
    };
  }, [open]);
  return ref;
}
