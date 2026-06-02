import { notFound, redirect } from "next/navigation";
import { projects } from "@/data/projects";
import type { Metadata } from "next";
import CaseStudyClient from "./CaseStudyClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.slug !== "phonepe-ux-redesign") // has its own dedicated page
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Ganesh Portfolio`,
    description: project.problem,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  // PhonePe has its own dedicated page at /work/phonepe-ux-redesign
  if (slug === "phonepe-ux-redesign") {
    redirect("/work/phonepe-ux-redesign");
  }
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <CaseStudyClient project={project} />;
}

