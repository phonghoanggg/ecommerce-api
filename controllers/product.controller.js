import Product from "../models/product.model.js";

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
      const skip = (page - 1) * pageSize;

      const totalProducts = await Product.countDocuments();
      const totalPages = Math.ceil(totalProducts / pageSize);

      const products = await Product.find().skip(skip).limit(pageSize);

      res.json({
        page,
        pageSize,
        totalPages,
        totalProducts,
        products,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProductdetail: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate(
        "category"
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const removedProduct = await Product.findByIdAndRemove(req.params.id);
      if (!removedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product removed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getProductsByCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;

      const totalProducts = await Product.countDocuments({
        category: id,
      });

      const totalPages = Math.ceil(totalProducts / pageSize);

      const products = await Product.find({ category: id })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate("category");
      res.json({
        page,
        pageSize,
        totalPages,
        totalProducts,
        products,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getNewArrivals: async (req, res) => {
    try {
      // Logic to determine new arrivals, e.g., products added in the last 7 days
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      const newArrivals = await Product.find({
        createdAt: { $gte: sevenDaysAgo },
      }).populate("category");

      res.json({
        products: newArrivals,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default productController;
