"use client";

import {useState } from "react";
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
  ChevronDown
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
  industry: string;
  location: string;
  employmentType: string;
  postedAt: string;
  relevance: number;
  summary: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
};

const demoJobs: Job[] = [
  {
    id: "job-1",
    title: "Principal Software Engineer",
    company: "NMB Bank",
    industry: "Financial services",
    location: "Dar es Salaam",
    employmentType: "Full-time",
    postedAt: "2026-11-24",
    relevance: 95,
    summary: "Lead the development of reliable digital banking services.",
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
    industry: "Technology",
    location: "Remote",
    employmentType: "Full-time",
    postedAt: "2026-11-25",
    relevance: 88,
    summary: "Build backend services for a growing software product.",
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

export default function Home(){
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [credits, setCredits] = useState(0);
  const [selectedJobId, setSelectedJobId] = useState(demoJobs[0].id);

  const [sortBy, setSortBy] = useState<"recent" | "relevant">("recent");

  const [isSortOpen, setIsSortOpen] = useState(false);

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
      <main className= "min-w-0">
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
                  <div className= "space-y-3 p-5">
                    <p className="text-sm text-zinc-500">
                      Company name
                      </p> 

                      <h2
                         id="job-details-heading"
                         className="text-xl font-medium"
                         >
                          Selected job
                         </h2>
                  </div>

                  <div className ="grid 2xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                    <div
                       className={`min-w-0 space-y-10 border-t p-5 ${
                        isDarkMode ? "border-zinc-800" : "border-zinc-200"
                       }`}
                       >
                        <section aria-labelledby="about-job-heading">
                          <h3 id="about-job-heading" className="text-sm font-medium">
                            About the Job
                          </h3>
                        </section>
                        <section aria-labelledby="requirements-heading">
                          <h3 id="requirements-heading" className="text-sm font-medium">
                            Requirements
                          </h3>
                        </section>

                        <section aria-labelledby="responsibilities-heading">
                          <h3 
                          id="responsibilities-heading"
                          className="text-sm font-medium"
                          >
                            Responsibilities
                          </h3>
                        </section>

                        <aside
                             aria-label="Job recommendations"
                             className={`min-w-0 space-y-10 border-t p-5 2xl:border-l ${
                              isDarkMode ? "border-zinc-800" : "border-zinc-200"
                             }`}
                             >
                              <section aria-labelledby="resume-heading">
                                <h3 id="resume-heading" className="text-sm font-medium">
                                  Improve your resume
                                </h3>
                              </section>

                              <section aria-labelledby="similar-jobs-heading">
                                <h3 id="similar-job-headings" className="text-sm font-medium">
                                  Similar jobs
                                </h3>
                              </section>
                             </aside>
                       </div>
                  </div>
                 </section>
        </div>
        </main>
    </div>
  );
}
