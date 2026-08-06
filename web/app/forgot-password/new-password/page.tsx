'use client'

import React, { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styled from 'styled-components'
import AuthLayout from '@/components/auth/AuthLayout'
import { PrimaryButton } from '@/components/onboarding/shared'
import { Lock } from 'lucide-react'
import { InputIcon, StyledInput } from '@/app/signup/page'
import colors from '@/lib/colors'
import { useResetPassword } from '@/hooks/auth.hook'

export default function NewPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const resetMutation = useResetPassword()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const strength = useMemo(() => {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return Math.min(score, 4)
  }, [password])

  const strengthLabel = ['Weak', 'Fair', 'Good', 'Strong'][Math.max(0, strength - 1)] || 'Very Weak'

  const handleUpdate = async () => {
    setMessage(null)
    const token = searchParams.get('token') || ''

    if (!token) {
      setMessage('Missing reset token. Please use the link sent to your email.')
      return
    }

    try {
      await resetMutation.mutateAsync({ token, newPassword: password })
      router.push('/login')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Unable to reset your password right now.')
    }
  }

  return (
    <AuthLayout imageSrc="/image/Image3.png" imageAlt="Secure Password">
      <TextBlock>
        <Title>
          Create new
          <Accent> password</Accent>
        </Title>
        <Description>Make sure its strong and something youll remember.</Description>
      </TextBlock>

      <FormSection>
        <InputGroup>
          <Label>New Password</Label>
          <InputField>
            <InputIcon>
              <Lock size={18} />
            </InputIcon>
            <StyledInput
              type={show ? 'text' : 'password'}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Toggle onClick={() => setShow((s) => !s)}>{show ? 'Hide' : 'Show'}</Toggle>
          </InputField>
        </InputGroup>

        <StrengthRow>
          <Meter>
            {[0, 1, 2, 3].map((i) => (
              <Bar key={i} $active={i < strength} />
            ))}
          </Meter>
          <StrengthLabel>{strengthLabel}</StrengthLabel>
        </StrengthRow>

        <InputGroup>
          <Label>Confirm New Password</Label>
          <InputField>
            <InputIcon>
              <Lock size={18} />
            </InputIcon>
            <StyledInput
              type={show ? 'text' : 'password'}
              placeholder="Re-enter new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </InputField>
        </InputGroup>

        {message ? <StatusText>{message}</StatusText> : null}

        <ButtonRow>
          <PrimaryButton onClick={handleUpdate} disabled={password === '' || password !== confirm || resetMutation.isPending}>
            {resetMutation.isPending ? 'Updating...' : 'Update Password'}
          </PrimaryButton>
        </ButtonRow>
      </FormSection>
    </AuthLayout>
  )
}

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Title = styled.h1`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 44px;
  line-height: 1.15;
  color: ${colors.normalWhite};

  @media (max-width: 900px) {
    font-size: clamp(28px, 7vw, 36px);
  }
`

const Accent = styled.span`
  display: block;
  color: ${colors.buttonPurple};
`

const Description = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(248, 250, 252, 0.8);

  @media (max-width: 900px) {
    font-size: 14px;
  }
`

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

const Label = styled.label`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: ${colors.normalWhite};

  @media (max-width: 900px) {
    font-size: 14px;
  }
`

const InputField = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 0 16px;
  gap: 12px;
  border: 1px solid rgba(248, 250, 252, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
`

const Toggle = styled.button`
  margin-left: auto;
  background: transparent;
  border: none;
  color: ${colors.normalWhite};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`

const StrengthRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const Meter = styled.div`
  display: flex;
  gap: 6px;
  flex: 1;
`

const Bar = styled.span<{ $active: boolean }>`
  flex: 1;
  height: 6px;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? colors.buttonPurple : 'rgba(255,255,255,0.08)')};
  transition: background 0.2s ease;
`

const StrengthLabel = styled.div`
  font-size: 14px;
  color: ${colors.normalWhite};
  font-weight: 600;
  min-width: 70px;
  text-align: right;
`

const ButtonRow = styled.div`
  width: 100%;
  margin-top: 8px;
`

const StatusText = styled.p`
  margin: 0;
  color: #ffd1d1;
  font-size: 14px;
`