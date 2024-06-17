import mongoose from "mongoose";
import slugify from "slugify"; // Thêm slugify để tạo slug từ name

const productSchema = new mongoose.Schema({
  userId: { type: String },
  name: { type: String, required: true, unique: true },
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
      comment: { type: String },
    },
  ],
  size: [{ type: String }],
  slug: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Tạo slug từ name trước khi lưu vào cơ sở dữ liệu
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true }); // Chuyển tên thành slug viết thường
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
