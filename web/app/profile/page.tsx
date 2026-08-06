'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import {
  Lock,
  Bookmark,
  Users,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useGetMe, useLogout } from '@/hooks/auth.hook';

// ---------- Styled Components ----------
const Container = styled.div`
  width: 390px;
  min-height: 100vh;
  padding: 25px;
  color: #fff;
  position: relative;
  background: #0d0130;

  @media (max-width: 430px) {
    width: 100%;
    padding: 20px;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const ProfileCard = styled.div`
  background: #1d0d55;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
`;

const ProfileImg = styled(Image)`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
`;

const ProfileName = styled.h2`
  margin-bottom: 5px;
`;

const ProfileTitle = styled.p`
  color: #cfcfcf;
  margin: 10px 0 20px;
`;

const EditButton = styled.button`
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(90deg, #7d3cff, #9d58ff);
  color: #fff;
  font-size: 17px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;

const Menu = styled.div`
  margin-top: 25px;
`;

const MenuItem = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  margin-bottom: 12px;
  background: #1d0d55;
  border-radius: 12px;
  text-decoration: none;
  color: white;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #2d1a6a;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  svg {
    font-size: 20px;
  }
`;

// ---------- Component ----------
export default function ProfilePage() {
  const router = useRouter();
  const { data: userData } = useGetMe();
  const logoutMutation = useLogout();
  const [user, setUser] = useState({ fullName: 'Micheal Adefioye', title: 'Frontend Developer' });

  const profileName = userData?.full_name || userData?.fullName || user.fullName;

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await logoutMutation.mutateAsync();
        router.push('/login');
      } catch {
        router.push('/login');
      }
    }
  };

  return (
    <Container>
      <Header>
        <h2>Profile</h2>
      </Header>

      <ProfileCard>
        <ProfileImg
          src="/images/user.jpg"
          alt="Profile"
          width={110}
          height={110}
        />
        <ProfileName>{profileName}</ProfileName>
        <ProfileTitle>{user.title}</ProfileTitle>
        <EditButton onClick={() => router.push('/edit-profile')}>
          Edit Profile
        </EditButton>
      </ProfileCard>

      <Menu>
        <MenuItem href="/forgot-password">
          <span className="left">
            <Lock size={20} />
            Change Password
          </span>
          <ChevronRight size={20} />
        </MenuItem>

        <MenuItem href="/saved">
          <span className="left">
            <Bookmark size={20} />
            Saved Careers
          </span>
          <ChevronRight size={20} />
        </MenuItem>

        <MenuItem href="/saved-mentors">
          <span className="left">
            <Users size={20} />
            Saved Mentors
          </span>
          <ChevronRight size={20} />
        </MenuItem>

        <MenuItem onClick={handleLogout} href="#">
          <span className="left">
            <LogOut size={20} />
            Logout
          </span>
          <ChevronRight size={20} />
        </MenuItem>
      </Menu>

      <BottomNav />
    </Container>
  );
}