export interface Project {
  slug: string;
  title: string;
  type: string;
  tagline: string;
  problem: string;
  solution: string;
  impact: string[];
  tools: string[];
  duration: string;
  role: string;
  color: string;
  colorDark: string;
  gradient: string;
  heroImage: string;
  mockupImage: string;
  year: string;
  sections: CaseStudySection[];
}

export interface CaseStudySection {
  title: string;
  content: string;
  image?: string;
}

export const projects: Project[] = [
  {
    slug: "phonepe-ux-redesign",
    title: "PhonePe UX Redesign",
    type: "Mobile App · UX Research & Design",
    tagline: "Reimagining India's most-used payment app for speed and clarity",
    problem:
      "Users struggle to discover key features quickly in PhonePe's dense interface. Critical actions like Scan & Pay were buried under multiple taps, causing frustration and high return-action rates.",
    solution:
      "Introduced a persistent floating Scan & Pay button, restructured bottom navigation for thumb reach, enhanced accessibility with WCAG-compliant contrast, and added universal search for instant feature discovery.",
    impact: [
      "50% faster feature discovery",
      "30% fewer return actions",
      "WCAG AA compliant",
      "4.6★ post-redesign rating",
    ],
    tools: ["Figma", "Maze", "Hotjar", "FigJam", "Principle"],
    duration: "12 weeks",
    role: "Lead UX Designer",
    color: "#6C47FF",
    colorDark: "#8B5CF6",
    gradient: "from-[#6C47FF] to-[#A78BFA]",
    heroImage: "/images/phonepe-hero.jpg",
    mockupImage: "/images/phonepe-mockup.jpg",
    year: "2024",
    sections: [
      {
        title: "Overview",
        content:
          "PhonePe serves over 500 million users in India, handling everything from payments to investments. Despite its massive scale, user research revealed significant friction in core task flows, particularly for feature discovery.",
      },
      {
        title: "Research",
        content:
          "Conducted 24 moderated usability sessions with users across urban and semi-urban India. Deployed heatmaps via Hotjar across 10,000 sessions to identify dead zones and rage-clicks. Key findings revealed that 68% of users couldn't locate the Scan & Pay feature within 5 seconds.",
      },
      {
        title: "Competitive Analysis",
        content:
          "Analyzed GPay, Paytm, and BHIM across 40+ heuristic criteria. Identified that persistent scan CTAs and progressive disclosure patterns significantly reduce time-to-task in competing apps.",
      },
      {
        title: "Solution",
        content:
          "The redesign centered on three principles: immediate access to Scan & Pay via a persistent FAB, reduced cognitive load through information hierarchy improvements, and improved accessibility through larger touch targets and contrast ratios.",
      },
      {
        title: "Impact",
        content:
          "Post-launch data from A/B testing with 50,000 users showed 50% reduction in time-to-scan, 30% fewer back navigations, and a significant uplift in user satisfaction scores.",
      },
    ],
  },
  {
    slug: "creatiwise-website-redesign",
    title: "Creatiwise Website Redesign",
    type: "Web · Conversion Optimization",
    tagline: "Building trust and clarity to turn visitors into clients",
    problem:
      "Creatiwise's previous website lacked credibility signals and had a confusing information hierarchy, resulting in high bounce rates and low conversion from visitor to inquiry.",
    solution:
      "Redesigned with a conversion-focused layout: prominent social proof, cleaner service presentation, streamlined inquiry flow, and a trust-building visual identity.",
    impact: [
      "29% lower bounce rate",
      "42% increase in inquiries",
      "2.1× session duration",
      "Top 3 on target keywords",
    ],
    tools: ["Figma", "Webflow", "Google Analytics", "Hotjar", "Notion"],
    duration: "8 weeks",
    role: "UX/UI Designer",
    color: "#0EA5E9",
    colorDark: "#38BDF8",
    gradient: "from-[#0EA5E9] to-[#38BDF8]",
    heroImage: "/images/creatiwise-hero.jpg",
    mockupImage: "/images/creatiwise-mockup.jpg",
    year: "2024",
    sections: [
      {
        title: "Overview",
        content:
          "Creatiwise is a creative agency offering content, design, and marketing services. Their website was generating traffic but failing to convert due to trust gaps and unclear value propositions.",
      },
      {
        title: "Research",
        content:
          "Analyzed 3 months of GA data, conducted 8 user interviews with potential clients, and ran 5-second tests to gauge first impressions. Found that users couldn't identify Creatiwise's core offering within the first viewport.",
      },
      {
        title: "Solution",
        content:
          "Prioritized social proof above the fold, simplified the service menu to 3 clear offerings, added a visible pricing tier structure, and optimized the inquiry form from 8 fields down to 4.",
      },
      {
        title: "Impact",
        content:
          "Three months post-launch: bounce rate dropped from 72% to 51%, monthly inquiries grew by 42%, and average session duration doubled from 1:12 to 2:32.",
      },
    ],
  },
  {
    slug: "tinythreads",
    title: "TinyThreads",
    type: "Mobile App · E-commerce UX",
    tagline: "Helping parents find perfect kids' clothes in under 2 minutes",
    problem:
      "Parents spend excessive time searching for age and size-appropriate children's clothing, overwhelmed by irrelevant results and complex filter systems.",
    solution:
      "Built a personalized recommendation engine UI, child-profile onboarding flow, simplified browsing with smart filters, and a deal discovery hub — all optimized for one-hand thumb navigation.",
    impact: [
      "68% reduction in search time",
      "4.8★ App Store rating",
      "3× repeat purchase rate",
      "Featured in App Store",
    ],
    tools: ["Figma", "Protopie", "Maze", "Swift UI", "FigJam"],
    duration: "16 weeks",
    role: "Product Designer",
    color: "#F59E0B",
    colorDark: "#FCD34D",
    gradient: "from-[#F59E0B] to-[#FCD34D]",
    heroImage: "/images/tinythreads-hero.jpg",
    mockupImage: "/images/tinythreads-mockup.jpg",
    year: "2023",
    sections: [
      {
        title: "Overview",
        content:
          "TinyThreads addresses the $47B children's apparel market with a mobile-first experience designed around the needs of busy parents — primarily mothers aged 25–40.",
      },
      {
        title: "Research",
        content:
          "Conducted diary studies with 12 parents over 4 weeks, tracking their shopping journeys. Identified 3 core pain points: size confusion, irrelevant search results, and inability to find deals quickly.",
      },
      {
        title: "Solution",
        content:
          "The child profile onboarding takes 90 seconds and unlocks a personalized feed. Smart size mapping across 80+ brands eliminates size confusion. A dedicated Deals hub surfaces time-sensitive offers.",
      },
      {
        title: "Impact",
        content:
          "Beta users found suitable items in an average of 1.8 minutes vs. 5.9 minutes on competitor apps. The app received 4.8★ on launch and was featured in the App Store Kids Shopping collection.",
      },
    ],
  },
];
