"use client";

import { useState } from "react";
import { Share } from "lucide-react";
import { useDashboardTheme } from "@/components/dashboard/dashboard-theme";
import type { Job } from "@/types/job";

export default function JobActions({ job: selectedJob }: { job: Job }) {
  const isDarkMode = useDashboardTheme();
  const [shareFeedback, setShareFeedback] = useState<{
    jobId: string;
    message: string;
  } | null>(null);

  async function handleShare(job: Job) {
    if (!job.applicationUrl) return;

    setShareFeedback(null);

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${job.title} — ${job.company}`,
          url: job.applicationUrl,
        });
      } else {
        await navigator.clipboard.writeText(job.applicationUrl);

        setShareFeedback({
          jobId: job.id,
          message: "Job link copied.",
        });
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setShareFeedback({
        jobId: job.id,
        message: "Unable to share this link. Please try again.",
      });
    }
  }

  return (<div>
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        aria-label="Share this job"
        disabled={!selectedJob.applicationUrl}
        onClick={() => handleShare(selectedJob)}
        className={`flex size-9 items-center justify-center bg-transparent focus-visible:outline-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed ${isDarkMode ? "text-white" : "text-black"
          }`}
      >
        <Share size={20} aria-hidden="true" />
      </button>

      {selectedJob.applicationUrl ? (
        <a
          href={selectedJob.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 items-center justify-center rounded-full bg-black px-3 text-xs font-medium text-white hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          Apply manually
        </a>
      ) : (
        <button
          type="button"
          disabled
          title="Application link is not available yet"
          className="min-h-9 cursor-not-allowed rounded-full bg-black px-3 text-xs font-medium text-white"
        >
          Apply manually
        </button>
      )}

      <button
        type="button"
        disabled
        title="AI-assisted applications are not connected yet"
        className="min-h-9 cursor-not-allowed rounded-full bg-black px-3 text-xs font-medium text-white"
      >
        Apply with AI
      </button>
    </div>
    <p role="status" className="text-xs text-zinc-500">
      {shareFeedback?.jobId === selectedJob.id
        ? shareFeedback.message
        : ""}
    </p>
  </div>);
}
