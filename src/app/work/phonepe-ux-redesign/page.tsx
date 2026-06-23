import type { Metadata } from "next";
import PhonePeCaseStudy from "./PhonePeCaseStudy";

export const metadata: Metadata = {
  title: "Enhancing PhonePe's Usability — Ganesh Muniganti",
  description:
    "A UX research case study on improving PhonePe's feature discoverability, navigation efficiency, and accessibility. Research-driven redesign of Scan & Pay, Split Bill, and core navigation flows.",
};

export default function PhonePePage() {
  return <PhonePeCaseStudy />;
}
