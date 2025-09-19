"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Select from "@/components/Select";

type ProcessType = "메모" | "기각" | "퇴출";
interface Props {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function UserReportForm({ onSubmit }: Props) {
  const [processType, setProcessType] = useState<ProcessType>("메모");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectItems: {
    label: ProcessType;
    destructive?: boolean;
  }[] = [
    { label: "메모" },
    { label: "기각" },
    { label: "퇴출", destructive: true },
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
      console.error("신고 처리를 완료하지 못했습니다.", error);
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
