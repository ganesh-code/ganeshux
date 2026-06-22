import type { Metadata } from "next";
import DimensionLeapCaseStudy from "./DimensionLeapCaseStudy";

export const metadata: Metadata = {
  title: "AI Preproduction Suite for Indian Films — Ganesh Muniganti",
  description:
    "A world-class UX case study on designing AI-powered film pre-production workflows for writers, directors, producers, and agencies. 35% reduction in manual effort.",
};

export default function DimensionLeapPage() {
  return <DimensionLeapCaseStudy />;
}
