"use client";

import { useState } from "react";
import JobResults from "./job-results";
import JobDetails from "./job-details";
import type { Job } from "@/types/job";

export default function JobsWorkspace({ initialJobs }: { initialJobs: Job[] }) {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(initialJobs[0]?.id ?? null);
  const selectedJob = initialJobs.find(job => job.id === selectedJobId);
  return (
    <div className="grid min-h-[calc(100svh-72px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <JobResults jobs={initialJobs} selectedJobId={selectedJobId} onSelectJob={setSelectedJobId} />
      <JobDetails jobs={initialJobs} selectedJob={selectedJob} onSelectJob={setSelectedJobId} />
    </div>
  );
}
