const express = require('express');
const router = express.Router();
const multer = require('multer');
const path=require('path')
const cloudinary = require('cloudinary').v2;
const Product = require('../models/product');

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: 'dn1jmabsx',
//   api_key: '524582688139714',
//   api_secret: '3XcgrYmIJ5a8pGy6UTmTUXWTFFM',
// });

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../Images'); // Update the destination folder path according to your project structure
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Set up multer upload configuration
const upload = multer({ storage });


// Search products
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    // Perform the search query using a regular expression (case-insensitive)
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for products' });
  }
});

// Create product with image upload
router.post('/sell', upload.single('image'), async (req, res) => {
  try {
    const { categoryId, type, title, description, targetAudience } = req.body;

    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: 'uploads', // Optional: Specify the folder where the images will be stored in Cloudinary

    const newProduct = new Product({
      category: categoryId,
      brand: type,
      name: title,
      description: description,
      Audience: targetAudience,
      image: req.file.path,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(200).json(savedProduct);
  } catch (error) {
    console.error(error);
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
