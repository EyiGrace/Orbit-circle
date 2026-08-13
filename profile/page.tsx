//app/profile/page.tsx
// 'use client';

// import React, { useState } from "react";
// import styled from "styled-components";
// import Image from "next/image";
// import colors from "@/lib/colors";
// import { DashboardShell, Card, Muted } from "@/components/dashboard";

// /* ---------------- Layout & Header ---------------- */

// const HeaderSection = styled.div`
//   text-align: center;
//   margin-bottom: 28px;
// `;

// const PageTitle = styled.h1`
//   margin: 0 0 8px;
//   font-size: 28px;
//   font-weight: 700;

//   @media (max-width: 860px) {
//     font-size: 22px;
//   }
// `;

// const PageSubtitle = styled(Muted)`
//   font-size: 14px;
//   max-width: 420px;
//   margin: 0 auto;
//   line-height: 1.4;
// `;

// const ProfileGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 20px;
//   max-width: 820px;
//   margin: 0 auto;

//   /* Desktop Layout Improvisation */
//   @media (min-width: 861px) {
//     grid-template-columns: 1fr 1fr;
    
//     /* Make user info card span both columns on desktop */
//     & > *:first-child {
//       grid-column: 1 / -1;
//     }
//   }
// `;

// /* ---------------- Card 1: User Profile Details ---------------- */

// const ProfileCard = styled(Card)`
//   padding: 24px;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// const UserTopRow = styled.div`
//   display: flex;
//   gap: 20px;
//   align-items: flex-start;

//   @media (max-width: 480px) {
//     gap: 16px;
//   }
// `;

// const AvatarContainer = styled.div`
//   position: relative;
//   width: 90px;
//   height: 90px;
//   flex-shrink: 0;

//   @media (max-width: 480px) {
//     width: 76px;
//     height: 76px;
//   }
// `;

// const AvatarImageWrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   border-radius: 50%;
//   overflow: hidden;
//   position: relative;
//   border: 2px solid rgba(255, 255, 255, 0.1);
// `;

// const CameraBadge = styled.button`
//   position: absolute;
//   bottom: 0;
//   right: -2px;
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   background: ${colors.buttonPurple};
//   border: 2px solid #0d0a26; /* Dark background stroke matching card */
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${colors.normalWhite};
//   cursor: pointer;
//   transition: transform 0.2s ease;

//   &:hover {
//     transform: scale(1.08);
//   }
// `;

// const UserMeta = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
//   flex: 1;
// `;

// const NameRow = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   flex-wrap: wrap;
// `;

// const UserName = styled.h2`
//   margin: 0;
//   font-size: 22px;
//   font-weight: 700;

//   @media (max-width: 480px) {
//     font-size: 19px;
//   }
// `;

// const Badge = styled.span`
//   display: inline-flex;
//   align-items: center;
//   gap: 4px;
//   padding: 4px 10px;
//   border-radius: 20px;
//   background: rgba(139, 92, 246, 0.18);
//   color: #a78bfa;
//   font-size: 12px;
//   font-weight: 600;
// `;

// const UserTagline = styled.p`
//   margin: 2px 0 10px;
//   font-size: 14px;
//   color: ${colors.muted};
// `;

// const DetailsList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 6px;
//   font-size: 13.5px;
//   color: rgba(255, 255, 255, 0.85);
// `;

// const DetailItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// const ActionButtonsGroup = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 12px;
//   margin-top: 4px;
// `;

// const OutlineBtn = styled.button<{ $primary?: boolean }>`
//   padding: 10px 16px;
//   border-radius: 10px;
//   font-size: 13.5px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.2s ease;
//   text-align: center;

//   ${(p) =>
//     p.$primary
//       ? `
//     background: ${colors.buttonPurple};
//     color: ${colors.normalWhite};
//     border: none;
//     &:hover { opacity: 0.9; }
//   `
//       : `
//     background: transparent;
//     color: ${colors.normalWhite};
//     border: 1px solid rgba(255, 255, 255, 0.25);
//     &:hover { border-color: ${colors.normalWhite}; }
//   `}
// `;

// /* ---------------- Card 2: Profile Completeness ---------------- */

// const CompletenessCard = styled(Card)`
//   padding: 24px;
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// const CompletenessHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const CardHeading = styled.h3`
//   margin: 0;
//   font-size: 16px;
//   font-weight: 700;
// `;

// const Percentage = styled.span`
//   color: #2ed573;
//   font-size: 15px;
//   font-weight: 700;
// `;

// const ProgressBarTrack = styled.div`
//   width: 100%;
//   height: 8px;
//   background: rgba(255, 255, 255, 0.1);
//   border-radius: 999px;
//   overflow: hidden;
// `;

// const ProgressBarFill = styled.div<{ $progress: number }>`
//   height: 100%;
//   width: ${(p) => p.$progress}%;
//   background: linear-gradient(90deg, #773bec 0%, #a77bf3 100%);
//   border-radius: 999px;
//   transition: width 0.4s ease;
// `;

// const Checklist = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
//   margin-top: 4px;
// `;

// const ChecklistItem = styled.div<{ $completed: boolean }>`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   font-size: 14px;
//   color: ${(p) => (p.$completed ? colors.normalWhite : colors.muted)};
// `;

// const CheckIcon = styled.div<{ $completed: boolean }>`
//   width: 22px;
//   height: 22px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-shrink: 0;
//   background: ${(p) =>
//     p.$completed ? "#10b981" : "transparent"};
//   border: ${(p) =>
//     p.$completed ? "none" : "1.5px solid rgba(255, 255, 255, 0.3)"};
//   color: ${colors.normalWhite};
// `;



// export default function ProfilePage() {
//   const [profile] = useState({
//     name: "David Abel",
//     badge: "Explorer",
//     bio: "curious mind, future builder",
//     email: "therealgeek@gmail.com",
//     joined: "Joined August 2026",
//     location: "Abuja, Nigeria",
//     avatar: "/image/avatar-1.png", // Replace with your image path
//   });

//   const checklistItems = [
//     { id: 1, label: "Add a profile photo", completed: true },
//     { id: 2, label: "Take the career quiz", completed: true },
//     { id: 3, label: "Add skills", completed: true },
//     { id: 4, label: "Save a career or mentor", completed: true },
//     { id: 5, label: "Write a short bio", completed: false },
//   ];

  
//   return (
//     <DashboardShell>
//       <HeaderSection>
//         <PageTitle>My Profile</PageTitle>
//         <PageSubtitle>
//           Manage your profile, track your progress and achieve your goals
//         </PageSubtitle>
//       </HeaderSection>

//       <ProfileGrid>
//         {/* User Info Main Card */}
//         <ProfileCard>
//           <UserTopRow>
//             <AvatarContainer>
//               <AvatarImageWrapper>
//                 <Image
//                   src={profile.avatar}
//                   alt={profile.name}
//                   fill
//                   unoptimized
//                   style={{ objectFit: "cover" }}
//                 />
//               </AvatarImageWrapper>
//               <CameraBadge aria-label="Change photo">
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
//                   <circle cx="12" cy="13" r="4" />
//                 </svg>
//               </CameraBadge>
//             </AvatarContainer>

//             <UserMeta>
//               <NameRow>
//                 <UserName>{profile.name}</UserName>
//                 <Badge>
//                   <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
//                     <circle cx="12" cy="12" r="10" />
//                   </svg>
//                   {profile.badge}
//                 </Badge>
//               </NameRow>
//               <UserTagline>{profile.bio}</UserTagline>

//               <DetailsList>
//                 <DetailItem>{profile.email}</DetailItem>
//                 <DetailItem>{profile.joined}</DetailItem>
//                 <DetailItem>{profile.location}</DetailItem>
//               </DetailsList>
//             </UserMeta>
//           </UserTopRow>

//           <ActionButtonsGroup>
//             <OutlineBtn $primary>Edit Profile</OutlineBtn>
//             <OutlineBtn>Change Password</OutlineBtn>
//           </ActionButtonsGroup>
//         </ProfileCard>

//         {/* Profile Completeness Card */}
//         <CompletenessCard>
//           <CompletenessHeader>
//             <CardHeading>Profile Completeness</CardHeading>
//             <Percentage>80%</Percentage>
//           </CompletenessHeader>

//           <Muted style={{ fontSize: "13px" }}>
//             Complete your profile to get better recommendations
//           </Muted>

//           <ProgressBarTrack>
//             <ProgressBarFill $progress={80} />
//           </ProgressBarTrack>

//           <Checklist>
//             {checklistItems.map((item) => (
//               <ChecklistItem key={item.id} $completed={item.completed}>
//                 <CheckIcon $completed={item.completed}>
//                   {item.completed && (
//                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                       <polyline points="20 6 9 17 4 12" />
//                     </svg>
//                   )}
//                 </CheckIcon>
//                 <span>{item.label}</span>
//               </ChecklistItem>
//             ))}
//           </Checklist>
//         </CompletenessCard>

//         {/* Streak Tracker Card */}
       
//       </ProfileGrid>
//     </DashboardShell>
//   );
// }