import Header from "@/components/Header";
import Main from "@/components/Main";
import Title from "@/components/Title";

export default function Home() {
  return (
    <>
      <Header />
      <Main>
        <Title>콕콕 어드민에 오신 걸 환영합니다</Title>

        <p>
          이곳은 대시보드로 사용하거나, 사용안하고 바로 사용자 신고로 이동할
          예정입니다.
        </p>
        <p>만약 대시보드 만든다면, 현재 확인해야 하는 신고/문의 띄워줄듯</p>
      </Main>
    </>
  );
}
