'use client'

import { IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'
import { FlashList, type FlashListRenderItem } from '@/components/core/v2'
import { Text } from '@/components/core/v2/text'

export default function List({ data }: { data: { id: string; title: string }[] }) {
  const renderItem: FlashListRenderItem<{ id: string; title: string }> = ({ item }) => (
    <Link
      href={`/v2-demo/${item.id}`}
      className="mb-2 flex justify-between rounded-lg bg-white/10 px-3 py-2"
    >
      <Text>{item.title}</Text>
      <IconChevronRight className="size-4" />
    </Link>
  )
  return (
    <FlashList
      data={data}
      onEndReached={() => {
        console.log('onEndReached')
      }}
      ListHeaderComponent={() => <Text className="p-4">Header</Text>}
      ListFooterComponent={() => <Text className="p-4">Footer</Text>}
      className="mt-4"
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerClassName="px-4"
    />
  )
}
