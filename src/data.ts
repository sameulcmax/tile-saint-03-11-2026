export const business = {
  name: "Tile Saint, LLC",
  owner: "Maxim Saint Germain",
  phone: "(646) 491-2546",
  telephone: "tel:+16464912546",
  email: "tilesaintllc@gmail.com",
  location: "Kinnelon, New Jersey",
  url: "https://tilesaint.com",
};

export const services = [
  {
    name: "Tile Flooring Installation",
    short: "Tile Flooring",
    path: "/tile-flooring-installation",
    image: "flooring-service",
    alt: "Precisely aligned marble tile flooring in a light-filled contemporary kitchen",
    description:
      "Beautiful from the surface down. Thoughtful preparation, precise layouts, and tile flooring made for the way you live.",
    detail:
      "Professional residential tile flooring installation with careful subfloor preparation, precise layouts, and attention to lasting performance.",
    link: "Explore Flooring Services",
  },
  {
    name: "Bathroom Remodeling",
    short: "Bathrooms",
    path: "/bathroom-remodeling",
    image: "bath-sunlight",
    alt: "Sunlit contemporary bathroom with a freestanding bath and natural stone finishes",
    description:
      "Your everyday retreat, reimagined. Custom tile work and beautifully considered bathrooms, down to the smallest detail.",
    detail:
      "Beautiful bathroom transformations featuring custom tile work, shower installations, flooring, and functional layout upgrades.",
    link: "Explore Bathroom Remodeling",
  },
];

export const processSteps = [
  {
    title: "Understand Your Vision",
    text: "We begin with your space, your tile preferences, and the details that matter to you. Together, we define the project requirements.",
  },
  {
    title: "Prepare the Foundation",
    text: "Careful surface preparation, subfloor leveling, and moisture control create the right foundation for a lasting installation.",
  },
  {
    title: "Precision Installation",
    text: "Thoughtful layouts, accurate alignment, and carefully executed tile installation bring your vision into focus.",
  },
  {
    title: "Final Details",
    text: "We pay attention to clean finishes, consistent details, and the overall quality of your finished space.",
  },
];

export const testimonials = [
  {
    name: "Mark Reynolds",
    text: "Tile Saint, LLC delivered outstanding workmanship on our tile flooring project. The precision and finish quality exceeded expectations.",
  },
  {
    name: "Angela Brooks",
    text: "Our bathroom remodel was completed professionally and on schedule. The tile installation looks flawless and completely transformed the space.",
  },
  {
    name: "David Coleman",
    text: "Maxim and his team were reliable, detail-oriented, and easy to work with. I highly recommend Tile Saint, LLC for any tile work.",
  },
];

export const faqs = [
  {
    question: "What types of tile do you install?",
    answer:
      "We install ceramic, porcelain, marble, granite, mosaic, and other specialty tiles, depending on your project requirements and design preferences.",
  },
  {
    question: "How long does a tile installation project take?",
    answer:
      "Timelines depend on the size of the space, tile material, and preparation work. Many residential tile projects can be completed within a few days. We will discuss the specific scope and expected schedule for your project before work begins.",
  },
  {
    question: "Do you handle surface preparation before installation?",
    answer:
      "Yes. Proper surface preparation, leveling, and moisture control are critical parts of our installation approach. We address the foundation before installing tile to support a durable finish.",
  },
  {
    question: "Do you provide bathroom remodeling?",
    answer:
      "Yes. Our bathroom remodeling services include custom tile work, bathroom flooring, shower installations, and functional layout upgrades. Contact us to discuss the changes you have in mind.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "Tile Saint is based in Kinnelon, New Jersey and serves Kinnelon, Mahwah, Morristown, Parsippany, and Butler. Call us to discuss your project location.",
  },
  {
    question: "How can I request an estimate?",
    answer:
      "Call (646) 491-2546 or visit our Contact page to prepare an estimate inquiry in your own email app. Tell us about your location, the space, and the tile work or bathroom remodeling you are considering.",
  },
];

export type ProjectCategory =
  "Flooring" | "Bathrooms" | "Showers" | "Tile Details";
export type Project = {
  id: number;
  title: string;
  category: ProjectCategory;
  image: string;
  alt: string;
  description: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "A Study in Natural Stone",
    category: "Flooring",
    image: "work-living",
    alt: "Open-plan living room with large-format white marble flooring and warm neutral furnishings",
    description:
      "An architectural study in flowing marble surfaces, balanced proportions, and the quiet impact of a precise floor layout. Inspiration for a refined, connected living space.",
  },
  {
    id: 2,
    title: "The Everyday Sanctuary",
    category: "Bathrooms",
    image: "bath-portrait",
    alt: "Contemporary freestanding bath framed by geometric tiles and a round mirror",
    description:
      "Geometric wall tile and a soft material palette give this bathroom a restful character. A reference for pairing custom tile work with a considered bathroom layout.",
  },
  {
    id: 3,
    title: "Quietly Contemporary",
    category: "Showers",
    image: "work-marble",
    alt: "Contemporary glass-enclosed shower with large-format dark stone-look tile",
    description:
      "Large-format surfaces and clean alignments define this glass-enclosed shower. The inspiration is in the restrained palette and attention to the meeting of every surface.",
  },
  {
    id: 4,
    title: "Beautifully Connected",
    category: "Flooring",
    image: "work-dining",
    alt: "Elegant open kitchen and dining area with polished tile flooring",
    description:
      "A continuous tiled floor brings a kitchen and dining space together. The layout shows how careful material choices can create a cohesive residential interior.",
  },
  {
    id: 5,
    title: "Pattern, with Purpose",
    category: "Tile Details",
    image: "tile-pattern",
    alt: "Close-up of patterned ceramic tiles in warm neutral and blue tones",
    description:
      "A collection of ceramic patterns explores the character that smaller tile details can bring to a space. Discuss a pattern, scale, and installation layout suited to your home.",
  },
  {
    id: 6,
    title: "A Softer Kind of Modern",
    category: "Bathrooms",
    image: "space-bathroom",
    alt: "Stone-lined bathroom with a freestanding tub and a generous glass shower",
    description:
      "Natural-looking surfaces, a sculptural bath, and a generous shower create a calm interior. An architectural reference for a tile-led bathroom transformation.",
  },
  {
    id: 7,
    title: "Warmth in Every Detail",
    category: "Showers",
    image: "shower-portrait",
    alt: "Close-up of a neutral tiled shower with chrome fixtures",
    description:
      "Warm, understated tile creates a simple backdrop for a practical shower space. A close look at how restrained materials can make everyday spaces feel considered.",
  },
  {
    id: 8,
    title: "The Art of Small Details",
    category: "Tile Details",
    image: "mosaic-pattern",
    alt: "Intricate circular mosaic tile pattern in subtle earthy colors",
    description:
      "Small-format mosaic pieces create a rich, tactile pattern. This material reference highlights the importance of patient alignment and careful detailing.",
  },
  {
    id: 9,
    title: "Light, Space, and Surface",
    category: "Flooring",
    image: "space-interior",
    alt: "Contemporary residential kitchen and living interior with elegant floor finishes",
    description:
      "A thoughtful floor finish becomes the common thread in an open residential interior. Inspiration for balancing daily use with a crisp architectural finish.",
  },
];

export const spaces = [
  {
    title: "Luxury Living Rooms",
    image: "space-living",
    alt: "Expansive living room with polished natural stone flooring",
    filter: "Flooring",
  },
  {
    title: "Modern Bathrooms",
    image: "bath-dark",
    alt: "A sculptural white bath against warm, textured bathroom walls",
    filter: "Bathrooms",
  },
  {
    title: "Designer Shower Spaces",
    image: "space-shower",
    alt: "Glass shower enclosure with carefully aligned stone-look tiles",
    filter: "Showers",
  },
  {
    title: "Elegant Kitchen Floors",
    image: "space-kitchen",
    alt: "Classic light blue kitchen with an elegant patterned tile floor",
    filter: "Flooring",
  },
  {
    title: "Contemporary Interiors",
    image: "warm-living",
    alt: "Warm contemporary living room with a neutral material palette",
    filter: "Flooring",
  },
  {
    title: "Premium Marble Flooring",
    image: "hero-living",
    alt: "Natural light reflecting across a polished marble residential floor",
    filter: "Flooring",
  },
];

export const materials = [
  {
    name: "Ceramic",
    image: "material-ceramic",
    subtitle: "Endless character. Everyday versatility.",
    text: "From quiet neutrals to expressive patterns, ceramic tile offers a thoughtful finish for a wide range of residential spaces.",
  },
  {
    name: "Porcelain",
    image: "material-porcelain",
    subtitle: "A refined finish. A practical foundation.",
    text: "A versatile option for residential flooring and bathrooms, porcelain brings a clean, considered appearance to everyday living.",
  },
  {
    name: "Marble",
    image: "material-marble",
    subtitle: "Naturally individual. Effortlessly timeless.",
    text: "Distinctive natural veining creates a floor with its own character. Careful layout and material-appropriate installation make the difference.",
  },
  {
    name: "Granite",
    image: "material-granite",
    subtitle: "Natural depth. Lasting character.",
    text: "Rich variations in natural stone bring depth to a space. We consider the surface, support, and installation needs of your selected tile.",
  },
  {
    name: "Mosaic",
    image: "material-mosaic",
    subtitle: "Small pieces. Beautiful possibilities.",
    text: "Create a considered detail with small-format tile. Thoughtful alignment and careful finishing bring mosaic patterns together.",
  },
  {
    name: "Specialty Tiles",
    image: "material-specialty",
    subtitle: "A little different. Entirely your own.",
    text: "Have a particular material, pattern, or finish in mind? Talk to us about a custom tile installation tailored to your project.",
  },
];

export const areas = [
  {
    name: "Kinnelon",
    slug: "kinnelon-nj",
    image: "kinnelon",
    alt: "Residential interior inspiration for a Kinnelon home",
    label: "Our home. Your next chapter.",
    headline: "Thoughtful tile work, right here in Kinnelon.",
    intro:
      "Kinnelon is home to Tile Saint. From its wooded neighborhoods to its lake communities, the borough has a distinctive sense of space. We bring that same considered approach indoors with precise residential tile installation and custom bathroom remodeling.",
    focus: "A finish that feels at home.",
    detail:
      "Planning a new kitchen floor, a quieter bathroom retreat, or a fresh tile finish? We begin with the way you use your Kinnelon home. Your material, layout, existing subfloor, and moisture conditions all inform the installation approach.",
    consideration:
      "For a bathroom update, tell us what you would like to keep and what needs to change. For new flooring, photographs of the existing surface and approximate room dimensions are a helpful starting point.",
  },
  {
    name: "Mahwah",
    slug: "mahwah-nj",
    image: "mahwah",
    alt: "Residential interior inspiration for a Mahwah home",
    label: "Considered spaces. Beautifully connected.",
    headline: "A refined foundation for your Mahwah home.",
    intro:
      "With its Ramapo Valley setting and varied residential neighborhoods, Mahwah offers room for both traditional and contemporary interiors. Tile Saint helps homeowners create cohesive spaces through carefully planned tile floors and custom bathroom transformations.",
    focus: "Bring the whole room together.",
    detail:
      "In open living spaces, the direction of a tile layout and the transition between rooms matter. We consider how your selected ceramic, porcelain, or natural stone tile will work with the proportions of your Mahwah home, not simply how it fills the floor.",
    consideration:
      "If your project involves adjoining rooms, share how you want the flooring to flow between them. We can discuss the existing surfaces, preparation requirements, and a layout that feels connected.",
  },
  {
    name: "Morristown",
    slug: "morristown-nj",
    image: "morristown",
    alt: "Residential interior inspiration for a Morristown home",
    label: "Enduring character. A fresh perspective.",
    headline: "Respect the character. Reimagine the details.",
    intro:
      "Morristown brings historic streets, established homes, and newer residential spaces together. Whether your style leans classic or contemporary, Tile Saint approaches tile installation and bathroom remodeling with respect for the character already in your home.",
    focus: "An update that belongs.",
    detail:
      "A successful renovation should feel purposeful. We discuss how a new tile finish will meet the surrounding rooms, and we pay close attention to the existing surface before installation. In bathrooms, custom tile work can refresh the space without losing its sense of character.",
    consideration:
      "Let us know about the age and condition of the existing floor, any uneven areas, and the features you want to preserve. These details help shape a practical, considered project conversation.",
  },
  {
    name: "Parsippany",
    slug: "parsippany-nj",
    image: "parsippany",
    alt: "Residential interior inspiration for a Parsippany home",
    label: "Designed around the way you live.",
    headline: "Everyday spaces, thoughtfully elevated.",
    intro:
      "Across the residential neighborhoods of Parsippany-Troy Hills, practical family spaces and personal style go hand in hand. Tile Saint brings careful preparation, precise tile layouts, and custom bathroom remodeling to the rooms you use every day.",
    focus: "Beautiful is only the beginning.",
    detail:
      "A kitchen floor needs to suit daily activity. A bathroom floor needs a considered approach to moisture. We discuss your tile selection in the context of the room, then focus on subfloor preparation, surface leveling, and a carefully executed installation.",
    consideration:
      "Tell us how the room is used and what is not working about the current finish. Your priorities, approximate room size, and preferred material will help us understand the scope.",
  },
  {
    name: "Butler",
    slug: "butler-nj",
    image: "butler",
    alt: "Residential interior inspiration for a Butler home",
    label: "Local care. Lasting details.",
    headline: "A fresh perspective for your Butler home.",
    intro:
      "Just next to our Kinnelon base, Butler combines a historic borough center with established residential streets. Tile Saint offers homeowners a personal, detail-focused approach to new tile flooring and bathroom remodeling.",
    focus: "Make more of the space you have.",
    detail:
      "A well-considered tile layout can give an existing room a new sense of order. We help you think through material, scale, and alignment, while giving the underlying surface the preparation it needs. In a bathroom, custom shower tile and a flooring update can work together as one composition.",
    consideration:
      "For a smaller bathroom or an existing room layout, describe the areas you want to improve. Photographs and approximate dimensions can help start a focused conversation about your Butler project.",
  },
];
