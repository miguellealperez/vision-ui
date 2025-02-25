import { StaticImageData } from "next/image";

import yosemiteIcon from "@/public/assets/environments/adam-kool-yosemite-icon.avif";
import yosemiteBackground from "@/public/assets/environments/adam-kool-yosemite-background.avif";
import joshuaTreeIcon from "@/public/assets/environments/cedric-letsch-joshua-tree-icon.avif";
import joshuaTreeBackground from "@/public/assets/environments/cedric-letsch-joshua-tree-background.avif";
import homeNightIcon from "@/public/assets/environments/home-night-icon.avif";
import homeNightBackground from "@/public/assets/environments/home-night-background.avif";
import haleakalaIcon from "@/public/assets/environments/tevin-trinh-haleakala-icon.avif";
import haleakalaBackground from "@/public/assets/environments/tevin-trinh-haleakala-background.avif";

export interface Environment {
  id: string;
  label: string;
  icon: StaticImageData;
  background: StaticImageData;
  credit: { name: string; url: string };
}

const data: Environment[] = [
  {
    id: "home-night",
    label: "Home Night",
    icon: homeNightIcon,
    background: homeNightBackground,
    credit: {
      name: "Figma",
      url: "",
    },
  },
  {
    id: "yosemite",
    label: "Yosemite",
    icon: yosemiteIcon,
    background: yosemiteBackground,
    credit: {
      name: "Adam Kool",
      url: "https://unsplash.com/@adamkool",
    },
  },
  {
    id: "joshua-tree",
    label: "Joshua Tree",
    icon: joshuaTreeIcon,
    background: joshuaTreeBackground,
    credit: {
      name: "Cedric Letsch",
      url: "https://unsplash.com/@cedricletsch",
    },
  },
  {
    id: "haleakala",
    label: "Haleakala",
    icon: haleakalaIcon,
    background: haleakalaBackground,
    credit: {
      name: "Tevin Trinh",
      url: "https://unsplash.com/@tevintrinh",
    },
  },
];

export default data;
