import type { getUserComments as getUserCommentsServer } from "@/api/comment.server";

type GetUserCommentsResult = Awaited<ReturnType<typeof getUserCommentsServer>>;
interface UserCommentOptions {
  page: number;
  pageSize: number;
}

// id에 맞는 유저의 댓글들 조회
export async function getUserComments(
  id: string,
  { page, pageSize }: UserCommentOptions,
) {
  const params = new URLSearchParams({
    userId: id,
    page: String(page),
    pageSize: String(pageSize),
  });

  const res = await fetch(`/api/user-reports/comments?${params.toString()}`);

  if (!res.ok) {
    throw new Error("댓글 목록을 불러오는데 실패했습니다.");
  }

  const { data, total } = (await res.json()) as GetUserCommentsResult;

  return { data: data ?? [], total: total ?? 0 };
}
