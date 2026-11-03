import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Action, Photo, SEO } from "../components/UI";
import {
  AreasSection,
  FAQSection,
  FinalCTA,
  MaterialsSection,
  OwnerSection,
  PortfolioSection,
  ProcessSection,
  SpacesSection,
  TestimonialsSection,
  WhySection,
} from "../components/Sections";
import {
  CraftBanner,
  ConsultationSection,
  GuidesSection,
  JourneyNavigation,
  OfferingsSection,
  PlanningSection,
  ReferenceStory,
  StyleGuideSection,
} from "../components/EditorialSections";

const slides = [
  {
    image: "modern-living",
    title: (
      <>
        Crafted with precision.
        <br />
        Designed to last.
      </>
    ),
    text: "Thoughtfully installed tile. Beautifully reimagined bathrooms. Discover a more considered approach to your home.",
    alt: "Light-filled contemporary living room with natural stone surfaces and warm neutral furnishings",
  },
  {
    image: "hero-bathroom",
    title: (
      <>
        Beautiful bathrooms.
        <br />
        Made for everyday living.
      </>
    ),
    text: "Create your own everyday retreat with custom tile work, considered layouts, and care in every finishing touch.",
    alt: "Contemporary tiled bathroom with a marble-lined shower and a sculptural bath",
  },
  {
    image: "hero-floor",
    title: (
      <>
        Extraordinary flooring.
        <br />
        From the ground up.
      </>
    ),
    text: "From the foundation to the final tile, experience the difference of a carefully crafted installation.",
    alt: "Elegant residential living and dining space connected by polished marble tile flooring",
  },
];

function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const touchStart = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 830], [0, 65]);
  useEffect(() => {
    if (paused || hovered || focused || reduced) return;
    const interval = window.setInterval(
      () => setActive((value) => (value + 1) % slides.length),
      8000,
    );
    return () => clearInterval(interval);
  }, [paused, hovered, focused, reduced]);
  const move = (direction: number) =>
    setActive((value) => (value + direction + slides.length) % slides.length);
  return (
    <section
      className="home-hero"
      aria-roledescription="carousel"
      aria-label="Discover Tile Saint"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setFocused(false);
      }}
      onTouchStart={(event) => {
        touchStart.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }}
      onTouchEnd={(event) => {
        const dx = event.changedTouches[0].clientX - touchStart.current.x;
        const dy = event.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(dx) > 55 && Math.abs(dy) < 65) move(dx < 0 ? 1 : -1);
      }}
    >
      <div className="hero-frame">
        <AnimatePresence initial={false}>
          <motion.div
            className="hero-photo-plane"
            key={slides[active].image}
            style={{ y: reduced ? 0 : parallax }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: reduced ? 1 : 1.035 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 8, ease: "linear" },
            }}
          >
            <Photo
              name={slides[active].image}
              alt={slides[active].alt}
              eager
              position="center 56%"
            />
          </motion.div>
        </AnimatePresence>
        <div className="hero-shade" />
        <div className="container hero-content">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-brand">
              Tile Saint<span>.</span>
            </h1>
            <AnimatePresence mode="wait">
              <motion.div
                className="hero-slide-copy"
                key={active}
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                aria-live={paused || focused ? "polite" : "off"}
              >
                <h2>{slides[active].title}</h2>
                <p>{slides[active].text}</p>
              </motion.div>
            </AnimatePresence>
            <div className="hero-actions">
              <Action to="/services" variant="outline">
                Explore Our Services
              </Action>
              <Action to="/contact" variant="outline" className="hero-estimate">
                Get a Free Estimate
              </Action>
            </div>
          </motion.div>
        </div>
        <div className="hero-bottom">
          <div className="hero-pagination">
            <div className="hero-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={active === index ? "active" : ""}
                  aria-label={`Show hero slide ${index + 1}`}
                  aria-current={active === index ? "true" : undefined}
                  onClick={() => setActive(index)}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>
          <div className="hero-arrow-controls">
            <button onClick={() => move(-1)} aria-label="Previous hero slide">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => move(1)} aria-label="Next hero slide">
              <ChevronRight size={20} />
            </button>
          </div>
          <button
            className="hero-pause"
            aria-label={paused ? "Play hero slideshow" : "Pause hero slideshow"}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? (
              <Play size={18} fill="currentColor" />
            ) : (
              <Pause size={19} fill="currentColor" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SEO
        title="Exceptional Tile Installation & Bathroom Remodeling"
        description="Tile Saint, LLC brings precise tile installation and custom bathroom remodeling to Kinnelon and Northern New Jersey. Call (646) 491-2546 for an estimate."
      />
      <Hero />
      <OfferingsSection />
      <ReferenceStory />
      <JourneyNavigation />
      <SpacesSection />
      <PortfolioSection />
      <ConsultationSection />
      <MaterialsSection />
      <CraftBanner />
      <PlanningSection />
      <StyleGuideSection />
      <ProcessSection />
      <OwnerSection />
      <TestimonialsSection />
      <GuidesSection />
      <WhySection />
      <AreasSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
