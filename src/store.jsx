import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const StoreContext = createContext(null)

const readStorage = (key, fallback) => {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export function StoreProvider({ children }) {
  const [items, setItems] = useState(() => readStorage('serene-cart', []))
  const [wishlist, setWishlist] = useState(() => readStorage('serene-wishlist', []))
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      window.localStorage.setItem('serene-cart', JSON.stringify(items))
    } catch {
      /* storage can be unavailable */
    }
  }, [items])

  useEffect(() => {
    try {
      window.localStorage.setItem('serene-wishlist', JSON.stringify(wishlist))
    } catch {
      /* storage can be unavailable */
    }
  }, [wishlist])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const overlayOpen = cartOpen || searchOpen || menuOpen || Boolean(toast)

  useEffect(() => {
    if (!overlayOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [overlayOpen])

  const notify = (message) => setToast({ message, id: Date.now() })

  const addToCart = (product, size, quantity = 1, { openDrawer = true } = {}) => {
    const key = `${product.slug}-${size}`
    setItems((current) => {
      const found = current.find((item) => item.key === key)
      if (found) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [
        ...current,
        {
          key,
          slug: product.slug,
          name: product.nameVi ?? product.name,
          price: product.price,
          image: product.images[0],
          size,
          color: product.color,
          quantity,
        },
      ]
    })
    if (openDrawer) setCartOpen(true)
  }

  const updateQuantity = (key, delta) => {
    setItems((current) =>
      current
        .map((item) =>
          item.key === key ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (key) => {
    setItems((current) => current.filter((item) => item.key !== key))
  }

  const toggleWishlist = (slug) => {
    setWishlist((current) => {
      const exists = current.includes(slug)
      notify(exists ? 'Đã bỏ khỏi bộ sưu tập đã lưu' : 'Đã lưu vào bộ sưu tập của bạn')
      return exists ? current.filter((item) => item !== slug) : [...current, slug]
    })
  }

  const clearCart = () => setItems([])

  const count = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      wishlist,
      addToCart,
      updateQuantity,
      removeItem,
      toggleWishlist,
      clearCart,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      menuOpen,
      setMenuOpen,
      toast,
      notify,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, count, subtotal, wishlist, cartOpen, searchOpen, menuOpen, toast],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside StoreProvider')
  return context
}
