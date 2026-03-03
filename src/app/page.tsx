import { getDashboardSummary } from "@/api/dashboard.server";
import Header from "@/components/Header";
import Main from "@/components/Main";
import SubTitle from "@/components/SubTitle";
import StatusSummaryCard from "@/features/StatusSummaryCard";

export default async function Home() {
  const { data: summary } = await getDashboardSummary();
  const { reports, inquiries } = summary;

  return (
    <>
      <Header />

      <Main>
        {/* 신고/문의 처리 현황 */}
        <section className="flex flex-col">
          <SubTitle>처리 현황</SubTitle>

          <div className="flex flex-col gap-2 md:flex-row md:gap-10">
            <StatusSummaryCard
              href={"/user-reports?status=pending"}
              content="사용자 신고"
              isTodayUpdated={reports.user.hasToday}
              count={reports.user.pendingCount}
            />
            <StatusSummaryCard
              href={"/content-reports?status=pending"}
              content="게시글/댓글 신고"
              isTodayUpdated={reports.content.hasToday}
              count={reports.content.pendingCount}
            />
            <StatusSummaryCard
              href={"/inquiries?status=pending"}
              content="문의"
              isTodayUpdated={inquiries.hasToday}
              count={inquiries.pendingCount}
            />
          </div>
        </section>
      </Main>
    </>
  );
}
