import type { Metadata } from "next";
import HealthcareCaseStudy from "./HealthcareCaseStudy";

export const metadata: Metadata = {
  title: "How a client rejection taught me where AI belongs in healthcare — Ganesh Muniganti",
  description:
    "A product design case study on building a unified AI-powered healthcare platform: 6 products, 5 stakeholder types, rejected concepts, design system architecture, and real trade-off decisions.",
};

export default function HealthcarePlatformPage() {
  return <HealthcareCaseStudy />;
}
