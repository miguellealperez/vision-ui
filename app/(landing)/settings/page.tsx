import {
  NavigationBar,
  NavigationBarTitle,
} from "@/components/core/navigation-bar";
import { SidebarTrigger } from "@/components/core/sidebar";

export const dynamic = "force-dynamic";

export default function Settings() {
  //* Artifical delay
  // await new Promise((resolve) => setTimeout(resolve, 600));
  return (
    <>
      <NavigationBar size="sm" className="sticky rounded-tl-none px-3.5">
        <SidebarTrigger />
        <NavigationBarTitle variant="center">Settings</NavigationBarTitle>
      </NavigationBar>
      <div className="relative my-4 h-[200px] bg-red-500/20">Main Content</div>
      <div className="relative my-4 h-[200px] bg-red-500/20">Main Content</div>
      <div className="relative my-4 h-[200px] bg-red-500/20">Main Content</div>
      <div className="relative my-4 h-[200px] bg-red-500/20">Main Content</div>
    </>
  );
}
