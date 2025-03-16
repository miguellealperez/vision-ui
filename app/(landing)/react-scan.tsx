"use client";

import { scan } from "react-scan";

import { debugModeAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export default function ReactScan() {
  const debugMode = useAtomValue(debugModeAtom);
  useEffect(() => {
    scan({
      enabled: debugMode,
    });
  }, [debugMode]);
  return null;
}
