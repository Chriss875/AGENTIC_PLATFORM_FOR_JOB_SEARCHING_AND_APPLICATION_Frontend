"use client";

import { createContext, useContext } from "react";

// Shared by the shell and its client features, including server-composed children.
export const DashboardThemeContext = createContext(false);

export function useDashboardTheme() {
  return useContext(DashboardThemeContext);
}
