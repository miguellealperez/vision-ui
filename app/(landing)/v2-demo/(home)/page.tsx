'use client'

import { Stack } from '@/components/core/v2/stack'
import List from './list'

const data = Array.from({ length: 24 }).map((_, i) => ({
  id: String(i),
  title: `Item ${i + 1}`,
}))

export default function HomePage() {
  return (
    <Stack material={false} options={{ title: 'Home' }}>
      <List data={data} />
    </Stack>
  )
}
