import type { getUserPosts as getUserPostsServer } from "@/api/post";

type GetUserPostsResult = Awaited<ReturnType<typeof getUserPostsServer>>;
interface UserPostOptions {
  page: number;
  pageSize: number;
}

// id에 맞는 유저의 게시글들 조회
export async function getUserPosts(
  id: string,
  { page, pageSize }: UserPostOptions,
) {
  const params = new URLSearchParams({
    userId: id,
    page: String(page),
    pageSize: String(pageSize),
  });

  const res = await fetch(`/api/user-reports/posts?${params.toString()}`);

  if (!res.ok) {
    throw new Error("게시글 목록을 불러오는데 실패했습니다.");
  }

  const { data, total } = (await res.json()) as GetUserPostsResult;

  return { data: data ?? [], total: total ?? 0 };
}
