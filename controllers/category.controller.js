import Category from "../models/category.model.js";

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  // getOneSCategories: async (req, res) => {
  //   try {
  //     const category = await Category.findById(req.params.id);
  //     if (!category) {
  //       return res.status(404).json({ message: "Category not found" });
  //     }
  //     res.status(200).json(category);
  //   } catch (error) {
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },

  createCategory: async (req, res) => {
    try {
      const { name, image } = req.body;

      if (!name || !image) {
        return res.status(400).json({ error: "Name and image are required." });
      }

      const newCategory = new Category({ name, image });
      await newCategory.save();
      res.json({ category: newCategory });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { image: req.body.image },
        { new: true }
      );
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(201).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default categoryController;
