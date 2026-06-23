import { notFound, redirect } from "next/navigation";
import { projects } from "@/data/projects";
import type { Metadata } from "next";
import CaseStudyClient from "./CaseStudyClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const DEDICATED_ROUTES = ["phonepe-ux-redesign"];

export async function generateStaticParams() {
  return projects
    .filter((p) => !DEDICATED_ROUTES.includes(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (DEDICATED_ROUTES.includes(slug)) {
    redirect(`/work/${slug}`);
  }
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Ganesh Portfolio`,
    description: project.problem,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  if (DEDICATED_ROUTES.includes(slug)) {
    redirect(`/work/${slug}`);
  }
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <CaseStudyClient project={project} />;
}

