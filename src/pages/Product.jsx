import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@astryxdesign/core/Button'
import { Stack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { products } from '../data'
import PlaceholderPage from '../components/PlaceholderPage'

export default function Product() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => item.slug === slug)

  if (!product) {
    return (
      <PlaceholderPage
        eyebrow="Product"
        title="This piece has drifted out of season."
        description="We could not find the product you were looking for."
      >
        <Button label="Browse the collection" variant="primary" onClick={() => navigate('/shop')} />
      </PlaceholderPage>
    )
  }

  return (
    <PlaceholderPage
      eyebrow={`${product.category} — ${product.material}`}
      title={product.name}
      description={product.description}
    >
      <Text type="large" weight="semibold">
        ${product.price}
      </Text>
      <Text type="body" color="secondary" as="p">
        {product.fit}
      </Text>
      <Stack direction="horizontal" gap={2} wrap="wrap">
        {product.sizes.map((size) => (
          <Text key={size} type="label">
            {size}
          </Text>
        ))}
      </Stack>
      <Button label="Add to cart" variant="primary" onClick={() => navigate('/checkout')} />
      <Text type="supporting" color="secondary">
        {product.stockNote}
      </Text>
    </PlaceholderPage>
  )
}
