"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Select from "@/components/Select";

type MainProcessType = "메모" | "상태변경";
type SubProcessType = "-" | "무시" | "진행중" | "완료";
interface Props {
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function InquiryForm({ onSubmit }: Props) {
  const [mainProcessType, setMainProcessType] =
    useState<MainProcessType>("메모");
  const [subProcessType, setSubProcessType] = useState<SubProcessType>("-");
  const [memo, setMemo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mainSelectItems: {
    label: MainProcessType;
    destructive?: boolean;
  }[] = [{ label: "메모" }, { label: "상태변경" }];
  const subSelectItems: {
    label: SubProcessType;
    destructive?: boolean;
  }[] = [
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

      // 폼 초기화
      form.reset();
      setMainProcessType("메모");
      setSubProcessType("-");
      setMemo("");
    } catch (error) {
      console.error("문의 처리를 완료하지 못했습니다.", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    isSubmitting || // 제출중이거나
    (mainProcessType === "메모" && memo.trim().length === 0); // 메모 처리인데 메모 value가 없거나

  return (
    <form
      className="flex flex-col gap-2 rounded-xl border border-gray-300 p-2"
      onSubmit={(event) => handleSubmit(event)}
    >
      {/* 처리 유형 선택 */}
      <div className="flex gap-2">
        {/* 대분류 Select */}
        <input type="hidden" name="mainProcessType" value={mainProcessType} />
        <Select
          items={mainSelectItems}
          value={mainProcessType}
          setValue={
            setMainProcessType as React.Dispatch<React.SetStateAction<string>>
          }
        />

        {/* 소분류 Select */}
        <input type="hidden" name="subProcessType" value={subProcessType} />
        {mainProcessType === "상태변경" && (
          <Select
            items={subSelectItems}
            value={subProcessType}
            setValue={
              setSubProcessType as React.Dispatch<React.SetStateAction<string>>
            }
          />
        )}
      </div>

      {/* 메모 입력란 */}
      <textarea
        className="h-[100px] resize-none rounded-lg border border-gray-300 px-3 py-2 placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        // 메모 처리일 때는 메모 value가 필수
        placeholder={
          mainProcessType === "메모"
            ? "메모를 남겨주세요."
            : "메모를 남겨주세요. (선택)"
        }
        name="memo"
        value={memo}
        onChange={(event) => setMemo(event.target.value)}
      />

      {/* 처리 버튼 */}
      <div className="ml-auto">
        <Button type="submit" disabled={isSubmitDisabled}>
          처리
        </Button>
      </div>
    </form>
  );
}
