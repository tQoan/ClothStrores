import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ChevronRight,
  Grid2x2,
  Grid3x3,
  Leaf,
  RefreshCw,
  Ruler,
  SlidersHorizontal,
  Truck,
  X,
} from 'lucide-react'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput'
import { Grid } from '@astryxdesign/core/Grid'
import { Pagination } from '@astryxdesign/core/Pagination'
import { RadioList, RadioListItem } from '@astryxdesign/core/RadioList'
import { Selector } from '@astryxdesign/core/Selector'
import { Stack } from '@astryxdesign/core/Stack'
import { Heading, Text } from '@astryxdesign/core/Text'
import HomeProductCard from '../components/HomeProductCard'
import { categories, products } from '../data'
import { useStore } from '../store'

const PAGE_SIZE = 9

const categoryLabels = {
  Tops: 'Áo',
  Dresses: 'Đầm & Váy',
  Bottoms: 'Quần & Chân Váy',
  Knitwear: 'Áo Len',
  Outerwear: 'Áo Khoác',
  Accessories: 'Phụ Kiện',
}

const colorLabels = {
  Oat: 'Yến Mạch',
  Matcha: 'Matcha',
  Chalk: 'Phấn Trắng',
  Moss: 'Xanh Rêu',
  Sand: 'Cát Mịn',
  Tea: 'Trà',
  Milk: 'Sữa',
  Ink: 'Mực',
  Ivory: 'Ngà',
  Sage: 'Xô Thơm',
  Natural: 'Tự Nhiên',
  Forest: 'Rừng Sâu',
  Fern: 'Dương Xỉ',
  Taupe: 'Nâu Xám',
  Charcoal: 'Than',
  Clay: 'Đất Nung',
  Botanical: 'Thực Vật',
  Parchment: 'Giấy Cũ',
}

const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'One size']
const sizeLabel = (size) => (size === 'One size' ? 'Freesize' : size)

const materialGroups = [
  { value: 'linen', label: 'Linen hữu cơ', test: (material) => /linen/i.test(material) },
  { value: 'silk', label: 'Lụa tơ tằm', test: (material) => /silk/i.test(material) },
  { value: 'cotton', label: 'Cotton hữu cơ', test: (material) => /cotton/i.test(material) },
  {
    value: 'wool',
    label: 'Len & sợi tái chế',
    test: (material) => /wool|crepe|tencel/i.test(material),
  },
]

const priceRanges = [
  { value: 'all', label: 'Tất cả', test: () => true },
  { value: 'under-100', label: 'Dưới $100', test: (price) => price < 100 },
  { value: '100-150', label: '$100 – $150', test: (price) => price >= 100 && price < 150 },
  { value: '150-200', label: '$150 – $200', test: (price) => price >= 150 && price < 200 },
  { value: 'over-200', label: 'Trên $200', test: (price) => price >= 200 },
]

const sortOptions = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'bestseller', label: 'Bán chạy nhất' },
  { value: 'price-asc', label: 'Giá: Thấp đến Cao' },
  { value: 'price-desc', label: 'Giá: Cao đến Thấp' },
  { value: 'favourite', label: 'Được yêu thích nhất' },
]

const collection = categories.filter((category) => category !== 'All')

const categoryCounts = Object.fromEntries(
  collection.map((category) => [
    category,
    products.filter((product) => product.category === category).length,
  ]),
)

const sizeOptions = sizeOrder.filter((size) =>
  products.some((product) => product.sizes.includes(size)),
)

const colorOptions = Object.entries(
  products.reduce((palette, product) => {
    product.colors.forEach((color) => {
      if (!palette[color.name]) palette[color.name] = color.hex
    })
    return palette
  }, {}),
).map(([name, hex]) => ({
  name,
  hex,
  count: products.filter((product) => product.colors.some((color) => color.name === name)).length,
}))

const materialOptions = materialGroups.map((group) => ({
  ...group,
  count: products.filter((product) => group.test(product.material)).length,
}))

const perks = [
  {
    icon: Truck,
    title: 'Giao Hàng Toàn Quốc',
    text: 'Miễn phí vận chuyển cho đơn hàng từ $150 trở lên.',
  },
  {
    icon: RefreshCw,
    title: 'Đổi Hàng Dễ Dàng',
    text: 'Hỗ trợ đổi size và mẫu miễn phí trong 14 ngày làm việc.',
  },
  {
    icon: Leaf,
    title: '100% Hữu Cơ Tự Nhiên',
    text: 'Linen, lụa và cotton hữu cơ đạt chứng nhận sinh thái OEKO-TEX.',
  },
  {
    icon: Ruler,
    title: 'Tư Vấn Chuẩn Vóc Dáng',
    text: 'Đội ngũ stylist hỗ trợ định cỡ trang phục 1:1 qua tin nhắn.',
  },
]

export default function Shop() {
  const { notify } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') ?? ''
  const categoriesFromUrl = useMemo(
    () => categoryParam.split(',').filter((value) => collection.includes(value)),
    [categoryParam],
  )

  const [selectedCategories, setSelectedCategories] = useState(categoriesFromUrl)
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [priceRange, setPriceRange] = useState('all')
  const [page, setPage] = useState(1)
  const [columns, setColumns] = useState(3)
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Keep the sidebar in step with the header's category links.
  useEffect(() => {
    setSelectedCategories(categoriesFromUrl)
  }, [categoriesFromUrl])

  const sortParam = searchParams.get('sort')
  const sort = sortOptions.some((option) => option.value === sortParam) ? sortParam : 'newest'

  const writeParams = (mutate) => {
    const next = new URLSearchParams(searchParams)
    mutate(next)
    setSearchParams(next, { replace: true })
  }

  const toggleCategory = (category) => {
    const next = selectedCategories.includes(category)
      ? selectedCategories.filter((value) => value !== category)
      : [...selectedCategories, category]
    setSelectedCategories(next)
    writeParams((params) => {
      if (next.length) params.set('category', next.join(','))
      else params.delete('category')
    })
    setPage(1)
  }

  const clearCategories = () => {
    setSelectedCategories([])
    writeParams((params) => params.delete('category'))
    setPage(1)
  }

  const toggleValue = (setter, list, value) => {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value])
    setPage(1)
  }

  const updateSort = (value) => {
    writeParams((params) => {
      if (value === 'newest') params.delete('sort')
      else params.set('sort', value)
    })
    setPage(1)
  }

  const resetFilters = () => {
    clearCategories()
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedMaterials([])
    setPriceRange('all')
    setPage(1)
  }

  const activeCount =
    selectedCategories.length +
    selectedSizes.length +
    selectedColors.length +
    selectedMaterials.length +
    (priceRange === 'all' ? 0 : 1)

  const filtered = useMemo(() => {
    const list = products.filter((product) => {
      if (selectedCategories.length && !selectedCategories.includes(product.category)) return false
      if (selectedSizes.length && !product.sizes.some((size) => selectedSizes.includes(size))) {
        return false
      }
      if (selectedColors.length && !product.colors.some((color) => selectedColors.includes(color.name))) {
        return false
      }
      if (
        selectedMaterials.length &&
        !selectedMaterials.some((value) =>
          materialGroups.find((group) => group.value === value)?.test(product.material),
        )
      ) {
        return false
      }
      const range = priceRanges.find((item) => item.value === priceRange)
      if (range && !range.test(product.price)) return false
      return true
    })

    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    else if (sort === 'bestseller') sorted.sort((a, b) => b.reviews - a.reviews)
    else if (sort === 'favourite') sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    else sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew))
    return sorted
  }, [
    selectedCategories,
    selectedSizes,
    selectedColors,
    selectedMaterials,
    priceRange,
    sort,
  ])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const activeChips = [
    ...selectedCategories.map((category) => ({
      key: `category:${category}`,
      label: categoryLabels[category] ?? category,
      onRemove: () => toggleCategory(category),
    })),
    ...selectedSizes.map((size) => ({
      key: `size:${size}`,
      label: `Size: ${sizeLabel(size)}`,
      onRemove: () => toggleValue(setSelectedSizes, selectedSizes, size),
    })),
    ...selectedColors.map((color) => ({
      key: `color:${color}`,
      label: `Màu: ${colorLabels[color] ?? color}`,
      onRemove: () => toggleValue(setSelectedColors, selectedColors, color),
    })),
    ...selectedMaterials.map((material) => ({
      key: `material:${material}`,
      label: materialGroups.find((group) => group.value === material)?.label ?? material,
      onRemove: () => toggleValue(setSelectedMaterials, selectedMaterials, material),
    })),
    ...(priceRange === 'all'
      ? []
      : [
          {
            key: 'price',
            label: priceRanges.find((range) => range.value === priceRange)?.label ?? '',
            onRemove: () => {
              setPriceRange('all')
              setPage(1)
            },
          },
        ]),
  ]

  const applyFilters = () => {
    setFiltersOpen(false)
    notify(
      activeCount
        ? `Đã áp dụng ${activeCount} bộ lọc — ${filtered.length} thiết kế phù hợp.`
        : `Đang hiển thị toàn bộ ${filtered.length} thiết kế.`,
    )
  }

  return (
    <>
      <Stack className="container ma-breadcrumb" direction="horizontal" gap={1} vAlign="center">
        <Link to="/">Trang chủ</Link>
        <ChevronRight size={12} strokeWidth={1.6} aria-hidden="true" />
        <Link to="/shop">Cửa hàng</Link>
        <ChevronRight size={12} strokeWidth={1.6} aria-hidden="true" />
        <Text as="span" className="is-current">
          Tất cả sản phẩm
        </Text>
      </Stack>

      <Stack as="section" className="container ma-shop-hero-wrap" gap={0}>
        <Card className="ma-shop-hero" padding={8}>
          <Stack className="ma-shop-hero-copy" gap={4}>
            <Stack direction="horizontal" className="ma-shop-badge" gap={1} vAlign="center">
              <Text as="span" className="ma-shop-badge-dot" aria-hidden="true">
                {' '}
              </Text>
              <Text as="span" className="ma-label ma-label--primary">
                SPRING / SUMMER 2026
              </Text>
            </Stack>

            <Heading level={1} className="ma-title ma-shop-title">
              Bộ Sưu Tập Mùa Xuân &amp; Hè 2026
            </Heading>

            <Text as="p" className="ma-copy">
              Tập trung vào tính bền vững và sự tối giản thanh khiết. Mỗi thiết kế được may đo thủ
              công từ linen hữu cơ, lụa tơ tằm và bảng màu nhuộm tự nhiên lấy cảm hứng từ đồi chè
              matcha thanh tịnh.
            </Text>

            <Stack direction="horizontal" className="ma-shop-cats" gap={1} wrap="wrap">
              <button
                type="button"
                className={`ma-chip ${selectedCategories.length === 0 ? 'is-active' : ''}`}
                onClick={clearCategories}
                aria-pressed={selectedCategories.length === 0}
              >
                Tất cả
                <Text as="span" className="ma-chip-count">
                  ({products.length})
                </Text>
              </button>
              {collection.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`ma-chip ${
                    selectedCategories.includes(category) ? 'is-active' : ''
                  }`}
                  onClick={() => toggleCategory(category)}
                  aria-pressed={selectedCategories.includes(category)}
                >
                  {categoryLabels[category]}
                  <Text as="span" className="ma-chip-count">
                    ({categoryCounts[category]})
                  </Text>
                </button>
              ))}
            </Stack>
          </Stack>
        </Card>
      </Stack>

      <Stack as="section" className="container ma-shop-bar-wrap" gap={0}>
        <Stack
          direction="horizontal"
          className="ma-shop-bar"
          gap={3}
          vAlign="center"
          hAlign="between"
          wrap="wrap"
        >
          <Stack direction="horizontal" className="ma-shop-count" gap={2} vAlign="center">
            <Text as="span">
              Hiển thị <strong>{visible.length}</strong> trong số {filtered.length} sản phẩm
            </Text>
            <Text as="span" className="ma-shop-bar-note">
              Bộ sưu tập mùa này
            </Text>
          </Stack>

          <Stack
            direction="horizontal"
            className="ma-shop-controls"
            gap={2}
            vAlign="center"
            wrap="wrap"
          >
            <Button
              variant="secondary"
              size="sm"
              className="ma-filter-toggle"
              icon={<SlidersHorizontal size={15} strokeWidth={1.6} />}
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
            >
              {`Bộ lọc${activeCount ? ` (${activeCount})` : ''}`}
            </Button>

            <Stack direction="horizontal" className="ma-grid-toggle" gap={0}>
              <button
                type="button"
                className={columns === 3 ? 'is-active' : ''}
                onClick={() => setColumns(3)}
                aria-pressed={columns === 3}
                aria-label="Lưới 3 cột"
              >
                <Grid3x3 size={16} strokeWidth={1.6} />
              </button>
              <button
                type="button"
                className={columns === 4 ? 'is-active' : ''}
                onClick={() => setColumns(4)}
                aria-pressed={columns === 4}
                aria-label="Lưới 4 cột"
              >
                <Grid2x2 size={16} strokeWidth={1.6} />
              </button>
            </Stack>

            <Text as="span" className="ma-sort-label">
              Sắp xếp:
            </Text>
            <Selector
              label="Sắp xếp sản phẩm"
              isLabelHidden
              options={sortOptions}
              value={sort}
              onChange={updateSort}
              size="sm"
              containerClassName="ma-sort"
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack as="main" className="container ma-shop-main" gap={0}>
        <Stack direction="horizontal" className="ma-shop-layout" gap={0}>
          <Stack as="aside" className={`ma-shop-side ${filtersOpen ? 'is-open' : ''}`} gap={0}>
            <Card className="ma-shop-filters" padding={6}>
              <Stack gap={4}>
                <Stack direction="horizontal" gap={2} vAlign="center" hAlign="between">
                  <Stack direction="horizontal" gap={1} vAlign="center">
                    <SlidersHorizontal size={16} strokeWidth={1.6} aria-hidden="true" />
                    <Text as="span" className="ma-filter-heading">
                      Bộ Lọc Tìm Kiếm
                    </Text>
                  </Stack>
                  <button type="button" className="ma-link-reset" onClick={resetFilters}>
                    Xóa tất cả
                  </button>
                </Stack>

                <Stack className="ma-filter-rule" gap={0} />

                <Stack gap={2}>
                  <Text as="span" className="ma-filter-title">
                    Danh mục
                  </Text>
                  {collection.map((category) => (
                    <CheckboxInput
                      key={category}
                      label={`${categoryLabels[category]} (${categoryCounts[category]})`}
                      value={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      size="sm"
                    />
                  ))}
                </Stack>

                <Stack className="ma-filter-rule" gap={0} />

                <Stack gap={2}>
                  <Stack direction="horizontal" gap={2} hAlign="between" vAlign="center">
                    <Text as="span" className="ma-filter-title">
                      Kích cỡ
                    </Text>
                    <Link className="ma-link-reset" to="/atelier">
                      Bảng số đo
                    </Link>
                  </Stack>
                  <Stack className="ma-size-grid" gap={0}>
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`ma-size-chip ${
                          selectedSizes.includes(size) ? 'is-active' : ''
                        }`}
                        onClick={() => toggleValue(setSelectedSizes, selectedSizes, size)}
                        aria-pressed={selectedSizes.includes(size)}
                      >
                        {sizeLabel(size)}
                      </button>
                    ))}
                  </Stack>
                </Stack>

                <Stack className="ma-filter-rule" gap={0} />

                <Stack gap={2}>
                  <Text as="span" className="ma-filter-title">
                    Màu sắc tự nhiên
                  </Text>
                  {colorOptions.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className={`ma-color-row ${
                        selectedColors.includes(color.name) ? 'is-active' : ''
                      }`}
                      onClick={() => toggleValue(setSelectedColors, selectedColors, color.name)}
                      aria-pressed={selectedColors.includes(color.name)}
                    >
                      <Text
                        as="span"
                        className="ma-color-swatch"
                        style={{ background: color.hex }}
                        aria-hidden="true"
                      >
                        {' '}
                      </Text>
                      <Text as="span" className="ma-color-label">
                        {colorLabels[color.name] ?? color.name}
                      </Text>
                      <Text as="span" className="ma-color-count">
                        ({color.count})
                      </Text>
                    </button>
                  ))}
                </Stack>

                <Stack className="ma-filter-rule" gap={0} />

                <RadioList
                  label="Khoảng giá"
                  isLabelHidden
                  value={priceRange}
                  onChange={(value) => {
                    setPriceRange(value)
                    setPage(1)
                  }}
                  size="sm"
                >
                  {priceRanges.map((range) => (
                    <RadioListItem key={range.value} label={range.label} value={range.value} />
                  ))}
                </RadioList>

                <Stack className="ma-filter-rule" gap={0} />

                <Stack gap={2}>
                  <Text as="span" className="ma-filter-title">
                    Chất liệu bền vững
                  </Text>
                  {materialOptions.map((group) => (
                    <CheckboxInput
                      key={group.value}
                      label={`${group.label} (${group.count})`}
                      value={selectedMaterials.includes(group.value)}
                      onChange={() => toggleValue(setSelectedMaterials, selectedMaterials, group.value)}
                      size="sm"
                    />
                  ))}
                </Stack>

                <Stack gap={1}>
                  <Button variant="primary" size="md" className="ma-filter-apply" onClick={applyFilters}>
                    Áp dụng bộ lọc
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    className="ma-filter-clear"
                    onClick={resetFilters}
                  >
                    Xóa lựa chọn
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Stack>

          <Stack className="ma-shop-results" gap={5}>
            {activeChips.length ? (
              <Stack
                direction="horizontal"
                className="ma-active-filters"
                gap={1}
                wrap="wrap"
                vAlign="center"
              >
                <Text as="span" className="ma-active-label">
                  Đang lọc theo:
                </Text>
                {activeChips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    className="ma-active-pill"
                    onClick={chip.onRemove}
                  >
                    {chip.label}
                    <X size={12} strokeWidth={2} aria-hidden="true" />
                  </button>
                ))}
                <button type="button" className="ma-link-reset" onClick={resetFilters}>
                  Xóa tất cả
                </button>
              </Stack>
            ) : null}

            {visible.length ? (
              <Stack
                className={`ma-shop-grid ${columns === 4 ? 'ma-shop-grid--four' : ''}`}
                gap={4}
              >
                {visible.map((product) => (
                  <HomeProductCard key={product.slug} product={product} />
                ))}
              </Stack>
            ) : (
              <Card className="ma-shop-empty" padding={8} variant="muted">
                <Stack gap={3} hAlign="center">
                  <Text as="span" className="ma-eyebrow">
                    Không có kết quả
                  </Text>
                  <Heading level={2} className="ma-title ma-title--section">
                    Chưa có thiết kế nào phù hợp.
                  </Heading>
                  <Text as="p" className="ma-copy">
                    Hãy thử bỏ một vài bộ lọc, hoặc quay lại toàn bộ bộ sưu tập để xem mọi thiết kế
                    của mùa này.
                  </Text>
                  <Button variant="primary" size="md" onClick={resetFilters}>
                    Xem toàn bộ bộ sưu tập
                  </Button>
                </Stack>
              </Card>
            )}

            {filtered.length > PAGE_SIZE ? (
              <Stack className="ma-shop-pagination" gap={0} hAlign="center">
                <Pagination
                  page={currentPage}
                  onChange={setPage}
                  totalPages={pageCount}
                  label="Phân trang sản phẩm"
                />
              </Stack>
            ) : null}
          </Stack>
        </Stack>
      </Stack>

      <Stack as="section" className="ma-perks" gap={0}>
        <Stack className="container" gap={4}>
          <Grid columns={{ minWidth: 220, max: 4 }} gap={4}>
            {perks.map((perk) => {
              const Icon = perk.icon
              return (
                <Card key={perk.title} className="ma-perk" padding={4}>
                  <Stack direction="horizontal" gap={3} vAlign="start">
                    <Stack className="ma-perk-icon" gap={0}>
                      <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                    </Stack>
                    <Stack gap={0}>
                      <Text as="span" className="ma-perk-title">
                        {perk.title}
                      </Text>
                      <Text as="span" className="ma-copy ma-copy--sm">
                        {perk.text}
                      </Text>
                    </Stack>
                  </Stack>
                </Card>
              )
            })}
          </Grid>
        </Stack>
      </Stack>
    </>
  )
}
