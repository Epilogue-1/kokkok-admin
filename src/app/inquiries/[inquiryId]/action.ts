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
type MainProcessType = "메모" | "상태변경";
type SubProcessType = keyof typeof statusMap;

export async function addInquiryLogAction(
  inquiryId: string,
  inquiryStatus: StatusValue,
  formData: FormData,
) {
  const mainProcessType = String(
    formData.get("mainProcessType") ?? "",
  ) as MainProcessType;
  const subProcessType = String(
    formData.get("subProcessType") ?? "",
  ) as SubProcessType;

  const memoField = formData.get("memo");
  const memoValue = typeof memoField === "string" ? memoField.trim() : "";

  // 문의 메모
  if (mainProcessType === "메모") {
    await addInquiryMemoLog(inquiryId, memoValue);
  }

  // 문의 상태 변경
  if (mainProcessType === "상태변경") {
    const prevStatus = inquiryStatus;
    const nextStatus = statusMap[subProcessType];

    await updateInquiryStatus(inquiryId, nextStatus);
    await addInquiryStatusChangeLog(inquiryId, {
      prevStatus,
      nextStatus,
      memo: memoValue,
    });
  }

  revalidatePath(`/inquiries/${inquiryId}`);
}
