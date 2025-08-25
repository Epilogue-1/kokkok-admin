import Badge from "@/components/Badge";
import Header from "@/components/Header";
import SubTitle from "@/components/SubTitle";
import Title from "@/components/Title";
import InquiryCard from "@/features/InquiryCard";
import ProcessForm from "@/features/ProcessForm";
import TimelineMemo from "@/features/TimelineMemo";
import TimelineStatusChange from "@/features/TimelineStatusChange";

export default function InquiryDetail() {
  return (
    <>
      <Header currentNav="문의" />

      <main className="mx-auto w-full max-w-[1240px] px-5 pt-5 pb-[60px]">
        <div className="flex items-end justify-between">
          <Title>문의</Title>

          {/* 문의 상태 */}
          <Badge
            className="mb-5"
            variant="outline"
            size="large"
            content="진행중"
          />
        </div>

        <div className="flex flex-col gap-10">
          {/* 문의 내용 */}
          <InquiryCard
            type="기능제안"
            writer="이승헌 (heony704@gmail.com)"
            createdDate="2025년 1월 2일"
            content={`현재는 반드시 1:1 비율로 사진을 잘라서 올려야 했습니다.\n해당 방식은 긴 사진을 업로드 하기에 불편하여 수정이 필요합니다.\n그래서 자유형으로 사용자가 사진을 잘라서 올릴 수 있도록 수정하고 메인 페이지에서 사진을 contain으로 설정해 전체가 보이도록 하고 여백은 배경에 사진을 블러처리로 띄워서 빈 공간을 채우도록 합니다.`}
          />

          {/* 문의 이력 */}
          <section>
            <SubTitle>문의 이력</SubTitle>

            <div className="flex flex-col gap-5">
              <TimelineMemo
                author="유예하"
                createdDate="2025년 1월 20일"
                memo="2025/01/20 회의 결과, 진행하기로 결정"
              />
              <TimelineStatusChange
                author="정민재"
                createdDate="2025년 2월 2일"
                to="진행중"
              />
              <TimelineMemo
                author="정민재"
                createdDate="2025년 2월 2일"
                memo={`깃허브 이슈: https://github.com/Epilogue-1/kokkok/issues/176`}
              />
              <TimelineStatusChange
                author="장준혁"
                createdDate="2025년 5월 24일"
                from="진행중"
                to="완료"
                isLastTimeline
              />
            </div>
          </section>

          {/* 문의 처리 */}
          <section>
            <SubTitle>문의 처리</SubTitle>

            <ProcessForm />
          </section>
        </div>
      </main>
    </>
  );
}
