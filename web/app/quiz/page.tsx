'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import {
  DashboardShell,
  Card,
  Accent,
  Muted,
  BellIcon,
  dash,
} from "@/components/dashboard";


const HeadingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const HeadIcon = styled.span`
  width: 72px;
  height: 72px;
  flex: none;
  border-radius: 50%;
  background: rgba(119, 59, 236, 0.18);
  border: 1px solid ${dash.cardBorder};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 34px;
  font-weight: 700;
`;

const ExitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 26px;
  border-radius: 14px;
  border: 1px solid ${dash.cardBorder};
  background: rgba(119, 59, 236, 0.14);
  color: ${dash.white};
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(119, 59, 236, 0.3);
  }
`;

const TopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 400px;
  gap: 28px;
  margin-top: 34px;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const QuizCard = styled(Card)`
  padding: 32px 36px 28px;
  min-height: 640px;
  display: flex;
  flex-direction: column;
`;

const Step = styled.p`
  margin: 0 0 14px;
  color: ${dash.purple};
  font-size: 20px;
  font-weight: 600;
`;

const Bar = styled.div`
  height: 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
`;

const Fill = styled.div<{ $p: number }>`
  height: 100%;
  width: ${(p) => p.$p}%;
  border-radius: 999px;
  background: ${dash.purple};
  transition: width 0.25s ease;
`;

const Question = styled.h2`
  margin: 32px 0 0;
  font-size: 30px;
  font-weight: 700;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 56px auto;
  width: 100%;
  max-width: 480px;
`;

const Option = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  width: 100%;
  text-align: left;
  padding: 18px 22px;
  border-radius: 14px;
  background: rgba(119, 59, 236, 0.12);
  border: 1px solid
    ${(p) => (p.$selected ? dash.purple : "rgba(119,59,236,0.25)")};
  color: ${dash.white};
  font-family: inherit;
  font-size: 17px;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background 0.15s ease;

  &:hover {
    background: rgba(119, 59, 236, 0.22);
  }
`;

const Radio = styled.span<{ $selected: boolean }>`
  width: 24px;
  height: 24px;
  flex: none;
  border-radius: 50%;
  border: 2px solid
    ${(p) => (p.$selected ? dash.white : "rgba(185,179,214,0.7)")};
  background: ${(p) => (p.$selected ? dash.white : "transparent")};
  box-shadow: ${(p) => (p.$selected ? `0 0 0 3px ${dash.purple}` : "none")};
`;

const Footer = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GhostButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 26px;
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: ${dash.white};
  font-family: inherit;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const NextButton = styled(GhostButton)`
  background: ${dash.purple};
`;

const SideCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const SideTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const RingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  margin: 22px 0 18px;
`;

const Count = styled.p`
  margin: 0;
  font-size: 40px;
  font-weight: 700;

  span {
    font-size: 26px;
    color: ${dash.muted};
  }
`;

const WhyTitle = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 700;
`;

const NoteCard = styled(Card)`
  text-align: center;
`;

const NoteImg = styled(Image)`
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 12px;
`;

function Ring({ percent }: { percent: number }) {
  const r = 32;
  const c = 2 * Math.PI * r;
  return (
    <svg width="86" height="86" viewBox="0 0 86 86" aria-hidden>
      <circle
        cx="43"
        cy="43"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="6"
      />
      <circle
        cx="43"
        cy="43"
        r={r}
        fill="none"
        stroke={dash.purple}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${(percent / 100) * c} ${c}`}
        transform="rotate(-90 43 43)"
      />
      <text
        x="43"
        y="48"
        textAnchor="middle"
        fill={dash.white}
        fontSize="15"
        fontWeight="600"
      >
        {percent}%
      </text>
    </svg>
  );
}

const QUESTIONS = [
  {
    q: "How do you prefer to spend a productive workday",
    options: [
      "Deep focus on one complex task",
      "Collaborating with a team all day",
      "Meeting new people and presenting ideas",
      "Switching between many small tasks",
      "Working outdoors or hands-on",
    ],
  },
  {
    q: "What matters most to you in a career",
    options: [
      "Creative freedom",
      "Financial stability",
      "Helping others",
      "Continuous learning",
      "Leadership and influence",
    ],
  },
  {
    q: "Which activities do you enjoy doing the most",
    options: [
      "Writing stories, articles or content",
      "Building or fixing things, working with tools",
      "Analyzing data and solving problems",
      "Designing, creating or drawing",
      "Helping, teaching or counseling people",
    ],
  },
];

const TOTAL = 20;

function QuizPage() {
  const router = useRouter();
  const [index, setIndex] = useState(2);
  const [answers, setAnswers] = useState<Record<number, number>>({ 2: 3 });

  const current = QUESTIONS[index % QUESTIONS.length];
  const percent = Math.round(((index + 1) / TOTAL) * 100);

  return (
    <DashboardShell
      heading={
        <HeadingRow>
          <HeadIcon>
            <Image src="/image/icon-quizdoc.png" alt="" width={44} height={44} />
          </HeadIcon>
          <div>
            <Title>Career Quiz</Title>
            <Muted>Answer honestly to get personalized career matches</Muted>
          </div>
        </HeadingRow>
      }
      topRight={
        <TopActions>
        <BellIcon />
        <ExitButton onClick={() => router.push("/home")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Exit quiz
        </ExitButton>
        </TopActions>
      }
    >
      <Grid>
        <QuizCard>
          <Step>
            Question {index + 1} of {TOTAL}
          </Step>
          <Bar>
            <Fill $p={percent} />
          </Bar>
          <Question>{current.q}</Question>
          <Options>
            {current.options.map((opt, i) => {
              const selected = answers[index] === i;
              return (
                <Option
                  key={opt}
                  $selected={selected}
                  onClick={() => setAnswers((a) => ({ ...a, [index]: i }))}
                  aria-pressed={selected}
                >
                  {opt}
                  <Radio $selected={selected} />
                </Option>
              );
            })}
          </Options>
          <Footer>
            <GhostButton
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
            >
              ← Back
            </GhostButton>
            <NextButton
              onClick={() => setIndex((i) => Math.min(TOTAL - 1, i + 1))}
            >
              Next →
            </NextButton>
          </Footer>
        </QuizCard>

        <SideCol>
          <Card>
            <SideTitle>Your progress</SideTitle>
            <RingRow>
              <Ring percent={percent} />
              <Count>
                {index + 1}
                <span>/{TOTAL}</span>
              </Count>
            </RingRow>
            <Muted style={{ textAlign: "center" }}>
              Keep going, you&apos;re doing great.
            </Muted>
          </Card>

          <Card>
            <WhyTitle>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5.9 1.2.9 1.9h5.2c0-.7.3-1.4.9-1.9A6 6 0 0 0 12 3Z"
                  stroke={dash.purple}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Why this matters
            </WhyTitle>
            <Muted style={{ marginTop: 16 }}>
              Your answers help us understand your interests, strengths, and
              preferences to suggest the best career paths for you.
            </Muted>
          </Card>

          <NoteCard>
            <NoteImg src="/image/icon-quizdoc.png" alt="" width={150} height={150} />
            <SideTitle>
              There are no right or <Accent>wrong</Accent> answers.
            </SideTitle>
            <Muted style={{ marginTop: 12 }}>
              Be honest and think about what you truly enjoy.
            </Muted>
          </NoteCard>
        </SideCol>
      </Grid>
    </DashboardShell>
  );
}

export default QuizPage;