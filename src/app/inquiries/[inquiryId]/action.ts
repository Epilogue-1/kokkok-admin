"use server";

import { revalidatePath } from "next/cache";
import {
  addInquiryMemoLog,
  addInquiryStatusChangeLog,
  updateInquiryStatus,
} from "@/api/inquiry";

const statusMap = {
  "-": "pending",
  무시: "ignored",
  진행중: "processing",
  완료: "resolved",
} as const;
type StatusValue = (typeof statusMap)[keyof typeof statusMap];
type ProcessType = keyof typeof statusMap | "메모";

export async function addInquiryLogAction(
  inquiryId: string,
  inquiryStatus: StatusValue,
  formData: FormData,
) {
  const processType = String(formData.get("processType") ?? "") as ProcessType;
  const memoField = formData.get("memo");
  const memoValue = typeof memoField === "string" ? memoField.trim() : "";

  // 문의 메모
  if (processType === "메모") {
    await addInquiryMemoLog(inquiryId, memoValue);
  }

  // 문의 상태 변경
  if (processType !== "메모") {
    const prevStatus = inquiryStatus;
    const nextStatus = statusMap[processType];

    await updateInquiryStatus(inquiryId, nextStatus);
    await addInquiryStatusChangeLog(inquiryId, {
      prevStatus,
      nextStatus,
      memo: memoValue,
    });
  }

  revalidatePath(`/inquiries/${inquiryId}`);
}
