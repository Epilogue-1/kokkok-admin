import { getCommentById } from "@/api/comment";
import { getReportById, getReportLogsById } from "@/api/report";
import Badge from "@/components/Badge";
import Header from "@/components/Header";
import Main from "@/components/Main";
import SubTitle from "@/components/SubTitle";
import Title from "@/components/Title";
import CommentCard from "@/features/CommentCard";
import ProcessForm from "@/features/ProcessForm";
import { ReportTimeline } from "@/features/timeline";
import { formatToKoreanDate } from "@/utils/formatDate";

export default async function CommentReportDetail(
  props: PageProps<"/content-reports/comment/[commentId]">,
) {
  const { commentId } = await props.params;
  const { data: comment } = await getCommentById(commentId);
  const { data: reports } = await getReportById({
    commentId: Number(commentId),
  });
  const { data: reportLogs } = await getReportLogsById({
    commentId: Number(commentId),
  });

  return (
    <>
      <Header currentNav="게시글/댓글 신고" />

      <Main>
        <div className="flex items-center justify-between">
          <Title>댓글 신고</Title>

          {/* 제한된 댓글이라면 표시 */}
          {comment.banned && (
            <Badge className="mb-2" variant="destructive" content="제한됨" />
          )}
        </div>

        <div className="flex flex-col gap-6">
          {/* 댓글 내용 */}
          <CommentCard
            writerAvatar={comment.user.avatarUrl}
            writerName={`${comment.user.username} (${comment.user.email})`}
            createdDate={formatToKoreanDate(comment.createdAt)}
            content={comment.contents}
          />

          {/* 신고 이력 */}
          <section>
            <SubTitle>신고 이력</SubTitle>
            <ReportTimeline reportLogs={reportLogs} newReports={reports} />
          </section>

          {/* 신고 처리 */}
          <section>
            <SubTitle>신고 처리</SubTitle>

            <ProcessForm />
          </section>
        </div>
      </Main>
    </>
  );
}
