"use client";

import { useState } from "react";
import type { Job } from "@/types/job";

export default function JobDescription({ job: selectedJob }: { job: Job }) {
  const [descriptionView, setDescriptionView] = useState<"summary" | "full">("summary");
  return (
    <div className="min-w-0 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-medium">
          About the Job
        </h3>

        <div
          role="group"
          aria-label="Job description view"
          className="relative isolate grid w-48 shrink-0 grid-cols-2 rounded-full bg-black p-1"
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white transition-transform duration-200 motion-reduce:transition-none ${descriptionView === "full"
                ? "translate-x-full"
                : "translate-x-0"
              }`}
          />

          <button
            type="button"
            aria-pressed={descriptionView === "summary"}
            aria-controls="job-description-content"
            onClick={() => setDescriptionView("summary")}
            className={`relative rounded-full px-2 py-1 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${descriptionView === "summary"
                ? "text-black"
                : "text-white"
              }`}
          >
            Summary
          </button>

          <button
            type="button"
            aria-pressed={descriptionView === "full"}
            aria-controls="job-description-content"
            onClick={() => setDescriptionView("full")}
            className={`relative rounded-full px-2 py-1 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${descriptionView === "full"
                ? "text-black"
                : "text-white"
              }`}
          >
            Full posting
          </button>
        </div>
      </div>

      <div id="job-description-content" className="mt-5">
        {descriptionView === "summary" ? (
          <div className="space-y-8">
            <p className="text-sm leading-6">
              {selectedJob.summary}
            </p>

            <section>
              <h4 className="text-sm font-medium">
                Requirements
              </h4>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
                {selectedJob.requirements.map((requirement) => (
                  <li key={requirement}>
                    {requirement}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-sm font-medium">
                Responsibilities
              </h4>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
                {selectedJob.responsibilities.map((responsibility) => (
                  <li key={responsibility}>
                    {responsibility}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : (
          <p className="whitespace-pre-line text-sm leading-6">
            {selectedJob.fullPosting}
          </p>
        )}
      </div>
    </div>

  );
}
