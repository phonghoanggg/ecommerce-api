import mongoose from "mongoose";

const favoritePr = new mongoose.Schema({
  userId: { type: String },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  newprice: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  images: [{ type: String }],
  stock: { type: Number, default: 0 },
  ratings: [{ type: Number }],
  size: [{ type: String }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Product = mongoose.model("Product", favoritePr);

export default Product;
