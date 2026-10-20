require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const seedProducts = require('./data/seedData');

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/darkwear';

  try {
    console.log(`[Seed] Connecting to MongoDB: ${uri}`);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('[Seed] Connected successfully.');

    // Clear existing collections
    console.log('[Seed] Clearing old collections...');
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    // Insert products
    console.log(`[Seed] Inserting ${seedProducts.length} streetwear T-shirt products...`);
    const createdProducts = await Product.insertMany(seedProducts);
    console.log(`[Seed] Successfully inserted ${createdProducts.length} products!`);

    // Insert demo users
    const users = [
      {
        firebaseUid: 'admin-uid-100',
        email: 'admin@darkwear.com',
        displayName: 'DarkWear Admin',
        role: 'admin',
        shippingAddress: {
          fullName: 'DarkWear Studio Admin',
          street: '101 Streetwear Blvd',
          city: 'Los Angeles',
          state: 'CA',
          postalCode: '90013',
          country: 'United States',
          phone: '+1 (213) 555-0144'
        }
      },
      {
        firebaseUid: 'demo-customer-uid-200',
        email: 'shopper@darkwear.com',
        displayName: 'Alex Rivers',
        role: 'customer',
        shippingAddress: {
          fullName: 'Alex Rivers',
          street: '742 Evergreen Terrace',
          city: 'Brooklyn',
          state: 'NY',
          postalCode: '11201',
          country: 'United States',
          phone: '+1 (555) 234-5678'
        }
      }
    ];

    console.log('[Seed] Creating demo users...');
    await User.insertMany(users);

    // Insert a sample order
    console.log('[Seed] Creating sample order...');
    await Order.create({
      orderNumber: 'DW-88219',
      user: {
        firebaseUid: 'demo-customer-uid-200',
        email: 'shopper@darkwear.com',
        displayName: 'Alex Rivers'
      },
      items: [
        {
          productId: createdProducts[0]._id.toString(),
          name: createdProducts[0].name,
          image: createdProducts[0].images[0],
          price: createdProducts[0].price,
          size: 'L',
          color: 'Acid Obsidian',
          quantity: 1
        },
        {
          productId: createdProducts[2]._id.toString(),
          name: createdProducts[2].name,
          image: createdProducts[2].images[0],
          price: createdProducts[2].price,
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
      itemsPrice: createdProducts[0].price + createdProducts[2].price * 2,
      shippingPrice: 0,
      taxPrice: 9.92,
      totalPrice: createdProducts[0].price + createdProducts[2].price * 2 + 9.92,
      isPaid: true,
      paidAt: new Date(Date.now() - 86400000 * 2),
      orderStatus: 'Shipped'
    });

    console.log('[Seed] Database seeded successfully! 🚀');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed] Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
