import { Text, View } from '@/components/core/v2'
import { Stack } from '@/components/core/v2/stack'

const _data = Array.from({ length: 24 }).map((_, i) => ({
  id: String(i),
  title: `Item ${i + 1}`,
}))

export default function HomePage() {
  return (
    <Stack options={{ title: 'Home' }} className="p-6">
      <View>
        <Text>Browse Components</Text>
      </View>
    </Stack>
  )
}
