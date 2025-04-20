import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

dotenv.config();

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    province,
    district,
    commune,
    role,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      province,
      district,
      commune,
      role,
    });
    await newUser.save();

    return res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid Password" });
    }

    const { password, ...rest } = user._doc;

    // set token in the browser cookies and sen the respone to the clients
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "3d",
      }
    );
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ message: "successfully login", data: { ...rest, token } });
  } catch (error) {
    console.error(error);
    res.send("An error occurred");
  }
};
