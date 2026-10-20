const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const seedProducts = require('./seedData');

const DATA_DIR = path.join(__dirname);
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Ensure JSON data store exists
function ensureJsonStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(PRODUCTS_FILE)) {
    const initialProducts = seedProducts.map((p, idx) => ({
      _id: `prod_${idx + 1}`,
      ...p,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(initialProducts, null, 2));
  }

  if (!fs.existsSync(USERS_FILE)) {
    const initialUsers = [
      {
        _id: 'user_admin',
        firebaseUid: 'admin-uid-100',
        email: 'admin@darkwear.com',
        displayName: 'DarkWear Admin',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'user_customer',
        firebaseUid: 'demo-customer-uid-200',
        email: 'shopper@darkwear.com',
        displayName: 'Alex Rivers',
        role: 'customer',
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2));
  }

  if (!fs.existsSync(ORDERS_FILE)) {
    const initialOrders = [
      {
        _id: 'ord_1001',
        orderNumber: 'DW-88219',
        user: {
          firebaseUid: 'demo-customer-uid-200',
          email: 'shopper@darkwear.com',
          displayName: 'Alex Rivers'
        },
        items: [
          {
            productId: 'prod_1',
            name: 'Obsidian Acid-Wash Heavy Tee',
            image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
            price: 48,
            size: 'L',
            color: 'Acid Obsidian',
            quantity: 1
          },
          {
            productId: 'prod_3',
            name: 'Raw Minimalist Charcoal Blank',
            image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
            price: 38,
            size: 'M',
            color: 'Dark Charcoal',
            quantity: 2
          }
        ],
        shippingAddress: {
          fullName: 'Alex Rivers',
          address: '742 Evergreen Terrace',
          city: 'Brooklyn',
          postalCode: '11201',
          country: 'United States',
          phone: '+1 (555) 234-5678'
        },
        paymentMethod: 'Demo Credit Card (Simulated)',
        itemsPrice: 124,
        shippingPrice: 0,
        taxPrice: 9.92,
        totalPrice: 133.92,
        isPaid: true,
        paidAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        orderStatus: 'Shipped',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(initialOrders, null, 2));
  }
}

ensureJsonStore();

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return [];
  }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

const isMongoActive = () => mongoose.connection.readyState === 1;

// Product Data Operations
const productStore = {
  find: async (query = {}, sort = { createdAt: -1 }) => {
    if (isMongoActive()) {
      let q = Product.find();
      if (query.category) q = q.where('category').equals(query.category);
      if (query.search) {
        q = q.or([
          { name: { $regex: query.search, $options: 'i' } },
          { description: { $regex: query.search, $options: 'i' } }
        ]);
      }
      if (query.featured !== undefined) q = q.where('featured').equals(query.featured);
      if (query.isNewArrival !== undefined) q = q.where('isNewArrival').equals(query.isNewArrival);
      if (query.isBestSeller !== undefined) q = q.where('isBestSeller').equals(query.isBestSeller);
      return await q.sort(sort);
    }

    let products = readJson(PRODUCTS_FILE);
    if (query.category && query.category !== 'all') {
      products = products.filter(p => p.category === query.category);
    }
    if (query.search) {
      const term = query.search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term))
      );
    }
    if (query.featured !== undefined) {
      products = products.filter(p => p.featured === query.featured);
    }
    if (query.isNewArrival !== undefined) {
      products = products.filter(p => p.isNewArrival === query.isNewArrival);
    }
    if (query.isBestSeller !== undefined) {
      products = products.filter(p => p.isBestSeller === query.isBestSeller);
    }

    // Sorting
    if (sort.price === 1) products.sort((a, b) => a.price - b.price);
    else if (sort.price === -1) products.sort((a, b) => b.price - a.price);
    else if (sort.rating === -1) products.sort((a, b) => b.rating - a.rating);
    else products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return products;
  },

  findById: async (id) => {
    if (isMongoActive()) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return await Product.findById(id);
      }
      return await Product.findOne({ $or: [{ slug: id }, { _id: id }] });
    }
    const products = readJson(PRODUCTS_FILE);
    return products.find(p => p._id === id || p.slug === id) || null;
  },

  create: async (data) => {
    if (isMongoActive()) {
      const p = new Product(data);
      return await p.save();
    }
    const products = readJson(PRODUCTS_FILE);
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);
    const newProduct = {
      _id: `prod_${Date.now()}`,
      slug,
      rating: 5.0,
      numReviews: 0,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    products.unshift(newProduct);
    writeJson(PRODUCTS_FILE, products);
    return newProduct;
  },

  findByIdAndUpdate: async (id, data) => {
    if (isMongoActive()) {
      return await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    const products = readJson(PRODUCTS_FILE);
    const index = products.findIndex(p => p._id === id || p.slug === id);
    if (index === -1) return null;
    products[index] = {
      ...products[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    writeJson(PRODUCTS_FILE, products);
    return products[index];
  },

  findByIdAndDelete: async (id) => {
    if (isMongoActive()) {
      return await Product.findByIdAndDelete(id);
    }
    const products = readJson(PRODUCTS_FILE);
    const index = products.findIndex(p => p._id === id || p.slug === id);
    if (index === -1) return null;
    const removed = products.splice(index, 1)[0];
    writeJson(PRODUCTS_FILE, products);
    return removed;
  }
};

// User Data Operations
const userStore = {
  findByUid: async (firebaseUid) => {
    if (isMongoActive()) {
      return await User.findOne({ firebaseUid });
    }
    const users = readJson(USERS_FILE);
    return users.find(u => u.firebaseUid === firebaseUid) || null;
  },

  findByEmail: async (email) => {
    if (isMongoActive()) {
      return await User.findOne({ email: email.toLowerCase() });
    }
    const users = readJson(USERS_FILE);
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  upsert: async (userData) => {
    const adminEmails = (process.env.ADMIN_EMAILS || 'admin@darkwear.com').split(',').map(e => e.trim().toLowerCase());
    const role = (userData.email && adminEmails.includes(userData.email.toLowerCase())) ? 'admin' : (userData.role || 'customer');

    if (isMongoActive()) {
      return await User.findOneAndUpdate(
        { firebaseUid: userData.firebaseUid },
        { ...userData, role },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
    }
    const users = readJson(USERS_FILE);
    const index = users.findIndex(u => u.firebaseUid === userData.firebaseUid);
    if (index !== -1) {
      users[index] = {
        ...users[index],
        ...userData,
        role: users[index].role === 'admin' ? 'admin' : role,
        updatedAt: new Date().toISOString()
      };
      writeJson(USERS_FILE, users);
      return users[index];
    } else {
      const newUser = {
        _id: `user_${Date.now()}`,
        ...userData,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      users.push(newUser);
      writeJson(USERS_FILE, users);
      return newUser;
    }
  },

  updateProfile: async (firebaseUid, profileData) => {
    if (isMongoActive()) {
      return await User.findOneAndUpdate(
        { firebaseUid },
        { $set: profileData },
        { new: true }
      );
    }
    const users = readJson(USERS_FILE);
    const index = users.findIndex(u => u.firebaseUid === firebaseUid);
    if (index === -1) return null;
    users[index] = {
      ...users[index],
      ...profileData,
      updatedAt: new Date().toISOString()
    };
    writeJson(USERS_FILE, users);
    return users[index];
  }
};

// Order Data Operations
const orderStore = {
  create: async (orderData) => {
    const orderNumber = 'DW-' + Math.floor(10000 + Math.random() * 90000);
    const fullOrder = {
      orderNumber,
      isPaid: true,
      paidAt: new Date().toISOString(),
      orderStatus: 'Processing',
      ...orderData
    };

    if (isMongoActive()) {
      const order = new Order(fullOrder);
      return await order.save();
    }

    const orders = readJson(ORDERS_FILE);
    const newOrder = {
      _id: `ord_${Date.now()}`,
      ...fullOrder,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    orders.unshift(newOrder);
    writeJson(ORDERS_FILE, orders);
    return newOrder;
  },

  findByUserUid: async (firebaseUid) => {
    if (isMongoActive()) {
      return await Order.find({ 'user.firebaseUid': firebaseUid }).sort({ createdAt: -1 });
    }
    const orders = readJson(ORDERS_FILE);
    return orders.filter(o => o.user && o.user.firebaseUid === firebaseUid)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  findAll: async () => {
    if (isMongoActive()) {
      return await Order.find().sort({ createdAt: -1 });
    }
    const orders = readJson(ORDERS_FILE);
    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  findById: async (id) => {
    if (isMongoActive()) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return await Order.findById(id);
      }
      return await Order.findOne({ $or: [{ orderNumber: id }, { _id: id }] });
    }
    const orders = readJson(ORDERS_FILE);
    return orders.find(o => o._id === id || o.orderNumber === id) || null;
  },

  updateStatus: async (id, status) => {
    const update = {
      orderStatus: status,
      ...(status === 'Delivered' ? { deliveredAt: new Date() } : {})
    };

    if (isMongoActive()) {
      return await Order.findByIdAndUpdate(id, update, { new: true });
    }
    const orders = readJson(ORDERS_FILE);
    const index = orders.findIndex(o => o._id === id || o.orderNumber === id);
    if (index === -1) return null;
    orders[index] = {
      ...orders[index],
      ...update,
      updatedAt: new Date().toISOString()
    };
    writeJson(ORDERS_FILE, orders);
    return orders[index];
  }
};

module.exports = {
  productStore,
  userStore,
  orderStore,
  isMongoActive,
  ensureJsonStore
};
