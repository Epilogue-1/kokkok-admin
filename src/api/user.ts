import "server-only";
import { createClient } from "@/api/client";

interface User {
  id: string;
  updatedAt: string;
  username: string;
  avatarUrl: string;
  description: string;
  createdAt: string;
  email: string;
  isOAuth: boolean;
  notificationCheckedAt: string;
  backgroundUrl: string;
  banned: boolean;
}
interface UserReport {
  user: number;
  post: number;
  comment: number;
}

// id에 맞는 유저 정보 조회
export async function getUserById(id: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("user")
    .select("*")
    .eq("id", id)
    .single();

  return { data: data as unknown as User };
}

// id에 맞는 유저가 신고당한 횟수 조회
export async function getUserReportsCount(id: string) {
  const supabase = await createClient();

  // 사용자 신고 조회
  const userCountPromise = supabase
    .from("report")
    .select("id", { count: "exact", head: true })
    .eq("reportedId", id)
    .is("postId", null)
    .is("commentId", null);

  // 게시글 신고 조회
  const postCountPromise = supabase
    .from("report")
    .select("id", { count: "exact", head: true })
    .eq("reportedId", id)
    .not("postId", "is", null)
    .is("commentId", null);

  // 댓글 신고 조회
  const commentCountPromise = supabase
    .from("report")
    .select("id", { count: "exact", head: true })
    .eq("reportedId", id)
    .is("postId", null)
    .not("commentId", "is", null);

  const [userRes, postRes, commentRes] = await Promise.all([
    userCountPromise,
    postCountPromise,
    commentCountPromise,
  ]);

  return {
    user: userRes.count,
    post: postRes.count,
    comment: commentRes.count,
  } as UserReport;
}

// 유저 퇴출
export async function banUser(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("user")
    .update({ banned: true })
    .eq("id", id);

  if (error) {
    throw error;
  }
}
