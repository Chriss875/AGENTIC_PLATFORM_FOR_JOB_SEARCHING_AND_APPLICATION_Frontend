"use client";

import { BriefcaseBusiness } from "lucide-react";
import { useDashboardTheme } from "@/components/dashboard/dashboard-theme";
import type { Job } from "@/types/job";

type Props = { jobs: Job[]; selectedJob: Job; onSelectJob: (id: string) => void };
// Practice recommendations only; replace with backend-ranked results later.
export default function SimilarJobs({ jobs, selectedJob, onSelectJob }: Props) {
  const isDarkMode = useDashboardTheme();
  return (
    <section>
      <h3 className="text-sm font-medium">Similar jobs</h3>

      <ul
        className={`mt-3 overflow-hidden rounded-xl border ${isDarkMode ? "border-zinc-800" : "border-zinc-200"
          }`}
      >
        {jobs
          .filter((job) => job.id !== selectedJob.id)
          .map((job) => (
            <li
              key={job.id}
              className={`border-b last:border-b-0 ${isDarkMode ? "border-zinc-800" : "border-zinc-200"
                }`}
            >
              <button
                type="button"
                onClick={() => onSelectJob(job.id)}
                className={`flex w-full items-start gap-3 p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${isDarkMode
                    ? "hover:bg-zinc-800"
                    : "hover:bg-zinc-50"
                  }`}
              >
                <BriefcaseBusiness
                  size={20}
                  className="mt-1 shrink-0"
                  aria-hidden="true"
                />

                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    {job.title}
                  </span>
                  <span className="mt-1 block text-xs text-zinc-500">
                    {job.company}
                  </span>
                </span>
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
