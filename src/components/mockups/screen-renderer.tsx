"use client";

import type { ScreenKey } from "@/types/content";
import { DashboardScreen } from "./screens/dashboard";
import { CustomsBoardScreen, DocumentsScreen, EtaScreen, JobFileDetailScreen, JobFilesScreen, TransportScreen } from "./screens/operations";
import { BanksScreen, ExpensesScreen, InvoicesScreen, ReportDetailScreen, ReportsScreen, SoaScreen } from "./screens/accounts";
import { ActivityScreen, SettingsScreen, TeamScreen } from "./screens/workspace";

/**
 * Client-side renderer for the product tour. Loaded on demand (next/dynamic),
 * so the sixteen tour screens don't weigh down the initial page payload.
 */
export default function ScreenRenderer({ screen, variant }: { screen: ScreenKey; variant?: "finance" }) {
  switch (screen) {
    case "dashboard":
      return <DashboardScreen variant={variant === "finance" ? "finance" : "overview"} />;
    case "eta":
      return <EtaScreen />;
    case "job-files":
      return <JobFilesScreen />;
    case "job-file-detail":
      return <JobFileDetailScreen />;
    case "customs-board":
      return <CustomsBoardScreen />;
    case "documents":
      return <DocumentsScreen />;
    case "transport":
      return <TransportScreen />;
    case "expenses":
      return <ExpensesScreen />;
    case "invoices":
      return <InvoicesScreen />;
    case "soa":
      return <SoaScreen />;
    case "banks":
      return <BanksScreen />;
    case "reports":
      return <ReportsScreen />;
    case "report-detail":
      return <ReportDetailScreen />;
    case "team":
      return <TeamScreen />;
    case "settings":
      return <SettingsScreen />;
    case "activity":
      return <ActivityScreen />;
  }
}
