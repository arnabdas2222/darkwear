const { orderStore, productStore } = require('../data/store');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items supplied'
      });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full shipping details'
      });
    }

    const orderData = {
      user: {
        firebaseUid: req.user.firebaseUid,
        email: req.user.email,
        displayName: req.user.displayName || req.user.name || 'DarkWear Member'
      },
      items: items.map(item => ({
        productId: item.productId || item._id,
        name: item.name,
        image: item.image,
        price: Number(item.price),
        size: item.size || 'L',
        color: item.color || 'Onyx Black',
        quantity: Number(item.quantity) || 1
      })),
      shippingAddress: {
        fullName: shippingAddress.fullName,
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode || '10001',
        country: shippingAddress.country || 'United States',
        phone: shippingAddress.phone || '+1 555-0192'
      },
      paymentMethod: paymentMethod || 'Demo Credit Card (Simulated)',
      itemsPrice: Number(itemsPrice) || 0,
      shippingPrice: Number(shippingPrice) || 0,
      taxPrice: Number(taxPrice) || 0,
      totalPrice: Number(totalPrice) || 0,
      isPaid: true,
      paidAt: new Date().toISOString(),
      orderStatus: 'Processing'
    };

    const order = await orderStore.create(orderData);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderStore.findByUserUid(req.user.firebaseUid);
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await orderStore.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check permissions: owner or admin
    const isOwner = order.user && order.user.firebaseUid === req.user.firebaseUid;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private / Admin
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderStore.findAll();

    // Calculate quick stats
    const totalRevenue = orders.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
    const pendingCount = orders.filter(o => o.orderStatus === 'Processing').length;
    const shippedCount = orders.filter(o => o.orderStatus === 'Shipped').length;
    const deliveredCount = orders.filter(o => o.orderStatus === 'Delivered').length;

    res.json({
      success: true,
      count: orders.length,
      stats: {
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        pendingCount,
        shippedCount,
        deliveredCount
      },
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private / Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Valid values: ${validStatuses.join(', ')}`
      });
    }

    const updated = await orderStore.updateStatus(req.params.id, status);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
};
