import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";
import { areas, business, services } from "../data";
import { Action, Logo, Photo, useModalFocus } from "./UI";
import SiteTools from "./SiteTools";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Our Work", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const whatsappUrl =
  "https://wa.me/16464912546?text=Hello%20Tile%20Saint%2C%20I%27d%20like%20to%20discuss%20a%20project.";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/tilesaint_llc/",
    className: "footer-social-instagram",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.6" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/TileSaintLLC/photos",
    className: "footer-social-facebook",
    icon: (
      <path
        d="M13.5 21v-7h2.35l.35-2.7h-2.7V9.58c0-.78.22-1.3 1.34-1.3h1.43V5.86c-.25-.03-1.1-.1-2.1-.1-2.08 0-3.5 1.27-3.5 3.6v1.96H8.3v2.7h2.36v7h2.84Z"
        fill="currentColor"
        stroke="none"
      />
    ),
  },
  {
    name: "TikTok",
    href: null,
    className: "footer-social-tiktok",
    icon: (
      <path
        d="M15.2 3h3.1c.2 2 1.3 3.8 3.7 4.5v3.2a9.2 9.2 0 0 1-3.7-1.4v6.2a6.1 6.1 0 1 1-6.1-6.1c.4 0 .8 0 1.2.1v3.3a3 3 0 1 0 1.8 2.7V3Z"
        fill="currentColor"
        stroke="none"
      />
    ),
  },
];

function SocialIcon({ icon }: { icon: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}

function WhatsAppIcon({ size = 21 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 3.2a12.3 12.3 0 0 0-10.5 18.7L4 28l6.3-1.6A12.3 12.3 0 1 0 16 3.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12.1 10.1c-.4-.8-.8-.8-1.2-.8h-1c-.4 0-.9.2-1.2.6-.4.4-1.6 1.6-1.6 3.8s1.6 4.4 1.8 4.7c.2.3 3.1 5 7.7 6.8 3.8 1.5 4.6 1.2 5.4 1.1.8-.1 2.6-1.1 3-2.1.4-1 .4-1.9.3-2.1-.1-.2-.4-.3-.8-.5l-2.9-1.4c-.4-.2-.7-.3-1 .2-.3.4-1.1 1.4-1.4 1.7-.3.3-.5.3-.9.1-.4-.2-1.8-.7-3.5-2.2-1.3-1.1-2.2-2.5-2.5-2.9-.3-.4 0-.6.2-.8.2-.2.4-.5.7-.8.2-.3.3-.4.4-.7.1-.3 0-.5 0-.7-.1-.2-1-2.4-1.4-3.2Z"
        fill="currentColor"
        transform="translate(2 0) scale(.86)"
      />
    </svg>
  );
}

function Dropdown({ type }: { type: "services" | "areas" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const serviceMenu = type === "services";
  const path = serviceMenu ? "/services" : "/service-areas";
  const active =
    pathname.startsWith(path) ||
    (serviceMenu && services.some((service) => service.path === pathname));
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  return (
    <div
      className={`nav-dropdown ${active ? "is-active" : ""}`}
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setOpen(false);
      }}
    >
      <div className="nav-dropdown-trigger">
        <Link className="nav-link" to={path}>
          {serviceMenu ? "Services" : "Service Areas"}
        </Link>
        <button
          className="nav-chevron"
          aria-label={`Show ${serviceMenu ? "services" : "service areas"} menu`}
          aria-expanded={open}
          aria-controls={`dropdown-${type}`}
          onClick={() => setOpen((value) => !value)}
        >
          <ChevronDown size={12} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id={`dropdown-${type}`}
            className={`dropdown-panel ${serviceMenu ? "dropdown-services" : ""}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.18 }}
          >
            <div className="dropdown-links">
              <small>
                {serviceMenu
                  ? "CAREFULLY CRAFTED SPACES"
                  : "NORTHERN NEW JERSEY"}
              </small>
              {serviceMenu
                ? services.map((service) => (
                    <Link to={service.path} key={service.path}>
                      {service.name}
                      <ArrowUpRight size={16} />
                    </Link>
                  ))
                : areas.map((area) => (
                    <Link to={`/service-areas/${area.slug}`} key={area.slug}>
                      {area.name}, NJ
                      <ArrowUpRight size={15} />
                    </Link>
                  ))}
              <Link className="dropdown-all" to={path}>
                Explore {serviceMenu ? "all services" : "our service areas"}
                <ArrowRight size={16} />
              </Link>
            </div>
            {serviceMenu && (
              <div className="dropdown-preview">
                <Photo
                  name="space-bathroom"
                  alt="Natural stone finishes in a contemporary bathroom"
                />
                <span>
                  Beautiful spaces begin
                  <br />
                  with thoughtful details.
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const reduced = useReducedMotion();
  const [tool, setTool] = useState<"search" | "location" | null>(null);
  const { pathname } = useLocation();
  const dialogRef = useModalFocus(mobileOpen, () => setMobileOpen(false));
  useEffect(() => {
    setMobileOpen(false);
    setExpanded(null);
    setTool(null);
  }, [pathname]);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setShowBackToTop(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1101px)");
    const onResize = () => {
      if (query.matches) setMobileOpen(false);
    };
    query.addEventListener("change", onResize);
    return () => query.removeEventListener("change", onResize);
  }, []);
  return (
    <>
      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="container main-navigation">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About Us
            </NavLink>
            <Dropdown type="services" />
            <NavLink to="/projects" className="nav-link">
              Our Work
            </NavLink>
            <Link
              to="/tile-flooring-installation#materials"
              className="nav-link"
            >
              Materials
            </Link>
            <Link to="/guides/choosing-your-tile" className="nav-link">
              Guides
            </Link>
            <Dropdown type="areas" />
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </nav>
          <Action to="/contact" className="header-estimate">
            Get a Free Estimate
          </Action>
          <div className="header-tools">
            <button
              aria-label="Search the website"
              onClick={() => setTool("search")}
            >
              <Search size={22} strokeWidth={1.6} />
            </button>
            <button
              aria-label="Find your service area"
              onClick={() => setTool("location")}
            >
              <MapPin size={22} strokeWidth={1.6} />
            </button>
            <a
              href={business.telephone}
              aria-label={`Call Tile Saint at ${business.phone}`}
            >
              <Phone size={21} strokeWidth={1.6} />
            </a>
          </div>
          <div className="mobile-header-actions">
            <button
              aria-label="Search the website"
              onClick={() => setTool("search")}
            >
              <Search size={21} strokeWidth={1.6} />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with Tile Saint on WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </a>
            <button
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={25} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu-backdrop"
            onClick={(event) => {
              if (event.target === event.currentTarget) setMobileOpen(false);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mobile-menu"
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation"
              ref={dialogRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mobile-menu-top">
                <Logo />
                <button
                  className="icon-button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={25} />
                </button>
              </div>
              <nav aria-label="Mobile navigation">
                <NavLink to="/" end>
                  Home
                  <ArrowUpRight size={19} />
                </NavLink>
                <NavLink to="/about">
                  About Us
                  <ArrowUpRight size={19} />
                </NavLink>
                <div className="mobile-menu-group">
                  <div>
                    <NavLink to="/services">Services</NavLink>
                    <button
                      onClick={() =>
                        setExpanded(expanded === "services" ? null : "services")
                      }
                      aria-expanded={expanded === "services"}
                      aria-label="Toggle services"
                    >
                      <ChevronDown size={20} />
                    </button>
                  </div>
                  <AnimatePresence>
                    {expanded === "services" && (
                      <motion.div
                        className="mobile-submenu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        {services.map((service) => (
                          <Link key={service.path} to={service.path}>
                            {service.name}
                            <ArrowRight size={15} />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <NavLink to="/projects">
                  Our Work
                  <ArrowUpRight size={19} />
                </NavLink>
                <div className="mobile-menu-group">
                  <div>
                    <NavLink to="/service-areas">Service Areas</NavLink>
                    <button
                      onClick={() =>
                        setExpanded(expanded === "areas" ? null : "areas")
                      }
                      aria-expanded={expanded === "areas"}
                      aria-label="Toggle service areas"
                    >
                      <ChevronDown size={20} />
                    </button>
                  </div>
                  <AnimatePresence>
                    {expanded === "areas" && (
                      <motion.div
                        className="mobile-submenu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        {areas.map((area) => (
                          <Link
                            key={area.slug}
                            to={`/service-areas/${area.slug}`}
                          >
                            {area.name}, NJ
                            <ArrowRight size={15} />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <NavLink to="/contact">
                  Contact
                  <ArrowUpRight size={19} />
                </NavLink>
              </nav>
              <div className="mobile-menu-contact">
                <Action to="/contact">Get a Free Estimate</Action>
                <a href={business.telephone}>
                  <Phone size={16} />
                  {business.phone}
                </a>
                <nav className="mobile-menu-socials" aria-label="Social media">
                  {socialLinks.map((social) =>
                    social.href ? (
                      <a
                        key={social.name}
                        href={social.href}
                        className={social.className}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Tile Saint on ${social.name}`}
                      >
                        <SocialIcon icon={social.icon} />
                      </a>
                    ) : (
                      <span
                        key={social.name}
                        className={social.className}
                        role="img"
                        aria-label={`${social.name} profile link not provided`}
                        title={`${social.name} profile link not provided`}
                      >
                        <SocialIcon icon={social.icon} />
                      </span>
                    ),
                  )}
                </nav>
                <small>Kinnelon, New Jersey</small>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {tool && (
          <SiteTools key={tool} tool={tool} onClose={() => setTool(null)} />
        )}
      </AnimatePresence>
      <div className="desktop-floating-actions">
        <button
          className={`floating-back-to-top ${showBackToTop ? "is-visible" : ""}`}
          aria-label="Back to top"
          tabIndex={showBackToTop ? 0 : -1}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reduced ? "instant" : "smooth",
            })
          }
        >
          <ArrowUp size={21} />
        </button>
        <a
          className="floating-whatsapp"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Tile Saint on WhatsApp"
        >
          <WhatsAppIcon size={25} />
        </a>
      </div>
      <button
        className={`mobile-back-to-top ${showBackToTop ? "is-visible" : ""}`}
        aria-label="Back to top"
        tabIndex={showBackToTop ? 0 : -1}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: reduced ? "instant" : "smooth",
          })
        }
      >
        <ArrowUp size={21} />
      </button>
    </>
  );
}

export function Footer() {
  const reduced = useReducedMotion();
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <Logo light />
            <p>
              Thoughtful tile installation.
              <br />
              Beautiful bathroom transformations.
              <br />
              Craftsmanship in every detail.
            </p>
            <span className="footer-location">
              <MapPin size={14} />
              Kinnelon, New Jersey
            </span>
            <nav className="footer-socials" aria-label="Social media">
              {socialLinks.map((social) =>
                social.href ? (
                  <a
                    key={social.name}
                    href={social.href}
                    className={social.className}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Tile Saint on ${social.name}`}
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                ) : (
                  <span
                    key={social.name}
                    className={social.className}
                    role="img"
                    aria-label={`${social.name} profile link not provided`}
                    title={`${social.name} profile link not provided`}
                  >
                    <SocialIcon icon={social.icon} />
                  </span>
                ),
              )}
            </nav>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            {navLinks.slice(0, 3).map((link) => (
              <Link to={link.path} key={link.path}>
                {link.name}
              </Link>
            ))}
            <Link to="/services">Services</Link>
            <Link to="/service-areas">Service Areas</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-column">
            <h3>Our Expertise</h3>
            {services.map((service) => (
              <Link to={service.path} key={service.path}>
                {service.name}
              </Link>
            ))}
            <Link to="/projects">Design Inspiration</Link>
          </div>
          <div className="footer-column">
            <h3>Our Neighborhoods</h3>
            {areas.map((area) => (
              <Link to={`/service-areas/${area.slug}`} key={area.slug}>
                {area.name}, NJ
              </Link>
            ))}
          </div>
          <div className="footer-column footer-contact">
            <h3>Let's Talk</h3>
            <a href={business.telephone} className="footer-phone">
              {business.phone}
              <ArrowUpRight size={16} />
            </a>
            <a href={`mailto:${business.email}`}>
              <Mail size={13} />
              {business.email}
            </a>
            <Link className="footer-estimate" to="/contact">
              Request an Estimate
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} Tile Saint, LLC. All rights
            reserved.
          </span>
          <div>
            <Link to="/image-credits">Photography &amp; Credits</Link>
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: reduced ? "instant" : "smooth",
                })
              }
            >
              Back to Top
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </footer>
      <div className="mobile-action-bar">
        <a href={business.telephone}>
          <Phone size={16} />
          Call Now
        </a>
        <Link to="/contact">
          Get Estimate
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </>
  );
}
