import { IconHome, IconInfoCircle } from '@tabler/icons-react'
import { AlertProvider } from '@/components/core/v2'
import { Ornament, type OrnamentTabProps } from '@/components/core/v2/ornament'
import { WindowControls } from '@/components/core/v2/window-control'
import { generateUrl } from './constants'

const tabs: OrnamentTabProps[] = [
  { name: 'Home', href: generateUrl(), icon: <IconHome /> },
  { name: 'About', href: generateUrl('about'), icon: <IconInfoCircle /> },
]

export default function V2DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <Ornament tabs={tabs}>
        {children}
        <WindowControls />
      </Ornament>
    </AlertProvider>
  )
}
