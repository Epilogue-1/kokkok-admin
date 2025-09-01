"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Select from "@/components/Select";

type ProcessType = "메모" | "기각" | "제한";

export default function ProcessForm() {
  const [processType, setProcessType] = useState<ProcessType>("메모");

  const selectItems: {
    label: ProcessType;
    destructive?: boolean;
  }[] = [
    { label: "메모" },
    { label: "기각" },
    { label: "제한", destructive: true },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(processType);
  };

  return (
    <form
      className="flex flex-col gap-2 rounded-xl border border-gray-300 p-2"
      onSubmit={(event) => handleSubmit(event)}
    >
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
      />

      {/* 처리 버튼 */}
      <div className="ml-auto">
        <Button type="submit">처리</Button>
      </div>
    </form>
  );
}
