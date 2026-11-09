import { useEffect } from 'react'

export default function Checkout() {
  useEffect(() => {
    window.location.href = '/cart.html'
  }, [])

  return (
    <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <p>Đang chuyển hướng sang trang thanh toán...</p>
    </div>
  )
}
