import { getPostById } from "@/api/post";
import { getReportById, getReportLogsById } from "@/api/report";
import Badge from "@/components/Badge";
import Header from "@/components/Header";
import Main from "@/components/Main";
import SubTitle from "@/components/SubTitle";
import Title from "@/components/Title";
import PostCard from "@/features/PostCard";
import ProcessForm from "@/features/ProcessForm";
import { ReportTimeline } from "@/features/timeline";
import { formatToKoreanDate } from "@/utils/formatDate";

export default async function PostReportDetail(
  props: PageProps<"/content-reports/post/[postId]">,
) {
  const { postId } = await props.params;
  const { data: post } = await getPostById(postId);
  const { data: reports } = await getReportById({ postId: Number(postId) });
  const { data: reportLogs } = await getReportLogsById({
    postId: Number(postId),
  });

  return (
    <>
      <Header currentNav="게시글/댓글 신고" />

      <Main>
        <div className="flex items-center justify-between">
          <Title>게시글 신고 </Title>

          {/* 제한된 게시글이라면 표시 */}
          {post.banned && (
            <Badge className="mb-2" variant="destructive" content="제한됨" />
          )}
        </div>

        <div className="flex flex-col gap-6">
          {/* 게시글 내용 */}
          <PostCard
            writerAvatar={post.user.avatarUrl}
            writerName={`${post.user.username} (${post.user.email})`}
            createdDate={formatToKoreanDate(post.createdAt)}
            images={post.images}
            content={post.contents}
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
