const seedProducts = [
  {
    name: 'Obsidian Acid-Wash Heavy Tee',
    slug: 'obsidian-acid-wash-heavy-tee',
    tagline: 'Heavyweight 280 GSM Mineral Washed Boxy Tee',
    description: 'Constructed from custom-developed 280 GSM combed cotton with an artisan mineral acid-wash finish. Features signature dropped shoulders, a tight ribbed 1.25" crewneck collar, and a wide boxy silhouette inspired by 90s vintage streetwear. Each piece possesses a unique patina.',
    price: 48,
    originalPrice: 65,
    category: 'oversized',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Acid Obsidian', hex: '#1e1f24' },
      { name: 'Vintage Charcoal', hex: '#2c2d35' }
    ],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 35,
    featured: true,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.9,
    numReviews: 42,
    details: {
      fabric: '100% Combed Heavyweight Cotton (280 GSM)',
      fit: 'Oversized Boxy Cut with Dropped Shoulders',
      care: 'Cold wash inside-out, hang dry to maintain distress wash',
      weight: '280 GSM Heavyweight'
    }
  },
  {
    name: 'Cybernetic Monolith Graphic Tee',
    slug: 'cybernetic-monolith-graphic-tee',
    tagline: 'High-Density Screen Printed Cyberpunk Streetwear',
    description: 'An architectural statement piece showcasing dystopian typographic schematics and high-density screen printed visuals on the reverse. Crafted on our custom 260 GSM matte-black carded cotton blank that retains structure after countless washes.',
    price: 52,
    originalPrice: 70,
    category: 'graphic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pitch Black', hex: '#0d0d0f' },
      { name: 'Chrome Grey', hex: '#34363d' }
    ],
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 22,
    featured: true,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.8,
    numReviews: 28,
    details: {
      fabric: '100% Ring-Spun Ringspun Cotton (260 GSM)',
      fit: 'Relaxed Streetwear Fit',
      care: 'Do not iron directly over graphic print',
      weight: '260 GSM Medium-Heavy'
    }
  },
  {
    name: 'Raw Minimalist Charcoal Blank',
    slug: 'raw-minimalist-charcoal-blank',
    tagline: 'Pure Architecture. Zero Distractions.',
    description: 'Engineered for the absolute purist. No exterior branding, just immaculate geometry, clean blind hem stitching, and an ultra-soft silicone wash finish. Perfect for daily rotation and effortless layering under utility jackets or hoodies.',
    price: 38,
    originalPrice: 48,
    category: 'minimal',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Dark Charcoal', hex: '#202024' },
      { name: 'Raw Slate', hex: '#37383f' }
    ],
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 45,
    featured: true,
    isNewArrival: false,
    isBestSeller: true,
    rating: 4.9,
    numReviews: 64,
    details: {
      fabric: '100% Pima Organic Cotton (240 GSM)',
      fit: 'Tailored Relaxed Fit',
      care: 'Machine wash warm, tumble dry normal',
      weight: '240 GSM Midweight Premium'
    }
  },
  {
    name: 'Off-Grid Heavyweight Bone Tee',
    slug: 'off-grid-heavyweight-bone-tee',
    tagline: 'Unbleached Natural Cotton Streetwear Essential',
    description: 'Crafted from raw, unbleached organic cotton yarns displaying natural seed flecks throughout the weave. Designed with extra room in the chest and arms to achieve a relaxed, effortless drape inspired by classic utilitarian wear.',
    price: 46,
    originalPrice: 58,
    category: 'oversized',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Bone Off-White', hex: '#eae6df' },
      { name: 'Oatmeal Heather', hex: '#dedad2' }
    ],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 28,
    featured: true,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.7,
    numReviews: 31,
    details: {
      fabric: '100% Raw Unbleached Cotton (270 GSM)',
      fit: 'Boxy Drop Shoulder',
      care: 'Machine wash cold with like colors',
      weight: '270 GSM Heavyweight'
    }
  },
  {
    name: 'Phantom Kanji Dystopia Tee',
    slug: 'phantom-kanji-dystopia-tee',
    tagline: 'Futuristic Neo-Tokyo Typography & Distressed Aesthetics',
    description: 'Features high-density reflective chest graphics and an oversized back emblem inspired by cyber-brutalism and underground street culture. Pre-shrunk and garment-dyed for lifelong durability and zero shrinkage.',
    price: 54,
    originalPrice: 68,
    category: 'graphic',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Void Black', hex: '#0a0a0c' }
    ],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 19,
    featured: true,
    isNewArrival: false,
    isBestSeller: true,
    rating: 4.9,
    numReviews: 53,
    details: {
      fabric: '100% Combed Cotton with 3M Reflective Inks',
      fit: 'Standard Streetwear Boxy',
      care: 'Gentle wash inside out, line dry',
      weight: '260 GSM'
    }
  },
  {
    name: 'Core Heavy Duty Daily Crew',
    slug: 'core-heavy-duty-daily-crew',
    tagline: 'The Ultimate Daily Uniform Heavyweight Tee',
    description: 'Engineered to be the sturdiest everyday t-shirt in your closet. Double-needle coverstitched neckband that will never bacon, reinforced shoulder tape, and a dense 300 GSM weave that drapes cleanly without clinging.',
    price: 36,
    originalPrice: 45,
    category: 'basic',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Deep Jet Black', hex: '#08080a' },
      { name: 'Dark Heather', hex: '#2b2c33' }
    ],
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 60,
    featured: false,
    isNewArrival: false,
    isBestSeller: true,
    rating: 5.0,
    numReviews: 89,
    details: {
      fabric: '100% Combed Ring-Spun Cotton (300 GSM)',
      fit: 'Structured Regular Fit',
      care: 'Normal machine wash and dry',
      weight: '300 GSM Super Heavyweight'
    }
  },
  {
    name: 'Washed Olive Utility Oversized Tee',
    slug: 'washed-olive-utility-oversized-tee',
    tagline: 'Military Inspired Pigment Dye Streetwear Tee',
    description: 'Pigment-dyed military olive tee featuring a micro utility pocket on the left sleeve and subtle tonal DarkWear crest embroidery on the nape. Stonewashed for that authentic vintage patina and ultra-soft hand feel.',
    price: 49,
    originalPrice: 62,
    category: 'oversized',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Washed Olive', hex: '#374135' }
    ],
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 24,
    featured: true,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.8,
    numReviews: 18,
    details: {
      fabric: '100% Pigment-Dyed Cotton (250 GSM)',
      fit: 'Relaxed Drop Shoulder',
      care: 'Wash with similar dark colors',
      weight: '250 GSM Mid-Heavy'
    }
  },
  {
    name: 'Soundwave Glitch Experimental Tee',
    slug: 'soundwave-glitch-experimental-tee',
    tagline: 'Noise Spectrum Displaced Graphic Tee',
    description: 'A visual experiment fusing underground electronic music culture with distorted vector optics. Features a soft-touch discharge print that breaths naturally and never cracks or peels under friction.',
    price: 50,
    originalPrice: 65,
    category: 'graphic',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Carbon Black', hex: '#141416' }
    ],
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 30,
    featured: false,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.6,
    numReviews: 15,
    details: {
      fabric: '100% Combed Compact Cotton (260 GSM)',
      fit: 'Boxy Casual',
      care: 'Machine wash cold inside-out',
      weight: '260 GSM'
    }
  },
  {
    name: 'Surgical Precision Minimal Tee',
    slug: 'surgical-precision-minimal-tee',
    tagline: 'Technical Ergonomic Seaming with Clean Finish',
    description: 'Engineered with curved ergonomic side seams, bonded flatlock stitch details, and a subtle reflective micro-logo on the left rib. Designed for movement, supreme comfort, and modern architectural aesthetics.',
    price: 44,
    originalPrice: 55,
    category: 'minimal',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Matte Asphalt', hex: '#232428' },
      { name: 'Ghost White', hex: '#f0f0f2' }
    ],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 32,
    featured: false,
    isNewArrival: false,
    isBestSeller: true,
    rating: 4.9,
    numReviews: 38,
    details: {
      fabric: '95% Cotton, 5% Elastane Tech Blend (250 GSM)',
      fit: 'Athletic Relaxed Fit',
      care: 'Cold wash, do not tumble dry',
      weight: '250 GSM Stretch Cotton'
    }
  },
  {
    name: 'Concrete Heather Heavy Tee',
    slug: 'concrete-heather-heavy-tee',
    tagline: 'Brutalist Melange Raw Streetwear Tee',
    description: 'Woven with two-tone heather melange yarns replicating the brutalist texture of wet concrete. Heavyweight ribbed crewneck with reinforced chainstitching across shoulder-to-shoulder span.',
    price: 42,
    originalPrice: 52,
    category: 'basic',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Concrete Grey', hex: '#484a51' }
    ],
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 40,
    featured: false,
    isNewArrival: false,
    isBestSeller: false,
    rating: 4.7,
    numReviews: 22,
    details: {
      fabric: '90% Cotton, 10% Polyester Melange (280 GSM)',
      fit: 'Oversized Boxy Silhouette',
      care: 'Normal machine wash',
      weight: '280 GSM Heavy Melange'
    }
  },
  {
    name: 'Tokyo Neon Anarchy Graphic Tee',
    slug: 'tokyo-neon-anarchy-graphic-tee',
    tagline: 'Acid Neon Accents on Pitch Black Heavy Canvas',
    description: 'Electric lime and deep violet layered graphics created using specialty puff ink that adds 3D tactile texture across the back piece. An authentic centerpiece for modern street fashion.',
    price: 56,
    originalPrice: 75,
    category: 'graphic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Jet Black / Neon', hex: '#0f0f11' }
    ],
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 18,
    featured: true,
    isNewArrival: true,
    isBestSeller: true,
    rating: 5.0,
    numReviews: 47,
    details: {
      fabric: '100% Cotton with High-Density 3D Puff Print',
      fit: 'Relaxed Streetwear Drop-Shoulder',
      care: 'Wash cold inside out, never iron print',
      weight: '270 GSM'
    }
  },
  {
    name: 'Shadow Realm Distressed Oversized Tee',
    slug: 'shadow-realm-distressed-oversized-tee',
    tagline: 'Hand-Distressed Edge Ribbing with Vintage Fade',
    description: 'Hand-distressed collar and cuff trims give this piece an authentic lived-in energy from day one. Enzyme washed 20 times for maximum softness and authentic fade along seam lines.',
    price: 55,
    originalPrice: 72,
    category: 'oversized',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Faded Obsidian', hex: '#1a1b20' }
    ],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 15,
    featured: true,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.8,
    numReviews: 29,
    details: {
      fabric: '100% Combed Cotton with Hand Distressing',
      fit: 'Dramatic Oversized Drop-Shoulder',
      care: 'Delicate cold cycle, flat dry',
      weight: '290 GSM'
    }
  }
];

module.exports = seedProducts;
