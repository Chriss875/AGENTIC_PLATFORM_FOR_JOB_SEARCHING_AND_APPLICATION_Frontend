"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import JobCard from "./job-card";
import { useDashboardTheme } from "@/components/dashboard/dashboard-theme";
import type { Job } from "@/types/job";

type Props = { jobs: Job[]; selectedJobId: string | null; onSelectJob: (id: string) => void };
export default function JobResults({ jobs, selectedJobId, onSelectJob }: Props) {
  const isDarkMode = useDashboardTheme();
  const [sortBy, setSortBy] = useState<"recent" | "relevant">("recent");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortedJobs = [...jobs].sort((first, second) => {
    if (sortBy === "relevant") {
      return second.relevance - first.relevance;
    }

    return (
      Date.parse(second.postedAt) -
      Date.parse(first.postedAt)
    );
  });

  return (
    <section
      aria-labelledby="job-results-heading"
      className={`min-w-0 border-b xl:border-r xl:border-b-0 ${isDarkMode ? "border-zinc-800" : "border-zinc-200"
        }`}
    >
      <div className="flex min-h-24 items-center justify-between gap-4 px-5">
        <h2 id="job-results-heading" className="text-sm font-medium">
          Found {jobs.length} jobs
        </h2>

        <div className="relative">
          <button
            type="button"
            aria-expanded={isSortOpen}
            aria-controls="job-sort-options"
            onClick={() => setIsSortOpen((previous) => !previous)}
            className="flex items-center gap-2 px-2 py-2 text-sm font-medium focus-visible:outline-2"
          >
            {sortBy === "recent" ? "Recent" : "Most relevant"}
            <ChevronDown size={18} aria-hidden="true" />
          </button>

          {isSortOpen && (
            <fieldset
              id="job-sort-options"
              className={`absolute right-0 top-full z-20 mt-2 w-48 space-y-3 rounded-xl border p-4 shadow-sm ${isDarkMode
                  ? "border-zinc-700 bg-zinc-900"
                  : "border-zinc-200 bg-zinc-100"
                }`}
            >
              <legend className="sr-only">Sort jobs</legend>

              <label className="flex cursor-pointer items-center justify-between gap-3 text-sm">
                Most relevant
                <input
                  type="radio"
                  name="job-sort"
                  value="relevant"
                  checked={sortBy === "relevant"}
                  onChange={() => {
                    setSortBy("relevant");
                    setIsSortOpen(false);
                  }}
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-3 text-sm">
                Recent
                <input
                  type="radio"
                  name="job-sort"
                  value="recent"
                  checked={sortBy === "recent"}
                  onChange={() => {
                    setSortBy("recent");
                    setIsSortOpen(false);
                  }}
                />
              </label>
            </fieldset>
          )}
        </div>
      </div>

      <ul>{sortedJobs.map(job => <JobCard key={job.id} job={job} isSelected={job.id === selectedJobId} onSelectJob={onSelectJob} />)}</ul>
    </section>
  );
}
