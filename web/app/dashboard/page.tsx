'use client';

import styled from "styled-components";
import Image from "next/image";
import {
  DashboardShell,
  Card,
  Accent,
  Muted,
  dash,
} from "@/components/dashboard";



const Greeting = styled.h1`
  margin: 0;
  font-size: 40px;
  font-weight: 700;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 32px;
  margin-top: 56px;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const HeroCard = styled(Card)`
  text-align: center;
  padding: 48px 32px;
`;

const HeroTitle = styled.h2`
  margin: 0;
  font-size: 40px;
  font-weight: 700;
`;

const CtaButton = styled.button`
  margin: 32px 0;
  padding: 16px 42px;
  min-width: 300px;
  border: none;
  border-radius: 12px;
  background: ${dash.purple};
  color: ${dash.white};
  font-family: inherit;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #6d28d9;
  }
`;

const HeroImg = styled(Image)`
  width: 100%;
  max-width: 780px;
  border-radius: 16px;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 20px;
`;

const Ring = styled.span`
  width: 84px;
  height: 84px;
  flex: none;
  border-radius: 50%;
  border: 3px solid rgba(248, 250, 252, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
`;

const Quote = styled.blockquote`
  margin: 16px 0 0;
  font-size: 20px;
  line-height: 30px;
`;

function Dashboard() {
  return (
    <DashboardShell
      heading={
        <>
          <Greeting>
            Good afternoon, <Accent>Explorer</Accent> 👋
          </Greeting>
          <Muted style={{ marginTop: 8, fontSize: 20 }}>
            Let&rsquo;s map your future
          </Muted>
        </>
      }
    >
      <Grid>
        <HeroCard>
          <HeroTitle>
            Get Clarity into your <Accent>future</Accent>
          </HeroTitle>
          <Muted style={{ marginTop: 12, fontSize: 20 }}>
            Take the career quiz to discover paths that match your strengths and
            interests.
          </Muted>
          <CtaButton type="button">Start Career Quiz</CtaButton>
          <HeroImg src="/image/dash-hero.jpg" alt="Explorer mapping career paths" width={960} height={640} />
        </HeroCard>

        <Side>
          <Card>
            <h3 style={{ margin: 0, fontSize: 26 }}>Your progress</h3>
            <ProgressRow>
              <Ring>0%</Ring>
              <Muted style={{ fontSize: 18 }}>Complete quiz to get started.</Muted>
            </ProgressRow>
          </Card>
          <Card>
            <span style={{ color: dash.purple, fontSize: 40, lineHeight: 1 }}>
              &ldquo;
            </span>
            <Quote>
              The best career is the one that aligns with who you are and what
              you love.
            </Quote>
            <Muted style={{ marginTop: 20, fontSize: 18 }}>- Unknown</Muted>
          </Card>
        </Side>
      </Grid>
    </DashboardShell>
  );
}

export default Dashboard;
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Image from 'next/image';
// import styled from 'styled-components';
// import {
//   Search,
//   Bookmark,
//   ArrowRight,
//   Home,
//   User,
//   Users,
//   Bookmark as BookmarkIcon,
// } from 'lucide-react';

// // ---------- Styled Components ----------


// // ---------- Component ----------
// export default function DashboardPage() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [greeting, setGreeting] = useState('Welcome Back 👋');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [progress, setProgress] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const progressTarget = 75;
//   const intervalRef = useRef(null);

//   // 1. Greeting
//   useEffect(() => {
//     const hour = new Date().getHours();
//     let msg = 'Good Morning';

//     if (hour >= 12 && hour < 18) {
//       msg = 'Good Afternoon';
//     } else if (hour >= 18) {
//       msg = 'Good Evening';
//     }

//     setGreeting(msg);
//   }, []);

//   // 2. Progress bar animation
//   useEffect(() => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     let current = 0;
//     intervalRef.current = setInterval(() => {
//       current += 1;
//       if (current >= progressTarget) {
//         clearInterval(intervalRef.current);
//         setProgress(progressTarget);
//         return;
//       }
//       setProgress(current);
//     }, 20);
//     return () => clearInterval(intervalRef.current);
//   }, []);

//   // 3. Fade-in animation
//   useEffect(() => {
//     const timer = setTimeout(() => setLoaded(true), 200);
//     return () => clearTimeout(timer);
//   }, []);

//   // Search filter
//   const filteredCareer = useCareerFilter(searchTerm);

//   // Navigation items
//   const navItems = [
//     { href: '/home', label: 'Home', icon: Home },
//     { href: '/profile', label: 'Profile', icon: User },
//     { href: '/mentor', label: 'Mentors', icon: Users },
//     { href: '/saved', label: 'Saved', icon: BookmarkIcon },
//   ];

//   const handleNavClick = (e, href) => {
//     e.preventDefault();
//     router.push(href);
//   };

//   return (
//     <DashboardWrapper className={loaded ? 'loaded' : ''}>
//       <Header>
//         <p>{greeting}</p>
//         <h1>
//           Let's map your <span>future</span>
//         </h1>
//         <small>Discover paths. Build skills. Become more.</small>
//       </Header>

//       <SearchBox>
//         <Search size={24} />
//         <input
//           type="text"
//           placeholder="Search careers, skills or fields"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </SearchBox>

//       {/* Continue Quiz */}
//       <section>
//         <SectionTitle>
//           <h3>Continue where you left off</h3>
//           <a onClick={() => router.push('/quiz')}>View all</a>
//         </SectionTitle>

//         <QuizCard>
//           <QuizImage>
//             <Image src="/image/File Image.png" alt="Quiz" width={60} height={60} />
//           </QuizImage>
//           <QuizInfo>
//             <h2>Career Quiz</h2>
//             <p>20 Questions</p>
//             <Progress>
//               <ProgressBar progress={progress} />
//             </Progress>
//           </QuizInfo>
//           <ContinueButton onClick={() => router.push('/quiz')}>
//             Continue
//           </ContinueButton>
//         </QuizCard>
//       </section>

//       {/* Saved */}
//       <section>
//         <SavedTitle>Your Saved</SavedTitle>
//         <SavedGrid>
//           <SavedCard
//             className="careers"
//             onClick={() => router.push('/saved-careers')}
//           >
//             <BookmarkBadge>
//               <Bookmark size={20} />
//             </BookmarkBadge>
//             <h4>Saved Careers</h4>
//             <small>3 Careers Saved</small>
//             <Image src="/image/Compass.png" alt="Careers" width={110} height={110} />
//             <ArrowWrapper>
//               <ArrowRight size={26} />
//             </ArrowWrapper>
//           </SavedCard>

//           <SavedCard
//             className="mentors"
//             onClick={() => router.push('/saved')}
//           >
//             <BookmarkBadge>
//               <Bookmark size={20} />
//             </BookmarkBadge>
//             <h4>Saved Mentors</h4>
//             <small>2 Mentors Saved</small>
//             <Image src="/image/cont.png" alt="Mentors" width={110} height={110} />
//             <ArrowWrapper>
//               <ArrowRight size={26} />
//             </ArrowWrapper>
//           </SavedCard>
//         </SavedGrid>
//       </section>

//       {/* Recommended Career */}
//       <section>
//         <SavedTitle>Recommended Career</SavedTitle>
//         <CareerCard onClick={() => router.push('/career-detail')}>
//           <CareerIcon>
//             {/* You can add an icon or image here */}
//           </CareerIcon>
//           <CareerInfo>
//             <h2>Data Science</h2>
//             <span>92% Match</span>
//             <p>
//               Analyze data.<br />
//               Solve problems.<br />
//               Build the future.
//             </p>
//           </CareerInfo>
//         </CareerCard>
//       </section>

//       {/* Bottom Navigation */}
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
//               <Icon size={24} />
//               <span>{label}</span>
//             </NavLink>
//           );
//         })}
//       </BottomNav>
//     </DashboardWrapper>
//   );
// }

// // Custom hook for search filtering (mimics the original behavior)
// function useCareerFilter(term) {
//   // This is a simplified version; in the original, it hides/shows cards.
//   // We'll just return the term for demonstration; actual filtering happens in the component.
//   return term;
// }

// const DashboardWrapper = styled.div`
//   width: 100%;
//   max-width: 430px;
//   min-height: 100vh;
//   background: #12013f;
//   padding: 30px 20px 120px;
//   opacity: 0;
//   transform: translateY(30px);
//   transition: opacity 0.6s, transform 0.6s;

//   &.loaded {
//     opacity: 1;
//     transform: translateY(0);
//   }

//   @media (max-width: 768px) {
//     max-width: 100%;
//     padding: 25px 18px 110px;
//   }
// `;

// const Header = styled.header`
//   p {
//     color: #d7d7d7;
//     font-size: 18px;
//     margin-bottom: 8px;
//   }

//   h1 {
//     font-size: 45px;
//     line-height: 1.2;
//     margin-bottom: 10px;

//     span {
//       color: #9747ff;
//     }

//     @media (max-width: 768px) {
//       font-size: 35px;
//     }
//   }

//   small {
//     color: #c8c8c8;
//     font-size: 17px;
//   }
// `;

// const SearchBox = styled.div`
//   margin: 35px 0;
//   display: flex;
//   align-items: center;
//   background: #241052;
//   border: 2px solid rgba(255, 255, 255, 0.08);
//   border-radius: 20px;
//   padding: 18px;

//   svg {
//     color: #ffffff;
//     margin-right: 15px;
//   }

//   input {
//     flex: 1;
//     background: none;
//     border: none;
//     color: #fff;
//     outline: none;
//     font-size: 17px;
//     font-family: inherit;

//     &::placeholder {
//       color: #d7d7d7;
//     }
//   }

//   @media (max-width: 480px) {
//     padding: 15px;
//   }
// `;

// const SectionTitle = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;

//   h3 {
//     font-size: 20px;
//   }

//   a {
//     text-decoration: none;
//     color: #9747ff;
//     cursor: pointer;
//   }
// `;

// const QuizCard = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 18px;
//   background: #241052;
//   border-radius: 22px;
//   padding: 18px;
//   border: 1px solid rgba(255, 255, 255, 0.08);

//   @media (max-width: 480px) {
//     flex-direction: column;
//     text-align: center;
//   }
// `;

// const QuizImage = styled.div`
//   width: 85px;
//   height: 85px;
//   background: #371774;
//   border-radius: 18px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   img {
//     width: 60px;
//   }
// `;

// const QuizInfo = styled.div`
//   flex: 1;

//   h2 {
//     margin-bottom: 4px;
//   }

//   p {
//     color: #d6d6d6;
//     margin-bottom: 12px;
//   }
// `;

// const Progress = styled.div`
//   width: 100%;
//   height: 10px;
//   background: #4b3c77;
//   border-radius: 20px;
//   overflow: hidden;
// `;

// const ProgressBar = styled.div`
//   width: ${(props) => props.progress}%;
//   height: 100%;
//   background: linear-gradient(90deg, #9747ff, #b26cff);
//   transition: width 0.1s linear;
// `;

// const ContinueButton = styled.button`
//   border: none;
//   background: #9747ff;
//   color: white;
//   padding: 12px 22px;
//   border-radius: 14px;
//   cursor: pointer;
//   transition: 0.3s;

//   &:hover {
//     background: #7c2dff;
//     transform: scale(0.95);
//   }

//   @media (max-width: 480px) {
//     width: 100%;
//     margin-top: 15px;
//   }
// `;

// const SavedTitle = styled.h3`
//   margin: 35px 0 20px;
//   font-size: 22px;
// `;

// const SavedGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 18px;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const SavedCard = styled.div`
//   background: #31106d;
//   border-radius: 22px;
//   padding: 18px;
//   position: relative;
//   transition: 0.35s;
//   cursor: pointer;

//   &:hover {
//     transform: translateY(-8px);
//   }

//   h4 {
//     margin-left: -8px;
//     margin-top: 10px;
//   }

//   small {
//     margin-left: -8px;
//     color: #d4d4d4;
//   }

//   img {
//     width: 110px;
//     display: block;
//     margin: 20px auto;
//   }
// `;

// const BookmarkBadge = styled.div`
//   position: absolute;
//   right: 5px;
//   top: 15px;
//   width: 40px;
//   height: 40px;
//   border-radius: 12px;
//   background: #9b59ff;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   svg {
//     color: white;
//   }
// `;

// const ArrowWrapper = styled.div`
//   display: flex;
//   justify-content: flex-end;

//   svg {
//     font-size: 26px;
//     color: white;
//   }
// `;

// const CareerCard = styled.div`
//   display: flex;
//   gap: 18px;
//   align-items: center;
//   background: #241052;
//   border-radius: 22px;
//   padding: 18px;
//   border: 1px solid rgba(255, 255, 255, 0.08);
//   cursor: pointer;
//   transition: 0.3s;

//   &:hover {
//     background: #2f1a64;
//   }

//   @media (max-width: 480px) {
//     flex-direction: column;
//     text-align: center;
//   }
// `;

// const CareerIcon = styled.div`
//   width: 90px;
//   height: 90px;
//   background: #341c73;
//   border-radius: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const CareerInfo = styled.div`
//   h2 {
//     margin-bottom: 8px;
//   }

//   span {
//     display: inline-block;
//     padding: 4px 12px;
//     border-radius: 8px;
//     background: #0d5032;
//     color: #52ffbb;
//     margin-bottom: 10px;
//   }

//   p {
//     color: #d5d5d5;
//   }
// `;

// const BottomNav = styled.nav`
//   position: fixed;
//   bottom: 18px;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 430px;
//   background: #241052;
//   border-radius: 22px;
//   display: flex;
//   justify-content: space-around;
//   padding: 18px;
//   border: 1px solid rgba(255, 255, 255, 0.08);

//   @media (max-width: 768px) {
//     width: 95%;
//   }
// `;

// const NavLink = styled.a`
//   color: ${(props) => (props.active ? '#9747ff' : '#ffffff')};
//   text-decoration: none;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 6px;
//   transition: 0.3s;
//   cursor: pointer;

//   &:hover {
//     color: #9747ff;
//   }

//   svg {
//     font-size: 24px;
//   }

//   span {
//     font-size: 14px;
//   }
// `;