// controllers/favoriteProductController.js
import FavoriteProduct from "../models/favorite.model.js";

// Thêm sản phẩm vào danh sách yêu thích của người dùng
export const addFavoriteProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích của người dùng chưa
    const existingFavorite = await FavoriteProduct.findOne({
      userId,
      productId,
    });
    if (existingFavorite) {
      return res
        .status(400)
        .json({ message: "The product is already in your favorites list." });
    }

    // Tạo một mục mới trong danh sách yêu thích
    const favoriteProduct = new FavoriteProduct({ userId, productId });
    await favoriteProduct.save();

    res.status(201).json({
      status: 200,
      message: "The product has been added to your favorites list.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred, please try again later." });
  }
};

// Lấy danh sách yêu thích của người dùng
export const getFavoriteProductsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all favorite products for the user and populate the product details
    const favoriteProducts = await FavoriteProduct.find({ userId }).populate(
      "productId"
    );

    // If you need to transform the data structure, you can do it here
    const populatedFavoriteProducts = favoriteProducts.map((fav) => ({
      ...fav.toObject(),
      product: fav.productId, // Move the populated product to a `product` field
    }));

    res.status(200).json(populatedFavoriteProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred, please try again later." });
  }
};

// Xóa sản phẩm khỏi danh sách yêu thích của người dùng
export const removeFavoriteProduct = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Tìm và xóa sản phẩm khỏi danh sách yêu thích của người dùng
    await FavoriteProduct.findOneAndDelete({ userId, productId });

    res.status(200).json({
      status: 200,
      message: "The product has been removed from your favorites list.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred, please try again later." });
  }
};
