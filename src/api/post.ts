import "server-only";
import { createClient } from "@/api/client";

interface Post {
  id: number;
  createdAt: string;
  images: string[];
  contents: string;
  user: {
    id: string;
    username: string;
    email: string;
    avatarUrl: string;
  };
  banned: boolean;
}

// id에 맞는 게시글 조회
export async function getPostById(id: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("post")
    .select(
      `
      id,
      createdAt,
      images,
      contents,
      banned,
      user:userId ( id, username, email, avatarUrl )
    `,
    )
    .eq("id", id)
    .single();

  return { data: data as unknown as Post };
}

interface UserPostOptions {
  page: number;
  pageSize: number;
}

// id에 맞는 유저의 게시글들 조회
export async function getUserPosts(
  id: string,
  { page, pageSize }: UserPostOptions,
) {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count } = await supabase
    .from("post")
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

// 게시글 제한
export async function banPost(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("post")
    .update({ banned: true })
    .eq("id", id);

  return error;
}
