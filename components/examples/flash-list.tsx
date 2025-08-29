'use client'

import React from 'react'
import { FlashList } from '../core/v2/flash-list'
import View from '../core/view'

// Generate a large dataset for demonstration
const generateData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `item-${index}`,
    title: `Item ${index}`,
    description: `This is item number ${index} with some additional text to make it longer`,
    color: `hsl(${(index * 137.5) % 360}, 70%, 60%)`,
  }))
}

const LARGE_DATA = generateData(10000)

export default function FlashListExample() {
  const [useVirtual, setUseVirtual] = React.useState(true)
  const [itemCount, setItemCount] = React.useState(1000)

  const data = LARGE_DATA.slice(0, itemCount)

  const renderItem = ({ item, index }: { item: (typeof data)[0]; index: number }) => (
    <div className="flex items-center space-x-4 border-gray-200 border-b p-4 hover:bg-gray-50">
      <View
        className="h-12 w-12 flex-shrink-0 rounded-lg"
        style={{ backgroundColor: item.color }}
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium text-gray-900 text-lg">{item.title}</h3>
        <p className="truncate text-gray-500 text-sm">{item.description}</p>
      </div>
      <div className="text-gray-400 text-sm">#{index}</div>
    </div>
  )

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h1 className="font-bold text-2xl">FlashList with Virtual Scrolling</h1>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useVirtual}
              onChange={(e) => setUseVirtual(e.target.checked)}
              className="rounded"
            />
            <span>Use Virtual Scrolling</span>
          </label>

          <label className="flex items-center space-x-2">
            <span>Items:</span>
            <select
              value={itemCount}
              onChange={(e) => setItemCount(Number(e.target.value))}
              className="rounded border px-2 py-1"
            >
              <option value={100}>100</option>
              <option value={1000}>1,000</option>
              <option value={5000}>5,000</option>
              <option value={10000}>10,000</option>
            </select>
          </label>
        </div>

        <div className="text-gray-600 text-sm">
          {useVirtual ? (
            <p>
              Virtual scrolling enabled - only rendering visible items. Performance optimized for
              large datasets.
            </p>
          ) : (
            <p>
              Standard rendering - all items are rendered in the DOM. May be slower with large
              datasets.
            </p>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          height={600}
          estimatedItemSize={80}
          itemSize={useVirtual ? 80 : undefined}
          onEndReached={() => console.log('Reached end of list')}
          onEndReachedThreshold={0.1}
          className="bg-white"
        />
      </div>

      <div className="text-gray-500 text-sm">
        <p>Total items: {data.length.toLocaleString()}</p>
        <p>Rendering mode: {useVirtual ? 'Virtual' : 'Standard'}</p>
      </div>
    </div>
  )
}
