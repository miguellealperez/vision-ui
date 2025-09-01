import { Text, View } from '@/components/core/v2'
import { Stack } from '@/components/core/v2/stack'

export default function AboutPage() {
  return (
    <Stack options={{ title: 'About' }} className="p-6" material>
      <View>
        <Text size="title1" className="mb-4">
          This is the about page
        </Text>
      </View>
    </Stack>
  )
}
