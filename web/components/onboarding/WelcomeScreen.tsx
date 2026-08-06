"use client";

import fontsize from "@/lib/fontsize";
import OnboardingLayout from "./OnboardingLayout";
import { PrimaryButton, OutlineButton, TermsText, Highlight } from "./shared";
import MatchCardsVisual from "./visuals/MatchCardVisual";
import WelcomeWaveVisual from "./visuals/WelcomeWaveVisual";
import styled from "styled-components";

export interface WelcomeScreenProps {
  onCreateAccount?: () => void;
  onLogIn?: () => void;
}

export default function WelcomeScreen({ onCreateAccount, onLogIn }: WelcomeScreenProps) {
  return (
    <OnboardingLayout
      heading={<WelcomeText>Welcome to <Highlight>CareerMap</Highlight> 👋</WelcomeText>}
      subtext="Let's help you discover what's possible."
      alignFooterBottom={true}
      visual={<MatchCardsVisual />}
      // Mobile Welcome doesn't stack MatchCardsVisual on top like the
      // quiz steps do — it has its own much simpler treatment (the wave
      // graphic below, sitting behind the buttons). Desktop still gets
      // MatchCardsVisual as normal.
      hideVisualOnMobile
      headingMaxWidth="600px"
      subtextMarginTop="10px"
      bodyGap="0"
      footer={
        <>
          <WelcomeWaveVisual />
          <PrimaryButton onClick={onCreateAccount}>Create Account</PrimaryButton>
          <OutlineButton onClick={onLogIn}>Log In</OutlineButton>
          <TermsText>
            By continuing, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
          </TermsText>
        </>
      }
      // no nextButton — this screen uses the CTA buttons instead
    />
  );
}

const WelcomeText = styled.span`
  display: inline-block;
  font-size: ${fontsize.xl};
  max-width: 600px;

  @media (max-width: 900px) {
    font-size: clamp(28px, 8vw, ${fontsize.xl});
    max-width: 320px;
  }
`;