"use client";

import List from "./list";

const data = Array.from({ length: 24 }).map((_, i) => ({
  id: String(i),
  title: `Item ${i + 1}`,
}));

export default function HomePage() {
  return <List data={data} />;
}
