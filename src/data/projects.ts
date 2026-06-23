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
    title: "AI Preproduction Suite for Indian Films",
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
    heroImage: "/pre-production.png",
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
    slug: "healthcare-platform",
    title: "Unified Healthcare Platform",
    type: "Healthcare · Enterprise UX",
    tagline: "A connected ecosystem of 6 products serving patients, doctors, clinics, pharmacies, and administrators",
    problem: "Healthcare operations were fragmented across disconnected systems. Patients struggled to manage appointments, doctors lacked visibility across patient interactions, clinics relied on manual processes, pharmacies had disconnected workflows, and administrators lacked centralized control.",
    solution: "Designed a unified healthcare ecosystem comprising a Patient Mobile App, Doctor Mobile App, Doctor Web Portal, Clinic Management Portal, Pharmacy Management Portal, and Super Admin Dashboard — all connected through a shared data layer.",
    impact: [
      "6 Interconnected Products Designed",
      "5 Stakeholder Types Served",
      "End-to-End Ecosystem Coverage",
      "Unified Design System Across Platforms"
    ],
    tools: ["Figma", "Miro", "FigJam", "Maze", "Google Forms"],
    duration: "2025",
    role: "Associate UX / Product Designer",
    color: "#0EA5E9",
    colorDark: "#38BDF8",
    gradient: "from-[#0EA5E9] to-[#38BDF8]",
    heroImage: "/healthcare.png",
    mockupImage: "/healthcare.png",
    year: "2025",
    sections: [
      {
        title: "The Challenge",
        content: "Healthcare operations were fragmented across disconnected systems. Every stakeholder — patients, doctors, clinic staff, pharmacists, and administrators — worked in isolation with no shared source of truth."
      },
      {
        title: "Research & Discovery",
        content: "Conducted stakeholder workshops, requirement gathering sessions, doctor discussions, and CEO product strategy meetings. Mapped workflows across all five stakeholder types to identify pain points and operational gaps."
      },
      {
        title: "Designing The Ecosystem",
        content: "Designed six interconnected products sharing a unified data layer: Patient Mobile App, Doctor Mobile App, Doctor Web Portal, Clinic Management Portal, Pharmacy Management Portal, and Super Admin Dashboard."
      },
      {
        title: "Impact",
        content: "Delivered a fully connected healthcare ecosystem that eliminated fragmentation, enabled real-time coordination across all stakeholders, and established a scalable design system used across all six products."
      }
    ]
  },
  {
    slug: "phonepe-ux-redesign",
    title: "Enhancing PhonePe's Usability",
    type: "UX Research & Product Design",
    tagline: "Improving Accessibility, Navigation & User Engagement through research-driven design decisions",
    problem: "PhonePe users face challenges discovering critical features quickly, leading to slower transactions, unnecessary effort, and reduced usability.",
    solution: "Conducted in-depth research into feature discoverability, accessibility, and navigation efficiency. Redesigned core interaction patterns for Scan & Pay, Split Bill, and feature discovery to reduce friction across the platform.",
    impact: [
      "40% Faster Feature Discovery",
      "3 Core Flows Redesigned",
      "Research-Driven Decisions",
      "Accessibility Improved"
    ],
    tools: ["Figma", "Miro", "Google Forms"],
    duration: "4 Weeks",
    role: "UX Researcher & Designer",
    color: "#5F259F",
    colorDark: "#9B59B6",
    gradient: "from-[#5F259F] to-[#9B59B6]",
    heroImage: "/phonepe.png",
    mockupImage: "/phonepe.png",
    year: "2024",
    sections: [
      {
        title: "Project Overview",
        content: "PhonePe users face challenges discovering critical features quickly, leading to slower transactions, unnecessary effort, and reduced usability. This project focused on improving feature discoverability, accessibility, navigation efficiency, and overall user experience through research-driven design decisions."
      },
      {
        title: "Research & Problem Definition",
        content: "Conducted user interviews, surveys via Google Forms, and competitive analysis. Identified core pain points: difficulty locating Split Bill, inefficient Scan & Pay access, poor feature discoverability, and navigation confusion."
      },
      {
        title: "Design Solutions",
        content: "Redesigned the navigation structure to surface high-frequency features. Introduced contextual shortcuts, improved information hierarchy, and enhanced accessibility for diverse user demographics."
      },
      {
        title: "Impact",
        content: "The redesign improved task completion rates, reduced time-on-task for key flows, and enhanced satisfaction scores across tested user segments."
      }
    ]
  }
];

