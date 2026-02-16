import { getReportById, getReportLogsById } from "@/api/report.server";
import { getUserById, getUserReportsCount } from "@/api/user.server";
import Badge from "@/components/Badge";
import Header from "@/components/Header";
import Main from "@/components/Main";
import SubTitle from "@/components/SubTitle";
import Title from "@/components/Title";
import ProfileCard from "@/features/ProfileCard";
import { UserReportTimeline } from "@/features/timeline";
import UserCommentSection from "@/features/UserCommentSection";
import UserInformation from "@/features/UserInformation";
import UserPostSection from "@/features/UserPostSection";
import UserReportForm from "@/features/UserReportForm";
import { formatToKoreanDate } from "@/utils/formatDate";
import { updateReportAction } from "./action";

export default async function UserReportDetail(
  props: PageProps<"/user-reports/[userId]">,
) {
  const { userId } = await props.params;

  const { data: user } = await getUserById(userId);
  const report = await getUserReportsCount(userId);
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
            {/* 사용자가 작성한 게시글들 */}
            <UserPostSection userId={userId} />

            {/* 사용자가 작성한 댓글들 */}
            <UserCommentSection userId={userId} />
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
