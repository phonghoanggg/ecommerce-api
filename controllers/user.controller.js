import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const userController = {
  getAllusers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getuserdetail: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createuser: async (req, res) => {
    const { username, email, password, lastname } = req.body;

    try {
      // Check if the user with the given username or email already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res.send("Username or email already exists");
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        lastname,
      });
      await newUser.save();
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateuser: async (req, res) => {
    try {
      const updateduser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updateduser) {
        return res.status(404).json({ message: "user not found" });
      }
      res.status(200).json(updateduser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteuser: async (req, res) => {
    try {
      const removeduser = await User.findByIdAndRemove(req.params.id);
      if (!removeduser) {
        return res.status(404).json({ message: "user not found" });
      }
      res.json({ message: "user removed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default userController;
