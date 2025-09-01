'use client'

import {
  IconBell,
  IconDownload,
  IconFile,
  IconFolder,
  IconHome,
  IconPhoto,
  IconSettings,
  IconUser,
} from '@tabler/icons-react'
import { Sidebar, SidebarHeader, type SidebarItemProps } from '../core/v2/sidebar'

const sidebarItems: SidebarItemProps[] = [
  {
    name: 'home',
    href: '/',
    icon: <IconHome />,
    title: 'Home',
  },
  {
    title: 'Content',
    items: [
      {
        name: 'photos',
        href: '/photos',
        icon: <IconPhoto />,
        title: 'Photos',
      },
      {
        name: 'documents',
        href: '/documents',
        icon: <IconFile />,
        title: 'Documents',
      },
      {
        name: 'folders',
        href: '/folders',
        icon: <IconFolder />,
        title: 'Folders',
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        name: 'profile',
        href: '/profile',
        icon: <IconUser />,
        title: 'Profile',
      },
      {
        name: 'settings',
        href: '/settings',
        icon: <IconSettings />,
        title: 'Settings',
        badge: 'New',
      },
    ],
  },
  {
    title: 'Actions',
    items: [
      {
        name: 'notifications',
        icon: <IconBell />,
        title: 'Notifications',
        onClick: () => {
          console.log('Notifications clicked')
          // Handle notification toggle, modal, etc.
        },
      },
      {
        name: 'download',
        icon: <IconDownload />,
        title: 'Download All',
        onClick: () => {
          console.log('Download clicked')
          // Handle download action
        },
      },
    ],
  },
]

export const SidebarWithSectionsExample = () => {
  return (
    <Sidebar
      items={sidebarItems}
      header={
        <SidebarHeader title="My App">
          <div className="text-sm text-white/60">Welcome back!</div>
        </SidebarHeader>
      }
    >
      <div className="p-8">
        <h1 className="font-bold text-2xl">Main Content Area</h1>
        <p className="mt-4 text-gray-600">
          This is the main content area. The sidebar on the left contains sections that can be
          collapsed and expanded.
        </p>
        <div className="mt-6 space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Features Demonstrated:</h3>
            <ul className="mt-2 space-y-1 text-gray-600 text-sm">
              <li>• Regular navigation links (Home, Photos, Documents, etc.)</li>
              <li>• Collapsible sections (Content, Account, Actions)</li>
              <li>• Action items with onClick handlers (Notifications, Download)</li>
              <li>• Badges on items (Settings has "New" badge)</li>
              <li>• Smooth expand/collapse animations</li>
            </ul>
          </div>
        </div>
      </div>
    </Sidebar>
  )
}
