"use server";

import { revalidatePath } from "next/cache";
import {
  addReportBanLog,
  addReportCheckLog,
  addReportIgnoreLog,
  addReportMemoLog,
  checkReports,
} from "@/api/report";
import { banUser } from "@/api/user";

interface Report {
  id: string;
  createdAt: string;
  reportType:
    | "Inappropriate"
    | "Conflict"
    | "Violence"
    | "Ads"
    | "Spam"
    | "Other";
  reportContent: string;
  user: {
    id: string;
    email: string;
  };
}
type ProcessType = "메모" | "기각" | "퇴출";

export async function updateReportAction(
  userId: string,
  reports: Report[],
  formData: FormData,
) {
  const processType = String(formData.get("processType") ?? "") as ProcessType;
  const memoField = formData.get("memo");
  const memoValue = typeof memoField === "string" ? memoField.trim() : "";

  // 신고 메모
  if (processType === "메모") {
    // 메모 로그 추가
    await addReportMemoLog({ userId, memo: memoValue });
  }

  // 신고 기각
  if (processType === "기각") {
    // 확인 로그 추가
    await addReportCheckLog({ userId, reports });

    // 기각 로그 추가
    await addReportIgnoreLog({ userId, memo: memoValue });

    // 신고 확인 처리
    await checkReports(reports);
  }

  // 유저 퇴출
  if (processType === "퇴출") {
    // 확인 로그 추가
    await addReportCheckLog({ userId, reports });

    // 제한 로그 추가
    await addReportBanLog({ userId, memo: memoValue });

    // 댓글 밴 처리
    await banUser(userId);

    // 신고 확인 처리
    await checkReports(reports);
  }

  revalidatePath(`/user-reports/${userId}`);
}
