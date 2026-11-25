"use client";

import { useState, type ReactNode } from "react";
import { PanelLeft } from "lucide-react";
import DashboardHeader from "./dashboard-header";
import DashboardSidebar from "./dashboard-sidebar";
import JobAssistant from "@/components/assistant/job-assistant";
import { DashboardThemeContext } from "./dashboard-theme";

type Props = { initialCollapsed: boolean; children: ReactNode };
export default function DashboardShell({ initialCollapsed, children }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [isDarkMode, setIsDarkMode] = useState(false);
  function handleSidebarToggle() {
    const nextCollapsed = !isCollapsed;

    setIsCollapsed(nextCollapsed);

    document.cookie =
      `sidebar-collapsed=${nextCollapsed}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }

  return (
    <DashboardThemeContext.Provider value={isDarkMode}>
      <div className={`grid min-h-screen  grid-rows-[72px_minmax(0,1fr)] transition-[grid-template-columns] duration-200 motion-reduce:transition-none ${isDarkMode
          ? "bg-zinc-950 text-zinc-50"
          : "bg-white text-neutral-900"
        }`}
        style={{
          gridTemplateColumns: isCollapsed
            ? "72px minmax(0,1fr)"
            : "240px minmax(0,1fr)",
        }}
      >
        <div className="flex items-center justify-end border-b border-r border-zinc-200 px-4">
          <button
            type="button"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`flex size-10 items-center justify-center rounded-md ${isDarkMode ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-100"
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
            onClick={handleSidebarToggle}
            aria-expanded={!isCollapsed}
            aria-controls="sidebar"
          >
            <PanelLeft size={22} aria-hidden="true" />
          </button>
        </div>

        <DashboardHeader isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(previous => !previous)} />
        <DashboardSidebar isCollapsed={isCollapsed} isDarkMode={isDarkMode} />
        <main className="min-w-0 pb-32">
          {children}
          <JobAssistant isCollapsed={isCollapsed} />
        </main>
      </div>
    </DashboardThemeContext.Provider>
  );
}
