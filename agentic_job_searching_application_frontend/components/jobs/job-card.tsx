"use client";

import { BriefcaseBusiness } from "lucide-react";
import PostedTime from "./posted-time";
import { useDashboardTheme } from "@/components/dashboard/dashboard-theme";
import type { Job } from "@/types/job";

type Props = { job: Job; isSelected: boolean; onSelectJob: (id: string) => void };
export default function JobCard({ job, isSelected, onSelectJob }: Props) {
  const isDarkMode = useDashboardTheme();
  return (
    <li

      className={`border-t ${isDarkMode ? "border-zinc-800" : "border-zinc-200"
        }`}
    >
      <button
        type="button"
        aria-pressed={isSelected}
        onClick={() => onSelectJob(job.id)}
        className={`flex min-h-24 w-full items-start gap-3 p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${isSelected
            ? isDarkMode
              ? "bg-zinc-800"
              : "bg-zinc-100"
            : isDarkMode
              ? "hover:bg-zinc-900"
              : "hover:bg-zinc-50"
          }`}
      >
        <BriefcaseBusiness
          size={24}
          className="mt-1 shrink-0"
          aria-hidden="true"
        />

        <span className="min-w-0">
          <span className="block font-medium">
            {job.title}
          </span>
          <span className="mt-1 block text-sm text-zinc-500">{job.company}</span>
          <span className="mt-1 block text-sm text-zinc-500">{[job.location, job.country].filter(Boolean).join(", ")}</span>
          <PostedTime postedAt={job.postedAt} />
        </span>
      </button>
    </li>
  );
}
