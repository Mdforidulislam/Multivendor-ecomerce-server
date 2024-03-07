const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  images: [{
    type: String, // Assuming image links will be stored as strings
    required: true,
    validate: {
      validator: function(v) {
        return v.length <= 3; // Limiting to maximum 3 images
      },
      message: props => `${props.value} exceeds the limit of 3 images`
    }
  }],
  title: {
    type: String,
    required: true
  },
  priceRegular: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number
  },
  type: String,
  material: String,
  design: String,
  warranty: String,
  description: String,
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming you have a User model
    review: String
  }],
  aboutTheSeller: {
    // Define additional fields for seller information here
  },
  shipping: String,
  verifiedSeller: {
    name: String,
    address: String,
    verified: {
      type: Boolean,
      default: false
    }
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = {Product};
