import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import {
  Action,
  Breadcrumbs,
  Eyebrow,
  PageHero,
  Photo,
  Reveal,
  SEO,
  SectionHeading,
  TextLink,
} from "../components/UI";
import {
  AreasSection,
  FAQSection,
  FinalCTA,
  MaterialsSection,
  OwnerSection,
  ProcessSection,
  ProjectGallery,
  ServicesSection,
  WhySection,
} from "../components/Sections";
import {
  areas,
  business,
  faqs,
  projects,
  services,
  type ProjectCategory,
} from "../data";

export function AboutPage() {
  return (
    <>
      <SEO
        title="Our Story & Craftsmanship"
        description="Meet Tile Saint, LLC and owner Maxim Saint Germain. A personal, precision-led approach to tile installation and bathroom remodeling in Kinnelon, NJ."
        path="/about"
      />
      <PageHero
        eyebrow="The Story of Tile Saint"
        title={
          <>
            Good work begins
            <br />
            <em>with genuine care.</em>
          </>
        }
        text="A personal approach to the spaces you call home."
        image="hero-floor"
        alt="Light-filled residential interior with beautifully aligned polished tile flooring"
      />
      <Breadcrumbs current="About Us" />
      <section className="section about-intro">
        <div className="container editorial-intro">
          <Reveal>
            <Eyebrow>Considered From the Start</Eyebrow>
            <h2>
              Not just a new surface.
              <br />
              <em>A better-finished space.</em>
            </h2>
          </Reveal>
          <Reveal className="editorial-copy">
            <p className="lead">
              We believe the best work is built on the things that matter: a
              clear vision, a well-prepared foundation, and care in every
              detail.
            </p>
            <p>
              Tile Saint, LLC is a tile installation and bathroom remodeling
              company based in Kinnelon, New Jersey. Led by Maxim Saint Germain,
              we create tailored residential spaces with a focus on durability,
              clean finishes, and structural precision.
            </p>
            <p>
              From a carefully aligned porcelain floor to a custom tiled shower,
              our work begins with understanding what you want to achieve. We
              bring a thoughtful, professional approach to making it happen.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="about-image-pair container">
        <Reveal className="image-reveal">
          <Photo
            name="flooring-service"
            alt="Natural marble floor tiles connecting a modern kitchen and living space"
          />
        </Reveal>
        <Reveal className="image-reveal" delay={0.1}>
          <Photo
            name="bathroom-service"
            alt="Custom tilework and a glass shower in a modern bathroom"
          />
        </Reveal>
      </section>
      <OwnerSection about />
      <WhySection />
      <ProcessSection />
      <FinalCTA />
    </>
  );
}

export function ServicesPage() {
  return (
    <>
      <SEO
        title="Tile Installation & Bathroom Remodeling Services"
        description="Explore Tile Saint's residential tile flooring installation and custom bathroom remodeling services across Northern New Jersey."
        path="/services"
      />
      <PageHero
        eyebrow="The Tile Saint Expertise"
        title={
          <>
            Beautiful spaces.
            <br />
            <em>Built from the details.</em>
          </>
        }
        text="Professional tile flooring and bathroom remodeling, with craftsmanship at the heart of every step."
        image="hero-living"
        alt="Elegant marble floor in a bright and carefully considered residential interior"
      >
        <Action to="/contact">Tell Us About Your Project</Action>
      </PageHero>
      <Breadcrumbs current="Services" />
      <ServicesSection detailed />
      <ProcessSection />
      <section className="section service-principle">
        <div className="container">
          <Eyebrow>Made for Your Home</Eyebrow>
          <h2>
            Your material. Your vision.
            <br />
            <em>A carefully considered installation.</em>
          </h2>
          <p>
            We work with ceramic, porcelain, marble, granite, mosaic, and
            specialty tiles. The right installation starts with understanding
            your material and your space.
          </p>
          <TextLink to="/tile-flooring-installation#materials">
            Explore Material Options
          </TextLink>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

const serviceContent = {
  flooring: {
    title: "Tile Flooring Installation",
    path: "/tile-flooring-installation",
    image: "modern-living",
    hero: (
      <>
        An exceptional floor.
        <br />
        <em>A thoughtful foundation.</em>
      </>
    ),
    description:
      "Professional residential tile flooring installation in Kinnelon and Northern New Jersey. Ceramic, porcelain, marble, granite, mosaic, and specialty tiles.",
    introTitle: (
      <>
        Beautiful from
        <br />
        <em>the surface down.</em>
      </>
    ),
    intro:
      "A well-installed tile floor gives a room its sense of order. The scale, the alignment, the way it catches the light: each detail contributes to the whole.",
    detail:
      "Tile Saint provides professional residential tile flooring installation with careful attention to subfloor preparation and precision layout. We consider your tile selection, existing surface, and the demands of the room before installation begins.",
    featureImage: "space-kitchen",
    featureAlt:
      "An elegant kitchen with a carefully arranged patterned tile floor",
    featureTitle: (
      <>
        The part you don't see.
        <br />
        <em>The difference you feel.</em>
      </>
    ),
    featureText:
      "Lasting tile work starts before the first tile is set. Preparation is part of the craft, not a step to rush through.",
    features: [
      {
        title: "Subfloor Preparation",
        text: "We consider the existing foundation and prepare the surface to support a well-executed tile installation.",
      },
      {
        title: "Surface Leveling",
        text: "Attention to an even surface creates the starting point for a precise layout and a consistent finished floor.",
      },
      {
        title: "Moisture Considerations",
        text: "We address moisture conditions as part of the installation approach, with the room and selected material in mind.",
      },
      {
        title: "Precision Layout",
        text: "Thoughtful tile placement, accurate alignment, and careful finishing bring the complete surface together.",
      },
    ],
  },
  bathroom: {
    title: "Bathroom Remodeling",
    path: "/bathroom-remodeling",
    image: "hero-bathroom",
    hero: (
      <>
        Your everyday retreat.
        <br />
        <em>Beautifully reimagined.</em>
      </>
    ),
    description:
      "Custom bathroom remodeling by Tile Saint, LLC. Tile work, shower installations, bathroom flooring, and functional layout upgrades in Northern New Jersey.",
    introTitle: (
      <>
        A fresh perspective.
        <br />
        <em>A more personal space.</em>
      </>
    ),
    intro:
      "A bathroom should feel as considered as the rest of your home. Comfortable, functional, and beautifully finished, down to the smallest detail.",
    detail:
      "Our bathroom remodeling services bring custom tile work, shower installations, flooring, and layout upgrades together. We begin with how you use your bathroom and the changes that would make the most difference.",
    featureImage: "bathroom-service",
    featureAlt:
      "Contemporary bathroom with a custom tiled shower and carefully matched wall and floor tiles",
    featureTitle: (
      <>
        Considered together.
        <br />
        <em>Crafted as one.</em>
      </>
    ),
    featureText:
      "The best bathroom transformations balance practical needs with a clear visual direction. We keep both in focus.",
    features: [
      {
        title: "Custom Tile Work",
        text: "From a calm palette to a distinctive pattern, thoughtful tile choices create a space that feels like your own.",
      },
      {
        title: "Shower Installations",
        text: "Carefully executed shower tile with attention to surface preparation, moisture considerations, and clean finishes.",
      },
      {
        title: "Bathroom Flooring",
        text: "A precise, well-considered floor layout that complements the room and its daily use.",
      },
      {
        title: "Layout Upgrades",
        text: "Discuss changes that improve how the bathroom works, with the overall project scope shaped around your requirements.",
      },
    ],
  },
};

export function ServiceDetailPage({ type }: { type: "flooring" | "bathroom" }) {
  const content = serviceContent[type];
  const gallery = projects
    .filter((project) =>
      type === "flooring"
        ? project.category === "Flooring"
        : project.category === "Bathrooms" || project.category === "Showers",
    )
    .slice(0, 3);
  const questions =
    type === "flooring"
      ? [faqs[0], faqs[1], faqs[2], faqs[5]]
      : [
          {
            question: "What can be included in a bathroom remodel?",
            answer:
              "Our bathroom remodeling services include custom tile work, bathroom flooring, shower installations, and functional layout upgrades. We discuss the scope with you before the project begins.",
          },
          {
            question: "Can you install a custom tiled shower?",
            answer:
              "Yes. We provide custom shower installations with careful attention to tile layout, surface preparation, moisture control, and a clean, considered finish.",
          },
          {
            question: "How long does a bathroom remodel take?",
            answer:
              "The schedule depends on the size of the bathroom, the changes involved, tile choices, and preparation requirements. Contact us to discuss your specific plans so we can talk through an appropriate project timeline.",
          },
          faqs[2],
          faqs[5],
        ];
  return (
    <>
      <SEO
        title={content.title}
        description={content.description}
        path={content.path}
        service={content.title}
      />
      <PageHero
        eyebrow={`Tile Saint / ${content.title}`}
        title={content.hero}
        text={
          type === "flooring"
            ? "Precise layouts. Carefully prepared surfaces. A finish that brings your space together."
            : "Custom tile work, thoughtful layouts, and care in every finishing touch."
        }
        image={content.image}
        alt={
          type === "flooring"
            ? "Premium residential living space with neutral finishes and natural stone flooring"
            : "Modern marble bathroom with an elegant glass shower and matching tile finishes"
        }
      >
        <Action to={`/contact?service=${type}`}>Request a Free Estimate</Action>
      </PageHero>
      <Breadcrumbs
        current={content.title}
        parent={{ name: "Services", path: "/services" }}
      />
      <section className="section">
        <div className="container editorial-intro">
          <Reveal>
            <Eyebrow>
              {type === "flooring"
                ? "A Refined Foundation"
                : "Thoughtfully Transformed"}
            </Eyebrow>
            <h2>{content.introTitle}</h2>
          </Reveal>
          <Reveal className="editorial-copy">
            <p className="lead">{content.intro}</p>
            <p>{content.detail}</p>
            <TextLink to={`/contact?service=${type}`}>
              Let's Discuss Your Space
            </TextLink>
          </Reveal>
        </div>
      </section>
      <section className="section service-feature-section">
        <div className="container detail-feature-grid">
          <Reveal className="detail-feature-image image-reveal">
            <Photo name={content.featureImage} alt={content.featureAlt} />
          </Reveal>
          <Reveal className="detail-feature-copy">
            <Eyebrow>
              {type === "flooring"
                ? "Built to Last"
                : "The Details That Matter"}
            </Eyebrow>
            <h2>{content.featureTitle}</h2>
            <p>{content.featureText}</p>
            <div className="detail-feature-list">
              {content.features.map((feature, index) => (
                <div key={feature.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      {type === "flooring" ? <MaterialsSection /> : <ProcessSection />}
      <section className="section detail-gallery">
        <div className="container">
          <SectionHeading
            eyebrow="Imagine the Possibilities"
            title={
              <>
                A little inspiration
                <br />
                <em>for your next chapter.</em>
              </>
            }
            text="Architectural references to help you explore the look and feel of your space."
          >
            <TextLink
              to={`/projects?category=${type === "flooring" ? "Flooring" : "Bathrooms"}`}
            >
              Browse the Gallery
            </TextLink>
          </SectionHeading>
          <ProjectGallery items={gallery} compact />
          <p className="gallery-disclaimer">
            Design inspiration only. These photographs do not depict completed
            Tile Saint client projects.
          </p>
        </div>
      </section>
      <FAQSection
        items={questions}
        title={
          type === "flooring" ? "About your new floor." : "About your bathroom."
        }
      />
      <FinalCTA
        title={
          type === "flooring"
            ? "Every beautiful room starts somewhere."
            : "Your new bathroom starts with a conversation."
        }
      />
    </>
  );
}

export function ProjectsPage() {
  const [params, setParams] = useSearchParams();
  const filters = [
    "All Spaces",
    "Flooring",
    "Bathrooms",
    "Showers",
    "Tile Details",
  ];
  const requested = params.get("category");
  const active =
    requested && filters.includes(requested) ? requested : "All Spaces";
  const items =
    active === "All Spaces"
      ? projects
      : projects.filter(
          (project) => project.category === (active as ProjectCategory),
        );
  return (
    <>
      <SEO
        title="Our Work & Architectural Inspiration"
        description="Explore a curated gallery of tile flooring, bathrooms, custom showers, and mosaic details. Architectural inspiration for your Tile Saint project."
        path="/projects"
      />
      <PageHero
        eyebrow="Our Work & Design Inspiration"
        title={
          <>
            The beauty
            <br />
            <em>is in the details.</em>
          </>
        }
        text="Spaces, surfaces, and possibilities worth exploring."
        image="neutral-room"
        alt="Soft natural light and warm neutral finishes in a contemporary residential space"
      />
      <Breadcrumbs current="Our Work" />
      <section className="section projects-page-section">
        <div className="container">
          <div className="projects-intro">
            <div>
              <Eyebrow>A Curated Perspective</Eyebrow>
              <h2>
                Imagine what
                <br />
                <em>your space could become.</em>
              </h2>
            </div>
            <div>
              <p>
                Discover materials, thoughtful layouts, and architectural
                details that can inform your next project.
              </p>
              <p className="gallery-transparency">
                <Check size={16} />
                <span>
                  This gallery features selected architectural inspiration, not
                  completed Tile Saint client projects.
                </span>
              </p>
            </div>
          </div>
          <div className="portfolio-controls">
            <div
              className="portfolio-filters"
              aria-label="Filter gallery by category"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  aria-pressed={active === filter}
                  className={active === filter ? "active" : ""}
                  onClick={() =>
                    setParams(
                      filter === "All Spaces" ? {} : { category: filter },
                      { preventScrollReset: true },
                    )
                  }
                >
                  {filter}
                </button>
              ))}
            </div>
            <span aria-live="polite">
              {String(items.length).padStart(2, "0")}{" "}
              {items.length === 1 ? "REFERENCE" : "REFERENCES"}
            </span>
          </div>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectGallery key={active} items={items} />
          </motion.div>
          <p className="gallery-disclaimer">
            See a detail you love? Open an image to explore it, then talk to us
            about your own space.
          </p>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

export function ServiceAreasPage() {
  return (
    <>
      <SEO
        title="Our Northern New Jersey Service Areas"
        description="Tile Saint serves Kinnelon, Mahwah, Morristown, Parsippany, and Butler, New Jersey with precise tile installation and custom bathroom remodeling."
        path="/service-areas"
      />
      <PageHero
        eyebrow="Rooted in Northern New Jersey"
        title={
          <>
            Our craftsmanship.
            <br />
            <em>Your neighborhood.</em>
          </>
        }
        text="Personal attention and carefully executed tile work, close to home."
        image="area-hero"
        alt="The reflecting pool and historic Vail Mansion in Morristown, New Jersey"
        preserveOriginal
      />
      <Breadcrumbs current="Service Areas" />
      <AreasSection overview />
      <section className="section local-approach">
        <div className="container local-approach-grid">
          <div>
            <MapPin size={30} strokeWidth={1.2} />
            <Eyebrow>Based in Kinnelon</Eyebrow>
            <h2>
              Local roots.
              <br />
              <em>A personal approach.</em>
            </h2>
          </div>
          <div>
            <p className="lead">
              A project begins with a conversation, not a template.
            </p>
            <p>
              Whether you're planning a new tile floor in Mahwah, refreshing a
              Morristown bathroom, or rethinking a shower in Butler, we start
              with your particular space. Your existing surfaces, tile choice,
              and daily needs guide the work.
            </p>
            <p>
              Not sure if your location is within our service area? Call to
              discuss your project before preparing an inquiry.
            </p>
            <Action href={business.telephone} variant="navy">
              Call {business.phone}
            </Action>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

export function LocationPage() {
  const { slug } = useParams();
  const index = areas.findIndex((area) => area.slug === slug);
  const area = areas[index];
  if (!area) return <NotFoundPage />;
  const supporting = [
    "flooring-service",
    "work-living",
    "bath-portrait",
    "space-kitchen",
    "space-bathroom",
  ][index];
  const nearby = areas.filter((item) => item.slug !== slug).slice(0, 3);
  return (
    <>
      <SEO
        title={`Tile Installation & Bathroom Remodeling in ${area.name}, NJ`}
        description={`Tile Saint provides residential tile flooring installation and bathroom remodeling in ${area.name}, New Jersey. A detail-focused approach led by Maxim Saint Germain.`}
        path={`/service-areas/${area.slug}`}
        service={`Tile installation and bathroom remodeling in ${area.name}, NJ`}
      />
      <PageHero
        eyebrow={`Tile Saint / ${area.name}, New Jersey`}
        title={
          <>
            Beautifully crafted.
            <br />
            <em>Right here in {area.name}.</em>
          </>
        }
        text={area.label}
        image={area.image}
        alt={area.alt}
        preserveOriginal
      >
        <Action to={`/contact?area=${area.name}`}>
          Start Your {area.name} Project
        </Action>
      </PageHero>
      <Breadcrumbs
        current={`${area.name}, NJ`}
        parent={{ name: "Service Areas", path: "/service-areas" }}
      />
      <section className="section">
        <div className="container editorial-intro">
          <Reveal>
            <Eyebrow>Thoughtful Work. Local Care.</Eyebrow>
            <h2>{area.headline}</h2>
          </Reveal>
          <Reveal className="editorial-copy">
            <p className="lead">{area.intro}</p>
            <p>
              Based in Kinnelon and led by Maxim Saint Germain, our focus is on
              precise layouts, carefully prepared surfaces, and clean, lasting
              finishes.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section location-focus">
        <div className="container detail-feature-grid">
          <Reveal className="detail-feature-image image-reveal">
            <Photo
              name={supporting}
              alt={`Residential tile and interior design inspiration for a ${area.name} home`}
            />
          </Reveal>
          <Reveal className="detail-feature-copy">
            <Eyebrow>A Considered Approach</Eyebrow>
            <h2>{area.focus}</h2>
            <p>{area.detail}</p>
            <p>{area.consideration}</p>
            <TextLink to={`/contact?area=${area.name}`}>
              Talk Through Your Plans
            </TextLink>
          </Reveal>
        </div>
      </section>
      <section className="section location-services">
        <div className="container">
          <SectionHeading
            eyebrow={`Our Expertise in ${area.name}`}
            title={
              <>
                The right details.
                <br />
                <em>A more considered home.</em>
              </>
            }
          />
          <div className="location-service-links">
            {services.map((service, i) => (
              <Link key={service.path} to={service.path}>
                <span className="service-number">0{i + 1}</span>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.detail}</p>
                </div>
                <ArrowUpRight size={26} strokeWidth={1.3} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section nearby-section">
        <div className="container">
          <SectionHeading
            eyebrow="Our Neighboring Communities"
            title={
              <>
                Close to home.
                <br />
                <em>Across the region.</em>
              </>
            }
          >
            <TextLink to="/service-areas">All Service Areas</TextLink>
          </SectionHeading>
          <div className="nearby-links">
            {nearby.map((item) => (
              <Link key={item.slug} to={`/service-areas/${item.slug}`}>
                <MapPin size={17} />
                {item.name}, NJ
                <ArrowRight size={19} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA title={`Let's create something beautiful in ${area.name}.`} />
    </>
  );
}

export function CreditsPage() {
  return (
    <>
      <SEO
        title="Photography & Credits"
        description="Image source information, architectural inspiration disclosures, and verified business information used on the Tile Saint website."
        path="/image-credits"
      />
      <section className="section credits-page">
        <div className="container narrow-container">
          <Eyebrow>With Appreciation</Eyebrow>
          <h1>
            Photography <em>&amp; credits.</em>
          </h1>
          <p className="lead">
            Most photographs are from Tile Saint's client-provided image
            collection. Explore Tile Materials retains its existing reference
            photography.
          </p>
          <h2>A note about our gallery</h2>
          <p>
            The architectural, interior, material, and craftsmanship photographs
            on this website are selected stock or reference images. They are not
            presented as completed Tile Saint client projects. Craftsmanship
            photographs do not depict the owner or claim to show Tile Saint
            employees.
          </p>
          <h2>Client-provided photography</h2>
          <p>
            The supplied files are served locally from the{" "}
            <code>public/images-client</code> folder. Photographer, copyright,
            and license details were not included with the image files; contact
            Tile Saint for image-specific attribution or reuse questions.
          </p>
          <h2>Explore Tile Materials photography</h2>
          <p>
            The six material reference images are retained from Pexels and used
            under the{" "}
            <a href="https://www.pexels.com/license/" target="_blank" rel="noreferrer">
              Pexels license
            </a>
            :
          </p>
          <ul>
            <li>
              <a href="https://www.pexels.com/photo/4249687/" target="_blank" rel="noreferrer">
                Edward Jenner, photo 4249687
              </a>
            </li>
            <li>
              <a href="https://www.pexels.com/photo/7828186/" target="_blank" rel="noreferrer">
                Mikhail Nilov, photo 7828186
              </a>
            </li>
            <li>
              <a href="https://www.pexels.com/photo/4250578/" target="_blank" rel="noreferrer">
                Edward Jenner, photo 4250578
              </a>
            </li>
            <li>
              <a href="https://www.pexels.com/photo/4249585/" target="_blank" rel="noreferrer">
                Edward Jenner, photo 4249585
              </a>
            </li>
            <li>
              <a href="https://www.pexels.com/photo/4252164/" target="_blank" rel="noreferrer">
                Edward Jenner, photo 4252164
              </a>
            </li>
            <li>
              <a href="https://www.pexels.com/photo/4977451/" target="_blank" rel="noreferrer">
                Karolina Grabowska / Kaboompics, photo 4977451
              </a>
            </li>
          </ul>
          <h2>Northern New Jersey photography</h2>
          <p>
            The service-area photographs are restored from Wikimedia Commons.
            Each link includes its original photographer and license:
          </p>
          <ul>
            <li>
              <a href="https://commons.wikimedia.org/wiki/File:Tripodrock.jpg" target="_blank" rel="noreferrer">
                Kinnelon: Tripod Rock — Toebone, public domain
              </a>
            </li>
            <li>
              <a href="https://commons.wikimedia.org/wiki/File:Ramapo_College_arch.jpg" target="_blank" rel="noreferrer">
                Mahwah: Ramapo College arch — Daniellek0512, CC BY-SA 3.0
              </a>
            </li>
            <li>
              <a href="https://commons.wikimedia.org/wiki/File:Morristown_District_NJ.JPG" target="_blank" rel="noreferrer">
                Morristown Green — Jared Kofsky, CC BY-SA 3.0
              </a>
            </li>
            <li>
              <a href="https://commons.wikimedia.org/wiki/File:Craftsman_Farms.jpg" target="_blank" rel="noreferrer">
                Parsippany: Craftsman Farms — Daniel Case, CC BY-SA 3.0
              </a>
            </li>
            <li>
              <a href="https://commons.wikimedia.org/wiki/File:AMERICAN_HARD_RUBBER_INDUSTRY,_BUTLER,_MORRIS_COUNTY.jpg" target="_blank" rel="noreferrer">
                Butler: American Hard Rubber Company — Jerrye &amp; Roy Klotz,
                MD, CC BY-SA 3.0
              </a>
            </li>
            <li>
              <a href="https://commons.wikimedia.org/wiki/File:Reflecting_pool,_Vail_Mansion,_Morristown,_NJ.jpg" target="_blank" rel="noreferrer">
                Vail Mansion reflecting pool — Zeete, CC BY-SA 4.0
              </a>
            </li>
          </ul>
          <h2>Business information</h2>
          <p>
            Company information, owner name, services, contact details, FAQs,
            and the three customer testimonials are taken from{" "}
            <a href="https://tilesaint.com/" target="_blank" rel="noreferrer">
              Tile Saint's existing website
            </a>
            . No unverified awards, certifications, business hours, project
            claims, or experience figures are included.
          </p>
          <TextLink to="/">Return to Tile Saint</TextLink>
        </div>
      </section>
    </>
  );
}

export function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="This page could not be found. Explore Tile Saint's tile installation and bathroom remodeling services or contact our team."
        path="/404"
      />
      <section className="section not-found">
        <div className="container">
          <Eyebrow>A Different Direction</Eyebrow>
          <span className="error-number">404</span>
          <h1>
            Let's get you
            <br />
            <em>back to beautiful.</em>
          </h1>
          <p>
            We couldn't find this page, but your next project is still full of
            possibilities.
          </p>
          <Action to="/">Explore Tile Saint</Action>
          <TextLink to="/contact">Get in Touch</TextLink>
        </div>
      </section>
    </>
  );
}
