"use client";

import { useEffect, useState } from "react";
import { getUserComments } from "@/api/comment.client";
import StatePagination from "@/components/StatePagination";
import SubTitle from "@/components/SubTitle";
import { UserCommentTable } from "@/features/table";

interface Props {
  userId: string;
  pageSize?: number;
}
interface CommentRow {
  id: string;
  contents: string;
  createdAt: string;
  banned: boolean;
  reports: { count: number }[];
}

export default function UserCommentSection({ userId, pageSize = 5 }: Props) {
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [total, setTotal] = useState(-1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function loadComments() {
      try {
        const { data, total } = await getUserComments(userId, {
          page,
          pageSize,
        });

        if (cancelled) return;

        const mappedComments = data.map((comment) => ({
          ...comment,
          id: String(comment.id),
        }));

        setComments(mappedComments);
        setTotal(total);
      } catch (_err) {
        if (cancelled) return;

        setComments([]);
        setTotal(0);
      }
    }

    void loadComments();

    return () => {
      cancelled = true;
    };
  }, [userId, page, pageSize]);

  const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);

  return (
    <section className="min-w-0 flex-1">
      <div className="flex items-center gap-3">
        <SubTitle>작성한 댓글</SubTitle>
        {total > -1 && <span className="mb-1 text-primary-600">{total}</span>}
      </div>

      <div className="flex flex-col items-center gap-3">
        {total > 0 ? (
          <>
            <UserCommentTable comments={comments ?? []} />
            <StatePagination
              total={totalPages}
              current={page}
              onPageChange={setPage}
            />
          </>
        ) : (
          <p className="mt-3 text-gray-300">작성한 댓글 없음</p>
        )}
      </div>
    </section>
  );
}
