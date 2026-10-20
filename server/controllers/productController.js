const { productStore } = require('../data/store');

// @desc    Get all products with filtering, search, and sorting
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { category, search, sort, featured, isNewArrival, isBestSeller } = req.query;

    const query = {};
    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }
    if (search) {
      query.search = search.trim();
    }
    if (featured === 'true') {
      query.featured = true;
    }
    if (isNewArrival === 'true') {
      query.isNewArrival = true;
    }
    if (isBestSeller === 'true') {
      query.isBestSeller = true;
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price-low') {
      sortOption = { price: 1 };
    } else if (sort === 'price-high') {
      sortOption = { price: -1 };
    } else if (sort === 'rating') {
      sortOption = { rating: -1 };
    }

    const products = await productStore.find(query, sortOption);

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID or slug
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await productStore.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'T-shirt product not found'
      });
    }

    // Also fetch 4 related products in same category
    const relatedProducts = await productStore.find(
      { category: product.category },
      { rating: -1 }
    );

    const related = relatedProducts
      .filter(p => p._id.toString() !== product._id.toString())
      .slice(0, 4);

    res.json({
      success: true,
      data: product,
      related
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private / Admin
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      tagline,
      description,
      price,
      originalPrice,
      category,
      sizes,
      colors,
      images,
      stock,
      featured,
      isNewArrival,
      isBestSeller,
      details
    } = req.body;

    if (!name || !description || price === undefined || !images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, price, and at least one image are required.'
      });
    }

    const product = await productStore.create({
      name,
      tagline: tagline || 'Premium Heavyweight Streetwear Tee',
      description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      category: category || 'oversized',
      sizes: sizes || ['S', 'M', 'L', 'XL'],
      colors: colors || [{ name: 'Onyx Black', hex: '#111115' }],
      images: Array.isArray(images) ? images : [images],
      stock: stock !== undefined ? Number(stock) : 25,
      featured: Boolean(featured),
      isNewArrival: Boolean(isNewArrival),
      isBestSeller: Boolean(isBestSeller),
      details: details || {
        fabric: '100% Combed Heavyweight Cotton (260 GSM)',
        fit: 'Relaxed Drop-Shoulder Boxy Fit',
        care: 'Machine wash cold inside-out, tumble dry low',
        weight: '260 GSM'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private / Admin
const updateProduct = async (req, res, next) => {
  try {
    const product = await productStore.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const updated = await productStore.findByIdAndUpdate(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private / Admin
const deleteProduct = async (req, res, next) => {
  try {
    const product = await productStore.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await productStore.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully',
      id: req.params.id
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get categories stats
// @route   GET /api/products/meta/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const products = await productStore.find({});
    const categories = [
      { id: 'all', name: 'All Drops', count: products.length },
      { id: 'oversized', name: 'Oversized Tees', count: products.filter(p => p.category === 'oversized').length },
      { id: 'graphic', name: 'Graphic Tees', count: products.filter(p => p.category === 'graphic').length },
      { id: 'minimal', name: 'Minimalist', count: products.filter(p => p.category === 'minimal').length },
      { id: 'basic', name: 'Heavyweight Basics', count: products.filter(p => p.category === 'basic').length }
    ];

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
};
