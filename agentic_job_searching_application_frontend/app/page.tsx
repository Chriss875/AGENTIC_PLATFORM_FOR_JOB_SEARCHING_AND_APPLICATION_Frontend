import { Suspense } from "react";
import { cookies } from "next/headers";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import JobsWorkspace from "@/components/jobs/jobs-workspace";
import { demoJobs } from "@/lib/demo-jobs";

async function DashboardWithPreferences() {
  const cookieStore = await cookies();

  const initialCollapsed =
    cookieStore.get("sidebar-collapsed")?.value === "true";

  return (
    <DashboardShell initialCollapsed={initialCollapsed}>
      <JobsWorkspace initialJobs={demoJobs} />
    </DashboardShell>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div
          role="status"
          className="flex min-h-screen items-center justify-center"
        >
          Loading dashboard…
        </div>
      }
    >
      <DashboardWithPreferences />
    </Suspense>
  );
}
