import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { products, productName } from '../data'
import { formatPrice, useStore } from '../store'

const suggestions = ['Linen', 'Đầm', 'Matcha', 'Phụ kiện', 'Lụa']

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!searchOpen) return undefined
    setQuery('')
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120)
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [searchOpen, setSearchOpen])

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    const pool = term
      ? products.filter((product) =>
          [product.name, product.nameVi, product.category, product.material, product.color]
            .join(' ')
            .toLowerCase()
            .includes(term),
        )
      : products.filter((product) => product.isNew).slice(0, 4)
    return pool.slice(0, 6)
  }, [query])

  if (!searchOpen) return null

  const chooseResult = (slug) => {
    setSearchOpen(false)
    navigate(`/product/${slug}`)
  }

  return (
    <div className="search-layer" role="dialog" aria-modal="true" aria-label="Tìm kiếm">
      <div className="search-top container">
        <span className="eyebrow">Tìm trong atelier</span>
        <button className="icon-button bordered" onClick={() => setSearchOpen(false)} aria-label="Đóng tìm kiếm">
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>

      <div className="search-body container">
        <div className="search-input-wrap">
          <Search size={28} strokeWidth={1.2} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Bạn đang tìm món đồ nào?"
            aria-label="Tìm kiếm sản phẩm"
          />
        </div>

        <div className="search-suggestions">
          <span>Gợi ý</span>
          {suggestions.map((suggestion) => (
            <button key={suggestion} onClick={() => setQuery(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>

        <div className="search-results-head">
          <p>{query ? `Tìm thấy ${results.length} thiết kế` : 'Mới về'}</p>
          {!query && (
            <Link to="/shop" onClick={() => setSearchOpen(false)} className="text-link">
              Xem tất cả <ArrowUpRight size={14} />
            </Link>
          )}
        </div>

        {results.length > 0 ? (
          <div className="search-results">
            {results.map((product) => (
              <button
                className="search-result"
                key={product.slug}
                onClick={() => chooseResult(product.slug)}
              >
                <img src={product.images[0]} alt={productName(product)} />
                <span className="search-result-copy">
                  <span className="search-result-name">{productName(product)}</span>
                  <span className="search-result-meta">
                    {product.material} · {formatPrice(product.price)}
                  </span>
                </span>
                <ArrowUpRight size={16} strokeWidth={1.3} />
              </button>
            ))}
          </div>
        ) : (
          <div className="search-empty">
            <h3>Chưa tìm thấy thiết kế phù hợp.</h3>
            <p>Hãy thử theo chất liệu, màu sắc hoặc danh mục.</p>
          </div>
        )}
      </div>
    </div>
  )
}
