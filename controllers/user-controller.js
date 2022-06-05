const { User } = require('../models')

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thought',
            select: '-_V'
        })
        .select('-_V')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
    },

    getUserById({ params }, res) {
        User.findOne({_id: params.id })
        .populate({
            path: 'thought',
            select: '-_V'
        })
        .select('-_V')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
    },

    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    },

    //add friend
    addFriend({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, { $push: { friend: body}}, {new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with that id!'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    },

    //remove friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId },
            { $pull: { friend: { userId: params.userId }}},
            { new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    }
}

module.exports = userController
