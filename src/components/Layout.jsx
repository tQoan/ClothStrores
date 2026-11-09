import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import SearchOverlay from './SearchOverlay'
import MobileMenu from './MobileMenu'
import Toast from './Toast'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <MobileMenu />
      <Toast />
    </div>
  )
}
