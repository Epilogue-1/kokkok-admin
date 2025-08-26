interface Props {
  email: string;
  createdDate: string;
  reportCount: {
    user: number;
    post: number;
    comment: number;
  };
}

export default function UserInformation({
  email,
  createdDate,
  reportCount,
}: Props) {
  return (
    <table className="flex w-full flex-col border-gray-200 border-t text-sm">
      <tbody>
        {/* 사용자 이메일 */}
        <tr className="flex h-9 w-full border-gray-200 border-b">
          <th className="flex w-[100px] items-center bg-gray-100 px-3 text-left font-bold text-sm">
            이메일
          </th>
          <td className="flex grow items-center px-3 text-base">{email}</td>
        </tr>

        {/* 사용자 가입일 */}
        <tr className="flex h-9 w-full border-gray-200 border-b">
          <th className="flex w-[100px] items-center bg-gray-100 px-3 text-left font-bold text-sm">
            가입일
          </th>
          <td className="flex grow items-center px-3 text-base">
            {createdDate}
          </td>
        </tr>

        {/* 사용자가 신고당한 횟수 */}
        <tr className="flex h-9 w-full border-gray-200 border-b">
          <th className="flex w-[100px] items-center bg-gray-100 px-3 text-left font-bold text-sm">
            신고 수
          </th>
          <td className="flex grow items-center px-3 text-base">
            {`사용자 ${reportCount.user} / 게시글 ${reportCount.post} / 댓글 ${reportCount.comment}`}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
