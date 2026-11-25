import type { Job } from "@/types/job";

export const demoJobs: Job[] = [
  {
    id: "job-1",
    title: "Principal Software Engineer",
    company: "NMB Bank",
    companyLogo: "/companies/NMB logo.png",
    applicationUrl: null,
    industry: "Financial services",
    location: "Dar es Salaam",
    country: "Tanzania",
    employmentType: "Full-time",
    postedAt: "2026-11-24T09:00:00+03:00",
    relevance: 95,
    summary: "Lead the development of reliable digital banking services.",
    fullPosting:
      "This is a fictional practice posting. The engineer will lead the development of digital banking services, guide technical decisions, and collaborate with product teams.\n\nThe role includes reviewing architecture, improving reliability, and supporting secure software delivery.",
    requirements: [
      "Experience designing and maintaining production applications.",
      "Strong understanding of APIs, databases, and application security.",
    ],
    responsibilities: [
      "Guide technical decisions and review implementation quality.",
      "Collaborate with product and engineering teams.",
    ],
    skills: ["TypeScript", "SQL", "API design"],
  },
  {
    id: "job-2",
    title: "Backend Software Engineer",
    company: "Example Technology",
    companyLogo: null,
    applicationUrl: null,
    industry: "Technology",
    location: "Remote",
    country: null,
    employmentType: "Full-time",
    postedAt: "2026-11-25T09:00:00+03:00",
    relevance: 88,
    summary: "Build backend services for a growing software product.",
    fullPosting:
      "This is a fictional practice posting. The engineer will lead the development of digital banking services, guide technical decisions, and collaborate with product teams.\n\nThe role includes reviewing architecture, improving reliability, and supporting secure software delivery.",
    requirements: [
      "Experience building HTTP APIs.",
      "Working knowledge of relational databases.",
    ],
    responsibilities: [
      "Develop and maintain backend services.",
      "Write tests and investigate production issues.",
    ],
    skills: ["Python", "PostgreSQL", "Testing"],
  },
];
