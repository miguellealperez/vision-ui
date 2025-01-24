import { HeroBackground } from "@/components/landing/hero-background";
import { Cursor } from "@/components/core/cursor";

function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cursor />
      <HeroBackground>{children}</HeroBackground>
    </>
  );
}

export default LandingLayout;
