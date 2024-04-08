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
        .json({ message: "Sản phẩm đã có trong danh sách yêu thích của bạn." });
    }

    // Tạo một mục mới trong danh sách yêu thích
    const favoriteProduct = new FavoriteProduct({ userId, productId });
    await favoriteProduct.save();

    res.status(201).json({
      status: 200,
      message: "Sản phẩm đã được thêm vào danh sách yêu thích của bạn.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra, vui lòng thử lại sau." });
  }
};

// Lấy danh sách yêu thích của người dùng
export const getFavoriteProductsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Tìm tất cả các sản phẩm trong danh sách yêu thích của người dùng
    const favoriteProducts = await FavoriteProduct.find({ userId });

    res.status(200).json(favoriteProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra, vui lòng thử lại sau." });
  }
};
