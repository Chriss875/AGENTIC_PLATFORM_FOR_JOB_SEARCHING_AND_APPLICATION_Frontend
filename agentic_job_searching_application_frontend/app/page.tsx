"use client";

import { useEffect , useState } from "react";
import {
  Bell,
  Bookmark,
  Sun,
  BriefcaseBusiness,
  FileText,
  Inbox,
  ListChecks,
  Moon,
  PanelLeft,
  SlidersHorizontal,
  UserRound,
  Zap,
  ChevronDown,
  Share
} from "lucide-react";

const navigationItems = [
  { id: "new-jobs", label: "New jobs", icon: BriefcaseBusiness },
  { id: "actions", label: "Actions", icon: ListChecks },
  { id: "preferences", label: "Job Preferences Settings", icon: SlidersHorizontal },
  { id: "tracked-jobs", label: "Tracked jobs", icon: Bookmark },
  { id: "cv", label: "CV", icon: FileText },
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "profile", label: "Profile", icon: UserRound },
];

type Job = {
  id: string;
  title: string;
  company: string;
  companyLogo: string | null;
  applicationUrl: string | null;
  industry: string;
  location: string;
  country: string | null;
  employmentType: string;
  postedAt: string;
  relevance: number;
  summary: string;
  fullPosting: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  
};

const demoJobs: Job[] = [
  {
    id: "job-1",
    title: "Principal Software Engineer",
    company: "NMB Bank",
    companyLogo:"/companies/NMB logo.png",
    applicationUrl:null,
    industry: "Financial services",
    location: "Dar es Salaam",
    country:"Tanzania",
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
    companyLogo:null,
    applicationUrl:null,
    industry: "Technology",
    location: "Remote",
    country:"null",
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


function formatPostedTime(postedAt: string, now: number): string {
  const postedTime = Date.parse(postedAt);

  if (!Number.isFinite(postedTime)) {
    return "Posting date unavailable";
  }
  const seconds = Math.floor((now - postedTime) / 1000);

  if (seconds < 0) {
    return "Posting date pending";
  }

  if (seconds < 60) {
    return "Posted just now";
  }

  const units = [
    { seconds: 86400, label: "day" },
    { seconds: 3600, label: "hour" },
    { seconds: 60, label: "minute" },
  ];

  for (const unit of units) {
    if (seconds >= unit.seconds) {
      const amount = Math.floor(seconds / unit.seconds);
      const suffix = amount === 1 ? "" : "s";

      return `Posted ${amount} ${unit.label}${suffix} ago`;
    }
  }
  return "Posted just now";
}

export default function Home(){
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [question, setQuestion] = useState("");
  const [questionFeedback, setQuestionFeedback] = useState("");
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
  setNow(Date.now());
  const intervalId = window.setInterval(() => {
    setNow(Date.now());
  }, 60_000);

  return () => window.clearInterval(intervalId);
}, []);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [credits, setCredits] = useState(0);
  const [selectedJobId, setSelectedJobId] = useState(demoJobs[0].id);
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
  const [sortBy, setSortBy] = useState<"recent" | "relevant">("recent");

  const [isSortOpen, setIsSortOpen] = useState(false);

  const [descriptionView, setDescriptionView] =
  useState<"summary" | "full">("summary");

  const selectedJob = demoJobs.find(
  (job) => job.id === selectedJobId
   );

  const sortedJobs = [...demoJobs].sort((first, second) => {
  if (sortBy === "relevant") {
    return second.relevance - first.relevance;
  }

  return (
    Date.parse(second.postedAt) -
    Date.parse(first.postedAt)
  );
});

  return(
    <div className={`grid min-h-screen  grid-rows-[72px_minmax(0,1fr)] transition-[grid-template-columns] duration-200 motion-reduce:transition-none ${
      isDarkMode
      ? "bg-zinc-950 text-zinc-50"
      : "bg-white text-neutral-900"
    }`}
          style={{
            gridTemplateColumns: isCollapsed
            ? "72px minmax(0,1fr)"
            :"240px minmax(0,1fr)",
          }}
          >
      <div className="flex items-center justify-end border-b border-r border-zinc-200 px-4">
      <button 
      type="button" 
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      className={`flex size-10 items-center justify-center rounded-md ${
        isDarkMode ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-100"
      } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
      onClick={()=> setIsCollapsed ((previous) => !previous)}
      aria-expanded={!isCollapsed}
      aria-controls="sidebar"
      >
        <PanelLeft size={22} aria-hidden="true" />
      </button>
      </div>
      <header className="flex items-center justify-between gap-4 border-b border-zinc-200 px-6">
        <h1 className="text-[28px] font-medium leading-[1.15] tracking-[-0.04em]">
          New Jobs
        </h1>
        <div className="flex shrink-0 items-center gap-4">
          <button
          type="button"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to Dark mode" }
          aria-pressed={isDarkMode}
          onClick={() => setIsDarkMode((previous) => !previous)}
          className={`flex size-10 items-center justify-center rounded-md ${
    isDarkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
  } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
          >
           {isDarkMode ? (
    <Sun size={22} aria-hidden="true" />
  ) : (
    <Moon size={22} aria-hidden="true" />
  )}
          </button>
            <button
      type="button"
      aria-label="Notifications"
      className={`flex size-10 items-center justify-center rounded-md ${
        isDarkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
      } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
    >
      <Bell size={22} aria-hidden="true" />
    </button>

    <button
      type="button"
      aria-label={`${credits} credits available`}
      className={`flex h-9 items-center justify-center gap-2 px-3 ${
        isDarkMode
          ? "bg-zinc-800 text-zinc-50 hover:bg-zinc-700"
          : "bg-zinc-200 text-zinc-950 hover:bg-zinc-300"
      } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
    >
      <Zap size={20} aria-hidden="true" />
      <span className="text-sm">{credits}</span>
    </button>
        </div>
        </header>
      <aside
        id="sidebar"
        className={`min-h-0 overflow-hidden border-r px-2 py-8 ${
          isDarkMode ? "border-zinc-800" : "border-zinc-200"
        }`}
      >
        <nav aria-label="Main navigation">
          <ul className="space-y-5">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === "new-jobs";

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    title={isCollapsed ? item.label : undefined}
                    aria-label={item.label}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-8 w-full items-center text-sm font-medium ${
                      isCollapsed ? "justify-center px-0" : "gap-3 px-2 text-left"
                    } ${
                      isActive
                        ? isDarkMode
                          ? "bg-zinc-800"
                          : "bg-zinc-200"
                        : isDarkMode
                          ? "hover:bg-zinc-800"
                          : "hover:bg-zinc-100"
                    } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
                  >
                    <Icon size={18} className="shrink-0" aria-hidden="true" />
                    {!isCollapsed && (
                      <span className="min-w-0 truncate">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

      </aside>
      <main className= "min-w-0 pb-32">
        <div className="grid min-h-[calc(100svh-72px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section
  aria-labelledby="job-results-heading"
  className={`min-w-0 border-b xl:border-r xl:border-b-0 ${
    isDarkMode ? "border-zinc-800" : "border-zinc-200"
  }`}
>
  <div className="flex min-h-24 items-center justify-between gap-4 px-5">
    <h2 id="job-results-heading" className="text-sm font-medium">
      Found {demoJobs.length} jobs
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
          className={`absolute right-0 top-full z-20 mt-2 w-48 space-y-3 rounded-xl border p-4 shadow-sm ${
            isDarkMode
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

  <ul>
    {sortedJobs.map((job) => {
      const isSelected = job.id === selectedJobId;

      return (
        <li
          key={job.id}
          className={`border-t ${
            isDarkMode ? "border-zinc-800" : "border-zinc-200"
          }`}
        >
          <button
            type="button"
            aria-pressed={isSelected}
            onClick={() => setSelectedJobId(job.id)}
            className={`flex min-h-24 w-full items-start gap-3 p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
              isSelected
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
              <span className="mt-1 block text-sm text-zinc-500">
                {job.company}
                <span className="mt-1 block text-sm text-zinc-500">
               {[job.location, job.country].filter(Boolean).join(", ")}
               </span>
            <span className="mt-1 block text-xs text-zinc-500">
            {now === null
           ? "Posting time loading…"
            : formatPostedTime(job.postedAt, now)}
          </span>
              </span>
            </span>
          </button>
        </li>
      );
    })}
  </ul>
</section>
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
        className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${
          isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
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

  <div className="flex flex-wrap items-center gap-2">
    <button
      type="button"
      aria-label="Share this job"
      disabled={!selectedJob.applicationUrl}
      onClick={() => handleShare(selectedJob)}
      className={`flex size-9 items-center justify-center bg-transparent focus-visible:outline-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed ${
  isDarkMode ? "text-white" : "text-black"
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
      aria-describedby="ai-application-status"
      className="min-h-9 cursor-not-allowed rounded-full bg-black px-3 text-xs font-medium text-white"
    >
      Apply with AI
    </button>
  </div>
</div>

<p role="status" className="text-xs text-zinc-500">
  {shareFeedback?.jobId === selectedJob.id
    ? shareFeedback.message
    : ""}
</p>

        <h2 id="job-details-heading" className="text-xl font-medium">
          {selectedJob.title}
        </h2>

        <div className="flex flex-wrap gap-2">
          {[selectedJob.employmentType, selectedJob.location].map(
            (value) => (
              <span
                key={value}
                className={`rounded-full px-3 py-2 text-xs ${
                  isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
                }`}
              >
                {value}
              </span>
            )
          )}
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
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
        className={`pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white transition-transform duration-200 motion-reduce:transition-none ${
          descriptionView === "full"
            ? "translate-x-full"
            : "translate-x-0"
        }`}
      />

      <button
        type="button"
        aria-pressed={descriptionView === "summary"}
        aria-controls="job-description-content"
        onClick={() => setDescriptionView("summary")}
        className={`relative rounded-full px-2 py-1 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
          descriptionView === "summary"
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
        className={`relative rounded-full px-2 py-1 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
          descriptionView === "full"
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

        <aside
          aria-label="Job recommendations"
          className={`min-w-0 space-y-8 border-t p-5 xl:border-t-0 xl:border-l ${
            isDarkMode ? "border-zinc-800" : "border-zinc-200"
          }`}
        >
          <section>
            <h3 className="text-sm font-medium">Skills</h3>

            <ul className="mt-3 flex flex-wrap gap-2">
              {selectedJob.skills.map((skill) => (
                <li
                  key={skill}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    isDarkMode ? "border-zinc-700" : "border-zinc-200"
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

          <section>
            <h3 className="text-sm font-medium">Similar jobs</h3>

            <ul
              className={`mt-3 overflow-hidden rounded-xl border ${
                isDarkMode ? "border-zinc-800" : "border-zinc-200"
              }`}
            >
              {demoJobs
                .filter((job) => job.id !== selectedJob.id)
                .map((job) => (
                  <li
                    key={job.id}
                    className={`border-b last:border-b-0 ${
                      isDarkMode ? "border-zinc-800" : "border-zinc-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedJobId(job.id)}
                      className={`flex w-full items-start gap-3 p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
                        isDarkMode
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
        </div>
        <div
  className="pointer-events-none fixed bottom-5 right-0 z-30 flex justify-center px-4"
  style={{
    left: isCollapsed ? "72px" : "240px",
  }}
>
  <form
    aria-label="Ask the job assistant"
    className="pointer-events-auto w-full max-w-xl"
    onSubmit={(event) => {
      event.preventDefault();

      if (!question.trim()) return;

      setQuestionFeedback(
        "The job assistant is not connected yet. Your question has not been sent."
      );
    }}
  >
    <label htmlFor="job-assistant-question" className="sr-only">
      Ask about jobs or a job description
    </label>

    <input
      id="job-assistant-question"
      type="text"
      value={question}
      onChange={(event) => {
        setQuestion(event.target.value);
        setQuestionFeedback("");
      }}
      placeholder="Ask anything, like new types of jobs, job descriptions..."
      aria-describedby="job-assistant-feedback"
     className={`h-14 w-full rounded-full px-6 text-sm shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
  isDarkMode
    ? "bg-zinc-800 text-white placeholder:text-zinc-400"
    : "bg-zinc-200 text-black placeholder:text-zinc-600"
}`}
    />

    {questionFeedback && (
      <p
        id="job-assistant-feedback"
        role="status"
        className={`mt-2 rounded-lg px-4 py-2 text-xs ${
          isDarkMode
            ? "bg-zinc-900 text-zinc-300"
            : "bg-white text-zinc-700"
        }`}
      >
        {questionFeedback}
      </p>
    )}

    {!questionFeedback && (
      <span id="job-assistant-feedback" className="sr-only">
        Type a question and press Enter.
      </span>
    )}
  </form>
</div>
        </main>
    </div>
  );
}
