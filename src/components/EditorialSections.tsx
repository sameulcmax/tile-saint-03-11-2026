import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ClipboardList,
  LayoutGrid,
  MapPin,
  Phone,
  Ruler,
  X,
} from "lucide-react";
import { Action, Photo, Reveal, useModalFocus } from "./UI";
import { business } from "../data";

export const guides = [
  {
    slug: "choosing-your-tile",
    title: "The right tile starts with the way you live.",
    category: "Materials",
    image: "material-ceramic",
    text: "A simple guide to considering material, finish, and the needs of your space.",
  },
  {
    slug: "planning-a-bathroom",
    title: "A more thoughtful bathroom begins here.",
    category: "Bathrooms",
    image: "bath-portrait",
    text: "Bring your tile choices, shower ideas, and everyday routines into the same conversation.",
  },
  {
    slug: "preparing-your-project",
    title: "The details to consider before your tile project.",
    category: "Planning",
    image: "material-porcelain",
    text: "Start with your room, your priorities, and a few helpful details about the existing surface.",
  },
];

export function OfferingsSection() {
  const items = [
    {
      title: "Tile Flooring Installation",
      text: "Beautiful surfaces. A thoughtful foundation.",
      image: "flooring-service",
      to: "/tile-flooring-installation",
      alt: "Large-format marble flooring in a carefully detailed residential kitchen",
    },
    {
      title: "Bathroom Remodeling",
      text: "Your everyday retreat, beautifully reimagined.",
      image: "bath-sunlight",
      to: "/bathroom-remodeling",
      alt: "Sunlit bathroom with a white freestanding bathtub and natural finishes",
    },
    {
      title: "Explore the Possibilities",
      text: "Find the details that speak to your space.",
      image: "shower-portrait",
      to: "/projects",
      alt: "Carefully aligned neutral tiles and refined shower details",
    },
  ];
  return (
    <section className="section offerings-section" id="services">
      <div className="container">
        <Reveal className="editorial-section-title">
          <h2>Our Expertise</h2>
          <p>
            Discover a considered approach to tile flooring, bathroom
            remodeling,
            <br className="desktop-break" /> and the finishing details that make
            a home your own.
          </p>
        </Reveal>
        <div className="offerings-grid">
          {items.map((item, index) => (
            <Reveal key={item.to} delay={index * 0.07}>
              <Link to={item.to} className="offering-image-link">
                <Photo name={item.image} alt={item.alt} />
                <div className="offering-image-shade" />
                <div className="offering-image-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <span className="circle-link-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReferenceStory() {
  const principles = [
    {
      title: "Precision",
      text: "Considered layouts. Carefully aligned details.",
      to: "/tile-flooring-installation",
    },
    {
      title: "Preparation",
      text: "A well-finished space starts below the surface.",
      to: "/services#our-process",
    },
    {
      title: "Craft",
      text: "Attention that carries through every finish.",
      to: "/about",
    },
    {
      title: "Personal Care",
      text: "Your home. Your vision. A thoughtful approach.",
      to: "/contact",
    },
  ];
  return (
    <section className="reference-story" id="our-story">
      <div className="container reference-story-panel">
        <Reveal className="reference-story-copy">
          <h2>
            Beautiful spaces begin
            <br />
            with thoughtful craftsmanship.
          </h2>
          <p>
            Tile Saint, LLC brings a personal, precision-led approach to tile
            installation and bathroom remodeling. Based in Kinnelon, New Jersey
            and led by Maxim Saint Germain, we focus on the details that make a
            lasting difference: a well-prepared foundation, precise layouts, and
            clean, considered finishes.
          </p>
          <p>
            From a new tile floor to a complete bathroom transformation, your
            space is the starting point. We listen, plan carefully, and bring
            your vision to life with care.
          </p>
          <Action to="/about" variant="navy">
            About Tile Saint
          </Action>
        </Reveal>
        <div className="reference-principles">
          {principles.map((principle) => (
            <Link to={principle.to} key={principle.title}>
              <span className="principle-tile" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JourneyNavigation() {
  return (
    <section
      className="journey-navigation container"
      aria-label="Choose your project"
    >
      <h2>Where Would You Like to Begin?</h2>
      <div>
        <Link to="/tile-flooring-installation" className="journey-active">
          <LayoutGrid size={18} />
          Tile Flooring
        </Link>
        <Link to="/bathroom-remodeling">
          <Ruler size={18} />
          Bathrooms
        </Link>
        <Link to="/projects">
          <ArrowUpRight size={18} />
          Design Inspiration
        </Link>
      </div>
    </section>
  );
}

export function ConsultationSection() {
  const links = [
    {
      title: "Talk Through Your Ideas",
      text: (
        <>
          Have a space in mind? <strong>Start a conversation</strong> with Maxim
          about your project.
        </>
      ),
      cta: "Call Tile Saint",
      icon: Phone,
      href: business.telephone,
      to: undefined,
    },
    {
      title: "A Thoughtful Starting Point",
      text: (
        <>
          Share your room, your ideas, and the{" "}
          <strong>details that matter to you.</strong>
        </>
      ),
      cta: "Prepare an Inquiry",
      icon: ClipboardList,
      to: "/contact",
      href: undefined,
    },
    {
      title: "Craftsmanship, Close to Home",
      text: (
        <>
          Based in Kinnelon and serving{" "}
          <strong>our Northern New Jersey neighbors.</strong>
        </>
      ),
      cta: "Explore Our Service Areas",
      icon: MapPin,
      to: "/service-areas",
      href: undefined,
    },
  ];
  return (
    <section className="consultation-section container">
      <div className="consultation-image">
        <Photo
          name="process"
          alt="Tile samples and professional installation tools laid out to plan a precise project"
        />
        <div className="consultation-shade" />
        <h2>
          A good project starts
          <br />
          with a conversation.
        </h2>
      </div>
      <div className="consultation-links">
        {links.map(({ title, text, cta, icon: Icon, href, to }) => (
          <div key={title}>
            <Icon size={27} strokeWidth={1.4} />
            <h3>{title}</h3>
            <p>{text}</p>
            <Action to={to} href={href} variant="navy">
              {cta}
            </Action>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CraftBanner() {
  return (
    <section className="craft-banner container">
      <Photo
        name="hero-living"
        alt="Refined residential marble flooring reflecting natural light"
      />
      <div className="craft-banner-shade" />
      <Reveal className="craft-banner-copy">
        <span className="small-section-label">THE TILE SAINT APPROACH</span>
        <h2>
          Beautiful on the surface.
          <br />
          Thoughtful underneath.
        </h2>
        <p>
          Careful preparation, precise installation, and attention to the
          details you live with every day.
        </p>
        <Action to="/services#our-process" variant="outline">
          Explore Our Approach
        </Action>
      </Reveal>
    </section>
  );
}

export function PlanningSection() {
  const items = [
    {
      title: "Explore by Space",
      text: "From living rooms to everyday retreats, imagine the possibilities for your home.",
      image: "space-interior",
      to: "/projects",
      alt: "Open-plan kitchen and living space with a considered tile palette",
    },
    {
      title: "Bring Your Bathroom to Life",
      text: "Discover custom tile work, shower installations, and carefully finished bathrooms.",
      image: "bathroom-service",
      to: "/bathroom-remodeling",
      alt: "Modern bathroom with a tiled shower and coordinated floor finishes",
    },
    {
      title: "Make a Thoughtful Start",
      text: "A well-prepared surface and a clear plan make all the difference.",
      image: "material-marble",
      to: "/guides/preparing-your-project",
      alt: "Natural marble tile samples arranged to explore a material palette",
    },
  ];
  return (
    <section className="section planning-section">
      <div className="container">
        <Reveal className="editorial-section-title">
          <h2>Plan Your Space</h2>
          <p>
            Find inspiration, explore our expertise, and start a more considered
            project.
          </p>
        </Reveal>
        <div className="editorial-media-grid">
          {items.map((item) => (
            <Link
              className="editorial-media-link"
              to={item.to}
              key={item.title}
            >
              <div className="image-reveal">
                <Photo name={item.image} alt={item.alt} />
              </div>
              <div className="editorial-media-copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="circle-link-arrow">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const styleSteps = [
  {
    title: "Which space are you imagining?",
    options: ["Living & Kitchen Floors", "A New Bathroom", "A Custom Shower"],
  },
  {
    title: "What feels most like you?",
    options: ["Light & Minimal", "Warm & Natural", "Pattern & Character"],
  },
  {
    title: "Which material catches your eye?",
    options: ["Porcelain", "Marble", "Ceramic", "Mosaic"],
  },
];

export function StyleGuideSection() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const modalRef = useModalFocus(open, () => setOpen(false));
  const questionRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (open) questionRef.current?.focus({ preventScroll: true });
  }, [open, step]);
  const finished = step === styleSteps.length;
  const category =
    answers[0] === "A Custom Shower"
      ? "Showers"
      : answers[0] === "A New Bathroom"
        ? "Bathrooms"
        : "Flooring";
  const start = () => {
    setStep(0);
    setAnswers([]);
    setOpen(true);
  };
  return (
    <>
      <section className="style-guide-section container">
        <Photo
          name="neutral-room"
          alt="Warm, naturally lit residential interior with a neutral material palette"
        />
        <div className="style-guide-shade" />
        <Reveal className="style-guide-copy">
          <h2>A Space That Feels Like You</h2>
          <p>
            A few simple choices. A little inspiration for your next chapter.
          </p>
          <button className="button button-outline" onClick={start}>
            Discover Your Direction
            <ArrowUpRight size={17} />
          </button>
        </Reveal>
      </section>
      <AnimatePresence>
        {open && (
          <motion.div
            className="tool-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              if (event.currentTarget === event.target) setOpen(false);
            }}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="style-guide-title"
              className="tool-modal style-guide-modal"
              initial={{ y: 12 }}
              animate={{ y: 0 }}
            >
              <button
                className="tool-modal-close icon-button"
                aria-label="Close style guide"
                onClick={() => setOpen(false)}
              >
                <X size={22} />
              </button>
              <span className="small-section-label">
                YOUR SPACE. YOUR DIRECTION.
              </span>
              <h2 id="style-guide-title" ref={questionRef} tabIndex={-1}>
                {finished
                  ? "Your next chapter starts here."
                  : styleSteps[step].title}
              </h2>
              {finished ? (
                <>
                  <p>
                    Your direction: {answers[1].toLowerCase()} with{" "}
                    {answers[2].toLowerCase()}. Explore some architectural
                    references, then talk to us about the right installation for
                    your space.
                  </p>
                  <div className="style-result">
                    <Check size={22} />
                    <span>
                      {answers[0]}
                      <small>
                        {answers[1]} / {answers[2]}
                      </small>
                    </span>
                  </div>
                  <div className="style-result-actions">
                    <Link
                      className="button button-navy"
                      to={`/projects?category=${category}`}
                      onClick={() => setOpen(false)}
                    >
                      Explore Your Inspiration
                      <ArrowUpRight size={17} />
                    </Link>
                    <Link
                      className="button button-outline-dark"
                      to={`/contact?material=${answers[2]}&service=${category === "Flooring" ? "flooring" : "bathroom"}`}
                      onClick={() => setOpen(false)}
                    >
                      Discuss Your Project
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                  <button
                    className="simple-text-button"
                    onClick={() => {
                      setStep(0);
                      setAnswers([]);
                    }}
                  >
                    Start Again
                  </button>
                  <small className="tool-privacy-note">
                    An inspiration guide, not a product recommendation. Your
                    choices are not submitted or stored.
                  </small>
                </>
              ) : (
                <>
                  <p>
                    Choose the direction that speaks to you. There is no wrong
                    answer.
                  </p>
                  <div className="style-options">
                    {styleSteps[step].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setAnswers((current) => [
                            ...current.slice(0, step),
                            option,
                          ]);
                          setStep((current) => current + 1);
                        }}
                      >
                        {option}
                        <ArrowRight size={18} />
                      </button>
                    ))}
                  </div>
                  <div className="style-progress">
                    <button
                      disabled={step === 0}
                      onClick={() => setStep((current) => current - 1)}
                    >
                      <ChevronLeft size={15} />
                      Back
                    </button>
                    <span>0{step + 1} / 03</span>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function GuidesSection() {
  return (
    <section className="section guides-section">
      <div className="container">
        <Reveal className="editorial-section-title">
          <h2>Ideas &amp; Considerations</h2>
          <p>A little clarity for a beautifully considered project.</p>
        </Reveal>
        <div className="editorial-media-grid">
          {guides.map((guide) => (
            <Link
              className="editorial-media-link guide-link"
              to={`/guides/${guide.slug}`}
              key={guide.slug}
            >
              <div className="image-reveal">
                <Photo
                  name={guide.image}
                  alt={`${guide.category} and tile installation planning inspiration`}
                />
                <span>{guide.category}</span>
              </div>
              <div className="editorial-media-copy">
                <h3>{guide.title}</h3>
                <p>{guide.text}</p>
                <span className="circle-link-arrow">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
