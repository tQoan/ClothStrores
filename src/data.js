const unsplash = (id, width = 1100) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=85`

export const images = {
  hero: unsplash('1515886657613-9f3515b0c78f', 1500),
  heroDetail: unsplash('1525507119028-ed4c629a60a3', 800),
  linen: unsplash('1544441893-675973e31985', 1400),
  linenDetail: unsplash('1483985988355-763728e1935b', 900),
  atelier: unsplash('1525507119028-ed4c629a60a3', 1400),
  atelierDetail: unsplash('1441986300917-64674bd600d8', 1000),
  journalOne: unsplash('1558769132-cb1aea458c5e', 1300),
  journalTwo: unsplash('1445205170230-053b83016050', 1000),
  journalThree: unsplash('1487222477894-8943e31ef7b2', 1000),
  journalFour: unsplash('1509631179647-0177331693ae', 1000),
}

export const portraits = [
  unsplash('1494790108377-be9c29b29330', 200),
  unsplash('1438761681033-6461ffad8d80', 200),
  unsplash('1534528741775-53994a69daeb', 200),
]

export const products = [
  {
    id: 1,
    slug: 'isha-linen-shirt',
    name: 'The Isha Linen Shirt',
    nameVi: 'Áo Sơ Mi Linen Isha',
    price: 148,
    category: 'Tops',
    color: 'Oat',
    colorHex: '#d8cdb8',
    colors: [
      { name: 'Oat', hex: '#d8cdb8' },
      { name: 'Matcha', hex: '#8c9e82' },
      { name: 'Chalk', hex: '#f0eee7' },
    ],
    material: '100% Organic Linen',
    badge: 'Organic linen',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      unsplash('1596755094514-f87e34085b2c', 1200),
      unsplash('1603252109303-2751441dd157', 1200),
      unsplash('1496747611176-843222e1e57c', 1200),
    ],
    description:
      'A softly structured shirt cut from European flax linen. The kind of piece that only improves with wear — thrown over swimwear, tucked into tailoring, or simply left open.',
    fit: 'Relaxed through the body with a dropped shoulder. We recommend taking your usual size for an easy fit, or sizing down for a closer line.',
    details:
      'Woven in Lithuania from 100% GOTS-certified organic linen. Garment-washed for a lived-in hand feel. Corozo buttons, French seams, and a curved hem.',
    care:
      'Machine wash cold on a gentle cycle with similar colours. Line dry in the shade. Warm iron if desired — or embrace the crease.',
    stockNote: 'Only a few left in Oat',
    rating: 4.9,
    reviews: 42,
    isNew: true,
  },
  {
    id: 2,
    slug: 'nara-wide-leg-trouser',
    name: 'The Nara Wide-Leg Trouser',
    nameVi: 'Quần Ống Rộng Nara',
    price: 168,
    category: 'Bottoms',
    color: 'Moss',
    colorHex: '#767f6d',
    colors: [
      { name: 'Moss', hex: '#767f6d' },
      { name: 'Sand', hex: '#cdbfa8' },
    ],
    material: 'Linen & Tencel blend',
    badge: 'New arrival',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      unsplash('1594633312681-425c7b97ccd1', 1200),
      unsplash('1487222477894-8943e31ef7b2', 1200),
      unsplash('1515886657613-9f3515b0c78f', 1200),
    ],
    description:
      'An effortless wide-leg silhouette with a high, clean waist. Fluid enough for barefoot evenings, tailored enough for the working day.',
    fit: 'High rise with a relaxed leg. Inseam 79cm. Our model is 175cm and wears a size S.',
    details:
      'A breathable blend of 55% European linen and 45% Tencel™ Lyocell. Hidden hook-and-bar closure, slant pockets, and a pressed centre crease.',
    care:
      'Gentle machine wash cold. Line dry. A light steam will restore the crease after washing.',
    stockNote: 'Made in small batches',
    rating: 4.8,
    reviews: 28,
    isNew: true,
  },
  {
    id: 3,
    slug: 'sora-wrap-dress',
    name: 'The Sora Wrap Dress',
    nameVi: 'Đầm Quấn Sora',
    price: 215,
    category: 'Dresses',
    color: 'Chalk',
    colorHex: '#ece7db',
    colors: [
      { name: 'Chalk', hex: '#ece7db' },
      { name: 'Tea', hex: '#a99273' },
    ],
    material: 'Washed silk',
    badge: 'Limited run',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      unsplash('1496747611176-843222e1e57c', 1200),
      unsplash('1595777457583-95e059d581b8', 1200),
      unsplash('1539109136881-3be0616acf4b', 1200),
    ],
    description:
      'A quiet wrap dress shaped by the body without clinging to it. Fluid silk, a low back, and a hem that moves like water.',
    fit: 'True to size with an adjustable waist tie. Falls to mid-calf. Model is 178cm and wears a size S.',
    details:
      'Cut from 100% mulberry silk with a matte sand-washed finish. Hand-finished edges and a French seam throughout.',
    care:
      'Dry clean or hand wash cold with a pH-neutral detergent. Dry flat away from direct sunlight. Steam gently.',
    stockNote: 'A limited edition of 60',
    rating: 5,
    reviews: 17,
    isNew: true,
  },
  {
    id: 4,
    slug: 'miso-knit-vest',
    name: 'The Miso Knit Vest',
    nameVi: 'Áo Len Miso',
    price: 128,
    category: 'Knitwear',
    color: 'Matcha',
    colorHex: '#839479',
    colors: [
      { name: 'Matcha', hex: '#839479' },
      { name: 'Milk', hex: '#eeeae0' },
      { name: 'Ink', hex: '#333a31' },
    ],
    material: 'Organic cotton knit',
    badge: 'Small batch',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      unsplash('1558769132-cb1aea458c5e', 1200),
      unsplash('1551488831-00ddcb6c6bd3', 1200),
      unsplash('1554568218-0f1715e72254', 1200),
    ],
    description:
      'A featherweight layer in a soft, dry cotton knit. Wear it alone with wide trousers or over the Isha shirt when the evening turns cool.',
    fit: 'Slightly cropped with a boxy body. Take your usual size.',
    details:
      'Knitted in Portugal from 100% organic cotton. Fully fashioned shoulders and a ribbed neckline, armhole, and hem.',
    care: 'Hand wash cold. Reshape and dry flat. Store folded, never hung.',
    stockNote: 'Back in matcha',
    rating: 4.7,
    reviews: 34,
    isNew: true,
  },
  {
    id: 5,
    slug: 'aya-silk-blouse',
    name: 'The Aya Silk Blouse',
    nameVi: 'Áo Lụa Aya',
    price: 132,
    category: 'Tops',
    color: 'Ivory',
    colorHex: '#efebe1',
    colors: [
      { name: 'Ivory', hex: '#efebe1' },
      { name: 'Sage', hex: '#aebca5' },
    ],
    material: 'Sand-washed silk',
    badge: '',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      unsplash('1523779917675-b6ed3a42a561', 1200),
      unsplash('1515886657613-9f3515b0c78f', 1200),
      unsplash('1487222477894-8943e31ef7b2', 1200),
    ],
    description:
      'A soft, collarless blouse with a fluid drape and a single covered button. An understated companion to denim, tailoring, and everything between.',
    fit: 'Relaxed, with a gently tapered sleeve. Model is 175cm and wears a size S.',
    details:
      '100% mulberry silk, sand-washed for a matte finish. Mother-of-pearl button and bias-bound seams.',
    care: 'Hand wash cold or dry clean. Cool iron on the reverse if needed.',
    stockNote: '',
    rating: 4.8,
    reviews: 21,
    isNew: false,
  },
  {
    id: 6,
    slug: 'kumo-canvas-tote',
    name: 'The Kumo Canvas Tote',
    nameVi: 'Túi Canvas Kumo',
    price: 94,
    category: 'Accessories',
    color: 'Natural',
    colorHex: '#d6ccba',
    colors: [
      { name: 'Natural', hex: '#d6ccba' },
      { name: 'Forest', hex: '#3d553a' },
    ],
    material: 'Organic cotton canvas',
    badge: 'Everyday icon',
    sizes: ['One size'],
    images: [
      unsplash('1591561954557-26941169b49e', 1200),
      unsplash('1584917865442-de89df76afd3', 1200),
      unsplash('1553062407-98eeb64c6a62', 1200),
    ],
    description:
      'A generous, uncomplicated tote in heavyweight organic canvas. Built to carry the market haul, the laptop, and the small daily rituals.',
    fit: '38cm wide × 42cm high × 14cm deep. Handle drop 24cm.',
    details:
      '14oz GOTS-certified organic cotton canvas. Internal pocket, reinforced base, and hand-stitched leather-free handles.',
    care: 'Spot clean with cold water and mild soap. Air dry. Do not machine wash.',
    stockNote: '',
    rating: 4.9,
    reviews: 56,
    isNew: false,
  },
  {
    id: 7,
    slug: 'lune-linen-dress',
    name: 'The Lune Linen Dress',
    nameVi: 'Đầm Linen Lune',
    price: 198,
    category: 'Dresses',
    color: 'Fern',
    colorHex: '#8d9b82',
    colors: [
      { name: 'Fern', hex: '#8d9b82' },
      { name: 'Oat', hex: '#d8cdb8' },
    ],
    material: 'Washed European linen',
    badge: 'Organic linen',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      unsplash('1539109136881-3be0616acf4b', 1200),
      unsplash('1595777457583-95e059d581b8', 1200),
      unsplash('1495385794356-15371f348c31', 1200),
    ],
    description:
      'A long, easy dress with a soft square neck and unlimited pockets. Cut from linen that has been washed twice for an even softer hand.',
    fit: 'A-line with a relaxed fit. Size down for less volume. Model is 178cm and wears a size S.',
    details:
      '100% European flax linen, garment-washed. Side seam pockets, adjustable ties, and a deep hem.',
    care: 'Machine wash cold. Line dry. Warm iron or steam.',
    stockNote: '',
    rating: 4.8,
    reviews: 31,
    isNew: false,
  },
  {
    id: 8,
    slug: 'mori-tailored-coat',
    name: 'The Mori Tailored Coat',
    nameVi: 'Áo Khoác Mori',
    price: 320,
    category: 'Outerwear',
    color: 'Taupe',
    colorHex: '#a19482',
    colors: [
      { name: 'Taupe', hex: '#a19482' },
      { name: 'Charcoal', hex: '#474b45' },
    ],
    material: 'Virgin wool blend',
    badge: 'Atelier piece',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      unsplash('1539533018447-63fcce2678e3', 1200),
      unsplash('1591047139829-d91aecb6caea', 1200),
      unsplash('1469334031218-e382a71b716b', 1200),
    ],
    description:
      'A quietly precise coat with a single-button front and an unstructured shoulder. Designed to layer over knitwear without bulk.',
    fit: 'Relaxed tailored fit with room for a sweater. Falls below the knee.',
    details:
      'A soft blend of 70% virgin wool and 30% recycled wool. Cupro lining, horn button, and two deep welt pockets.',
    care: 'Dry clean sparingly. Brush after wear and air outside between seasons.',
    stockNote: 'Atelier piece — made to order in 10 days',
    rating: 5,
    reviews: 12,
    isNew: false,
  },
  {
    id: 9,
    slug: 'kiku-pleated-skirt',
    name: 'The Kiku Pleated Skirt',
    nameVi: 'Chân Váy Xếp Ly Kiku',
    price: 156,
    category: 'Bottoms',
    color: 'Clay',
    colorHex: '#bcaa95',
    colors: [
      { name: 'Clay', hex: '#bcaa95' },
      { name: 'Ink', hex: '#333a31' },
    ],
    material: 'Recycled crepe',
    badge: '',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      unsplash('1487222477894-8943e31ef7b2', 1200),
      unsplash('1495385794356-15371f348c31', 1200),
      unsplash('1529139574466-a303027c1d8b', 1200),
    ],
    description:
      'Knife pleats in a weightless crepe that catches the light. An elasticated waist keeps the line clean and the feeling easy.',
    fit: 'High waist with a fluid, midi-length skirt. Model is 175cm and wears a size S.',
    details:
      '100% recycled polyester crepe from post-consumer fibres. Permanent heat-set pleats and a soft organic cotton waistband.',
    care: 'Hand wash cold. Hang to dry. Do not iron the pleats.',
    stockNote: '',
    rating: 4.6,
    reviews: 19,
    isNew: false,
  },
  {
    id: 10,
    slug: 'hana-silk-scarf',
    name: 'The Hana Silk Scarf',
    nameVi: 'Khăn Lụa Hana',
    price: 86,
    category: 'Accessories',
    color: 'Botanical',
    colorHex: '#8d9f7b',
    colors: [
      { name: 'Botanical', hex: '#8d9f7b' },
      { name: 'Parchment', hex: '#ded6c4' },
    ],
    material: 'Hand-rolled silk',
    badge: 'Hand finished',
    sizes: ['One size'],
    images: [
      unsplash('1595777457583-95e059d581b8', 1200),
      unsplash('1509631179647-0177331693ae', 1200),
      unsplash('1585487000160-6ebcfceb0d03', 1200),
    ],
    description:
      'A small silk square printed with an original botanical study. Wear it at the neck, knot it to a bag, or let it loose in the hair.',
    fit: '55cm × 55cm.',
    details:
      '100% mulberry silk twill with hand-rolled edges. Digitally printed with low-impact dyes in a family-run studio.',
    care: 'Dry clean or hand wash cold. Cool iron on the reverse.',
    stockNote: '',
    rating: 4.9,
    reviews: 24,
    isNew: false,
  },
]

export const categories = [
  'All',
  'Tops',
  'Dresses',
  'Bottoms',
  'Knitwear',
  'Outerwear',
  'Accessories',
]

export const moods = [
  {
    name: 'Everyday linen',
    note: 'Softly structured pieces for the hours in between.',
    category: 'Tops',
    image: unsplash('1515886657613-9f3515b0c78f', 1000),
  },
  {
    name: 'The soft hour',
    note: 'Loungewear in washed silk and cloud-soft cotton.',
    category: 'Knitwear',
    image: unsplash('1558769132-cb1aea458c5e', 1000),
  },
  {
    name: 'Objects of ritual',
    note: 'Woven accessories for daily ceremonies.',
    category: 'Accessories',
    image: unsplash('1591561954557-26941169b49e', 1000),
  },
]

export const journalPosts = [
  {
    id: 1,
    slug: 'quiet-architecture-of-linen',
    title: 'The quiet architecture of linen',
    category: 'Material studies',
    date: '12 May 2026',
    readTime: '6 min read',
    image: unsplash('1544441893-675973e31985', 1400),
    excerpt:
      'Why flax remains the most honest cloth we know — and how its irregular beauty teaches us to dress with less.',
    featured: true,
  },
  {
    id: 2,
    slug: 'in-the-atelier-natural-dye',
    title: 'In the atelier: a slower dye',
    category: 'Process',
    date: '28 April 2026',
    readTime: '4 min read',
    image: unsplash('1445205170230-053b83016050', 1000),
    excerpt:
      'Inside the Kyoto studio where our seasonal palette begins with leaves, bark, and patience.',
  },
  {
    id: 3,
    slug: 'five-pieces-one-summer',
    title: 'Five pieces, one summer',
    category: 'Field notes',
    date: '16 April 2026',
    readTime: '5 min read',
    image: unsplash('1487222477894-8943e31ef7b2', 1000),
    excerpt:
      'A small capsule for long days — built around linen, light, and the freedom of fewer decisions.',
  },
  {
    id: 4,
    slug: 'ceremony-of-getting-dressed',
    title: 'The ceremony of getting dressed',
    category: 'Rituals',
    date: '02 April 2026',
    readTime: '3 min read',
    image: unsplash('1509631179647-0177331693ae', 1000),
    excerpt:
      'On slow mornings, tactile fabrics, and the quiet pleasure of choosing what touches your skin.',
  },
]

export const findProduct = (slug) => products.find((product) => product.slug === slug)

/** Vietnamese display name for a product, falling back to the studio name. */
export const productName = (product) => product.nameVi ?? product.name
