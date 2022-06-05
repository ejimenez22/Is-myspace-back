const router = require('express').Router()

const {
    getAllUsers,
    getUserById,
    createUser,
    addFriend,
    deleteUser,
    removeFriend
} = require('../../controllers/user-controller')

router
.route('/')
.get(getAllUsers)
.post(createUser)

router
.route('/:id')
.get(getUserById)
.put(addFriend)
.delete(deleteUser)
.delete(removeFriend)

module.exports = router