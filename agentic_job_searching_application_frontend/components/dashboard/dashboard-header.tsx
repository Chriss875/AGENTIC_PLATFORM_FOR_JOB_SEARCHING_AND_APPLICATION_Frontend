"use client";

import { Bell, Sun, Moon, Zap } from "lucide-react";
type Props = { isDarkMode: boolean; onToggleTheme: () => void; credits?: number };
export default function DashboardHeader({ isDarkMode, onToggleTheme, credits = 0 }: Props) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-zinc-200 px-6">
      <h1 className="text-[28px] font-medium leading-[1.15] tracking-[-0.04em]">
        New Jobs
      </h1>
      <div className="flex shrink-0 items-center gap-4">
        <button
          type="button"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to Dark mode"}
          aria-pressed={isDarkMode}
          onClick={onToggleTheme}
          className={`flex size-10 items-center justify-center rounded-md ${isDarkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
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
          className={`flex size-10 items-center justify-center rounded-md ${isDarkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
            } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
        >
          <Bell size={22} aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label={`${credits} credits available`}
          className={`flex h-9 items-center justify-center gap-2 px-3 ${isDarkMode
              ? "bg-zinc-800 text-zinc-50 hover:bg-zinc-700"
              : "bg-zinc-200 text-zinc-950 hover:bg-zinc-300"
            } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
        >
          <Zap size={20} aria-hidden="true" />
          <span className="text-sm">{credits}</span>
        </button>
      </div>
    </header>

  );
}
