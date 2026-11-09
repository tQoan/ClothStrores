import { useNavigate } from 'react-router-dom'
import { Button } from '@astryxdesign/core/Button'
import { Stack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import PlaceholderPage from '../components/PlaceholderPage'

const values = [
  {
    title: 'Natural fibres',
    text: 'Linen, silk and organic cotton, chosen for how they age rather than how they photograph.',
  },
  {
    title: 'Made slowly',
    text: 'Small-batch production with traceable mills and makers we have worked with for years.',
  },
  {
    title: 'Made to be kept',
    text: 'Repairs and care for life, because the most sustainable garment is the one you keep wearing.',
  },
]

export default function Atelier() {
  const navigate = useNavigate()

  return (
    <PlaceholderPage
      eyebrow="The atelier"
      title="Considered clothing, made at a human pace."
      description="A small studio working with natural cloth, honest construction and a deliberately short collection."
    >
      {values.map((value) => (
        <Stack key={value.title} gap={1}>
          <Text type="label" weight="semibold">
            {value.title}
          </Text>
          <Text type="body" color="secondary" as="p">
            {value.text}
          </Text>
        </Stack>
      ))}
      <Button label="Explore the collection" variant="primary" onClick={() => navigate('/shop')} />
    </PlaceholderPage>
  )
}
