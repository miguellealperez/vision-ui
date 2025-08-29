import { IconHome, IconInfoCircle } from '@tabler/icons-react'
import { Ornament, type OrnamentTabProps } from '@/components/core/v2/ornament'

const tabs: OrnamentTabProps[] = [
  { name: 'Home', href: '/v2-demo', icon: <IconHome /> },
  { name: 'About', href: '/v2-demo/about', icon: <IconInfoCircle /> },
]

export default function V2DemoLayout({ children }: { children: React.ReactNode }) {
  return <Ornament tabs={tabs}>{children}</Ornament>
}
