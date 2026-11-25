"use client";

import { BriefcaseBusiness } from "lucide-react";
import JobActions from "./job-actions";
import JobDescription from "./job-description";
import SimilarJobs from "./similar-jobs";
import { useDashboardTheme } from "@/components/dashboard/dashboard-theme";
import type { Job } from "@/types/job";

type Props = { selectedJob: Job | undefined; jobs: Job[]; onSelectJob: (id: string) => void };
export default function JobDetails({ selectedJob, jobs, onSelectJob }: Props) {
  const isDarkMode = useDashboardTheme();
  return (
    <section
      aria-labelledby="job-details-heading"
      className="min-w-0"
    >
      {selectedJob ? (
        <>
          <div className="space-y-5 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                {selectedJob.companyLogo ? (
                  <img
                    src={selectedJob.companyLogo}
                    alt=""
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-lg bg-white object-contain p-1"
                  />
                ) : (
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
                      }`}
                  >
                    <BriefcaseBusiness size={24} aria-hidden="true" />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="font-medium">
                    {selectedJob.company}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    {selectedJob.industry}
                  </p>
                </div>
              </div>

              <JobActions job={selectedJob} />
            </div>

            <h2 id="job-details-heading" className="text-xl font-medium">
              {selectedJob.title}
            </h2>

            <div className="flex flex-wrap gap-2">
              {[selectedJob.employmentType, selectedJob.location].map(
                (value) => (
                  <span
                    key={value}
                    className={`rounded-full px-3 py-2 text-xs ${isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
                      }`}
                  >
                    {value}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="grid xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <JobDescription job={selectedJob} />

            <aside
              aria-label="Job recommendations"
              className={`min-w-0 space-y-8 border-t p-5 xl:border-t-0 xl:border-l ${isDarkMode ? "border-zinc-800" : "border-zinc-200"
                }`}
            >
              <section>
                <h3 className="text-sm font-medium">Skills</h3>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill) => (
                    <li
                      key={skill}
                      className={`rounded-full border px-3 py-1 text-xs ${isDarkMode ? "border-zinc-700" : "border-zinc-200"
                        }`}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-sm font-medium">
                  Improve your resume
                </h3>

                <p className="mt-3 text-sm text-zinc-500">
                  Resume analysis has not been requested for this job.
                </p>
              </section>

              <SimilarJobs jobs={jobs} selectedJob={selectedJob} onSelectJob={onSelectJob} />

            </aside>
          </div>
        </>
      ) : (
        <div className="p-5">
          <h2 id="job-details-heading" className="font-medium">
            Select a job to view its details
          </h2>
        </div>
      )}
    </section>
  );
}
