'use client'

import { GridList } from '@/components/core/v2/grid-layout'
import { items, renderCell } from './render-apps'

export default function GridListPage() {
  return <GridList items={items} renderCell={renderCell} />
}
