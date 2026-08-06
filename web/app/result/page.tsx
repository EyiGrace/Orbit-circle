import { useRouter } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import {
  DashboardShell,
  Card,
  Accent,
  Muted,
  dash,
} from "@/components/dashboard";



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

const Intro = styled.div`
  margin: 36px 0 10px;
`;

const Hi = styled.p`
  margin: 0 0 8px;
  font-size: 22px;
`;

const Big = styled.h2`
  margin: 0 0 8px;
  font-size: 30px;
  font-weight: 700;
`;

const Stage = styled.div`
  position: relative;
  margin: 24px auto 0;
  width: min(760px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Backdrop = styled(Image)`
  position: absolute;
  width: 620px;
  max-width: 100%;
  opacity: 0.35;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  border-radius: 50%;
`;

const Stack = styled.div`
  position: relative;
  z-index: 1;
  width: min(480px, 100%);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TopCard = styled(Card)`
  backdrop-filter: blur(6px);
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`;

const TopName = styled.h3`
  margin: 0;
  font-size: 30px;
  font-weight: 700;
`;

const Badge = styled.span`
  padding: 10px 18px;
  border-radius: 12px;
  background: #4a90e2;
  font-size: 17px;
  font-weight: 700;
`;

const Row = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  backdrop-filter: blur(6px);
`;

const RowName = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

const SmallBadge = styled(Badge)`
  font-size: 15px;
  padding: 8px 14px;
`;

const Cta = styled.button`
  margin-top: 34px;
  width: min(480px, 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px;
  border: none;
  border-radius: 14px;
  background: ${dash.purple};
  color: ${dash.white};
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  z-index: 1;

  &:hover {
    filter: brightness(1.1);
  }
`;

const Retake = styled.button`
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  color: ${dash.white};
  font-family: inherit;
  font-size: 19px;
  cursor: pointer;
  position: relative;
  z-index: 1;
`;

const MATCHES = [
  { name: "Data Analyst", match: "88% match" },
  { name: "Counselor", match: "80% match" },
];

function ResultsPage() {
  const router = useRouter();

  return (
    <DashboardShell
      heading={
        <HeadingRow>
            <BackButton aria-label="Go back" onClick={() => router.push("/quiz")}>
            ‹
          </BackButton>
          <Title>Your Results</Title>
        </HeadingRow>
      }
    >
      <Intro>
        <Hi>Great job, David!</Hi>
        <Big>
          Here are your top <Accent>career matches</Accent>
        </Big>
        <Muted>Based on your personality, interests and quiz results</Muted>
      </Intro>

      <Stage>
        <Backdrop src="/image/results-orb.jpg" alt="" loading="lazy" width={1024} height={1024} />
        <Stack>
          <TopCard>
            <TopRow>
              <TopName>Law</TopName>
              <Badge>92% Match</Badge>
            </TopRow>
            <Muted style={{ marginTop: 18 }}>
              You enjoy analyzing information, solving complex problems,
              communicating clearly and standing up for what is right.
            </Muted>
          </TopCard>

          {MATCHES.map((m) => (
            <Row key={m.name}>
              <RowName>{m.name}</RowName>
              <SmallBadge>{m.match}</SmallBadge>
            </Row>
          ))}
        </Stack>

        <Cta onClick={() => router.push("/career-details")}>
          Explore My Matches →
        </Cta>
        <Retake onClick={() => router.push("/quiz")}>
          ↺ Retake Quiz
        </Retake>
      </Stage>
    </DashboardShell>
  );
}

export default ResultsPage;