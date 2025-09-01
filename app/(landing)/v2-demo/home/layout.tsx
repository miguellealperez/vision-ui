import {
  IconBell,
  IconBolt,
  IconList,
  IconPalette,
  IconSettings,
  IconStack,
} from '@tabler/icons-react'
import { Text } from '@/components/core/v2'
import { Button } from '@/components/core/v2/button'
import { Sidebar, SidebarHeader, type SidebarItemProps } from '@/components/core/v2/sidebar'

const BASE_PATH = '/v2-demo/home'
const genHref = (path: string) => `${BASE_PATH}/${path}`

const sidebarItems: SidebarItemProps[] = [
  { name: 'Stack', href: genHref('stack'), icon: <IconStack />, title: 'Stack' },
  {
    name: 'Alert',
    href: genHref('alert'),
    icon: <IconBell />,
    title: 'Alert',
  },
  {
    name: 'FlashList',
    href: genHref('flashlist'),
    icon: <IconBolt />,
    title: 'FlashList',
  },
  {
    title: 'Section 1',
    items: [
      { name: 'Item 1', icon: <IconList />, title: 'Item 1' },
      { name: 'Item 2', icon: <IconList />, title: 'Item 2' },
    ],
  },
  {
    title: 'Section 2',
    items: [
      { name: 'Item 3', icon: <IconList />, title: 'Item 3' },
      { name: 'Item 4', icon: <IconList />, title: 'Item 4' },
    ],
  },
  { name: 'Settings', href: '/v2-demo/settings', icon: <IconSettings />, title: 'Settings' },
  { name: 'Appearance', href: '/v2-demo/appearance', icon: <IconPalette />, title: 'Appearance' },
  ...Array.from({ length: 30 }).map((_, i) => ({
    name: `Item ${i + 1}`,
    href: `/v2-demo/item/${i + 1}`,
    icon: <IconList />,
    title: `Item ${i + 1}`,
  })),
]

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar
      items={sidebarItems}
      header={<SidebarHeader title="Header" headerRight={<Button>Button</Button>} />}
      footer={<Text>Footer</Text>}
    >
      {children}
    </Sidebar>
  )
}
