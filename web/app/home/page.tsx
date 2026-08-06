'use client';
import styled from "styled-components";
import Image from "next/image";
import {
  DashboardShell,
  Card,
  Accent,
  Muted,
  ArrowIcon,
  dash,
} from "@/components/dashboard";


const Eyebrow = styled.p`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
`;

const Title = styled.h1`
  margin: 4px 0;
  font-size: 44px;
  font-weight: 700;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 460px;
  max-width: 100%;
  padding: 18px 22px;
  border-radius: 14px;
  border: 1px solid ${dash.cardBorder};
  background: rgba(35, 16, 92, 0.5);
  color: ${dash.muted};
  font-size: 18px;
  margin: 40px 0 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 400px;
  gap: 40px;
  margin-top: 24px;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 32px 0 16px;
  font-size: 24px;
  font-weight: 600;
`;

const QuizCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 560px;
`;

const Thumb = styled(Image)`
  width: 92px;
  height: 92px;
  border-radius: 16px;
  background: rgba(119, 59, 236, 0.2);
  object-fit: contain;
`;

const Continue = styled.button`
  margin-left: auto;
  align-self: flex-start;
  padding: 12px 22px;
  border: none;
  border-radius: 10px;
  background: ${dash.purple};
  color: ${dash.white};
  font-family: inherit;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;

const Bar = styled.div`
  height: 12px;
  border-radius: 999px;
  background: rgba(248, 250, 252, 0.15);
  overflow: hidden;
  flex: 1;

  span {
    display: block;
    height: 100%;
    width: 75%;
    border-radius: 999px;
    background: ${dash.purple};
  }
`;

const Match = styled.span`
  display: inline-block;
  margin: 10px 0;
  padding: 6px 14px;
  border-radius: 8px;
  background: rgba(74, 222, 128, 0.15);
  color: ${dash.green};
  font-size: 18px;
`;

const TileRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-top: 40px;
`;

const Tile = styled(Card)`
  position: relative;
  min-height: 280px;
`;

const TileHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  h3 {
    margin: 0;
    font-size: 28px;
  }
`;

const TileArt = styled(Image)`
  display: block;
  width: 150px;
  height: 150px;
  margin: 8px auto 0;
  object-fit: contain;
`;

const RoundArrow = styled.button`
  position: absolute;
  right: 24px;
  bottom: 24px;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid ${dash.cardBorder};
  background: rgba(119, 59, 236, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BookmarkBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(119, 59, 236, 0.25);
  color: ${dash.purple};
  font-size: 20px;
`;

const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 22px 0 28px;
`;

const Ring = styled.span`
  width: 84px;
  height: 84px;
  flex: none;
  border-radius: 50%;
  background: conic-gradient(
    ${dash.purple} 0turn 0.75turn,
    rgba(248, 250, 252, 0.15) 0.75turn 1turn
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;

  &::before {
    content: "75%";
    width: 66px;
    height: 66px;
    border-radius: 50%;
    background: ${dash.bg};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Steps = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 20px;
`;

const Step = styled.li<{ $done?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  &::before {
    content: "•";
    margin-right: 8px;
  }

  span {
    margin-right: auto;
  }

  em {
    font-style: normal;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    color: ${(p) => (p.$done ? "#0A003C" : "transparent")};
    background: ${(p) => (p.$done ? dash.purple : "transparent")};
    border: 2px solid
      ${(p) => (p.$done ? dash.purple : "rgba(248,250,252,0.4)")};
  }
`;

const STEPS = [
  { label: "Career Assessment", done: true },
  { label: "Personality Assessment", done: true },
  { label: "Explore Careers", done: true },
  { label: "Connect to Mentor", done: false },
];

function HomeDashboard() {
  return (
    <DashboardShell
      heading={
        <>
          <Eyebrow>Welcome back David! 👋</Eyebrow>
          <Title>
            Let&rsquo;s map your <Accent>future</Accent>
          </Title>
          <Muted style={{ fontSize: 20 }}>
            Discover paths. Build skills. Become more
          </Muted>
        </>
      }
    >
      <Search>🔍 Search careers, skills or fields</Search>
      <Grid>
        <div>
          <SectionHead>Continue where you left off</SectionHead>
          <QuizCard>
            <Thumb src="/image/icon-quizdoc.png" alt="" loading="lazy" width={512} height={512} />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: 28 }}>Career Quiz</h3>
              <Muted style={{ fontSize: 18, marginTop: 4 }}>20 questions</Muted>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 14,
                }}
              >
                <Bar>
                  <span />
                </Bar>
                <strong style={{ fontSize: 18 }}>75%</strong>
              </div>
            </div>
            <Continue type="button">Continue</Continue>
          </QuizCard>

          <SectionHead>
            Saved Careers
            <span style={{ color: dash.purple, fontSize: 20 }}>View all ›</span>
          </SectionHead>
          <Card style={{ maxWidth: 560 }}>
            <h3 style={{ margin: 0, fontSize: 30 }}>Data Science</h3>
            <Match>92% Match</Match>
            <Muted style={{ fontSize: 19 }}>
              Analyze data. Solve problems. Build the future
            </Muted>
          </Card>

          <TileRow>
            <Tile>
              <TileHead>
                <div>
                  <h3>Saved Mentors</h3>
                  <Muted style={{ fontSize: 20, marginTop: 4 }}>
                    2 Mentors Saved
                  </Muted>
                </div>
                <BookmarkBadge>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M7 4h10v16l-5-3.5L7 20z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </BookmarkBadge>
              </TileHead>
              <TileArt src="/image/icon-mentors.png" alt="" loading="lazy" width={512} height={512} />
              <RoundArrow type="button" aria-label="Open saved mentors">
                <ArrowIcon />
              </RoundArrow>
            </Tile>
            <Tile>
              <TileHead>
                <div>
                  <h3>Saved Careers</h3>
                  <Muted style={{ fontSize: 20, marginTop: 4 }}>
                    2 Careers Saved
                  </Muted>
                </div>
                <BookmarkBadge>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M7 4h10v16l-5-3.5L7 20z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </BookmarkBadge>
              </TileHead>
              <TileArt src="/image/icon-compass.png" alt="" loading="lazy" width={512} height={512} />
              <RoundArrow type="button" aria-label="Open saved careers">
                <ArrowIcon />
              </RoundArrow>
            </Tile>
          </TileRow>
        </div>

        <Card style={{ marginTop: 88, padding: 32 }}>
          <h2 style={{ margin: 0, fontSize: 30, textAlign: "center" }}>
            Your progress
          </h2>
          <ProgressRow>
            <Ring />
            <Muted style={{ fontSize: 20, color: dash.white }}>
              Overall progress
              <br />
              4/6 completed
            </Muted>
          </ProgressRow>
          <Steps>
            {STEPS.map((s) => (
              <Step key={s.label} $done={s.done}>
                <span>{s.label}</span>
                <em>{s.done ? "✓" : ""}</em>
              </Step>
            ))}
          </Steps>
          <Muted style={{ marginTop: 28, fontSize: 20, textAlign: "center" }}>
            Connect with a mentor to reach 100% progress
          </Muted>
        </Card>
      </Grid>

    </DashboardShell>
  );
}

export default HomeDashboard;


// 'use client';

// import { useState,} from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Image from 'next/image';
// import styled from 'styled-components';
// import {
//   House,
//   User,
//   Users,
//   Bookmark,
// } from 'lucide-react';


// // ---------- Component ----------
// export default function HomePage() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [userName, setUserName] = useState('Friend');

  

//   // Determine greeting based on time of day
//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 18) return 'Good afternoon';
//     return 'Good evening';
//   };

//   const greeting = getGreeting();

//   const navItems = [
//     { href: '/home', label: 'Home', icon: House },
//     { href: '/profile', label: 'Profile', icon: User },
//     { href: '/mentor', label: 'Mentors', icon: Users },
//     { href: '/saved', label: 'Saved', icon: Bookmark },
//   ];

//   const handleNavClick = (e, href) => {
//     e.preventDefault();
//     router.push(href);
//   };

//   return (
//     <HomeWrapper>
//       <TopContent>
//         <Greeting>
//           {greeting}, {userName} 👋🏽
//         </Greeting>
//         <Subtitle>Let’s map your future</Subtitle>

//         <CompassImage
//           src="/image/Compass.png"
//           alt="Compass"
//           width={410}
//           height={410}
//           priority
//         />

//         <CareerText>
//           <h2>Get clarity into your future</h2>
//           <p>
//             Take the career quiz to discover<br />
//             paths that match your strengths<br />
//             and interests.
//           </p>
//         </CareerText>

//         <QuizButton onClick={() => router.push('/dashboard')}>
//           Start Career Quiz
//         </QuizButton>
//       </TopContent>

//       <BottomNav>
//         {navItems.map(({ href, label, icon: Icon }) => {
//           const isActive = pathname === href;
//           return (
//             <NavLink
//               key={href}
//               href={href}
//               active={isActive}
//               onClick={(e) => handleNavClick(e, href)}
//             >
//               <Icon size={28} />
//               <span>{label}</span>
//             </NavLink>
//           );
//         })}
//       </BottomNav>
//     </HomeWrapper>
//   );
// }

// // ---------- Styled Components ----------
// const HomeWrapper = styled.main`
//   min-height: 100vh;
//   background: var(--Deep-Purple, #0a003c);
//   color: #ffffff;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 0 20px;
//   position: relative;
// `;

// const TopContent = styled.section`
//   width: 100%;
//   max-width: 800px;
//   position: relative;
//   z-index: 2;
// `;

// const Greeting = styled.h1`
//   font-size: clamp(28px, 5vw, 42px);
//   font-weight: 600;
//   line-height: 1.2;
//   margin: 20px 0 0 20px;

//   @media (max-width: 600px) {
//     margin-top: 50px;
//     margin-left: 10px;
//   }
// `;

// const Subtitle = styled.p`
//   font-size: clamp(20px, 4vw, 30px);
//   color: #ded9ff;
//   margin: 18px 0 0 25px;

//   @media (max-width: 600px) {
//     margin-left: 10px;
//   }
// `;

// const CompassImage = styled(Image)`
//   width: 410px;
//   height: 410px;
//   aspect-ratio: 1/1;
//   margin-left: 70px;
//   margin-top: 10px;

//   @media (max-width: 600px) {
//     width: 250px;
//     height: 250px;
//     margin-left: 30px;
//   }
// `;

// const CareerText = styled.div`
//   text-align: center;
//   margin-top: 20px;

//   h2 {
//     font-size: clamp(27px, 5vw, 40px);
//     font-weight: 600;
//     line-height: 1;
//   }

//   p {
//     font-size: clamp(18px, 3vw, 25px);
//     color: #ded9f5;
//     line-height: 1.4;
//     margin-top: 18px;
//   }

//   @media (max-width: 600px) {
//     margin-top: 20px;
//     margin-left: 10px;
//   }
// `;

// const QuizButton = styled.button`
//   width: 80%;
//   border: none;
//   border-radius: 16px;
//   background: linear-gradient(135deg, #853cff, #7330e9);
//   color: white;
//   font-size: clamp(20px, 4vw, 30px);
//   padding: 24px 15px;
//   margin: 35px auto 0;
//   cursor: pointer;
//   transition: 0.3s ease;
//   box-shadow: 0 8px 20px rgba(100, 30, 255, 0.25);
//   display: block;

//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 12px 25px rgba(100, 30, 255, 0.45);
//   }

//   @media (max-width: 600px) {
//     font-size: clamp(13px, 4vw, 21px);
//     padding: 20px 10px;
//     margin-top: 180px;
//     margin-left: 35px;
//     width: calc(100% - 70px);
//   }
// `;

// const BottomNav = styled.nav`
//   margin-top: 30px;
//   width: calc(100% - 60px);
//   max-width: 690px;
//   height: 105px;
//   border-radius: 28px;
//   background: rgba(38, 14, 111, 0.85);
//   border: 1px solid rgba(173, 120, 255, 0.6);
//   backdrop-filter: blur(15px);
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   z-index: 10;
//   margin-left: 40px;

//   @media (max-width: 600px) {
//     width: 325px;
//     height: 62px;
//     position: absolute;
//     bottom: 30px;
//     right: 18px;
//     margin: 0;
//   }
// `;

// const NavLink = styled.a<{ active?: boolean }>.attrs((props) => ({}))`
//   text-decoration: none;
//   color: ${(props) => (props.active ? '#8d4dff' : 'white')};
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
//   font-size: 18px;
//   transition: 0.3s ease;
//   cursor: pointer;

//   &:hover {
//     color: #9d62ff;
//   }

//   i {
//     font-size: 28px;
//   }

//   @media (max-width: 600px) {
//     font-size: 13px;
//     gap: 4px;

//     i {
//       font-size: 22px;
//     }
//   }
// `;

// NavLink.defaultProps = {
//   active: false,
// };
