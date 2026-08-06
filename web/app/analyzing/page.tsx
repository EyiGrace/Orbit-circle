import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import styled, { keyframes } from "styled-components";
import rocket from "@/assets/rocket.png";
import { DashboardShell, Muted, dash } from "@/components/dashboard";

export const Route = createFileRoute("/analyzing")({
  head: () => ({
    meta: [
      { title: "Analyzing Your Answers — CareerMap" },
      {
        name: "description",
        content:
          "CareerMap is analyzing your quiz answers to build your personalized career matches.",
      },
      { property: "og:title", content: "Analyzing Your Answers — CareerMap" },
      {
        property: "og:description",
        content:
          "CareerMap is analyzing your quiz answers to build your personalized career matches.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnalyzingPage,
});

const BackButton = styled.button`
  width: 54px;
  height: 54px;
  border-radius: 14px;
  border: 1px solid ${dash.cardBorder};
  background: rgba(119, 59, 236, 0.14);
  color: ${dash.white};
  font-size: 22px;
  cursor: pointer;

  &:hover {
    background: rgba(119, 59, 236, 0.3);
  }
`;

const HeadingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 34px;
  font-weight: 700;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 70vh;
  gap: 8px;
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-18px); }
`;

const Rocket = styled.img`
  width: 420px;
  max-width: 70vw;
  height: auto;
  animation: ${float} 3s ease-in-out infinite;
`;

const Status = styled.h2`
  margin: 0;
  font-size: 30px;
  font-weight: 700;
`;

const BarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 28px;
`;

const Bar = styled.div`
  width: 380px;
  max-width: 60vw;
  height: 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  overflow: hidden;
`;

const Fill = styled.div<{ $p: number }>`
  height: 100%;
  width: ${(p) => p.$p}%;
  border-radius: 999px;
  background: ${dash.purple};
  transition: width 0.4s ease;
`;

const Percent = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

function AnalyzingPage() {
  const navigate = useNavigate();
  const [percent, setPercent] = useState(15);

  useEffect(() => {
    const id = setInterval(() => {
      setPercent((p) => (p >= 100 ? 100 : p + 5));
    }, 350);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (percent < 100) return;
    const id = setTimeout(() => navigate({ to: "/results" }), 700);
    return () => clearTimeout(id);
  }, [percent, navigate]);

  return (
    <DashboardShell
      heading={
        <HeadingRow>
          <BackButton
            aria-label="Go back"
            onClick={() => navigate({ to: "/quiz" })}
          >
            ‹
          </BackButton>
          <Title>Career Quiz</Title>
        </HeadingRow>
      }
    >
      <Center>
        <Rocket src={rocket} alt="" width={1024} height={1024} />
        <Status>Analyzing your answers...</Status>
        <Muted>This will take only a few seconds</Muted>
        <BarRow>
          <Bar>
            <Fill $p={percent} />
          </Bar>
          <Percent>{percent}%</Percent>
        </BarRow>
      </Center>
    </DashboardShell>
  );
}
