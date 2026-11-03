import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { areas, business, materials } from "../data";
import {
  Breadcrumbs,
  Eyebrow,
  PageHero,
  SEO,
  TextLink,
} from "../components/UI";

type Inquiry = {
  name: string;
  email: string;
  phone: string;
  area: string;
  service: string;
  material: string;
  description: string;
  consent: boolean;
};
type Errors = Partial<Record<keyof Inquiry, string>>;

function validate(values: Inquiry): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  const phoneDigits = values.phone.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 15)
    errors.phone = "Please enter a valid phone number, including area code.";
  if (!values.area) errors.area = "Please select your project location.";
  if (!values.service) errors.service = "Please choose a service.";
  if (values.description.trim().length < 20)
    errors.description =
      "Please tell us a little more about your project (at least 20 characters).";
  if (!values.consent)
    errors.consent =
      "Please confirm that you understand how this inquiry works.";
  return errors;
}

export default function ContactPage() {
  const [params] = useSearchParams();
  const paramService = params.get("service");
  const paramArea = params.get("area") || "";
  const paramMaterial = params.get("material") || "";
  const [values, setValues] = useState<Inquiry>({
    name: "",
    email: "",
    phone: "",
    area: areas.some((area) => area.name === paramArea) ? paramArea : "",
    service:
      paramService === "flooring"
        ? "Tile Flooring Installation"
        : paramService === "bathroom"
          ? "Bathroom Remodeling"
          : "",
    material: materials.some((material) => material.name === paramMaterial)
      ? paramMaterial
      : "",
    description: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const area = areas.some((item) => item.name === paramArea)
      ? paramArea
      : undefined;
    const material = materials.some((item) => item.name === paramMaterial)
      ? paramMaterial
      : undefined;
    const service =
      paramService === "flooring"
        ? "Tile Flooring Installation"
        : paramService === "bathroom"
          ? "Bathroom Remodeling"
          : undefined;
    if (!area && !material && !service) return;
    setValues((current) => ({
      ...current,
      ...(area ? { area } : {}),
      ...(material ? { material } : {}),
      ...(service ? { service } : {}),
    }));
    setPrepared(false);
  }, [paramArea, paramMaterial, paramService]);
  const update = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (submitted)
      setErrors((current) => ({
        ...current,
        [key]: validate({ ...values, [key]: value })[key],
      }));
  };
  const message = `Hello Maxim,\n\nI'd like to discuss a free estimate for my project.\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\nPhone: ${values.phone.trim()}\nProject location: ${values.area}, New Jersey\nService: ${values.service}\n${values.material ? `Preferred material: ${values.material}\n` : ""}\nProject details:\n${values.description.trim()}\n\nThank you,\n${values.name.trim()}`;
  const mailto = `mailto:${business.email}?subject=${encodeURIComponent(`Estimate Inquiry - ${values.service} in ${values.area}`)}&body=${encodeURIComponent(message)}`;
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstError}"]`)
        ?.focus();
      return;
    }
    setPrepared(true);
    setCopied(false);
    setCopyError(false);
    window.setTimeout(() => {
      previewRef.current?.focus({ preventScroll: true });
      previewRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "center",
      });
    }, 30);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([message], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "tile-saint-estimate-inquiry.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const errorProps = (key: keyof Inquiry) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `error-${key}` : undefined,
  });
  const error = (key: keyof Inquiry) =>
    errors[key] ? (
      <small className="field-error" id={`error-${key}`}>
        {errors[key]}
      </small>
    ) : null;
  return (
    <>
      <SEO
        title="Contact & Request a Free Estimate"
        description="Discuss your tile installation or bathroom remodeling project with Maxim Saint Germain. Call Tile Saint at (646) 491-2546 or prepare an email inquiry."
        path="/contact"
      />
      <PageHero
        eyebrow="A Conversation Is a Beautiful Beginning"
        title={
          <>
            Your vision.
            <br />
            <em>Let's bring it to life.</em>
          </>
        }
        text="Tell us about your space. We'll talk through the possibilities."
        image="bath-sunlight"
        alt="Beautifully lit contemporary bathroom with natural finishes and a sculptural freestanding bathtub"
      />
      <Breadcrumbs current="Contact" />
      <section className="section contact-section">
        <div className="container contact-layout">
          <div className="contact-information">
            <Eyebrow>Let's Start With Hello</Eyebrow>
            <h2>
              Good spaces begin
              <br />
              <em>with a conversation.</em>
            </h2>
            <p>
              Have a tile project in mind? Talk to Maxim Saint Germain about
              your space, your ideas, and the details that matter to you.
            </p>
            <div className="contact-detail">
              <Phone size={20} strokeWidth={1.4} />
              <div>
                <small>CALL TILE SAINT</small>
                <a className="contact-main-phone" href={business.telephone}>
                  {business.phone}
                  <ArrowUpRight size={21} />
                </a>
              </div>
            </div>
            <div className="contact-detail">
              <Mail size={20} strokeWidth={1.4} />
              <div>
                <small>WRITE TO US</small>
                <a href={`mailto:${business.email}`}>
                  {business.email}
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <div className="contact-detail">
              <MapPin size={21} strokeWidth={1.4} />
              <div>
                <small>OUR HOME BASE</small>
                <span>Kinnelon, New Jersey, USA</span>
                <a
                  className="contact-map-link"
                  href="https://www.google.com/maps/search/?api=1&query=Kinnelon%2C+New+Jersey"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Kinnelon on the Map
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
            <div className="contact-area-list">
              <small>PROUDLY SERVING</small>
              <div>
                {areas.map((area, index) => (
                  <span key={area.slug}>
                    <Link to={`/service-areas/${area.slug}`}>{area.name}</Link>
                    {index < areas.length - 1 && (
                      <span className="area-separator"> / </span>
                    )}
                  </span>
                ))}
              </div>
              <TextLink to="/service-areas">Explore Our Neighborhoods</TextLink>
            </div>
          </div>
          <div className="inquiry-area">
            {!prepared ? (
              <>
                <Eyebrow>Your Next Chapter</Eyebrow>
                <h2>Tell us about your space.</h2>
                <p className="inquiry-intro">
                  A few thoughtful details are all it takes to get started.
                </p>
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  {submitted && Object.values(errors).some(Boolean) && (
                    <div className="form-error-summary" role="alert">
                      Please check the highlighted fields before preparing your
                      inquiry.
                    </div>
                  )}
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="inquiry-name">
                        Your Name <span>*</span>
                      </label>
                      <input
                        id="inquiry-name"
                        name="name"
                        autoComplete="name"
                        placeholder="First and last name"
                        value={values.name}
                        onChange={(event) => update("name", event.target.value)}
                        {...errorProps("name")}
                        required
                        maxLength={100}
                      />
                      {error("name")}
                    </div>
                    <div className="form-field">
                      <label htmlFor="inquiry-email">
                        Email Address <span>*</span>
                      </label>
                      <input
                        id="inquiry-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={(event) =>
                          update("email", event.target.value)
                        }
                        {...errorProps("email")}
                        required
                        maxLength={160}
                      />
                      {error("email")}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="inquiry-phone">
                        Phone Number <span>*</span>
                      </label>
                      <input
                        id="inquiry-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(201) 555-0123"
                        value={values.phone}
                        onChange={(event) =>
                          update("phone", event.target.value)
                        }
                        {...errorProps("phone")}
                        required
                        maxLength={30}
                      />
                      {error("phone")}
                    </div>
                    <div className="form-field">
                      <label htmlFor="inquiry-area">
                        Project Location <span>*</span>
                      </label>
                      <select
                        id="inquiry-area"
                        name="area"
                        value={values.area}
                        onChange={(event) => update("area", event.target.value)}
                        {...errorProps("area")}
                        required
                      >
                        <option value="">Select your town</option>
                        {areas.map((area) => (
                          <option key={area.name} value={area.name}>
                            {area.name}, NJ
                          </option>
                        ))}
                        <option value="Other location - please confirm availability">
                          Other / Please confirm availability
                        </option>
                      </select>
                      {error("area")}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="inquiry-service">
                        What Are You Planning? <span>*</span>
                      </label>
                      <select
                        id="inquiry-service"
                        name="service"
                        value={values.service}
                        onChange={(event) =>
                          update("service", event.target.value)
                        }
                        {...errorProps("service")}
                        required
                      >
                        <option value="">Select a service</option>
                        <option>Tile Flooring Installation</option>
                        <option>Bathroom Remodeling</option>
                        <option>Flooring &amp; Bathroom Remodeling</option>
                        <option>I'd like to discuss my project</option>
                      </select>
                      {error("service")}
                    </div>
                    <div className="form-field">
                      <label htmlFor="inquiry-material">
                        Preferred Tile{" "}
                        <span className="optional">(optional)</span>
                      </label>
                      <select
                        id="inquiry-material"
                        name="material"
                        value={values.material}
                        onChange={(event) =>
                          update("material", event.target.value)
                        }
                      >
                        <option value="">Still exploring</option>
                        {[
                          "Ceramic",
                          "Porcelain",
                          "Marble",
                          "Granite",
                          "Mosaic",
                          "Specialty Tiles",
                        ].map((material) => (
                          <option key={material}>{material}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="inquiry-description">
                      A Little About Your Project <span>*</span>
                    </label>
                    <textarea
                      id="inquiry-description"
                      name="description"
                      placeholder="Tell us about your space, approximate size, tile ideas, and what you would like to change..."
                      rows={5}
                      maxLength={2500}
                      value={values.description}
                      onChange={(event) =>
                        update("description", event.target.value)
                      }
                      {...errorProps("description")}
                      required
                    />
                    <div className="textarea-bottom">
                      {error("description")}
                      <span>{values.description.length} / 2500</span>
                    </div>
                  </div>
                  <div className="form-notice">
                    <Mail size={17} strokeWidth={1.4} />
                    <p>
                      This form prepares an email in your own email app. It does
                      not submit or store inquiries on a server. Nothing is sent
                      until you send the email yourself.
                    </p>
                  </div>
                  <div className="consent-field">
                    <label>
                      <input
                        type="checkbox"
                        name="consent"
                        checked={values.consent}
                        onChange={(event) =>
                          update("consent", event.target.checked)
                        }
                        {...errorProps("consent")}
                        required
                      />
                      <span>
                        I understand that I will need to send this inquiry
                        through my email app.
                      </span>
                    </label>
                    {error("consent")}
                  </div>
                  <button
                    className="button button-red form-submit"
                    type="submit"
                  >
                    Prepare My Estimate Inquiry
                    <ArrowUpRight size={18} />
                  </button>
                  <p className="form-alternative">
                    Prefer to talk?{" "}
                    <a href={business.telephone}>
                      Call {business.phone}
                      <ArrowRight size={13} />
                    </a>
                  </p>
                </form>
              </>
            ) : (
              <div className="inquiry-preview" tabIndex={-1} ref={previewRef}>
                <CheckCircle2 size={34} strokeWidth={1.3} />
                <Eyebrow>Ready for Your Review</Eyebrow>
                <h2>
                  Your inquiry,
                  <br />
                  <em>thoughtfully prepared.</em>
                </h2>
                <p>
                  <strong>Nothing has been sent or saved to a server.</strong>{" "}
                  Review your details, then open your email app to send your
                  inquiry directly to {business.email}.
                </p>
                <div
                  className="inquiry-summary"
                  tabIndex={0}
                  role="region"
                  aria-label="Prepared inquiry text"
                >
                  <span>TO: {business.email}</span>
                  <pre>{message}</pre>
                </div>
                <a href={mailto} className="button button-red">
                  Open in Email App
                  <Mail size={17} />
                </a>
                <div className="inquiry-tools">
                  <button onClick={copy}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Inquiry Copied" : "Copy Inquiry"}
                  </button>
                  <button onClick={download}>
                    <Download size={16} />
                    Download Text
                  </button>
                  <button
                    onClick={() => {
                      setPrepared(false);
                      setCopied(false);
                    }}
                  >
                    Edit Details
                    <ArrowRight size={15} />
                  </button>
                </div>
                {copyError && (
                  <p className="field-error" role="alert">
                    Clipboard access is unavailable. Download the inquiry text
                    or select and copy it above.
                  </p>
                )}
                <p className="form-alternative" aria-live="polite">
                  No email app configured?{" "}
                  <a href={business.telephone}>Call {business.phone}</a> or copy
                  the inquiry into your email provider.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
