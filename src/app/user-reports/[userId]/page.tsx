import { getUserComments } from "@/api/comment";
import { getUserPosts } from "@/api/post";
import { getReportById, getReportLogsById } from "@/api/report";
import { getUserById, getUserReportsCount } from "@/api/user";
import Badge from "@/components/Badge";
import Header from "@/components/Header";
import Main from "@/components/Main";
import SubTitle from "@/components/SubTitle";
import Title from "@/components/Title";
import ProfileCard from "@/features/ProfileCard";
import { UserCommentTable, UserPostTable } from "@/features/table";
import { UserReportTimeline } from "@/features/timeline";
import UserInformation from "@/features/UserInformation";
import UserReportForm from "@/features/UserReportForm";
import { formatToKoreanDate } from "@/utils/formatDate";
import { updateReportAction } from "./action";

const COMMENT_PAGE_SIZE = 5;
const POST_PAGE_SIZE = 5;

export default async function UserReportDetail(
  props: PageProps<"/user-reports/[userId]">,
) {
  const { userId } = await props.params;

  const { data: user } = await getUserById(userId);
  const report = await getUserReportsCount(userId);
  const { data: comments, total: commentCount } = await getUserComments(
    userId,
    { page: 1, pageSize: COMMENT_PAGE_SIZE },
  );
  const { data: posts, total: postCount } = await getUserPosts(userId, {
    page: 1,
    pageSize: POST_PAGE_SIZE,
  });
  const { data: reports } = await getReportById({ userId: userId });
  const { data: reportLogs } = await getReportLogsById({
    userId: userId,
  });

  return (
    <>
      <Header currentNav="사용자 신고" />

      <Main>
        <div className="flex items-center justify-between">
          <Title>사용자 신고</Title>

          {/* 퇴출된 사용자라면 표시 */}
          {user.banned && (
            <Badge className="mb-2" variant="destructive" content="퇴출됨" />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex w-full gap-8">
            {/* 사용자 프로필 */}
            <section className="flex-1">
              <SubTitle>프로필</SubTitle>

              <ProfileCard
                avatar={user.avatarUrl}
                background={user.backgroundUrl}
                name={user.username}
                introduction={user.description}
              />
            </section>

            {/* 사용자 정보 */}
            <section className="flex-1">
              <SubTitle>정보</SubTitle>

              <UserInformation
                email={user.email}
                createdDate={formatToKoreanDate(user.createdAt)}
                reportCount={{
                  user: report.user,
                  post: report.post,
                  comment: report.comment,
                }}
              />
            </section>
          </div>

          <div className="flex w-full gap-8">
            {/* 사용자가 작성한 게시글 목록 */}
            <section className="flex-1">
              <div className="flex items-center gap-3">
                <SubTitle>작성한 게시글</SubTitle>
                <span className="mb-1 text-primary-600">{postCount}</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <UserPostTable posts={posts ?? []} />
              </div>
            </section>

            {/* 사용자가 작성한 댓글 목록 */}
            <section className="flex-1">
              <div className="flex items-center gap-3">
                <SubTitle>작성한 댓글</SubTitle>
                <span className="mb-1 text-primary-600">{commentCount}</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <UserCommentTable comments={comments ?? []} />
              </div>
            </section>
          </div>

          {/* 신고 이력 */}
          <section>
            <SubTitle>신고 이력</SubTitle>
            <UserReportTimeline reportLogs={reportLogs} newReports={reports} />
          </section>

          {/* 신고 처리 */}
          <section>
            <SubTitle>신고 처리</SubTitle>
            <UserReportForm
              onSubmit={updateReportAction.bind(null, userId, reports)}
            />
          </section>
        </div>
      </Main>
    </>
  );
}
