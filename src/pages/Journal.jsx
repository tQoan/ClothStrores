import { useNavigate } from 'react-router-dom'
import { Button } from '@astryxdesign/core/Button'
import { Stack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { journalPosts } from '../data'
import PlaceholderPage from '../components/PlaceholderPage'

export default function Journal() {
  const navigate = useNavigate()

  return (
    <PlaceholderPage
      eyebrow="Journal"
      title="Notes on cloth, care and living slowly."
      description="Material studies, atelier notes and the occasional letter from the studio."
    >
      {journalPosts.map((post) => (
        <Stack key={post.id} gap={1}>
          <Text type="label" color="accent">
            {post.category} — {post.date}
          </Text>
          <Text type="large" weight="semibold">
            {post.title}
          </Text>
          <Text type="body" color="secondary" as="p">
            {post.excerpt}
          </Text>
        </Stack>
      ))}
      <Button label="Visit the shop" variant="secondary" onClick={() => navigate('/shop')} />
    </PlaceholderPage>
  )
}
