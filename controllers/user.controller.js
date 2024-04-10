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
        return res.status(404).json({ message: "user not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
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

  deleteUser: async (req, res) => {
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
