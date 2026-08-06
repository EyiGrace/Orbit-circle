'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styled from 'styled-components'
import { Wrapper } from '@/components/shared/Layout.styled'
import { PrimaryButton } from '@/components/onboarding/shared'
import colors from '@/lib/colors'

export default function CheckEmailPage() {
  const router = useRouter()

  return (
    <Wrapper>
      <PageContainer>
        <Content>
          <Title>Check Your Email</Title>
          <Subtitle>
            We sent a password reset link to your inbox. Open it to choose a new password and regain access.
          </Subtitle>

          <ButtonRow>
            <PrimaryButton onClick={() => router.push('/login')}>
              Back to Login
            </PrimaryButton>
          </ButtonRow>
        </Content>

        <Illustration>
          <Image
            src="/image/Image2.png"
            alt="Check your email"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Illustration>
      </PageContainer>
    </Wrapper>
  )
}

const PageContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  position: relative;
  width: 100vw;
  max-width: 1440px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 100px 80px 30px 80px;
  gap: 20px;
  background: ${colors.background};
  overflow: hidden;
`

const Content = styled.div`
  flex: 0 1 375px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  z-index: 2;
`

const Title = styled.h1`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 44px;
  line-height: 53px;
  color: ${colors.normalWhite};
`

const Subtitle = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.normalWhite};
  max-width: 375px;
`

const ButtonRow = styled.div`
  width: 356px;
`

const Illustration = styled.div`
  flex: 0 0 auto;
  width: 700px;
  height: 490px;
  border-radius: 32px;
  overflow: hidden;
  position: relative;
`
