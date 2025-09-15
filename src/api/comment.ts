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
