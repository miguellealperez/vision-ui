"use client";

import { HoneycombItem, HoneycombLayout } from "@/components/core/grid-layout";

import Image from "next/image";

import data from "@/components/environment/data";
import { saveEnvironment } from "@/lib/cookie-store";

const items: HoneycombItem[] = data.map((environment) => ({
  id: environment.id,
  label: environment.label,
  icon: null,
  background: (
    <Image
      src={environment.icon}
      alt={environment.label + " by " + environment.credit.name}
      className="size-full object-cover"
    />
  ),
  onClick: () => saveEnvironment(environment.id),
}));

function EnvironmentView() {
  return <HoneycombLayout items={items} />;
}

export default EnvironmentView;
