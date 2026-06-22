import type { Metadata } from "next";
import HealthcareCaseStudy from "./HealthcareCaseStudy";

export const metadata: Metadata = {
  title: "Unified Healthcare Platform — 6-Product Ecosystem · Ganesh Muniganti",
  description:
    "A world-class UX case study on designing a connected healthcare ecosystem: Patient App, Doctor App, Doctor Web Portal, Clinic Portal, Pharmacy Portal, and Super Admin Dashboard.",
};

export default function HealthcarePlatformPage() {
  return <HealthcareCaseStudy />;
}
