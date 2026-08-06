'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import { ChevronLeft } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

// ---------- Styled Components ----------
const Container = styled.div`
  width: 390px;
  min-height: 100vh;
  background: #140041;
  color: #fff;
  padding: 25px;
  position: relative;
  overflow: hidden;

  @media (max-width: 430px) {
    width: 100%;
    padding: 20px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 430px) {
    h2 {
      font-size: 28px;
    }
  }
`;

const BackButton = styled.button`
  width: 55px;
  height: 55px;
  border: none;
  border-radius: 15px;
  background: #3b246d;
  color: white;
  font-size: 22px;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #7b3ff6;
  }
`;

const Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  margin-top: -30px;

  img {
    width: 280px;
    max-width: 100%;
    height: 150px;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-12px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @media (max-width: 430px) {
    img {
      width: 240px;
    }
  }
`;

const Content = styled.div`
  text-align: center;

  h1 {
    font-size: 20px;
    line-height: 1;
    margin-bottom: 45px;

    @media (max-width: 430px) {
      font-size: 31px;
    }
  }

  p {
    color: #d4d4d4;
    font-size: 17px;
    line-height: 1;
    margin-bottom: 75px;
  }
`;

const StartButton = styled.button`
  width: 100%;
  height: 55px;
  border: none;
  border-radius: 18px;
  background: linear-gradient(90deg, #7a3df2, #9a52ff);
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 10px 25px rgba(146, 78, 255, 0.35);
  margin-bottom: 40px;

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 430px) {
    height: 60px;
    font-size: 22px;
  }
`;

// ---------- Component ----------
export default function MentorPage() {
  const router = useRouter();

  return (
    <Container>
      <Header>
        <BackButton onClick={() => router.back()}>
          <ChevronLeft size={24} />
        </BackButton>
        <h2>Find a Mentor</h2>
      </Header>

      <Hero>
        <Image
          src="/image/message.png"
          alt="Mentor"
          width={280}
          height={150}
          priority
        />
      </Hero>

      <Content>
        <h1>We&apos;ll find the right mentors for you.</h1>
        <p>
          Answer a few questions and we &apos; ll
          show you mentors personalized for
          your career goals.
        </p>
      </Content>

      <StartButton onClick={() => router.push('/mentor-profile')}>
        Get Started
      </StartButton>

      <BottomNav />
    </Container>
  );
}