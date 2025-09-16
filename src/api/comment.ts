import "server-only";
import { createClient } from "@/api/client";

interface Comment {
  id: number;
  user: {
    id: string;
    username: string;
    email: string;
    avatarUrl: string;
  };
  contents: string;
  createdAt: string;
  banned: boolean;
}

// id에 맞는 게시글 조회
export async function getCommentById(id: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("comment")
    .select(
      `
      id,
      createdAt,
      contents,
      banned,
      user:userId ( id, username, email, avatarUrl )
    `,
    )
    .eq("id", id)
    .single();

  return { data: data as unknown as Comment };
}

interface UserCommentOptions {
  page: number;
  pageSize: number;
}

// id에 맞는 유저의 댓글들 조회
export async function getUserComments(
  id: string,
  { page, pageSize }: UserCommentOptions,
) {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count } = await supabase
    .from("comment")
    .select(
      `
      id,
      userId,
      contents,
      createdAt,
      banned,
      reports:report(count)
    `,
      { count: "exact" },
    )
    .eq("userId", id)
    .order("createdAt", { ascending: false }) // 최신순
    .range(from, to); // 페이징

  return { data: data, total: count };
}
