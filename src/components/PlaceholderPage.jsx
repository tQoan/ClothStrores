import { Stack } from '@astryxdesign/core/Stack'
import { Heading, Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'

/**
 * Temporary Astryx-powered page shell used while the storefront pages are
 * migrated. It intentionally keeps the app's container/editorial rhythm.
 */
export default function PlaceholderPage({ eyebrow, title, description, children }) {
  return (
    <section className="container" style={{ paddingBlock: 'clamp(3rem, 8vw, 6rem)' }}>
      <Stack gap={4} hAlign="start" maxWidth={760}>
        {eyebrow ? (
          <Text type="label" color="accent">
            {eyebrow}
          </Text>
        ) : null}
        <Heading level={1}>{title}</Heading>
        {description ? (
          <Text type="large" color="secondary" as="p">
            {description}
          </Text>
        ) : null}
        <Card variant="muted" padding={5} width="100%">
          <Stack gap={3} hAlign="start">
            {children}
          </Stack>
        </Card>
      </Stack>
    </section>
  )
}
