const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/productsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Product Schema
const productSchema = new mongoose.Schema({
  productId: String,
  name: String,
  productType: String,
  category: String,
  basePrice: Number,
});

const Product = mongoose.model('Product', productSchema);

// Sample data for products
const products = [
  {
    productId: '1001',
    name: 'Lenovo Yoga',
    productType: 'Laptop',
    category: 'Electronics',
    basePrice: 45000,
  },
  // Add other products here
];

// Save the products in the database
Product.insertMany(products, (error) => {
  if (error) {
    console.log('Error saving products:', error);
  } else {
    console.log('Products saved successfully!');
  }
});

// Calculate final price based on discount and charges
const calculateFinalPrice = (product) => {
  const { category, basePrice } = product;
  const { discount, gst, deliveryCharge } = charges[category];

  const discountAmount = basePrice * discount;
  const gstAmount = basePrice * gst;
  const deliveryChargeAmount = deliveryCharge;

  return basePrice - discountAmount + gstAmount + deliveryChargeAmount;
};

// Get all products
app.get('/products', (req, res) => {
  Product.find({}, (error, products) => {
    if (error) {
      console.log('Error retrieving products:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const productsWithPrices = products.map((product) => {
        const finalPrice = calculateFinalPrice(product);

        return {
          productId: product.productId,
          name: product.name,
          productType: product.productType,
          category: product.category,
          basePrice: product.basePrice.toFixed(2),
          finalPrice: finalPrice.toFixed(2),
        };
      });

      res.json(productsWithPrices);
    }
  });
});

// Add a new product
app.post('/products', (req, res) => {
  const newProduct = req.body;

  const product = new Product(newProduct);
  product.save((error, savedProduct) => {
    if (error) {
      console.log('Error saving product:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json(savedProduct);
    }
  });
});

// Update a product
app.put('/products/:productId', (req, res) => {
  const { productId } = req.params;
  const updatedProduct = req.body;

  Product.findOneAndUpdate({ productId }, updatedProduct, { new: true }, (error, product) => {
    if (error) {
      console.log('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  });
});

// Delete a product
app.delete('/products/:productId', (req, res) => {
  const { productId } = req.params;

  Product.findOneAndDelete({ productId }, (error, product) => {
    if (error) {
      console.log('Error deleting product:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});