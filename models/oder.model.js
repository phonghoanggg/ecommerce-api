import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  name: String,
  note: String,
  address: String,
  phone: Number,
  cartItems: [
    {
      images: [{ type: String }],
      name: String,
      price: Number,
      size: String,
      quantity: Number,
      subTotal: Number,
    },
  ],
  total: Number,
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
