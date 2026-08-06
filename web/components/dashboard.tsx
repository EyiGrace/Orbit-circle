import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import colors from "@/lib/colors";


export const dash = {
  bg: "#0A003C",
  panel: "#150A4A",
  card: "rgba(35, 16, 92, 0.55)",
  cardBorder: "rgba(119, 59, 236, 0.35)",
  purple: "#773BEC",
  purpleSoft: "rgba(119, 59, 236, 0.18)",
  white: "#F8FAFC",
  muted: "#B9B3D6",
  green: "#4ADE80",
};

const Shell = styled.div`
  display: flex;
  min-height: 100dvh;
  background: ${dash.bg};
  color: ${dash.white};
  font-family: Inter, sans-serif;
`;

const Aside = styled.aside`
  width: 264px;
  flex: none;
  padding: 28px 24px;
  border-right: 1px solid rgba(119, 59, 236, 0.4);
  display: flex;
  flex-direction: column;
  gap: 48px;
`;



const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const NavItem = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  color: ${(p) => (p.$active ? dash.purple : dash.white)};
  background: ${(p) => (p.$active ? dash.purpleSoft : "transparent")};
  border: 1px solid
    ${(p) => (p.$active ? "rgba(119,59,236,0.5)" : "transparent")};

  &:hover {
    background: rgba(119, 59, 236, 0.12);
  }
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  padding: 28px 40px 64px;
`;

const TopBar = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 20px;
  font-weight: 600;
`;

const Avatar = styled.span`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${dash.purple};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: ${colors.normalWhite};
`;

export const Card = styled.section`
  background: ${dash.card};
  border: 1px solid ${dash.cardBorder};
  border-radius: 20px;
  padding: 24px;
`;

export const Accent = styled.span`
  color: ${dash.purple};
`;

export const Muted = styled.p`
  margin: 0;
  color: ${dash.muted};
`;

function Icon({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const NAV = [
  { to: "/dashboard", label: "Home", d: "M4 10.5 12 4l8 6.5V20H4z" },
  { to: "/quiz", label: "Quiz", d: "M5 3h14v18H5zM9 8h6M9 12h6M9 16h4" },
  {
    to: "/profile",
    label: "Profile",
    d: "M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM5 20c0-3 3.1-5 7-5s7 2 7 5",
  },
  {
    to: "/mentors",
    label: "Mentors",
    d: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 19c0-2.8 2.7-4.5 6-4.5S15 16.2 15 19M16 6.2a3 3 0 0 1 0 5.6M18 19c0-2 -.8-3.3-2-4",
  },
  { to: "/saved", label: "Saved", d: "M7 4h10v16l-5-3.5L7 20z" },
] as const;

export function BellIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 10a5.5 5.5 0 1 1 11 0c0 4 1.5 5.5 1.5 5.5H5S6.5 14 6.5 10ZM10 19a2.2 2.2 0 0 0 4 0"
        stroke={dash.white}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12h15M13 6l6 6-6 6"
        stroke={dash.white}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardShell({
  heading,
  topRight,
  children,
}: {
  heading: ReactNode;
  topRight?: ReactNode;
  children: ReactNode;
}) {

  const pathname = usePathname();

  return (
    <Shell>
      <Aside>
        
        <Nav>
          {NAV.map((n) => (
            <NavItem key={n.label} href={n.to} $active={pathname === n.to}>
              <Icon d={n.d} />
              {n.label}
            </NavItem>
          ))}
        </Nav>
      </Aside>
      <Main>
        <TopBar>
          <div>{heading}</div>
          {topRight ?? (
            <User>
              <BellIcon />
              <Avatar>DA</Avatar>
              David Abel
            </User>
          )}
        </TopBar>
        {children}
      </Main>
    </Shell>
  );
}
