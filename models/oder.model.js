import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  name: String,
  note: String,
  address: String,
  phone: Number,
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1, // Số lượng mặc định là 1 nếu không được chỉ định
      },
    },
  ],
  total: Number,
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
