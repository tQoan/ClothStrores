import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import { Stack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'

const footerColumns = [
  {
    title: 'Hỗ trợ khách hàng',
    links: [
      { label: 'Chính sách đổi trả & bảo hành', href: '#returns' },
      { label: 'Hướng dẫn chọn kích cỡ', href: '#size-guide' },
      { label: 'Chính sách bảo mật', href: '#privacy' },
      { label: 'Điều khoản sử dụng', href: '#terms' },
    ],
  },
  {
    title: 'Chất liệu & bảo quản',
    links: [
      { label: 'Bảo quản chất liệu Linen & Cotton', href: '#care' },
      { label: 'Hành trình Organic Cotton', href: '#organic' },
      { label: 'Kỹ thuật nhuộm thảo mộc', href: '#dye' },
      { label: 'Báo cáo tác động môi trường', href: '#impact' },
    ],
  },
]

export default function Footer() {
  return (
    <Stack as="footer" className="ma-footer" gap={0}>
      <Stack className="container" gap={0}>
        <Stack className="ma-footer-top" gap={0}>
          <Stack className="ma-footer-brand" gap={2}>
            <Link className="ma-footer-logo" to="/">
              Matcha Atelier
            </Link>
            <Text as="p" className="ma-footer-text">
              Thương hiệu thời trang hữu cơ phong cách tối giản thanh lịch. Kết tinh tình yêu thiên
              nhiên, màu sắc mộc mạc của lá trà và sự tinh tế trong lối sống hiện đại.
            </Text>
            <Stack direction="horizontal" className="ma-footer-social" gap={1}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                IG
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest">
                PIN
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                FB
              </a>
            </Stack>
          </Stack>

          {footerColumns.map((column) => (
            <Stack className="ma-footer-col" gap={0} key={column.title}>
              <Text as="span" className="ma-footer-title">
                {column.title}
              </Text>
              {column.links.map((link) => (
                <a className="ma-footer-link" href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </Stack>
          ))}

          <Stack className="ma-footer-col" gap={0}>
            <Text as="span" className="ma-footer-title">
              Cửa hàng & liên hệ
            </Text>
            <Link className="ma-footer-link" to="/atelier">
              Liên hệ & cửa hàng
            </Link>
            <Text as="span" className="ma-footer-text">
              Flagship Atelier: 18 Nam Kỳ Khởi Nghĩa, Q.1, TP. Hồ Chí Minh
            </Text>
            <Text as="span" className="ma-footer-text">
              Hotline: 1900 6886 (08:30 – 21:30)
            </Text>
            <a className="ma-footer-link" href="mailto:contact@matcha-atelier.vn">
              contact@matcha-atelier.vn
            </a>
          </Stack>
        </Stack>

        <Stack
          direction="horizontal"
          className="ma-footer-bottom"
          gap={2}
          vAlign="center"
          hAlign="between"
        >
          <Text as="span" className="ma-footer-copy">
            © 2026 Matcha Atelier. Tất cả quyền được bảo lưu. Tinh hoa thời trang sinh thái & bền
            vững.
          </Text>
          <Text as="span" className="ma-footer-eco">
            <Leaf size={15} strokeWidth={1.5} aria-hidden="true" />
            Đóng gói 100% không rác thải nhựa
          </Text>
        </Stack>
      </Stack>
    </Stack>
  )
}
