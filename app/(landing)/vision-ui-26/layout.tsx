import { IconGrid3x3, IconHome, IconInfoCircle } from '@tabler/icons-react'
import { AlertProvider } from '@/components/core/v2'
import { Ornament, type OrnamentTabProps } from '@/components/core/v2/ornament'
import { generateUrl } from './constants'

const tabs: OrnamentTabProps[] = [
  { name: 'Home', href: generateUrl(), icon: <IconHome /> },
  { name: 'About', href: generateUrl('about'), icon: <IconInfoCircle /> },
  { name: 'Grid List', href: generateUrl('grid-list'), icon: <IconGrid3x3 /> },
]

export default function V2DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <Ornament tabs={tabs}>{children}</Ornament>
    </AlertProvider>
  )
}
