"use server";

import { revalidatePath } from "next/cache";
import { banPost } from "@/api/post";
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
  postId: string,
  reports: Report[],
  formData: FormData,
) {
  const processType = String(formData.get("processType") ?? "") as ProcessType;
  const memoField = formData.get("memo");
  const memoValue = typeof memoField === "string" ? memoField.trim() : "";

  // 신고 메모
  if (processType === "메모") {
    // 메모 로그 추가
    await addReportMemoLog({ postId: Number(postId), memo: memoValue });
  }

  // 신고 기각
  if (processType === "기각") {
    // 확인 로그 추가
    await addReportCheckLog({
      postId: Number(postId),
      reports,
    });

    // 기각 로그 추가
    await addReportIgnoreLog({
      postId: Number(postId),
      memo: memoValue,
    });

    // 신고 확인 처리
    await checkReports(reports);
  }

  // 게시글 제한
  if (processType === "제한") {
    // 확인 로그 추가
    await addReportCheckLog({
      postId: Number(postId),
      reports,
    });

    // 제한 로그 추가
    await addReportBanLog({ postId: Number(postId), memo: memoValue });

    // 게시글 밴 처리
    await banPost(Number(postId));

    // 신고 확인 처리
    await checkReports(reports);
  }

  revalidatePath(`/content-reports/post/${postId}`);
}
