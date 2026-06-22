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
    slug: "dimension-leap",
    title: "Dimension Leap",
    type: "SaaS & Healthcare · UX/Product Design",
    tagline: "Designing workflows for AI-powered pre-production and dual healthcare ecosystems",
    problem: "Film production teams spend weeks on manual script analysis, scheduling, and call sheet creation. Concurrently, patient-doctor engagement in healthcare lacks seamless coordination and mobile accessibility.",
    solution: "Architected 6+ AI-powered workflows (story generation, script editing, auto-fill, scheduling, and call sheet automation) to reduce pre-production overhead by 35%. Additionally, designed a dual healthcare ecosystem spanning a patient mobile app and doctor web platform.",
    impact: [
      "35% Reduction In Manual Effort",
      "6+ AI Workflows Designed",
      "20% Faster Developer Handoffs",
      "5 Product Releases Delivered"
    ],
    tools: ["Figma", "Miro", "FigJam", "Jitter", "Adobe After Effects", "Rive", "GitHub"],
    duration: "May 2025 – June 2025",
    role: "Associate UX / Product Designer",
    color: "#7C3AED",
    colorDark: "#A78BFA",
    gradient: "from-[#7C3AED] to-[#A78BFA]",
    heroImage: "/images/dimension-hero.jpg",
    mockupImage: "/images/dimension-mockup.jpg",
    year: "2025",
    sections: [
      {
        title: "Overview",
        content: "Dimension Leap is a pioneering platform where I led end-to-end design for AI-driven pre-production, serving writers, directors, and producers, as well as designing healthcare applications. Over two months, I designed workflows for four key user roles and supported complex production schedules."
      },
      {
        title: "AI Workflows Design",
        content: "I architected 6+ AI-powered workflows, including automated story generation, interactive script editing, metadata auto-fill systems, calendar scheduling, and call sheet generation. These automations reduced manual planning effort for production teams by an estimated 35%."
      },
      {
        title: "Healthcare Ecosystem",
        content: "In addition to pre-production tools, I designed a dual-sided healthcare ecosystem comprising a patient mobile app and a doctor web platform. This required deep user research and mapping out workflows to ensure patient safety, data clarity, and accessibility across devices."
      },
      {
        title: "Design System & Handoff",
        content: "Built scalable design systems and robust Figma component libraries. By aligning closely with engineers and establishing clear token architectures, developer handoff efficiency increased by 20% across 5 product releases."
      }
    ]
  },
  {
    slug: "hobbiecue-ux-audit",
    title: "Hobbiecue UX Audit",
    type: "UX Audit & Design Systems",
    tagline: "Conducting comprehensive audits to optimize usability, accessibility, and design consistency",
    problem: "Hobbiecue and related platforms faced user drop-offs due to usability hurdles, low accessibility compliance (WCAG contrast/sizing), and UI inconsistencies across web interfaces.",
    solution: "Executed 100+ UX audits across e-commerce, EV rental, and social apps. Identified 350+ issues and redesigned Hobbiecue's core flows, driving a 30% task success rate improvement and a unified design system.",
    impact: [
      "100+ UX Audits Conducted",
      "350+ Issues Identified",
      "30% Task Success Improvement",
      "25% Accessibility Improvement",
      "40% Design Consistency Improvement"
    ],
    tools: ["Figma", "Miro", "Maze", "Hotjar", "Google Forms", "GitHub"],
    duration: "Feb 2024 – Feb 2025",
    role: "UX Design Intern",
    color: "#0EA5E9",
    colorDark: "#38BDF8",
    gradient: "from-[#0EA5E9] to-[#38BDF8]",
    heroImage: "/images/hobbiecue-hero.jpg",
    mockupImage: "/images/hobbiecue-mockup.jpg",
    year: "2024",
    sections: [
      {
        title: "Overview",
        content: "At Banao Technologies, I served as a UX Design Intern responsible for analyzing, auditing, and upgrading user interfaces for multiple platforms, including EV rental and social media apps, with a focus on Hobbiecue."
      },
      {
        title: "UX & Accessibility Audits",
        content: "Conducted over 100 UX audits and logged 350+ accessibility, usability, and functional issues. Auditing was done against heuristic benchmarks, user feedback sessions, and WCAG contrast standards."
      },
      {
        title: "Hobbiecue Redesign",
        content: "Leveraging audit insights, I re-engineered navigation paths and transaction steps on the Hobbiecue application. Usability testing showed a 30% improvement in task success rates and a 25% bump in accessibility compliance."
      },
      {
        title: "Systemizing Design",
        content: "Built a comprehensive, componentized design system in Figma. This standardized UI grids, form components, and typography, reducing visual inconsistencies by 40% and accelerating developer handoffs by 20%."
      }
    ]
  },
  {
    slug: "phonepe-ux-redesign",
    title: "PhonePe UX Redesign",
    type: "Fintech · Mobile App Design",
    tagline: "Simplifying complex payment structures and discovery for 450M+ users",
    problem: "Users faced cognitive overload when discovering non-core features like insurance and wealth store, leading to high drop-offs, while payment screens lacked clear transaction status hierarchy during low-network situations.",
    solution: "Redesigned the primary navigation grid, created a contextual widget system for service discovery, and optimized the post-transaction state illustration, leading to a 50% faster service discovery rate and WCAG compliance.",
    impact: [
      "50% Faster Discovery",
      "30% Fewer Return Actions",
      "15% Increase in Success Rate",
      "4.6★ App Store Rating"
    ],
    tools: ["Figma", "Maze", "Hotjar", "FigJam", "Principle"],
    duration: "12 weeks",
    role: "Lead UX Designer",
    color: "#6C47FF",
    colorDark: "#8B5CF6",
    gradient: "from-[#6C47FF] to-[#8B5CF6]",
    heroImage: "/images/phonepe-hero.jpg",
    mockupImage: "/images/phonepe-mockup.jpg",
    year: "2024",
    sections: [
      {
        title: "Overview",
        content: "Led the design overhaul of India's leading fintech payment app. The core focus was to declutter the dashboard while raising visibility for high-margin financial products without degrading the core payment flows."
      },
      {
        title: "User Research & Analysis",
        content: "Conducted field usability testing and analyzed maze click maps from 1,000+ representative participants. We discovered users primarily struggled with secondary services due to visual crowding and lack of conceptual grouping."
      },
      {
        title: "The Redesign Strategy",
        content: "Replaced the monolithic grid of icons with a responsive, categorized card deck. Added a smart search bar that suggests contextual shortcuts based on the user's past transaction history and time of day."
      },
      {
        title: "Impact and Validation",
        content: "Usability post-testing showed that the new dashboard design allowed users to locate insurance products 50% faster. More importantly, the redesign achieved full WCAG AA contrast standards, dramatically enhancing accessibility."
      }
    ]
  }
];

