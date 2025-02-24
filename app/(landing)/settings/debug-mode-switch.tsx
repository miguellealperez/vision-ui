"use client";

import { Switch } from "@/components/core/switch";
import { debugModeAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

export function DebugModeSwitch() {
  const [debugMode, setDebugMode] = useAtom(debugModeAtom);

  return <Switch checked={debugMode} onCheckedChange={setDebugMode} />;
}
