import Button from "@/components/Button";
import Input from "@/components/Input";

interface Props extends React.ComponentPropsWithoutRef<"form"> {}

export default function LoginForm({ ...props }: Props) {
  return (
    <form className="flex flex-col" {...props}>
      {/* 이메일 입력창 */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-sm" htmlFor="email">
          이메일
        </label>
        <Input id="email" name="email" placeholder="아이디를 입력해주세요" />
      </div>

      {/* 비밀번호 입력창 */}
      <div className="mt-4 flex flex-col gap-1">
        <label className="font-semibold text-sm" htmlFor="password">
          비밀번호
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
      </div>

      {/* 로그인 버튼 */}
      <div className="mt-8">
        <Button size="large" type="submit">
          로그인
        </Button>
      </div>
    </form>
  );
}
