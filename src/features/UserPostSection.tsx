"use client";

import { useEffect, useState } from "react";
import { getUserPosts } from "@/api/post.client";
import StatePagination from "@/components/StatePagination";
import SubTitle from "@/components/SubTitle";
import { UserPostTable } from "@/features/table";

interface Props {
  userId: string;
  pageSize?: number;
}
interface PostRow {
  id: string;
  contents: string;
  createdAt: string;
  banned: boolean;
  reports: { count: number }[];
}

export default function UserPostSection({ userId, pageSize = 5 }: Props) {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [total, setTotal] = useState(-1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      try {
        const { data, total } = await getUserPosts(userId, { page, pageSize });

        if (cancelled) return;

        const mappedPosts = data.map((post) => ({
          ...post,
          id: String(post.id),
        }));

        setPosts(mappedPosts);
        setTotal(total);
      } catch (_err) {
        if (cancelled) return;

        setPosts([]);
        setTotal(0);
      }
    };

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, [userId, page, pageSize]);

  const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);

  return (
    <section className="min-w-0 flex-1">
      <div className="flex items-center gap-3">
        <SubTitle>작성한 게시글</SubTitle>
        {total > -1 && <span className="mb-1 text-primary-600">{total}</span>}
      </div>

      <div className="flex flex-col items-center gap-3">
        {total > 0 ? (
          <>
            <UserPostTable posts={posts ?? []} />
            <StatePagination
              total={totalPages}
              current={page}
              onPageChange={setPage}
            />
          </>
        ) : (
          <p className="mt-3 text-gray-300">작성한 게시글 없음</p>
        )}
      </div>
    </section>
  );
}
