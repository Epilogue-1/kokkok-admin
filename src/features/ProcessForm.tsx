import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";

export default function ProcessForm() {
  return (
    <form className="flex flex-col gap-3 rounded-xl border border-gray-300 p-3">
      {/* 처리 유형 선택 */}
      <Dropdown content="메모" />

      {/* 메모 입력란 */}
      <textarea
        className="h-[100px] resize-none rounded-lg border border-gray-300 px-4 py-3 placeholder:text-gray-400"
        placeholder="메모를 남겨주세요. (선택)"
      />

      {/* 처리 버튼 */}
      <div className="ml-auto">
        <Button type="submit">처리</Button>
      </div>
    </form>
  );
}
