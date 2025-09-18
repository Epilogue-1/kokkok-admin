"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Select from "@/components/Select";

type ProcessType = "메모" | "-" | "무시" | "진행중" | "완료";
interface Props {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function InquiryForm({ onSubmit }: Props) {
  const [processType, setProcessType] = useState<ProcessType>("메모");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectItems: {
    label: ProcessType;
    destructive?: boolean;
  }[] = [
    { label: "메모" },
    { label: "-" },
    { label: "무시" },
    { label: "진행중" },
    { label: "완료" },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      form.reset();
      setProcessType("메모");
    } catch (error) {
      console.error("문의 처리를 완료하지 못했습니다.", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-2 rounded-xl border border-gray-300 p-2"
      onSubmit={(event) => handleSubmit(event)}
    >
      <input type="hidden" name="processType" value={processType} />
      {/* 처리 유형 선택 */}
      <Select
        items={selectItems}
        value={processType}
        setValue={
          setProcessType as React.Dispatch<React.SetStateAction<string>>
        }
      />

      {/* 메모 입력란 */}
      <textarea
        className="h-[100px] resize-none rounded-lg border border-gray-300 px-3 py-2 placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        placeholder="메모를 남겨주세요. (선택)"
        name="memo"
      />

      {/* 처리 버튼 */}
      <div className="ml-auto">
        <Button type="submit" disabled={isSubmitting}>
          처리
        </Button>
      </div>
    </form>
  );
}
