import {
  honeycombIconClassName,
  HoneycombItem,
  HoneycombLayout,
} from "@/components/core/grid-layout";

import Image from "next/image";

import settingsIcon from "@/public/assets/landing/home/icon-settings.png";
import appStoreIcon from "@/public/assets/landing/home/icon-app-store.png";
import photosIcon from "@/public/assets/landing/home/icon-photos.png";
import githubIcon from "@/public/assets/landing/home/icon-github.png";
import docsIcon from "@/public/assets/landing/home/icon-docs.png";

const items: HoneycombItem[] = [
  {
    id: "settings",
    label: "Settings",
    background: <div className="h-full w-full bg-[#2E2E2F]"></div>,
    icon: (
      <Image
        src={settingsIcon}
        alt="Settings"
        className={honeycombIconClassName}
      />
    ),
    href: "/settings",
  },
  {
    id: "app-store",
    label: "App Store",
    icon: (
      <Image
        src={appStoreIcon}
        alt="App Store"
        className={honeycombIconClassName}
      />
    ),
    background: (
      <div className="h-full w-full bg-gradient-to-t from-blue-600 to-sky-400"></div>
    ),
    href: "/app-store",
  },
  {
    id: "photos",
    label: "Photos",
    icon: (
      <Image src={photosIcon} alt="Photos" className={honeycombIconClassName} />
    ),
    background: <div className="h-full w-full bg-white"></div>,
    href: "/photos",
  },
  {
    id: "github",
    label: "Github",
    icon: (
      <Image src={githubIcon} alt="Github" className={honeycombIconClassName} />
    ),
    background: (
      <div className="h-full w-full bg-gradient-to-t from-[#060606] to-[#333b40]"></div>
    ),
    href: "https://github.com/fluid-design-io/vision-ui",
  },
  {
    id: "docs",
    label: "Docs",
    icon: (
      <Image src={docsIcon} alt="Docs" className={honeycombIconClassName} />
    ),
    background: (
      <div className="h-full w-full bg-gradient-to-t from-[#FCC804] to-[#FFAC04]"></div>
    ),
    href: "/docs",
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `test-${i}`,
    label: `Test ${i}`,
    background: <div className="h-full w-full bg-[#333333]"></div>,
    icon: (
      <Image
        src={settingsIcon}
        alt="Settings"
        fill
        className={honeycombIconClassName}
      />
    ),
  })),
  // {
  //   id: "mail",
  //   label: "Mail",
  //   background: <div className="h-full w-full"></div>,
  //   icon: <div className="bg-blue-500"></div>,
  // },
  // {
  //   id: "messages",
  //   label: "Messages",
  //   background: <div className="h-full w-full"></div>,
  //   icon: <div className="bg-blue-500"></div>,
  // },
  // {
  //   id: "maps",
  //   label: "Maps",
  //   background: <div className="h-full w-full"></div>,
  //   icon: <div className="bg-blue-500"></div>,
  // },
];

function HomeView() {
  return <HoneycombLayout items={items} />;
}

export default HomeView;
