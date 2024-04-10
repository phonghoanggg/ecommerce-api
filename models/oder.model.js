import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: String,
  note: String,
  address: String,
  phone: Number,
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Tham chiếu tới mô hình Product
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
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
