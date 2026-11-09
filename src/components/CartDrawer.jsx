import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, LockKeyhole, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { formatPrice, useStore } from '../store'

const FREE_SHIPPING = 150

export default function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
  } = useStore()

  useEffect(() => {
    if (!cartOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setCartOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [cartOpen, setCartOpen])

  if (!cartOpen) return null

  const remaining = Math.max(0, FREE_SHIPPING - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100)

  return (
    <div className="drawer-layer" role="presentation">
      <button
        className="drawer-backdrop"
        onClick={() => setCartOpen(false)}
        aria-label="Đóng giỏ hàng"
      />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Giỏ hàng">
        <div className="drawer-head">
          <div>
            <span className="eyebrow">Lựa chọn của bạn</span>
            <h2>Giỏ hàng <span>({String(count).padStart(2, '0')})</span></h2>
          </div>
          <button className="icon-button bordered" onClick={() => setCartOpen(false)} aria-label="Đóng giỏ hàng">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-bag">
            <div className="empty-bag-icon">
              <ShoppingBag size={28} strokeWidth={1.2} />
            </div>
            <h3>Giỏ hàng đang chờ bạn.</h3>
            <p>Những món đồ được chọn kỹ sẽ ở lại lâu bên bạn. Hãy bắt đầu với một món đồ thiết yếu.</p>
            <Link className="btn btn-primary" to="/shop" onClick={() => setCartOpen(false)}>
              Khám phá bộ sưu tập
            </Link>
          </div>
        ) : (
          <>
            <div className="shipping-meter">
              <p>
                {remaining > 0 ? (
                  <>
                    Bạn còn <strong>{formatPrice(remaining)}</strong> để được miễn phí vận chuyển
                  </>
                ) : (
                  <>Đã đủ điều kiện miễn phí vận chuyển trung hòa carbon</>
                )}
              </p>
              <div className="shipping-track">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.key}>
                  <Link
                    to={`/product/${item.slug}`}
                    className="cart-item-image"
                    onClick={() => setCartOpen(false)}
                  >
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <div className="cart-item-copy">
                    <div className="cart-item-top">
                      <div>
                        <Link
                          to={`/product/${item.slug}`}
                          className="cart-item-name"
                          onClick={() => setCartOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <p>
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                    <div className="cart-item-bottom">
                      <div className="qty-control">
                        <button
                          onClick={() => updateQuantity(item.key, -1)}
                          aria-label={`Giảm số lượng ${item.name}`}
                        >
                          <Minus size={13} strokeWidth={1.7} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, 1)}
                          aria-label={`Tăng số lượng ${item.name}`}
                        >
                          <Plus size={13} strokeWidth={1.7} />
                        </button>
                      </div>
                      <button className="remove-item" onClick={() => removeItem(item.key)}>
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>Tạm tính</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="cart-note">Đã bao gồm thuế. Phí vận chuyển tính khi thanh toán.</p>
              <a
                className="btn btn-primary checkout-button"
                href="/cart.html"
                onClick={() => setCartOpen(false)}
              >
                Tiến hành thanh toán
                <ArrowRight size={17} strokeWidth={1.5} />
              </a>
              <button className="continue-shopping" onClick={() => setCartOpen(false)}>
                Tiếp tục khám phá
              </button>
              <div className="secure-note">
                <LockKeyhole size={12} strokeWidth={1.5} />
                Thanh toán an toàn · Giao hàng trung hòa carbon
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
