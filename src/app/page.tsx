import Header from "@/components/Header";
import Main from "@/components/Main";
import SubTitle from "@/components/SubTitle";
import StatusSummaryCard from "@/features/StatusSummaryCard";

export default function Home() {
  return (
    <>
      <Header />

      <Main>
        {/* 신고/문의 처리 현황 */}
        <section className="flex flex-col">
          <SubTitle>처리 현황</SubTitle>

          <div className="flex flex-col gap-2 md:flex-row md:gap-10">
            <StatusSummaryCard content="신고 미처리" count={3} />
            <StatusSummaryCard
              content="문의 미처리"
              isTodayUpdated
              count={24}
            />
            <StatusSummaryCard content="문의 진행중" count={7} color="blue" />
          </div>
        </section>
      </Main>
    </>
  );
}
