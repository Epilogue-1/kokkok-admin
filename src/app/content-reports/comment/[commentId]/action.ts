"use server";

import { revalidatePath } from "next/cache";
import { banComment } from "@/api/comment";
import {
  addReportBanLog,
  addReportCheckLog,
  addReportIgnoreLog,
  addReportMemoLog,
  checkReports,
} from "@/api/report";

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
type ProcessType = "메모" | "기각" | "제한";

export async function updateReportAction(
  commentId: string,
  reports: Report[],
  formData: FormData,
) {
  const processType = String(formData.get("processType") ?? "") as ProcessType;
  const memoField = formData.get("memo");
  const memoValue = typeof memoField === "string" ? memoField.trim() : "";

  // 신고 메모
  if (processType === "메모") {
    // 메모 로그 추가
    await addReportMemoLog({ commentId: Number(commentId), memo: memoValue });
  }

  // 신고 기각
  if (processType === "기각") {
    // 확인 로그 추가
    await addReportCheckLog({
      commentId: Number(commentId),
      reports,
    });

    // 기각 로그 추가
    await addReportIgnoreLog({
      commentId: Number(commentId),
      memo: memoValue,
    });

    // 신고 확인 처리
    await checkReports(reports);
  }

  // 게시글 제한
  if (processType === "제한") {
    // 확인 로그 추가
    await addReportCheckLog({
      commentId: Number(commentId),
      reports,
    });

    // 제한 로그 추가
    await addReportBanLog({ commentId: Number(commentId), memo: memoValue });

    // 댓글 밴 처리
    await banComment(Number(commentId));

    // 신고 확인 처리
    await checkReports(reports);
  }

  revalidatePath(`/content-reports/comment/${commentId}`);
}
