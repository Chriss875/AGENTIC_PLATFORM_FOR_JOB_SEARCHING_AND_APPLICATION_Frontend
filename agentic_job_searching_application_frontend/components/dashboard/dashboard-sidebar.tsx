"use client";

import { Bookmark, BriefcaseBusiness, FileText, Inbox, ListChecks, SlidersHorizontal, UserRound } from "lucide-react";
const navigationItems = [
  { id: "new-jobs", label: "New jobs", icon: BriefcaseBusiness },
  { id: "actions", label: "Actions", icon: ListChecks },
  { id: "preferences", label: "Job Preferences Settings", icon: SlidersHorizontal },
  { id: "tracked-jobs", label: "Tracked jobs", icon: Bookmark },
  { id: "cv", label: "CV", icon: FileText },
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "profile", label: "Profile", icon: UserRound },
];


type Props = { isCollapsed: boolean; isDarkMode: boolean };
export default function DashboardSidebar({ isCollapsed, isDarkMode }: Props) {
  return (
    <aside
      id="sidebar"
      className={`min-h-0 overflow-hidden border-r px-2 py-8 ${isDarkMode ? "border-zinc-800" : "border-zinc-200"
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
                  className={`flex min-h-8 w-full items-center text-sm font-medium ${isCollapsed ? "justify-center px-0" : "gap-3 px-2 text-left"
                    } ${isActive
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

  );
}
