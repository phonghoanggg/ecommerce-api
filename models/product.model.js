import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: { type: String },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  images: [{ type: String }],
  stock: { type: Number, default: 0 },
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number },
      comment: { type: String }, // Thêm trường comment
    },
  ],
  size: [{ type: String }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Product = mongoose.model("Product", productSchema);

export default Product;
