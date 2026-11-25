"use client";

import { useEffect, useState } from "react";

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


export default function PostedTime({ postedAt }: { postedAt: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const intervalId = window.setInterval(update, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);
  return <span className="mt-1 block text-xs text-zinc-500">{now === null ? "Posting time loading…" : formatPostedTime(postedAt, now)}</span>;
}
