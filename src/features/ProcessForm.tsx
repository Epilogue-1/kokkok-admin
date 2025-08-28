import Button from "@/components/Button";
import SortDropdown from "@/components/SortDropdown";

export default function ProcessForm() {
  return (
    <form className="flex flex-col gap-3 rounded-xl border border-gray-300 p-3">
      {/* 처리 유형 선택 */}
      {/* TODO: 임시! select로 바꿀 것 */}
      <SortDropdown
        items={[
          { label: "메모", value: "memo" },
          { label: "기각", value: "dismiss" },
          { label: "제한", value: "restricted" },
        ]}
      />

      {/* 메모 입력란 */}
      <textarea
        className="h-[100px] resize-none rounded-lg border border-gray-300 px-4 py-3 placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        placeholder="메모를 남겨주세요. (선택)"
      />

      {/* 처리 버튼 */}
      <div className="ml-auto">
        <Button type="submit">처리</Button>
      </div>
    </form>
  );
}
