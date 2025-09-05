import { TbAlertCircleFilled } from "react-icons/tb";

export default function LoginFailAlert() {
  return (
    <div className="flex items-center gap-2 rounded-[10px] bg-red-100 p-5 text-red-700">
      <TbAlertCircleFilled className="text-lg" />
      <p className="font-semibold text-sm">관리자만 로그인할 수 있습니다.</p>
    </div>
  );
}
