import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  province: {
    type: String,
  },
  district: {
    type: String,
  },
  commune: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
