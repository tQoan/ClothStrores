import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Plus, X } from 'lucide-react'
import { formatPrice, useStore } from '../store'

export default function ProductCard({ product, index = 0 }) {
  const [quickOpen, setQuickOpen] = useState(false)
  const [size, setSize] = useState('')
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const saved = wishlist.includes(product.slug)

  const add = () => {
    if (!size) return
    addToCart(product, size)
    setQuickOpen(false)
    setSize('')
  }

  return (
    <article className="product-card">
      <div className="product-media">
        <Link
          to={`/product/${product.slug}`}
          className="product-image-link"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading={index < 2 ? 'eager' : 'lazy'}
          />
        </Link>

        {product.badge && <span className="product-badge">{product.badge}</span>}

        <button
          className={`wishlist-button ${saved ? 'is-saved' : ''}`}
          onClick={() => toggleWishlist(product.slug)}
          aria-label={saved ? `Remove ${product.name} from saved pieces` : `Save ${product.name}`}
          aria-pressed={saved}
        >
          <Heart size={16} strokeWidth={1.5} fill={saved ? 'currentColor' : 'none'} />
        </button>

        {quickOpen ? (
          <div className="quick-add-panel" onClick={(event) => event.stopPropagation()}>
            <div className="quick-add-head">
              <span>Select a size</span>
              <button
                className="quick-close"
                onClick={() => setQuickOpen(false)}
                aria-label="Close quick add"
              >
                <X size={14} />
              </button>
            </div>
            <div className="quick-sizes">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  className={size === option ? 'active' : ''}
                  onClick={() => setSize(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="quick-add-submit" onClick={add} disabled={!size}>
              Add to bag — {formatPrice(product.price)}
            </button>
          </div>
        ) : (
          <button
            className="quick-add-trigger"
            onClick={() => setQuickOpen(true)}
            aria-label={`Quick add ${product.name}`}
          >
            <Plus size={15} strokeWidth={1.5} />
            Quick add
          </button>
        )}
      </div>

      <div className="product-info">
        <div className="product-info-top">
          <div>
            <Link className="product-name" to={`/product/${product.slug}`}>
              {product.name}
            </Link>
            <p className="product-material">{product.material}</p>
          </div>
          <span className="product-price">{formatPrice(product.price)}</span>
        </div>
        <div className="product-swatches" aria-label={`Available in ${product.colors.length} colours`}>
          {product.colors.map((color) => (
            <span
              key={color.name}
              className="product-swatch"
              style={{ background: color.hex }}
              title={color.name}
            />
          ))}
          <span className="product-color-label">{product.color}</span>
        </div>
      </div>
    </article>
  )
}
