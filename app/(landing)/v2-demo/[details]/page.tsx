"use client";

import { use } from "react";
import { Text, View } from "@/components/core/v2";
import { Stack } from "@/components/core/v2/stack";

export default function DetailsPage({ params }: { params: Promise<{ details: string }> }) {
  const detailsPromise = use(params);
  return (
    <>
      <Stack.Screen
        name="[details]"
        options={{
          title: `Details ${detailsPromise.details}`,
        }}
      />
      <View className="p-4">
        <Text className="font-semibold text-xl">Details Page</Text>
        <Text className="mt-2 text-white/70">This is the details screen</Text>
      </View>
    </>
  );
}
