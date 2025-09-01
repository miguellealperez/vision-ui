'use client'

import { IconBell, IconDownload, IconHome, IconSettings } from '@tabler/icons-react'
import { SidebarButton, type SidebarItem, type SidebarLink } from '../core/v2/sidebar-button'

const sidebarItems: (SidebarItem | SidebarLink)[] = [
  {
    name: 'home',
    href: '/',
    icon: <IconHome />,
    title: 'Home',
  },
  {
    name: 'settings',
    href: '/settings',
    icon: <IconSettings />,
    title: 'Settings',
    badge: 'New',
  },
  {
    name: 'notifications',
    icon: <IconBell />,
    title: 'Notifications',
    onClick: () => {
      console.log('Notifications clicked')
    },
  },
  {
    name: 'download',
    icon: <IconDownload />,
    title: 'Download All',
    onClick: () => {
      console.log('Download clicked')
    },
  },
]

export const SidebarButtonDemo = () => {
  return (
    <div className="w-80 space-y-2 rounded-lg border p-4">
      <h3 className="font-semibold">SidebarButton Demo</h3>
      <div className="space-y-1">
        {sidebarItems.map((item, index) => (
          <SidebarButton
            key={item.name}
            item={item}
            isActive={index === 0} // First item is active for demo
            className="flex w-full items-center justify-stretch rounded-xl px-[10px] before:rounded-xl"
          />
        ))}
      </div>
    </div>
  )
}
