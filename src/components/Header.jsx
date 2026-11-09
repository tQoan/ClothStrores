import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag, UserRound } from 'lucide-react'
import { Stack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { useStore } from '../store'

const nav = [
  { label: 'Bộ sưu tập mới', to: '/shop' },
  { label: 'Áo', to: '/shop?category=Tops' },
  { label: 'Đầm & Váy', to: '/shop?category=Dresses' },
  { label: 'Quần', to: '/shop?category=Bottoms' },
  { label: 'Phụ kiện', to: '/shop?category=Accessories' },
  { label: 'Câu chuyện', to: '/atelier' },
]

export default function Header() {
  const { count, wishlist, setSearchOpen, setMenuOpen, setCartOpen, notify } = useStore()
  const location = useLocation()
  const current = `${location.pathname}${location.search}`

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, setMenuOpen])

  const isActive = (to) => current === to || (to === '/atelier' && location.pathname.startsWith('/atelier'))

  return (
    <>
      <Stack className="ma-announce" gap={0}>
        <Stack direction="horizontal" gap={2} className="ma-announce-inner" vAlign="center">
          <Text as="span" className="ma-announce-dot" aria-hidden="true">
            {' '}
          </Text>
          <Text as="span" className="ma-announce-text">Miễn phí vận chuyển cho đơn hàng từ $150</Text>
          <Text as="span" className="ma-announce-text ma-announce-secondary">
            Tặng túi tote Matcha Organic cho bộ sưu tập Mùa Xuân
          </Text>
        </Stack>
      </Stack>

      <Stack as="header" className="ma-header" gap={0}>
        <Stack
          direction="horizontal"
          className="container ma-header-inner"
          gap={0}
          vAlign="center"
          hAlign="between"
        >
          <Link className="ma-brand" to="/" aria-label="Matcha Atelier — trang chủ">
            Matcha Atelier
          </Link>

          <Stack
            as="nav"
            direction="horizontal"
            className="ma-nav"
            gap={0}
            vAlign="center"
            aria-label="Điều hướng chính"
          >
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`ma-nav-link ${isActive(item.to) ? 'is-active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </Stack>

          <Stack direction="horizontal" className="ma-actions" gap={1} vAlign="center">
            <button
              type="button"
              className="ma-icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Tìm kiếm sản phẩm"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              className="ma-icon-btn ma-account"
              onClick={() =>
                notify(
                  wishlist.length
                    ? `Bạn có ${wishlist.length} sản phẩm trong danh sách yêu thích.`
                    : 'Danh sách yêu thích của bạn đang chờ những món đồ đầu tiên.',
                )
              }
              aria-label="Danh sách yêu thích"
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlist.length ? (
                <Text as="span" className="ma-cart-count" aria-hidden="true">
                  {wishlist.length}
                </Text>
              ) : null}
            </button>

            <button
              type="button"
              className="ma-icon-btn"
              onClick={() => setCartOpen(true)}
              aria-label={`Mở giỏ hàng, ${count} sản phẩm`}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <Text as="span" className="ma-cart-count" aria-hidden="true">
                {String(count).padStart(2, '0')}
              </Text>
            </button>

            <button
              type="button"
              className="ma-login"
              onClick={() => notify('Không gian khách hàng thân thiết đang được chuẩn bị.')}
            >
              <UserRound size={16} strokeWidth={1.5} aria-hidden="true" />
              Đăng nhập
            </button>

            <button
              type="button"
              className="ma-icon-btn ma-menu-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Mở menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
