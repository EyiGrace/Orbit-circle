"use client";
import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 576px)" }, { defaultMatches: false });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" }, { defaultMatches: false });
  const isLaptop = useMediaQuery({ query: "(max-width: 992px)" }, { defaultMatches: false });
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" }, { defaultMatches: true });

  return { isMobile, isTablet, isLaptop, isDesktop };
};

export default useResponsive;