import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Search, ShoppingBag, X } from 'lucide-react'
import { useStore } from '../store'

export default function MobileMenu() {
  const { menuOpen, setMenuOpen, setSearchOpen, setCartOpen, count } = useStore()

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, setMenuOpen])

  if (!menuOpen) return null

  return (
    <div className="drawer-layer" role="presentation">
      <button
        className="drawer-backdrop"
        onClick={() => setMenuOpen(false)}
        aria-label="Đóng menu"
      />
      <aside className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="mobile-menu-head">
          <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
            <span className="brand-name">Matcha</span>
            <span className="brand-sub">Atelier</span>
          </Link>
          <button className="icon-button bordered" onClick={() => setMenuOpen(false)} aria-label="Đóng menu">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="mobile-menu-nav">
          {[
            { label: 'Bộ sưu tập', to: '/shop', note: 'SS26 — 10 thiết kế' },
            { label: 'Câu chuyện', to: '/atelier', note: 'Chất liệu & hành trình' },
            { label: 'Nhật ký', to: '/journal', note: 'Ghi chú sống chậm' },
          ].map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
              <span>
                <em>{item.label}</em>
                <small>{item.note}</small>
              </span>
              <ArrowUpRight size={18} strokeWidth={1.2} />
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-actions">
          <button
            onClick={() => {
              setMenuOpen(false)
              setSearchOpen(true)
            }}
          >
            <Search size={18} strokeWidth={1.5} /> Tìm kiếm
          </button>
          <button
            onClick={() => {
              setMenuOpen(false)
              setCartOpen(true)
            }}
          >
            <ShoppingBag size={18} strokeWidth={1.5} /> Giỏ hàng ({count})
          </button>
        </div>

        <div className="mobile-menu-foot">
          <span>TP. Hồ Chí Minh · Việt Nam</span>
          <span>hello@matcha-atelier.vn</span>
          <span>Thứ 2–6, 09:00–17:00</span>
        </div>
      </aside>
    </div>
  )
}
