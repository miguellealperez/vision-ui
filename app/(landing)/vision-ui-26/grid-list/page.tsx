'use client'

import { Text, View } from '@/components/core/v2'
import { GridList } from '@/components/core/v2/grid-layout'

interface SampleItem {
  id: number
  title: string
  icon: string
}

const sampleItems: SampleItem[] = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  title: `App ${i + 1}`,
  icon: `✨`,
}))

const AppCell = ({
  item,
  cellX,
  cellY,
}: {
  item: SampleItem
  isTapping: boolean
  cellX: number
  cellY: number
}) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <View
      material={{ thickness: 'thin' }}
      className="flex size-[100px] items-center justify-center rounded-full bg-neutral-900/70 duration-300 [--view-diameter:100px] [--view-radius:50px]"
      style={
        {
          '--cell-x': `${cellX}px`,
          '--cell-y': `${cellY}px`,
        } as React.CSSProperties
      }
    >
      <span>{item.icon}</span>
    </View>
    <Text variant="secondary" size="caption1">
      {item.title}
    </Text>
  </div>
)

export default function GridListPage() {
  return <GridList items={sampleItems} renderCell={(props) => <AppCell {...props} />} />
}
