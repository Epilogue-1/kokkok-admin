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
