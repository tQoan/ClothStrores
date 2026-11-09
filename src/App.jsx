import { Route, Routes } from 'react-router-dom'
import { StoreProvider } from './store'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Atelier from './pages/Atelier'
import Journal from './pages/Journal'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:slug" element={<Product />} />
          <Route path="atelier" element={<Atelier />} />
          <Route path="journal" element={<Journal />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StoreProvider>
  )
}
