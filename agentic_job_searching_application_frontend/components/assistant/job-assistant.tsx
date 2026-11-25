"use client";

import { useState } from "react";
import { useDashboardTheme } from "@/components/dashboard/dashboard-theme";

export default function JobAssistant({ isCollapsed }: { isCollapsed: boolean }) {
  const isDarkMode = useDashboardTheme();
  const [question, setQuestion] = useState("");
  const [questionFeedback, setQuestionFeedback] = useState("");
  return (
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
          className={`h-14 w-full rounded-full px-6 text-sm shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${isDarkMode
              ? "bg-zinc-800 text-white placeholder:text-zinc-400"
              : "bg-zinc-200 text-black placeholder:text-zinc-600"
            }`}
        />
        {questionFeedback && (
          <p
            id="job-assistant-feedback"
            role="status"
            className={`mt-2 rounded-lg px-4 py-2 text-xs ${isDarkMode
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

  );
}
