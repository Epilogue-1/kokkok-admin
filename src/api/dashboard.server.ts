import "server-only";
import { createClient } from "@/api/client";

export async function getDashboardSummary() {
  const supabase = await createClient();

  const { data } = await supabase.rpc("get_dashboard_summary");

  return { data };
}
