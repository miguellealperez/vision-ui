import { IconHome, IconInfoCircle } from '@tabler/icons-react'
import { AlertProvider } from '@/components/core/v2'
import { Ornament, type OrnamentTabProps } from '@/components/core/v2/ornament'

const tabs: OrnamentTabProps[] = [
  { name: 'Home', href: '/v2-demo/home', icon: <IconHome /> },
  { name: 'About', href: '/v2-demo/about', icon: <IconInfoCircle /> },
]

export default function V2DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <Ornament tabs={tabs}>{children}</Ornament>
    </AlertProvider>
  )
}
