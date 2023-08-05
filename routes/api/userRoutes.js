const router = require('express').Router();
// require controller functionality
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController')
// api/users CRUD operations for all users
router.route('/')
    .get(getUsers)
    .post(createUser);

// api/users/:userId CRUD operations for single user
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)
    ;

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;