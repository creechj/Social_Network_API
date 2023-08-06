const { isObjectIdOrHexString } = require("mongoose");
const User = require("../models/User");

module.exports = {
  // getUsers
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // getSingleUser
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // createUser
  async createUser(req, res) {
    try {
      const newUser = User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // updateUser
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
  // deleteUser - deletes user from other users' friends array
  async deleteUser(req, res) {
    try {
      // const user = await User.findOneAndDelete(
      //   { _id: req.params.userId },
      //   { new: true }
      // );

      // if (!user) {
      //   return res.status(404).json({ message: "No user with that ID" });
      // }

      const friend = await User.updateMany(
        { $pull: { friends: req.params.userId } },
        { runValidators: true, new: true }
      )
      // await Student.deleteMany({ _id: { $in: course.students } });
      if (!friend) {
        return res.status(404).json({
          message: 'User deleted, not on any friends lists',
        });
      }
  
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add friend
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
  // remove friend
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
