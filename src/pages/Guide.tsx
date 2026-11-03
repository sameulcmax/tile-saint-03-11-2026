import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { guides } from "../components/EditorialSections";
import { Action, Breadcrumbs, PageHero, SEO } from "../components/UI";
import { FinalCTA } from "../components/Sections";
import { NotFoundPage } from "./InnerPages";

const content = {
  "choosing-your-tile": [
    {
      title: "Begin with the room, not just the sample.",
      text: "Think about how the space is used and the look you want to create. A kitchen floor, a bathroom, and a decorative detail each bring different considerations to the conversation. Share the room's approximate size, existing finish, and the surfaces you want to change.",
    },
    {
      title: "Explore the material possibilities.",
      text: "Tile Saint installs ceramic, porcelain, marble, granite, mosaic, and specialty tiles. Each offers a different visual character. Consider the scale of the tile, its finish, and how it relates to the surrounding rooms. A sample is a useful starting point, but the complete layout matters just as much.",
    },
    {
      title: "Look beneath the finished surface.",
      text: "The right installation starts with understanding the existing foundation. Surface preparation, leveling, and moisture considerations are part of our approach. Discuss your chosen material and your room with us before planning the installation details.",
    },
  ],
  "planning-a-bathroom": [
    {
      title: "Consider the way you use the space.",
      text: "Start with what is working in your bathroom and what you would like to change. Think about the shower, the floor, the overall layout, and the everyday routines that the room needs to support. A clear list of priorities helps create a focused project conversation.",
    },
    {
      title: "Bring the finishes together.",
      text: "A well-considered bathroom feels like one composition. Discuss how your shower tile, bathroom floor, and chosen pattern or material will work together. Our bathroom remodeling services include custom tile work, shower installations, flooring, and functional layout upgrades.",
    },
    {
      title: "Make room for careful preparation.",
      text: "Before tile is installed, the underlying surfaces need attention. We consider preparation, leveling, moisture control, and a precise tile layout. Project timing depends on the room, the chosen materials, preparation needs, and the changes involved, so talk to us about your specific scope.",
    },
  ],
  "preparing-your-project": [
    {
      title: "Gather a few helpful details.",
      text: "Your project location, photographs of the existing room, and approximate dimensions are useful starting points. Tell us whether you are considering tile flooring, a bathroom remodel, a custom shower, or a combination of these services.",
    },
    {
      title: "Share your ideas and priorities.",
      text: "Have an inspiration image or a material in mind? Bring it to the conversation. Explain what you like about the look, what needs to change about the existing space, and which details are most important to you. You do not need to have every decision made to begin.",
    },
    {
      title: "Discuss the foundation and the scope.",
      text: "Let us know about uneven surfaces, the existing floor finish, and any moisture concerns you are aware of. We will talk through your requirements and the installation approach. Your space, selected tile, and preparation needs help define the work, not a one-size-fits-all template.",
    },
  ],
};

export default function GuidePage() {
  const { slug } = useParams();
  const guide = guides.find((item) => item.slug === slug);
  const paragraphs = slug ? content[slug as keyof typeof content] : undefined;
  if (!guide || !paragraphs) return <NotFoundPage />;
  return (
    <>
      <SEO
        title={guide.title}
        description={guide.text}
        path={`/guides/${guide.slug}`}
      />
      <PageHero
        eyebrow={`Tile Saint / ${guide.category} Guide`}
        title={guide.title}
        text={guide.text}
        image={guide.image}
        alt={`${guide.category} and residential tile installation inspiration`}
      />
      <Breadcrumbs current={guide.category + " Guide"} />
      <section className="section">
        <article className="container guide-page-content">
          <p className="lead">
            A thoughtful project starts with the right conversation. Here are a
            few ways to make the most of yours.
          </p>
          {paragraphs.map((paragraph) => (
            <section key={paragraph.title}>
              <h2>{paragraph.title}</h2>
              <p>{paragraph.text}</p>
            </section>
          ))}
          <Action to="/contact">Let's Discuss Your Project</Action>
          <div className="guide-related">
            {guides
              .filter((item) => item.slug !== slug)
              .map((item) => (
                <Link to={`/guides/${item.slug}`} key={item.slug}>
                  {item.title}
                  <ArrowRight size={18} />
                </Link>
              ))}
          </div>
        </article>
      </section>
      <FinalCTA />
    </>
  );
}
