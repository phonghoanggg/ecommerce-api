import User from "../models/user.model.js";

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserdetail: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createUser: async (req, res) => {
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

    // Create a new user object
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      province,
      district,
      commune,
      role,
    });

    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const removedUser = await User.findByIdAndRemove(req.params.id);
      if (!removedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User removed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default userController;
