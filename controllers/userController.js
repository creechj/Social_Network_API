const { isObjectIdOrHexString } = require("mongoose");
const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  // getUsers X
  async getUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // getSingleUser
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // createUser X
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // updateUser X
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // deleteUser - TODO: deletes user from other users' friends array
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete(
        { _id: req.params.userId },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      const thoughts = await Thought.deleteMany(
        { username: user.username }
      )
      const friend = await User.updateMany(
        { friends: req.params.userId },
        { $pull: { friends: req.params.userId  } },
        { new: true }
      );
      
      if (!friend) {
        return res.status(404).json({ message: 'User deleted. No friends lists updated.'});
      }
      res.json({ message: "User deleted and thoughts deleted." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add friend X
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId }},
        { new: true },
      );

      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove friend X
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
