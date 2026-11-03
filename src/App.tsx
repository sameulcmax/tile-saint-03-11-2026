import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import { Footer, Header } from "./components/Layout";
import Home from "./pages/Home";
import ContactPage from "./pages/Contact";
import GuidePage from "./pages/Guide";
import {
  AboutPage,
  CreditsPage,
  LocationPage,
  NotFoundPage,
  ProjectsPage,
  ServiceAreasPage,
  ServiceDetailPage,
  ServicesPage,
} from "./pages/InnerPages";

function Site() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const timer = window.setTimeout(
        () =>
          document
            .getElementById(location.hash.slice(1))
            ?.scrollIntoView({ block: "start" }),
        120,
      );
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    const frame = requestAnimationFrame(() =>
      document.getElementById("main-content")?.focus({ preventScroll: true }),
    );
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to Content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.32 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route
              path="/tile-flooring-installation"
              element={<ServiceDetailPage type="flooring" />}
            />
            <Route
              path="/bathroom-remodeling"
              element={<ServiceDetailPage type="bathroom" />}
            />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/service-areas" element={<ServiceAreasPage />} />
            <Route path="/service-areas/:slug" element={<LocationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/guides/:slug" element={<GuidePage />} />
            <Route path="/image-credits" element={<CreditsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <Site />
      </MotionConfig>
    </BrowserRouter>
  );
}
