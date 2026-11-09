import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { Badge } from '@astryxdesign/core/Badge'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { Stack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { formatPrice, useStore } from '../store'
import { productName } from '../data'

export default function HomeProductCard({ product, name, badge, material }) {
  const { addToCart, toggleWishlist, wishlist, notify } = useStore()
  const saved = wishlist.includes(product.slug)
  const displayName = name ?? productName(product)
  const displayMaterial = material ?? product.material

  const quickAdd = () => {
    addToCart(product, product.sizes[0], 1, { openDrawer: false })
    notify(`${displayName} đã được thêm vào giỏ.`)
  }

  return (
    <Card padding={0} className="ma-product-card">
      <Stack className="ma-product-media" gap={0}>
        <Link
          to={`/product/${product.slug}`}
          className="ma-product-image"
          aria-label={`Xem ${displayName}`}
        >
          <img src={product.images[0]} alt={displayName} loading="lazy" />
        </Link>

        {badge ? <Badge variant="green" label={badge} className="ma-product-badge" /> : null}

        <button
          type="button"
          className={`ma-heart ${saved ? 'is-saved' : ''}`}
          onClick={() => toggleWishlist(product.slug)}
          aria-label={saved ? `Bỏ lưu ${displayName}` : `Lưu ${displayName}`}
          aria-pressed={saved}
        >
          <Heart size={16} strokeWidth={1.5} fill={saved ? 'currentColor' : 'none'} />
        </button>

        <Button
          variant="primary"
          size="sm"
          className="ma-quick-add"
          icon={<ShoppingBag size={15} strokeWidth={1.5} />}
          onClick={quickAdd}
        >
          Thêm nhanh vào giỏ
        </Button>
      </Stack>

      <Stack className="ma-product-info" gap={0}>
        <Stack
          direction="horizontal"
          gap={1}
          className="ma-swatches"
          aria-label={`${product.colors.length} màu có sẵn`}
        >
          {product.colors.map((color) => (
            <Text
              key={color.name}
              as="span"
              className="ma-swatch"
              style={{ background: color.hex }}
              title={color.name}
              aria-hidden="true"
            >
              {' '}
            </Text>
          ))}
        </Stack>

        <Link className="ma-product-name" to={`/product/${product.slug}`}>
          {displayName}
        </Link>

        <Stack direction="horizontal" className="ma-product-meta" gap={0}>
          <Text as="span" className="ma-price">
            {formatPrice(product.price)}
          </Text>
          <Text as="span" className="ma-material">
            {displayMaterial}
          </Text>
        </Stack>
      </Stack>
    </Card>
  )
}
