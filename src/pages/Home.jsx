import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Eye, Leaf, Plus, Recycle, Send, Star } from 'lucide-react'
import { Avatar } from '@astryxdesign/core/Avatar'
import { Badge } from '@astryxdesign/core/Badge'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { Grid } from '@astryxdesign/core/Grid'
import { Stack } from '@astryxdesign/core/Stack'
import { Heading, Text } from '@astryxdesign/core/Text'
import { TextInput } from '@astryxdesign/core/TextInput'
import HomeProductCard from '../components/HomeProductCard'
import Reveal from '../components/Reveal'
import { images, portraits, products } from '../data'
import { formatPrice, useStore } from '../store'

const findProduct = (slug) => products.find((product) => product.slug === slug)

const filters = ['Tất cả', 'Mới về', 'Bán chạy nhất', 'Ưu đãi tuần']

const featuredCategories = [
  {
    name: 'Đầm Linen Thanh Lịch',
    count: 32,
    to: '/shop?category=Dresses',
    image: findProduct('sora-wrap-dress')?.images[0],
  },
  {
    name: 'Áo Sơ Mi Matcha Tone',
    count: 28,
    to: '/shop?category=Tops',
    image: findProduct('isha-linen-shirt')?.images[0],
  },
  {
    name: 'Quần Ống Rộng Minimalist',
    count: 19,
    to: '/shop?category=Bottoms',
    image: findProduct('nara-wide-leg-trouser')?.images[0],
  },
  {
    name: 'Phụ Kiện Tinh Tế',
    count: 15,
    to: '/shop?category=Accessories',
    image: findProduct('kumo-canvas-tote')?.images[0],
  },
].filter((category) => category.image)

const bestSellers = [
  {
    product: findProduct('sora-wrap-dress'),
    name: 'Đầm Xòe Midi Linen Matcha Leaf',
    badge: 'BEST SELLER',
    material: '100% Linen dệt',
  },
  {
    product: findProduct('aya-silk-blouse'),
    name: 'Áo Sơ Mi Lụa Trắng Morning Dew',
    badge: 'MỚI',
    material: 'Lụa Tơ Tằm Tự Nhiên',
  },
  {
    product: findProduct('mori-tailored-coat'),
    name: 'Áo Blazer Dáng Rộng Xanh Rêu Nhạt',
    badge: 'ATELIER',
    material: 'Vải Sợi Hữu Cơ',
  },
  {
    product: findProduct('kiku-pleated-skirt'),
    name: 'Chân Váy Xếp Ly Matcha Cream',
    badge: '',
    material: 'Xếp Ly Nhiệt Bền Dáng',
  },
].filter((item) => item.product)

const reviews = [
  {
    quote:
      'Chiếc đầm linen xanh matcha này đã trở thành trang phục yêu thích nhất trong chuyến du lịch Kyoto vừa rồi của mình. Chất vải rũ tự nhiên, mặc vào cảm giác nhẹ tênh như làn gió, chụp ảnh lên màu cực kỳ sang và nhã nhặn.',
    name: 'Khánh Linh',
    role: 'Fashion Blogger & Stylist',
    avatar: portraits[0],
  },
  {
    quote:
      'Điểm mình mê nhất là bảng màu xanh rêu nhạt không lẫn vào đâu được. Đồ của Matcha Atelier mang lại một sự an tĩnh kỳ lạ giữa nhịp sống bận rộn. Đường may cuộn mí giấu chỉ sắc sảo chuẩn chất couture.',
    name: 'Minh Trang',
    role: 'Kiến Trúc Sư Nội Thất',
    avatar: portraits[1],
  },
  {
    quote:
      'Dịch vụ đóng gói đẹp như một món quà từ thiên nhiên, kèm một nhành lá khô thơm thảo mộc. Thật sự trân trọng cam kết bảo vệ môi trường và triết lý thời trang bền vững có tâm của thương hiệu.',
    name: 'Thanh Hà',
    role: 'Khách hàng thân thiết — VIP Club',
    avatar: portraits[2],
  },
]

const coat = findProduct('mori-tailored-coat') ?? products[7]
const trousers = findProduct('nara-wide-leg-trouser') ?? products[1]
const knit = findProduct('miso-knit-vest') ?? products[3]
const dress = findProduct('lune-linen-dress') ?? products[6]

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Tất cả')
  const [email, setEmail] = useState('')
  const { notify } = useStore()

  const subscribe = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    notify('Cảm ơn bạn đã đăng ký nhận bản tin Matcha Atelier!')
    setEmail('')
  }

  // The section is already the best-seller edit, so only the two narrower
  // chips change the selection: new arrivals and pieces under $200.
  const visibleSellers = bestSellers.filter((item) => {
    if (activeFilter === 'Mới về') return item.product.isNew
    if (activeFilter === 'Ưu đãi tuần') return item.product.price <= 200
    return true
  })

  return (
    <>
      <Stack as="section" className="ma-hero" gap={0}>
        <Stack className="container ma-hero-grid" gap={0}>
          <Reveal className="ma-hero-copy">
            <Text as="span" className="ma-hero-kicker">
              SPRING / SUMMER 2026 ATELIER
            </Text>
            <Heading level={1} className="ma-hero-title">
              Sự Tinh Tế Của <br />
              <em>Sắc Xanh</em> Tự Nhiên
            </Heading>
            <Text as="p" className="ma-copy ma-hero-lede">
              BST Xuân Hè 2026 kết hợp giữa triết lý tối giản Japandi và cảm xúc an yên từ lá trà
              xanh nguyên bản. Từng sợi organic linen và cotton hữu cơ được dệt thủ công, nhẹ nhàng
              ôm ấp làn da người mặc.
            </Text>
            <Stack direction="horizontal" className="ma-hero-actions" gap={2} wrap="wrap">
              <Link className="ma-btn ma-btn--primary" to="/shop">
                Khám Phá Bộ Sưu Tập
                <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
              </Link>
              <a className="ma-btn ma-btn--outline" href="#lookbook">
                <Eye size={16} strokeWidth={1.6} aria-hidden="true" />
                Xem Lookbook
              </a>
            </Stack>
            <Stack direction="horizontal" className="ma-metrics" gap={3}>
              {[
                { value: '100%', label: 'Organic Linen' },
                { value: 'Natural', label: 'Eco-friendly Dye' },
                { value: '50.000+', label: 'Khách Hàng Tin Chọn' },
              ].map((metric) => (
                <Stack className="ma-metric" gap={0} key={metric.label}>
                  <Text as="span" className="ma-metric-value">
                    {metric.value}
                  </Text>
                  <Text as="span" className="ma-metric-label">
                    {metric.label}
                  </Text>
                </Stack>
              ))}
            </Stack>
          </Reveal>

          <Reveal className="ma-hero-visual" delay={140}>
            <Stack className="ma-hero-main" gap={0}>
              <Link
                className="ma-hero-main-link"
                to="/shop"
                aria-label="Khám phá bộ sưu tập Matcha Atelier"
              >
                <img src={images.hero} alt="Người mẫu trong trang phục linen xanh matcha" />
              </Link>
              <Stack className="ma-hero-caption" gap={0}>
                <Text as="span" className="ma-label ma-label--primary">
                  LOOK 01 • MATCHA SUIT
                </Text>
                <Text as="span" className="ma-caption-title">
                  Linen Matcha & White Mist Silk
                </Text>
              </Stack>
            </Stack>

            <Stack className="ma-hero-side" gap={2}>
              <Stack className="ma-hero-side-img" gap={0}>
                <img
                  src={images.heroDetail}
                  alt="Chi tiết vải linen nhuộm màu trà xanh"
                  loading="lazy"
                />
              </Stack>
              <Card className="ma-hero-note" padding={4} variant="muted">
                <Stack gap={1}>
                  <Leaf
                    size={22}
                    strokeWidth={1.4}
                    className="ma-hero-note-icon"
                    aria-hidden="true"
                  />
                  <Text as="span" className="ma-hero-note-title">
                    Quy chuẩn Dệt Nhật
                  </Text>
                  <Text as="span" className="ma-hero-note-copy">
                    Đảm bảo độ bền sợi và giữ trọn màu sắc từ bột lá trà thiên nhiên.
                  </Text>
                </Stack>
              </Card>
            </Stack>
          </Reveal>
        </Stack>
      </Stack>

      <Stack as="section" className="ma-section ma-section--lowest ma-section--bordered" gap={0}>
        <Stack className="container" gap={6}>
          <Reveal className="ma-section-head ma-section-head--split">
            <Stack gap={1}>
              <Text as="span" className="ma-eyebrow">
                KHÁM PHÁ THEO PHONG CÁCH
              </Text>
              <Heading level={2} className="ma-title ma-title--section">
                Danh Mục Nổi Bật
              </Heading>
            </Stack>
            <Text as="p" className="ma-copy">
              Những cấu trúc trang phục được chọn lọc để bạn dễ dàng xây dựng tủ đồ capsule bền vững
              mọi mùa.
            </Text>
          </Reveal>

          <Grid className="ma-category-grid" columns={{ minWidth: 220, max: 4 }} gap={4}>
            {featuredCategories.map((category, index) => (
              <Reveal key={category.name} delay={index * 70}>
                <Link className="ma-category" to={category.to}>
                  <Stack className="ma-category-media" gap={0}>
                    <img src={category.image} alt={category.name} loading="lazy" />
                  </Stack>
                  <Stack className="ma-category-overlay" gap={0}>
                    <Text as="span" className="ma-label ma-label--light">
                      {category.count} SẢN PHẨM
                    </Text>
                    <Heading level={3} className="ma-category-name">
                      {category.name}
                    </Heading>
                    <Text as="span" className="ma-category-link">
                      Xem bộ sưu tập
                      <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
                    </Text>
                  </Stack>
                </Link>
              </Reveal>
            ))}
          </Grid>
        </Stack>
      </Stack>

      <Stack as="section" id="collection" className="ma-section ma-section--surface" gap={0}>
        <Stack className="container" gap={6}>
          <Reveal className="ma-section-head ma-section-head--center">
            <Text as="span" className="ma-eyebrow">
              THIẾT KẾ ĐẶC BIỆT
            </Text>
            <Heading level={2} className="ma-title ma-title--section">
              Sản Phẩm Bán Chạy Nhất
            </Heading>
            <Stack direction="horizontal" className="ma-filters" gap={1} wrap="wrap" hAlign="center">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={`ma-chip ${activeFilter === filter ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </Stack>
          </Reveal>

          <Grid className="ma-product-grid" columns={{ minWidth: 230, max: 4 }} gap={4}>
            {visibleSellers.map((item, index) => (
              <Reveal key={item.product.slug} delay={index * 70}>
                <HomeProductCard {...item} />
              </Reveal>
            ))}
          </Grid>

          {visibleSellers.length === 0 ? (
            <Text as="p" className="ma-copy ma-filter-empty">
              Chưa có thiết kế nào trong lựa chọn này. Hãy xem toàn bộ bộ sưu tập nhé.
            </Text>
          ) : null}

          <Stack className="ma-center" gap={0}>
            <Link className="ma-btn ma-btn--outline" to="/shop">
              Xem Tất Cả 120+ Mẫu Thiết Kế
              <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        as="section"
        id="cau-chuyen"
        className="ma-section ma-section--low ma-section--bordered"
        gap={0}
      >
        <Stack className="container" gap={0}>
          <Grid className="ma-story" columns={{ minWidth: 320, max: 2 }} gap={6}>
            <Reveal className="ma-story-media">
              <Stack className="ma-story-img" gap={0}>
                <img
                  src={images.linen}
                  alt="Nghệ nhân nhuộm vải linen bằng thảo mộc"
                  loading="lazy"
                />
              </Stack>
              <Stack className="ma-story-img ma-story-img--offset" gap={0}>
                <img
                  src={images.linenDetail}
                  alt="Lá trà, bông cotton và dụng cụ dệt"
                  loading="lazy"
                />
              </Stack>
              <Badge
                className="ma-story-seal"
                variant="green"
                icon={<BadgeCheck size={15} strokeWidth={1.6} />}
                label="Chứng nhận GOTS Organic Cotton"
              />
            </Reveal>

            <Reveal className="ma-story-copy" delay={100}>
              <Text as="span" className="ma-eyebrow">
                TRIẾT LÝ SÁNG TẠO
              </Text>
              <Heading level={2} className="ma-title ma-title--section">
                Khi Sợi Vải Thấm Đẫm <br />
                <em>Hơi Thở Của Đất Mẹ</em>
              </Heading>
              <Text as="p" className="ma-copy">
                Tại <strong>Matcha Atelier</strong>, chúng tôi không tạo ra trang phục chạy theo
                những xu hướng thoáng qua. Mỗi thiết kế là một cuộc đối thoại giữa kỹ nghệ dệt tay
                truyền thống và triết lý sống chậm <em>wabi-sabi</em>: nâng niu vẻ đẹp mộc mạc và
                nguyên bản.
              </Text>
              <Text as="p" className="ma-copy">
                Sắc xanh đặc trưng của xưởng dệt được chiết xuất thủ công từ búp chè xanh Uji và các
                loại thảo mộc lành tính, không chứa hóa chất độc hại, thân thiện tuyệt đối với làn
                da nhạy cảm và hoàn toàn có thể tự phân hủy sinh học trong lòng đất.
              </Text>

              <Stack className="ma-feature-list" gap={3}>
                <Stack direction="horizontal" className="ma-feature" gap={2}>
                  <Stack className="ma-feature-icon" gap={0}>
                    <Leaf size={16} strokeWidth={1.5} aria-hidden="true" />
                  </Stack>
                  <Stack gap={0}>
                    <Text as="span" className="ma-feature-title">
                      100% Nhuộm Thảo Mộc Tự Nhiên
                    </Text>
                    <Text as="span" className="ma-copy ma-copy--sm">
                      Không tồn dư hóa chất kim loại nặng, giữ được độ dịu mát tự nhiên của trà xanh
                      trên từng thớ sợi.
                    </Text>
                  </Stack>
                </Stack>

                <Stack direction="horizontal" className="ma-feature" gap={2}>
                  <Stack className="ma-feature-icon" gap={0}>
                    <Recycle size={16} strokeWidth={1.5} aria-hidden="true" />
                  </Stack>
                  <Stack gap={0}>
                    <Text as="span" className="ma-feature-title">
                      Vòng Tuần Hoàn Sinh Thái Bền Vững
                    </Text>
                    <Text as="span" className="ma-copy ma-copy--sm">
                      Tiết kiệm 75% lượng nước so với dệt công nghiệp thông thường, bao bì đóng gói
                      tự phân hủy từ bã mía.
                    </Text>
                  </Stack>
                </Stack>
              </Stack>

              <Link className="ma-story-link" to="/atelier">
                Đọc toàn bộ hành trình Organic Cotton & Linen
                <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </Reveal>
          </Grid>
        </Stack>
      </Stack>

      <Stack as="section" id="lookbook" className="ma-section ma-section--surface" gap={0}>
        <Stack className="container" gap={6}>
          <Reveal className="ma-section-head ma-section-head--center">
            <Text as="span" className="ma-eyebrow">
              CURATED LOOKBOOK
            </Text>
            <Heading level={2} className="ma-title ma-title--section">
              Gợi Ý Phối Đồ Cho Nàng Hiện Đại
            </Heading>
            <Text as="p" className="ma-copy">
              Chạm vào các điểm đánh dấu trên hình để xem ngay công thức trang phục hoàn hảo cho
              ngày làm việc lẫn kỳ nghỉ dưỡng.
            </Text>
          </Reveal>

          <Reveal className="ma-lookbook">
            <Stack className="ma-look-main" gap={0}>
              <img
                src={images.hero}
                alt="Phối đồ Matcha Atelier trong sân vườn"
                loading="lazy"
              />

              <Stack className="ma-pin ma-pin--one" gap={0}>
                <button type="button" aria-label="Xem Áo Khoác Linen Matcha Studio Coat">
                  <Plus size={12} strokeWidth={2} />
                </button>
                <Stack className="ma-pin-tip" gap={0}>
                  <Text as="span" className="ma-label ma-label--primary">
                    ÁO KHOÁC LINEN
                  </Text>
                  <Text as="span" className="ma-pin-name">
                    Matcha Studio Coat
                  </Text>
                  <Text as="span" className="ma-pin-price">
                    {formatPrice(coat.price)}
                  </Text>
                </Stack>
              </Stack>

              <Stack className="ma-pin ma-pin--two" gap={0}>
                <button type="button" aria-label="Xem Quần Culottes White Mist">
                  <Plus size={12} strokeWidth={2} />
                </button>
                <Stack className="ma-pin-tip" gap={0}>
                  <Text as="span" className="ma-label ma-label--primary">
                    QUẦN DÁNG RỘNG
                  </Text>
                  <Text as="span" className="ma-pin-name">
                    Culottes White Mist
                  </Text>
                  <Text as="span" className="ma-pin-price">
                    {formatPrice(trousers.price)}
                  </Text>
                </Stack>
              </Stack>

              <Stack className="ma-look-caption" gap={0}>
                <Text as="span" className="ma-label ma-label--primary">
                  SET 01 • URBAN BOTANIC
                </Text>
                <Text as="span" className="ma-caption-title">
                  Phong cách Thành Thị Tự Tại
                </Text>
              </Stack>
            </Stack>

            <Stack className="ma-look-side" gap={3}>
              <Stack className="ma-look-card" gap={0}>
                <img src={knit.images[0]} alt="Áo lụa và cardigan mùa xuân" loading="lazy" />
                <Stack className="ma-look-overlay" gap={0}>
                  <Text as="span" className="ma-label ma-label--light">
                    SET 02 • WEEKEND CALM
                  </Text>
                  <Heading level={3} className="ma-look-title">
                    Áo Lụa & Cardigan Mùa Xuân
                  </Heading>
                  <Text as="span" className="ma-look-desc">
                    Kết hợp giữa sự nữ tính mềm mại và ấm áp dịu dàng.
                  </Text>
                </Stack>
              </Stack>

              <Stack className="ma-look-card" gap={0}>
                <img src={dress.images[0]} alt="Đầm vạt chéo phong cách zen" loading="lazy" />
                <Stack className="ma-look-overlay" gap={0}>
                  <Text as="span" className="ma-label ma-label--light">
                    SET 03 • TEA CEREMONY
                  </Text>
                  <Heading level={3} className="ma-look-title">
                    Đầm Vạt Chéo Zen Silhouette
                  </Heading>
                  <Text as="span" className="ma-look-desc">
                    Lấy cảm hứng từ nét đoan trang của kimono truyền thống.
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Reveal>
        </Stack>
      </Stack>

      <Stack
        as="section"
        className="ma-section ma-section--lowest ma-section--bordered"
        gap={0}
      >
        <Stack className="container" gap={6}>
          <Reveal className="ma-reviews-head">
            <Stack direction="horizontal" className="ma-stars" gap={0.5} aria-label="5 trên 5 sao">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  size={18}
                  fill="currentColor"
                  strokeWidth={0}
                  aria-hidden="true"
                />
              ))}
            </Stack>
            <Heading level={2} className="ma-title ma-title--section">
              Được Yêu Thích Bởi Những Tâm Hồn Tinh Tế
            </Heading>
            <Text as="p" className="ma-copy">
              Hơn 98% khách hàng đánh giá 5 sao về độ thoáng mát và sự tinh tế trong từng đường kim
              mũi chỉ.
            </Text>
          </Reveal>

          <Grid className="ma-review-grid" columns={{ minWidth: 280, max: 3 }} gap={4}>
            {reviews.map((review, index) => (
              <Reveal key={review.name} delay={index * 80}>
                <Card className="ma-review-card" padding={6}>
                  <Stack gap={3}>
                    <Stack
                      direction="horizontal"
                      className="ma-stars"
                      gap={0.5}
                      aria-label="5 trên 5 sao"
                    >
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          size={15}
                          fill="currentColor"
                          strokeWidth={0}
                          aria-hidden="true"
                        />
                      ))}
                    </Stack>
                    <Text as="p" className="ma-quote">
                      “{review.quote}”
                    </Text>
                  </Stack>

                  <Stack direction="horizontal" className="ma-review-author" gap={2} vAlign="center">
                    <Avatar src={review.avatar} name={review.name} size="md" />
                    <Stack gap={0}>
                      <Text as="span" className="ma-review-name">
                        {review.name}
                      </Text>
                      <Text as="span" className="ma-review-role">
                        {review.role}
                      </Text>
                    </Stack>
                  </Stack>
                </Card>
              </Reveal>
            ))}
          </Grid>

          <Stack direction="horizontal" className="ma-press" gap={8} wrap="wrap" hAlign="center">
            {['ELLE VIETNAM', "L'OFFICIEL", "HARPER'S BAZAAR", 'DEPREVIEW'].map((name) => (
              <Text key={name} as="span" className="ma-press-logo">
                {name}
              </Text>
            ))}
          </Stack>
        </Stack>
      </Stack>

      <Stack as="section" className="ma-newsletter-wrap" gap={0}>
        <Stack className="container" gap={0}>
          <Reveal className="ma-newsletter">
            <Stack className="ma-newsletter-inner" gap={3}>
              <Text as="span" className="ma-eyebrow">
                ĐẶC QUYỀN THÀNH VIÊN ATELIER
              </Text>
              <Heading level={2} className="ma-title ma-title--section">
                Nhận Mã Ưu Đãi 10% Cho Đơn Hàng Đầu Tiên
              </Heading>
              <Text as="p" className="ma-copy">
                Đăng ký nhận bản tin về các bộ sưu tập giới hạn, nhật ký nguồn gốc vải hữu cơ và
                những lời mời tham dự sự kiện trà đạo thân mật.
              </Text>

              <form className="ma-newsletter-form" onSubmit={subscribe}>
                <TextInput
                  type="email"
                  label="Địa chỉ email"
                  isLabelHidden
                  value={email}
                  onChange={setEmail}
                  placeholder="Nhập địa chỉ email của bạn..."
                  size="lg"
                  isRequired
                  containerClassName="ma-newsletter-field"
                  controlClassName="ma-newsletter-input"
                  autoComplete="email"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="ma-btn ma-btn--primary"
                  icon={<Send size={16} strokeWidth={1.6} />}
                >
                  Đăng Ký
                </Button>
              </form>

              <Text as="p" className="ma-newsletter-note">
                Chúng tôi tôn trọng quyền riêng tư của bạn. Không spam, hủy đăng ký bất cứ lúc nào.
              </Text>
            </Stack>
          </Reveal>
        </Stack>
      </Stack>
    </>
  )
}
