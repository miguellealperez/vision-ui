"use client";

import { useRouter } from "next/navigation";
import { Stack } from "@/components/core/v2/stack";

export default function V2DemoLayout({ children }: LayoutProps<"/v2-demo">) {
  const router = useRouter();
  return (
    <Stack material>
      {/* Define screen options for each route */}
      <Stack.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: true,
        }}
      />
      {/* Dynamic route pattern - applies to any route except explicitly defined ones */}
      <Stack.Screen
        name="[details]"
        options={{
          title: "Details", // This will be used for any dynamic route
          headerShown: true,
          headerLeft: () => (
            <button
              type="button"
              className="text-blue-500"
              onClick={() => {
                router.back();
              }}
            >
              Back
            </button>
          ),
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          title: "Welcome",
          headerShown: true,
        }}
      />
      {children}
    </Stack>
  );
}
