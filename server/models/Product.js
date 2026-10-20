const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [120, 'Name cannot exceed 120 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    tagline: {
      type: String,
      default: 'Premium Heavyweight Streetwear Tee'
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description']
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      min: [0, 'Price must be positive']
    },
    originalPrice: {
      type: Number,
      default: null
    },
    category: {
      type: String,
      required: true,
      enum: ['oversized', 'graphic', 'minimal', 'basic'],
      default: 'oversized'
    },
    sizes: {
      type: [String],
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      default: ['S', 'M', 'L', 'XL']
    },
    colors: [
      {
        name: String,
        hex: String
      }
    ],
    images: {
      type: [String],
      required: [true, 'Please provide at least one product image']
    },
    stock: {
      type: Number,
      default: 30,
      min: 0
    },
    featured: {
      type: Boolean,
      default: false
    },
    isNewArrival: {
      type: Boolean,
      default: false
    },
    isBestSeller: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5
    },
    numReviews: {
      type: Number,
      default: 12
    },
    details: {
      fabric: { type: String, default: '100% Combed Heavyweight Cotton (260 GSM)' },
      fit: { type: String, default: 'Relaxed Boxy / Dropped Shoulders' },
      care: { type: String, default: 'Machine wash cold inside out, tumble dry low' },
      weight: { type: String, default: 'Heavyweight 260 GSM' }
    }
  },
  {
    timestamps: true
  }
);

// Auto slug generation if not provided
productSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Math.random().toString(36).substring(2, 6);
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
