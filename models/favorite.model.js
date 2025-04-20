import mongoose from "mongoose";

const favoriteProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FavoriteProduct = mongoose.model(
  "FavoriteProduct",
  favoriteProductSchema
);

export default FavoriteProduct;
