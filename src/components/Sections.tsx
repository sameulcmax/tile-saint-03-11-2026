import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Handshake,
  Layers3,
  Maximize2,
  Plus,
  Ruler,
  ScanLine,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  areas,
  business,
  faqs,
  materials,
  processSteps,
  projects,
  services,
  spaces,
  testimonials,
  type Project,
} from "../data";
import {
  Action,
  Eyebrow,
  Photo,
  Reveal,
  SectionHeading,
  TextLink,
  useModalFocus,
} from "./UI";

export function ServicesSection({ detailed = false }: { detailed?: boolean }) {
  return (
    <section
      className={`section services-section ${detailed ? "services-detailed" : ""}`}
      id="services"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Our Expertise"
          title={
            <>
              Beautiful spaces.
              <br />
              <em>Expertly brought to life.</em>
            </>
          }
          text="Two specialties. One uncompromising attention to detail."
        >
          <TextLink to="/services">Explore All Services</TextLink>
        </SectionHeading>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal
              className={`service-feature service-feature-${index + 1}`}
              key={service.path}
              delay={index * 0.1}
            >
              <Link
                to={service.path}
                className="service-image image-reveal"
                aria-label={service.link}
              >
                <Photo name={service.image} alt={service.alt} />
                <span className="image-link-arrow">
                  <ArrowUpRight size={23} strokeWidth={1.3} />
                </span>
              </Link>
              <div className="service-copy">
                <span className="service-number">0{index + 1}</span>
                <div>
                  <h3>
                    <Link to={service.path}>{service.name}</Link>
                  </h3>
                  <p>{detailed ? service.detail : service.description}</p>
                  {detailed && (
                    <ul className="service-benefits">
                      {(index === 0
                        ? [
                            "Ceramic, porcelain, marble, granite, and mosaic",
                            "Careful subfloor preparation and surface leveling",
                            "Precise layouts and clean, considered finishes",
                          ]
                        : [
                            "Custom tile work and shower installations",
                            "Beautiful, functional bathroom flooring",
                            "Thoughtful bathroom layout upgrades",
                          ]
                      ).map((item) => (
                        <li key={item}>
                          <Check size={14} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  <TextLink to={service.path}>{service.link}</TextLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SpacesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [pageCount, setPageCount] = useState(spaces.length);
  const drag = useRef({ start: 0, left: 0, moved: false, down: false });
  const reduced = useReducedMotion();
  const stride = () => {
    const el = ref.current;
    return el
      ? (el.firstElementChild?.getBoundingClientRect().width || 330) +
          parseFloat(getComputedStyle(el).columnGap)
      : 354;
  };
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setPageCount(
        Math.max(
          1,
          Math.ceil((el.scrollWidth - el.clientWidth) / stride()) + 1,
        ),
      );
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const goTo = (index: number) => {
    const el = ref.current;
    if (el)
      el.scrollTo({
        left: Math.min(index * stride(), el.scrollWidth - el.clientWidth),
        behavior: reduced ? "instant" : "smooth",
      });
  };
  const scroll = (direction: number) => {
    const el = ref.current;
    if (el)
      el.scrollBy({
        left: direction * stride(),
        behavior: reduced ? "instant" : "smooth",
      });
  };
  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    drag.current = {
      start: event.clientX,
      left: ref.current.scrollLeft,
      moved: false,
      down: true,
    };
  };
  const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down || !ref.current) return;
    const distance = event.clientX - drag.current.start;
    if (Math.abs(distance) > 5) {
      drag.current.moved = true;
      ref.current.classList.add("is-dragging");
      ref.current.scrollLeft = drag.current.left - distance;
    }
  };
  const pointerUp = () => {
    if (drag.current.down && drag.current.moved && ref.current) {
      const distance = ref.current.scrollLeft - drag.current.left;
      if (Math.abs(distance) > 55) {
        const target =
          Math.round(drag.current.left / stride()) + (distance > 0 ? 1 : -1);
        goTo(Math.max(0, Math.min(pageCount - 1, target)));
      }
    }
    drag.current.down = false;
    ref.current?.classList.remove("is-dragging");
  };
  return (
    <section className="section spaces-section">
      <div className="container">
        <SectionHeading
          eyebrow="Inspired by Your Life"
          title={<>Designed for Every Setting</>}
          text="From the first step inside to your favorite place to unwind."
        >
          <div className="arrow-pair">
            <button
              className="round-arrow"
              aria-label="Previous spaces"
              onClick={() => scroll(-1)}
              disabled={active === 0}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              className="round-arrow"
              aria-label="Next spaces"
              onClick={() => scroll(1)}
              disabled={atEnd}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </SectionHeading>
      </div>
      <div
        className="spaces-track"
        ref={ref}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerLeave={pointerUp}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (drag.current.moved) {
            event.preventDefault();
            drag.current.moved = false;
          }
        }}
        onScroll={() => {
          const el = ref.current;
          if (!el) return;
          const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
          setActive(
            end
              ? pageCount - 1
              : Math.min(pageCount - 1, Math.round(el.scrollLeft / stride())),
          );
          setAtEnd(end);
        }}
        aria-label="Browse interior inspiration"
      >
        {spaces.map((space, index) => (
          <Link
            className="space-slide"
            to={`/projects?category=${space.filter}`}
            key={space.title}
          >
            <div className="image-reveal">
              <Photo name={space.image} alt={space.alt} />
            </div>
            <div className="space-caption">
              <span>
                <small>0{index + 1}</small>
                {space.title}
              </span>
              <ArrowUpRight size={20} strokeWidth={1.4} />
            </div>
          </Link>
        ))}
      </div>
      <div className="container carousel-footer">
        <span>SPACES TO INSPIRE YOUR NEXT CHAPTER</span>
        <div className="line-pagination">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              aria-label={`Scroll to inspiration page ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              className={active === index ? "active" : ""}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <span>
          DRAG TO EXPLORE <ArrowRight size={13} />
        </span>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="section process-section" id="our-process">
      <div className="container process-grid">
        <Reveal className="process-visual">
          <div className="image-reveal">
            <Photo
              name="process"
              alt="Tile-setting tools, a trowel, and patterned tiles arranged for careful installation"
            />
          </div>
          <span className="photo-caption">
            BEAUTY IS BUILT FROM THE FOUNDATION UP.
          </span>
        </Reveal>
        <Reveal className="process-copy">
          <Eyebrow>The Art of Installation</Eyebrow>
          <h2>
            Precision behind
            <br />
            <em>every perfect finish.</em>
          </h2>
          <p>A considered process. A carefully crafted result.</p>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className={`process-step ${active === index ? "step-active" : ""}`}
              >
                <div className="process-stage-image">
                  <Photo
                    name={
                      [
                        "material-specialty",
                        "craft-detail",
                        "material-mosaic",
                        "work-dining",
                      ][index]
                    }
                    alt={`Installation inspiration for ${step.title.toLowerCase()}`}
                  />
                </div>
                <h3>
                  <button
                    onClick={() => setActive(index)}
                    aria-expanded={active === index}
                    aria-controls={`process-step-${index}`}
                  >
                    <span className="step-number">0{index + 1}</span>
                    <span>{step.title}</span>
                    <Plus size={16} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {active === index && (
                    <motion.div
                      className="process-step-detail"
                      id={`process-step-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{step.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProjectGallery({
  items = projects,
  compact = false,
}: {
  items?: Project[];
  compact?: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const modalRef = useModalFocus(selected !== null, () => setSelected(null));
  const current = selected !== null ? items[selected] : null;
  const move = (direction: number) =>
    setSelected((value) =>
      value === null ? null : (value + direction + items.length) % items.length,
    );
  useEffect(() => {
    if (selected === null) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight")
        setSelected((value) =>
          value === null ? null : (value + 1) % items.length,
        );
      if (event.key === "ArrowLeft")
        setSelected((value) =>
          value === null ? null : (value - 1 + items.length) % items.length,
        );
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [selected, items.length]);
  return (
    <>
      <div className={`project-grid ${compact ? "project-grid-compact" : ""}`}>
        {items.map((project, index) => (
          <motion.article
            className="project-item"
            key={project.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
          >
            <button
              className="project-image image-reveal"
              onClick={() => setSelected(index)}
              aria-label={`View ${project.title}`}
            >
              <Photo name={project.image} alt={project.alt} />
              <span className="project-enlarge">
                <Maximize2 size={20} strokeWidth={1.5} />
              </span>
            </button>
            <div className="project-caption">
              <h3>
                <button onClick={() => setSelected(index)}>
                  {project.title}
                </button>
              </h3>
              <span>{project.category}</span>
            </div>
          </motion.article>
        ))}
      </div>
      <AnimatePresence>
        {current && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setSelected(null);
            }}
          >
            <motion.div
              className="lightbox"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              ref={modalRef}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <button
                className="lightbox-close icon-button"
                onClick={() => setSelected(null)}
                aria-label="Close image gallery"
              >
                <X size={24} />
              </button>
              <div className="lightbox-media">
                <Photo
                  key={current.image}
                  name={current.image}
                  alt={current.alt}
                  eager
                />
              </div>
              <div className="lightbox-details">
                <Eyebrow>{current.category}</Eyebrow>
                <h2 id="project-dialog-title">{current.title}</h2>
                <p>{current.description}</p>
                <p className="inspiration-note">
                  Architectural inspiration, not a completed Tile Saint client
                  project.
                </p>
                <Action to="/contact">Let's Create Your Space</Action>
                <div className="lightbox-navigation">
                  <button
                    className="round-arrow"
                    onClick={() => move(-1)}
                    aria-label="Previous gallery image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span>
                    {String((selected || 0) + 1).padStart(2, "0")} /{" "}
                    {String(items.length).padStart(2, "0")}
                  </span>
                  <button
                    className="round-arrow"
                    onClick={() => move(1)}
                    aria-label="Next gallery image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function PortfolioSection() {
  return (
    <section className="section portfolio-section">
      <div className="container">
        <SectionHeading
          eyebrow="The Inspiration Gallery"
          title={
            <>
              Explore Our <span className="heading-accent">Lookbook</span>
            </>
          }
          text="A curated look at the spaces and surfaces that inspire our approach."
        >
          <TextLink to="/projects">Explore Our Work</TextLink>
        </SectionHeading>
        <div className="lookbook-gallery">
          <ProjectGallery items={projects.slice(0, 4)} compact />
        </div>
        <div className="portfolio-footnote">
          <span>ARCHITECTURAL INSPIRATION</span>
          <p>
            Photography is for design inspiration and does not depict completed
            Tile Saint projects.
          </p>
        </div>
      </div>
    </section>
  );
}

export function MaterialsSection() {
  const [active, setActive] = useState(0);
  const selected = materials[active];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const handleTabKey = (event: React.KeyboardEvent, index: number) => {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = (index + 1) % materials.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = (index - 1 + materials.length) % materials.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = materials.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };
  return (
    <section className="section materials-section" id="materials">
      <div className="container">
        <SectionHeading
          eyebrow="A Material Difference"
          title={<>Explore Tile Materials</>}
          text="Natural character, beautiful texture, and a considered installation. Find your starting point."
        />
        <div className="materials-layout">
          <div
            className="material-tabs"
            role="tablist"
            aria-label="Tile installation materials"
            aria-orientation="horizontal"
          >
            {materials.map((material, index) => (
              <button
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                key={material.name}
                role="tab"
                aria-label={material.name}
                aria-selected={active === index}
                aria-controls="material-panel"
                id={`material-tab-${index}`}
                tabIndex={active === index ? 0 : -1}
                className={active === index ? "active" : ""}
                onClick={() => setActive(index)}
                onKeyDown={(event) => handleTabKey(event, index)}
              >
                <span className="material-card-image">
                  <Photo
                    name={material.image}
                    alt={`${material.name} material and surface inspiration`}
                    preserveOriginal
                  />
                </span>
                <span className="material-card-copy">
                  <strong>{material.name}</strong>
                  <span>{material.subtitle}</span>
                  <span className="circle-link-arrow">
                    <ArrowUpRight size={17} />
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div
            className="material-display"
            role="tabpanel"
            id="material-panel"
            aria-labelledby={`material-tab-${active}`}
          >
            <motion.div
              key={selected.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.24 }}
              className="material-display-inner"
            >
              <div className="material-description">
                <span className="material-count">0{active + 1} / 06</span>
                <h3>{selected.subtitle}</h3>
                <p>{selected.text}</p>
                <TextLink
                  to={`/contact?material=${encodeURIComponent(selected.name)}`}
                >
                  Discuss Your Tile Choice
                </TextLink>
                <small>
                  Material installation options. Tile Saint does not manufacture
                  or sell tiles.
                </small>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const reasons = [
  {
    title: "Attention to Detail",
    icon: ScanLine,
    text: "The small things make the space.",
  },
  {
    title: "Quality Workmanship",
    icon: Ruler,
    text: "Carefully executed, thoughtfully finished.",
  },
  {
    title: "Proper Preparation",
    icon: Layers3,
    text: "A lasting finish starts beneath it.",
  },
  {
    title: "Durable Methods",
    icon: ShieldCheck,
    text: "An installation made for everyday life.",
  },
  {
    title: "Custom Solutions",
    icon: Droplets,
    text: "Your vision, never one-size-fits-all.",
  },
  {
    title: "Professional Approach",
    icon: Handshake,
    text: "Personal attention at every step.",
  },
];

export function WhySection() {
  return (
    <section className="section why-section">
      <div className="container">
        <SectionHeading
          eyebrow="The Tile Saint Standard"
          title={
            <>
              Built on precision.
              <br />
              <em>Defined by craftsmanship.</em>
            </>
          }
          centered
        />
        <div className="reasons-grid">
          {reasons.map(({ title, icon: Icon, text }, index) => (
            <Reveal key={title} className="reason" delay={index * 0.045}>
              <Icon size={31} strokeWidth={1.15} />
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OwnerSection({ about = false }: { about?: boolean }) {
  return (
    <section className="section owner-section">
      <div className="container owner-grid">
        <Reveal className="owner-copy">
          <Eyebrow>Meet the Person Behind the Precision</Eyebrow>
          <h2>
            Personal attention.
            <br />
            <em>Professional craftsmanship.</em>
          </h2>
          <p>
            For Maxim Saint Germain, a well-finished space is about more than
            its appearance. It's about the care that goes into every step.
          </p>
          <p>
            As the owner of Tile Saint, LLC, Maxim brings a detail-focused,
            professional approach to tile installation and bathroom remodeling.
            Every project begins with understanding your vision and a commitment
            to carrying it through with precision.
          </p>
          <div className="owner-signoff">
            <span>Maxim Saint Germain</span>
            <small>OWNER, TILE SAINT, LLC</small>
          </div>
          {!about && <TextLink to="/about">Get to Know Tile Saint</TextLink>}
        </Reveal>
        <Reveal className="owner-visual" delay={0.12}>
          <Photo
            name="craft-detail"
            alt="Craftsmanship reference showing hands carefully working a surface with a trowel"
          />
          <div className="owner-image-caption">
            <span>CARE IN THE PROCESS.</span>
            <span>CONFIDENCE IN THE FINISH.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return (
    <section
      className="section testimonials-section"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="container testimonial-layout">
        <div className="testimonial-heading">
          <Eyebrow>In Their Words</Eyebrow>
          <h2>Hear From Our Clients</h2>
          <div className="arrow-pair">
            <button
              className="round-arrow"
              aria-label="Previous testimonial"
              onClick={() =>
                setActive(
                  (value) =>
                    (value - 1 + testimonials.length) % testimonials.length,
                )
              }
            >
              <ArrowLeft size={18} />
            </button>
            <button
              className="round-arrow"
              aria-label="Next testimonial"
              onClick={() =>
                setActive((value) => (value + 1) % testimonials.length)
              }
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="testimonial-content">
          <span className="quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={active}
              initial={{ opacity: 0, x: reduced ? 0 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              aria-live="polite"
            >
              <blockquote>{testimonials[active].text}</blockquote>
              <figcaption>
                <span className="customer-line" />
                <span>
                  {testimonials[active].name}
                  <small>TILE SAINT CUSTOMER</small>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          {testimonials
            .filter((_, index) => index !== active)
            .map((review) => (
              <article className="testimonial-preview" key={review.name}>
                <blockquote>{review.text}</blockquote>
                <div className="testimonial-preview-name">
                  <span />
                  {review.name}
                  <small>TILE SAINT CUSTOMER</small>
                </div>
              </article>
            ))}
          <div className="testimonial-pagination">
            {testimonials.map((review, index) => (
              <button
                key={review.name}
                aria-label={`Read testimonial by ${review.name}`}
                className={active === index ? "active" : ""}
                onClick={() => setActive(index)}
              />
            ))}
            <span>0{active + 1} / 03</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AreasSection({ overview = false }: { overview?: boolean }) {
  return (
    <section
      className={`section areas-section ${overview ? "area-overview" : ""}`}
    >
      <div className="container">
        <SectionHeading
          eyebrow="Proudly Local"
          title={
            <>
              Quality tile work.
              <br />
              <em>Across Northern New Jersey.</em>
            </>
          }
          text="Rooted in Kinnelon. Bringing careful craftsmanship to our neighboring communities."
        >
          {!overview && (
            <TextLink to="/service-areas">Our Service Areas</TextLink>
          )}
        </SectionHeading>
        <div className="areas-grid">
          {areas.map((area, index) => (
            <Reveal key={area.slug} delay={index * 0.06}>
              <Link className="area-link" to={`/service-areas/${area.slug}`}>
                <div className="image-reveal">
                  <Photo name={area.image} alt={area.alt} />
                </div>
                <div className="area-title">
                  <h3>
                    {area.name}
                    <span>, NJ</span>
                  </h3>
                  <ArrowUpRight size={18} />
                </div>
                {overview && <p>{area.label}</p>}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection({
  items = faqs,
  title,
}: {
  items?: typeof faqs;
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <section className="section faq-section">
      <div className="container faq-grid">
        <Reveal className="faq-heading">
          <Eyebrow>A Little Clarity</Eyebrow>
          <h2>
            {title || "Good questions."}
            <br />
            <em>Thoughtful answers.</em>
          </h2>
          <p>
            Every project is different.
            <br />
            We're here to talk through yours.
          </p>
          <TextLink to="/contact">Let's Start a Conversation</TextLink>
        </Reveal>
        <div className="faq-list">
          {items.map((item, index) => (
            <div
              className={`faq-item ${open === index ? "faq-open" : ""}`}
              key={item.question}
            >
              <h3>
                <button
                  id={`${id}-question-${index}`}
                  aria-expanded={open === index}
                  aria-controls={`${id}-answer-${index}`}
                  onClick={() => setOpen(open === index ? null : index)}
                >
                  <span>{item.question}</span>
                  <Plus size={18} strokeWidth={1.5} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.div
                    role="region"
                    aria-labelledby={`${id}-question-${index}`}
                    id={`${id}-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({
  title = "Ready to transform your space?",
}: {
  title?: string;
}) {
  return (
    <section className="final-cta">
      <Photo
        name="cta-kitchen"
        alt="Light-filled residential kitchen with natural stone finishes and carefully detailed surfaces"
      />
      <div className="final-cta-shade" />
      <Reveal className="container final-cta-content">
        <Eyebrow light>Your Vision. Our Craft.</Eyebrow>
        <h2>{title}</h2>
        <p>
          Let's bring your vision to life with thoughtful design
          <br className="desktop-break" /> and precise tile installation.
        </p>
        <div className="cta-actions">
          <Action href={business.telephone} variant="light">
            Call Now &middot; {business.phone}
          </Action>
          <Action to="/contact">Request a Free Estimate</Action>
        </div>
      </Reveal>
    </section>
  );
}
