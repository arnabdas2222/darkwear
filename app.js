/**
 * DarkWear — Streetwear Apparel Store Application Logic
 * Pure ES6 JavaScript for direct VS Code "Go Live" execution.
 * Expanded with TeePublic-style sections & Sign Up.
 */

// 1. Curated Streetwear T-Shirt Catalog (9 Unique T-Shirts)
const productsData = [
  {
    id: 'dw-01',
    name: 'Sotto Zero Typography Tee',
    category: 'minimal',
    categoryLabel: 'Minimalist Tee',
    price: 54,
    originalPrice: 68,
    image: 'images/tshirt-sotto-zero.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'NEW DROP',
    badgeType: 'lime',
    rating: 4.9,
    reviews: 47,
    isBestSeller: true,
    isFeatured: true,
    description: 'Premium folded-display typography tee featuring the iconic "Sotto Zero" branding in metallic silver on deep obsidian cotton. Crafted with 280 GSM combed heavyweight fabric, tight ribbed crewneck collar, and a refined boxy drape that commands attention.',
    details: {
      fabric: '100% Combed Heavy Cotton (280 GSM)',
      fit: 'Relaxed Boxy Crewneck',
      care: 'Wash cold inside-out, hang dry to maintain print'
    }
  },
  {
    id: 'dw-02',
    name: 'Cafe Racer Vintage Long Sleeve',
    category: 'graphic',
    categoryLabel: 'Graphic Tee',
    price: 58,
    originalPrice: 72,
    image: 'images/tshirt-cafe-racer.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'TRENDING',
    badgeType: 'lime',
    rating: 4.8,
    reviews: 52,
    isBestSeller: true,
    isFeatured: false,
    description: 'Heritage-inspired "Just Ride — Cafe Racer" long-sleeve tee with vintage motorcycle illustration in antique gold on charcoal canvas. Custom built motorcycles EST. 1983 print with aged-wash finish for authentic retro character.',
    details: {
      fabric: '100% Ring-Spun Combed Cotton (270 GSM)',
      fit: 'Regular Fit Long Sleeve',
      care: 'Machine wash cold with similar colors'
    }
  },
  {
    id: 'dw-03',
    name: 'Royal Blue Statement Mockup Tee',
    category: 'graphic',
    categoryLabel: 'Graphic Tee',
    price: 46,
    originalPrice: 58,
    image: 'images/tshirt-blue-mockup.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: '-20% OFF',
    badgeType: 'rose',
    rating: 4.9,
    reviews: 63,
    isBestSeller: false,
    isFeatured: true,
    description: 'Vivid royal blue statement tee featuring bold white typographic "T-SHIRT MOCK UP" graphics with geometric star and stripe elements. Crafted from premium pigment-dyed cotton for a vibrant, fade-resistant finish.',
    details: {
      fabric: '100% Pigment-Dyed Cotton (260 GSM)',
      fit: 'Classic Crewneck Regular',
      care: 'Cold water wash inside-out, line dry'
    }
  },
  {
    id: 'dw-04',
    name: 'Awesome Today Motivational Tee',
    category: 'graphic',
    categoryLabel: 'Graphic Tee',
    price: 48,
    originalPrice: 62,
    image: 'images/tshirt-awesome-today.webp',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'BESTSELLER',
    badgeType: 'amber',
    rating: 5.0,
    reviews: 89,
    isBestSeller: true,
    isFeatured: true,
    description: '"Let\'s Be Awesome Today" — bold motivational typography in vibrant teal and orange gradients on premium black cotton. High-density screenprint that retains crisp detail through countless washes.',
    details: {
      fabric: '100% Ring-Spun Cotton (270 GSM)',
      fit: 'Athletic Relaxed Silhouette',
      care: 'Machine wash normal, tumble dry low'
    }
  },
  {
    id: 'dw-05',
    name: 'Artwork Arrow Minimal Dark Tee',
    category: 'minimal',
    categoryLabel: 'Minimalist Tee',
    price: 44,
    originalPrice: 55,
    image: 'images/tshirt-artwork-arrow.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'ICONIC',
    badgeType: 'lime',
    rating: 4.7,
    reviews: 41,
    isBestSeller: false,
    isFeatured: true,
    description: 'Understated dark minimal tee with yellow directional arrow graphic and "update with your artwork" tagline. A canvas for creative expression on 280 GSM enzyme stone-washed cotton.',
    details: {
      fabric: '100% Long-Staple Combed Cotton (280 GSM)',
      fit: 'Structured Boxy Silhouette',
      care: 'Delicate cold cycle, warm iron'
    }
  },
  {
    id: 'dw-06',
    name: 'Eat Sleep Design Repeat Tee',
    category: 'minimal',
    categoryLabel: 'Minimalist Tee',
    price: 48,
    originalPrice: 62,
    image: 'images/tshirt-design-repeat.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'POPULAR',
    badgeType: 'amber',
    rating: 4.8,
    reviews: 84,
    isBestSeller: true,
    isFeatured: false,
    description: 'A minimalist design manifesto. High-contrast typography arranged in circular symmetry on an ultra-dark combed cotton canvas. Ergonomic tailored neckline with reinforced neck taping.',
    details: {
      fabric: '100% Ring-Spun Cotton (270 GSM)',
      fit: 'Athletic Relaxed Silhouette',
      care: 'Machine wash normal, tumble dry low'
    }
  },
  {
    id: 'dw-07',
    name: 'Bauhaus Geometry Colorblock Tee',
    category: 'graphic',
    categoryLabel: 'Graphic Tee',
    price: 54,
    originalPrice: 68,
    image: 'images/tshirt-geometric-bauhaus.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'LIMITED',
    badgeType: 'outline',
    rating: 4.9,
    reviews: 38,
    isBestSeller: false,
    isFeatured: false,
    description: 'Vibrant modernist geometric color blocks printed with high-density archival pigments on custom 280 GSM combed cotton. Designed with dropped shoulders, a tight ribbed crewneck collar, and an architectural boxy drape.',
    details: {
      fabric: '100% Combed Heavy Cotton (280 GSM)',
      fit: 'Relaxed Boxy Drop-Shoulder',
      care: 'Wash cold inside-out, hang dry to maintain colors'
    }
  },
  {
    id: 'dw-08',
    name: 'Solar Hanger Heavyweight Crewneck',
    category: 'oversized',
    categoryLabel: 'Oversized Tee',
    price: 46,
    originalPrice: 58,
    image: 'images/tshirt-solar-hanger.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'ESSENTIAL',
    badgeType: 'lime',
    rating: 4.9,
    reviews: 57,
    isBestSeller: true,
    isFeatured: true,
    description: 'Vibrant solar mustard yellow streetwear tee crafted with heavyweight structure. Features subtle typographic sleeve detailing, double-stitched collar, and an authentic enzyme stone-wash finish for superior comfort.',
    details: {
      fabric: '100% Pigment-Dyed Cotton (290 GSM)',
      fit: 'Heavyweight Boxy Drop Shoulder',
      care: 'Cold water wash inside-out, line dry'
    }
  },
  {
    id: 'dw-09',
    name: 'Duo Clothesline Charcoal & Mocha',
    category: 'oversized',
    categoryLabel: 'Oversized Tee',
    price: 58,
    originalPrice: 75,
    image: 'images/tshirt-duo-hangers.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'DUO DROP',
    badgeType: 'rose',
    rating: 5.0,
    reviews: 73,
    isBestSeller: false,
    isFeatured: false,
    description: 'Signature dual-tone streetwear pack featuring charcoal black and desert mocha tees suspended from wooden hangers. Features bold circular emblem print and double-stitched edges.',
    details: {
      fabric: '100% Combed Cotton (290 GSM)',
      fit: 'Oversized Drop-Shoulder Silhouette',
      care: 'Wash cold inside-out with dark colors'
    }
  }
];

// 2. Application State
let currentCategory = 'all';
let currentSearch = '';
let activeSelectedSize = 'L';
let selectedProduct = null;
let discountPercent = 0;
let appliedPromoCode = '';

// LocalStorage Persistent Shopping Cart
let cart = [];
try {
  const savedCart = localStorage.getItem('darkwear_static_cart');
  if (savedCart) cart = JSON.parse(savedCart);
} catch (e) {
  cart = [];
}

// Current User State
let currentUser = null;
try {
  const savedUser = localStorage.getItem('darkwear_user_demo');
  if (savedUser) currentUser = JSON.parse(savedUser);
} catch (e) {
  currentUser = null;
}

// 3. UI Helpers
function saveCart() {
  localStorage.setItem('darkwear_static_cart', JSON.stringify(cart));
  updateCartUI();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;
  toastText.textContent = message;
  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 2800);
}

// 4. Cart Logic
function addToCart(productId, size = 'L', quantity = 1) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size: size,
      quantity: quantity
    });
  }

  saveCart();
  showToast(`Added "${product.name}" (${size}) to bag!`);
  openCartDrawer();
}

function updateCartQuantity(productId, size, change) {
  const index = cart.findIndex(item => item.id === productId && item.size === size);
  if (index > -1) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }
  saveCart();
}

function removeCartItem(productId, size) {
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart();
}

function clearCart() {
  cart = [];
  discountPercent = 0;
  appliedPromoCode = '';
  saveCart();
}

function updateCartUI() {
  const cartBadge = document.getElementById('cart-badge');
  const drawerItems = document.getElementById('drawer-items-list');
  const drawerSubtotal = document.getElementById('drawer-subtotal');
  const drawerShipping = document.getElementById('drawer-shipping');
  const drawerTotal = document.getElementById('drawer-total');
  const drawerCount = document.getElementById('drawer-item-count');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
  }

  if (drawerCount) {
    drawerCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100) * 100) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 9;
  const tax = Math.round(subtotalAfterDiscount * 0.08 * 100) / 100;
  const total = Math.round((subtotalAfterDiscount + shipping + tax) * 100) / 100;

  if (drawerSubtotal) drawerSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (drawerShipping) drawerShipping.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  if (drawerTotal) drawerTotal.textContent = `$${total.toFixed(2)}`;

  if (drawerItems) {
    if (cart.length === 0) {
      drawerItems.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: #8e909d;">
          <p style="font-size: 1.1rem; color: #ffffff; font-weight: 700; margin-bottom: 0.5rem;">Your shopping bag is empty</p>
          <p style="font-size: 0.85rem; margin-bottom: 1.5rem;">Pick your favorite heavyweight drops to get started.</p>
          <button class="btn btn-outline btn-sm" onclick="closeCartDrawer(); window.location.href='#shop'">Explore Catalog</button>
        </div>
      `;
    } else {
      drawerItems.innerHTML = cart.map(item => `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <h4 style="font-size: 0.925rem; font-weight: 700; color: #ffffff; line-height: 1.2;">${item.name}</h4>
                <button onclick="removeCartItem('${item.id}', '${item.size}')" style="background: none; border: none; color: #71717a; cursor: pointer; padding: 2px;">✕</button>
              </div>
              <p style="font-size: 0.78rem; color: #a1a1aa; margin-top: 4px;">Size: <strong style="color: #ffffff;">${item.size}</strong></p>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
              <div style="display: flex; align-items: center; background: #09090c; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;">
                <button onclick="updateCartQuantity('${item.id}', '${item.size}', -1)" style="background: none; border: none; color: #ffffff; padding: 2px 8px; cursor: pointer;">-</button>
                <span style="font-size: 0.8rem; font-weight: 700; padding: 0 4px;">${item.quantity}</span>
                <button onclick="updateCartQuantity('${item.id}', '${item.size}', 1)" style="background: none; border: none; color: #ffffff; padding: 2px 8px; cursor: pointer;">+</button>
              </div>
              <span style="font-size: 0.95rem; font-weight: 800; color: #ffffff;">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
}

// 5. Product Detail View Functionality (image, name, price, description, size, quantity)
function openProductDetail(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  selectedProduct = product;
  activeSelectedSize = product.sizes[0] || 'L';

  document.getElementById('pdp-img').src = product.image;
  document.getElementById('pdp-name').textContent = product.name;
  document.getElementById('pdp-price').textContent = `$${product.price.toFixed(2)}`;
  document.getElementById('pdp-desc').textContent = product.description;
  document.getElementById('pdp-fabric').textContent = product.details.fabric;
  document.getElementById('pdp-fit').textContent = product.details.fit;
  document.getElementById('pdp-care').textContent = product.details.care;
  document.getElementById('pdp-qty-input').value = '1';

  renderPdpSizes();

  const pdpView = document.getElementById('product-detail-page-view');
  pdpView.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Alias for hero rack onclick handlers
function openProductModal(id) {
  openProductDetail(id);
}

function renderPdpSizes() {
  const box = document.getElementById('pdp-sizes-container');
  if (!box || !selectedProduct) return;
  box.innerHTML = selectedProduct.sizes.map(sz => `
    <button
      class="pdp-size-btn ${sz === activeSelectedSize ? 'active' : ''}"
      onclick="selectPdpSize('${sz}')"
    >
      ${sz}
    </button>
  `).join('');
}

function selectPdpSize(size) {
  activeSelectedSize = size;
  renderPdpSizes();
}

function changePdpQty(delta) {
  const input = document.getElementById('pdp-qty-input');
  if (!input) return;
  let val = parseInt(input.value, 10) || 1;
  val = Math.max(1, Math.min(20, val + delta));
  input.value = val;
}

function addCurrentProductToCart() {
  if (!selectedProduct) return;
  const qty = parseInt(document.getElementById('pdp-qty-input')?.value || 1, 10);
  addToCart(selectedProduct.id, activeSelectedSize, qty);
  closeProductDetail();
}

function closeProductDetail() {
  const pdpView = document.getElementById('product-detail-page-view');
  pdpView.classList.remove('active');
  document.body.style.overflow = '';
}

// 6. Cart Drawer & Checkout Modals
function openCartDrawer() {
  document.getElementById('cart-drawer-overlay').classList.add('active');
}

function closeCartDrawer() {
  document.getElementById('cart-drawer-overlay').classList.remove('active');
}

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('Your shopping bag is empty.');
    return;
  }
  closeCartDrawer();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100) * 100) / 100;
  const shipping = subtotal > 75 ? 0 : 9;
  const tax = Math.round((subtotal - discountAmount) * 0.08 * 100) / 100;
  const total = (subtotal - discountAmount + shipping + tax).toFixed(2);

  document.getElementById('checkout-items-summary').innerHTML = cart.map(item => `
    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #a1a1aa;">
      <span>${item.quantity}x ${item.name} (${item.size})</span>
      <span style="color: #ffffff; font-weight: 700;">$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join('');

  document.getElementById('checkout-final-total').textContent = `$${total}`;
  document.getElementById('checkout-modal').classList.add('active');
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal').classList.remove('active');
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const orderNumber = 'DW-' + Math.floor(10000 + Math.random() * 90000);
  const fullName = document.getElementById('checkout-name').value;

  clearCart();
  closeCheckoutModal();

  document.getElementById('confirm-order-num').textContent = orderNumber;
  document.getElementById('confirm-cust-name').textContent = fullName;
  document.getElementById('confirm-modal').classList.add('active');
}

function closeConfirmModal() {
  document.getElementById('confirm-modal').classList.remove('active');
}

// 7. Authentication (Sign In) Modal
function openAuthModal() {
  document.getElementById('auth-modal').classList.add('active');
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('active');
}

function handleDemoLogin(role) {
  currentUser = {
    email: role === 'admin' ? 'admin@darkwear.com' : 'shopper@darkwear.com',
    name: role === 'admin' ? 'DarkWear Admin' : 'Alex Rivers',
    role: role
  };
  localStorage.setItem('darkwear_user_demo', JSON.stringify(currentUser));
  updateUserNavUI();
  closeAuthModal();
  showToast(`Signed in as ${currentUser.name} (${role})`);
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem('darkwear_user_demo');
  updateUserNavUI();
  showToast('Logged out successfully.');
}

function updateUserNavUI() {
  const userBtn = document.getElementById('nav-user-btn');
  if (!userBtn) return;
  if (currentUser) {
    userBtn.innerHTML = `
      <span style="font-size: 0.85rem; font-weight: 700; color: #bef264;">${currentUser.name.split(' ')[0]}</span>
    `;
    userBtn.onclick = logoutUser;
    userBtn.title = "Click to log out";
  } else {
    userBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    `;
    userBtn.onclick = openAuthModal;
    userBtn.title = "Sign In / Member Portal";
  }
}

// 8. Sign Up Modal (NEW)
function openSignupModal() {
  document.getElementById('signup-modal').classList.add('active');
}

function closeSignupModal() {
  document.getElementById('signup-modal').classList.remove('active');
}

function handleSignup(e) {
  e.preventDefault();
  const errorBox = document.getElementById('signup-error');
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;

  // Validation
  if (name.length < 2) {
    errorBox.textContent = 'Please enter your full name.';
    errorBox.style.display = 'block';
    return;
  }
  if (!email.includes('@') || !email.includes('.')) {
    errorBox.textContent = 'Please enter a valid email address.';
    errorBox.style.display = 'block';
    return;
  }
  if (password.length < 8) {
    errorBox.textContent = 'Password must be at least 8 characters.';
    errorBox.style.display = 'block';
    return;
  }
  if (password !== confirm) {
    errorBox.textContent = 'Passwords do not match.';
    errorBox.style.display = 'block';
    return;
  }

  // Success — Demo account creation
  errorBox.style.display = 'none';
  currentUser = {
    email: email,
    name: name,
    role: 'customer'
  };
  localStorage.setItem('darkwear_user_demo', JSON.stringify(currentUser));
  updateUserNavUI();
  closeSignupModal();
  showToast(`Welcome to DarkWear, ${name.split(' ')[0]}! Account created.`);

  // Reset form
  document.getElementById('signup-form').reset();
}

// 9. 9-T-Shirt Grid Rendering (3 per row, 350-400px each, showing image, name, price)
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = productsData.filter(p => {
    const matchesCat = currentCategory === 'all' || p.category === currentCategory;
    const matchesSearch = !currentSearch ||
      p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: #8e909d;">
        <h3 style="font-size: 1.35rem; color: #ffffff; font-weight: 700; margin-bottom: 0.5rem;">No garments match your filter</h3>
        <p style="margin-bottom: 1.5rem;">Try selecting "All Drops" or clearing search keywords.</p>
        <button class="btn btn-pill-light" onclick="filterCategory('all')">Reset Catalog</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card-350" onclick="openProductDetail('${p.id}')">
      
      <!-- T-Shirt Image Box -->
      <div class="card-image-box">
        <img src="${p.image}" alt="${p.name}" class="card-product-img" loading="lazy" />
        <div class="card-hover-overlay">
          <span class="view-detail-pill">View Details →</span>
        </div>
        <div style="position: absolute; top: 14px; left: 14px; z-index: 2;">
          <span class="badge badge-${p.badgeType}">${p.badge}</span>
        </div>
      </div>

      <!-- Card Info: Name and Price -->
      <div class="card-meta-box">
        <h3 class="card-product-name">${p.name}</h3>
        <div class="card-price-row">
          <span class="card-product-price">$${p.price.toFixed(2)}</span>
          <span class="card-strike-price">$${p.originalPrice.toFixed(2)}</span>
        </div>
      </div>

    </div>
  `).join('');
}

// 10. TeePublic-Style Section Renderers
function renderBestSellers() {
  const container = document.getElementById('best-sellers-grid');
  if (!container) return;

  const bestSellers = productsData.filter(p => p.isBestSeller);
  container.innerHTML = bestSellers.map(p => `
    <div class="tp-scroll-card" onclick="openProductDetail('${p.id}')">
      <img src="${p.image}" alt="${p.name}" class="tp-scroll-card-img" loading="lazy" />
      <div class="tp-scroll-card-info">
        <h4 class="tp-scroll-card-name">${p.name}</h4>
        <div>
          <span class="tp-scroll-card-price">$${p.price.toFixed(2)}</span>
          <span class="tp-scroll-card-original">$${p.originalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderFeaturedProducts() {
  const container = document.getElementById('featured-products-grid');
  if (!container) return;

  const featured = productsData.filter(p => p.isFeatured);
  container.innerHTML = featured.map(p => `
    <div class="tp-scroll-card" onclick="openProductDetail('${p.id}')">
      <img src="${p.image}" alt="${p.name}" class="tp-scroll-card-img" loading="lazy" />
      <div class="tp-scroll-card-info">
        <h4 class="tp-scroll-card-name">${p.name}</h4>
        <div>
          <span class="tp-scroll-card-price">$${p.price.toFixed(2)}</span>
          <span class="tp-scroll-card-original">$${p.originalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// 11. Filter & Search
function filterCategory(category) {
  currentCategory = category;
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-category') === category);
  });
  renderProducts();
}

function handleSearch(e) {
  currentSearch = e.target.value.trim();
  renderProducts();
}

// 12. Promo & Newsletter
function applyPromo(e) {
  e.preventDefault();
  const input = document.getElementById('promo-input');
  if (!input) return;
  const val = input.value.trim().toUpperCase();
  if (val === 'DARK15' || val === 'STREET15') {
    discountPercent = 15;
    appliedPromoCode = val;
    showToast('Promo DARK15 Applied (-15%)!');
  } else {
    showToast('Invalid promo. Try "DARK15"');
  }
  updateCartUI();
}

function handleNewsletter(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  if (emailInput && emailInput.value) {
    showToast('Welcome to DarkWear VIP! Code DARK15 unlocked.');
    emailInput.value = '';
  }
}

// 13. Event Listeners on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // Render all sections
  renderProducts();
  renderBestSellers();
  renderFeaturedProducts();
  updateCartUI();
  updateUserNavUI();

  // Category Pill Listeners
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      filterCategory(btn.getAttribute('data-category'));
    });
  });

  // Search input listener
  const searchInput = document.getElementById('nav-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // Mobile menu listener
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav-drawer');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
    });
  }
});
