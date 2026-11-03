import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin, Search, X } from "lucide-react";
import { areas, business, materials, services } from "../data";
import { useModalFocus } from "./UI";
import { guides } from "./EditorialSections";

export default function SiteTools({
  tool,
  onClose,
}: {
  tool: "search" | "location";
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const modalRef = useModalFocus(true, onClose);
  const entries = [
    ...guides.map((guide) => ({
      title: guide.title,
      detail: "IDEAS & PROJECT GUIDES",
      path: `/guides/${guide.slug}`,
    })),
    ...services.map((service) => ({
      title: service.name,
      detail: "OUR SERVICES",
      path: service.path,
    })),
    {
      title: "Our Work & Design Inspiration",
      detail: "EXPLORE THE POSSIBILITIES",
      path: "/projects",
    },
    {
      title: "About Tile Saint",
      detail: "OUR STORY & CRAFTSMANSHIP",
      path: "/about",
    },
    ...materials.map((material) => ({
      title: `${material.name} Tile Installation`,
      detail: "MATERIAL OPTIONS",
      path: `/contact?material=${encodeURIComponent(material.name)}`,
    })),
    ...areas.map((area) => ({
      title: `${area.name}, New Jersey`,
      detail: "OUR SERVICE AREAS",
      path: `/service-areas/${area.slug}`,
    })),
    {
      title: "Contact & Free Estimate",
      detail: "LET'S START A CONVERSATION",
      path: "/contact",
    },
  ];
  const results = entries.filter((entry) =>
    `${entry.title} ${entry.detail}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  return (
    <motion.div
      className="tool-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="tool-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-tool-title"
        initial={{ y: 12 }}
        animate={{ y: 0 }}
      >
        <button
          className="tool-modal-close icon-button"
          onClick={onClose}
          aria-label={`Close ${tool === "search" ? "site search" : "service area finder"}`}
        >
          <X size={22} />
        </button>
        <span className="small-section-label">TILE SAINT, LLC</span>
        <h2 id="site-tool-title">
          {tool === "search"
            ? "What are you looking for?"
            : "Craftsmanship, close to home."}
        </h2>
        <p>
          {tool === "search"
            ? "Explore our services, material options, and Northern New Jersey neighborhoods."
            : "Select your Northern New Jersey community to explore local tile installation and bathroom remodeling."}
        </p>
        {tool === "search" ? (
          <>
            <label className="site-search-input">
              <Search size={21} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search spaces, services, or materials"
                aria-label="Search Tile Saint"
              />
            </label>
            <div className="site-search-results" aria-live="polite">
              {results.length ? (
                results.map((entry) => (
                  <Link
                    to={entry.path}
                    key={entry.path + entry.title}
                    onClick={onClose}
                  >
                    <span>
                      <small>{entry.detail}</small>
                      {entry.title}
                    </span>
                    <ArrowUpRight size={19} />
                  </Link>
                ))
              ) : (
                <div className="search-no-results">
                  <h3>Let's talk about your idea.</h3>
                  <p>
                    No matching pages. Try "bathroom", "marble", or your town.
                  </p>
                  <Link to="/contact" onClick={onClose}>
                    Contact Tile Saint
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="location-finder-links">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  to={`/service-areas/${area.slug}`}
                  onClick={onClose}
                >
                  <MapPin size={18} />
                  <span>{area.name}, NJ</span>
                  <ArrowUpRight size={18} />
                </Link>
              ))}
            </div>
            <p className="location-finder-note">
              Not sure about your location?{" "}
              <a href={business.telephone}>Call {business.phone}</a> to discuss
              your project.
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
