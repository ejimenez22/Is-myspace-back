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
.delete(deleteUser)


router
.route(':userId/friends')
.put(addFriend)
.delete(removeFriend)

module.exports = router