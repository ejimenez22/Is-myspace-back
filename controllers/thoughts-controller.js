const { Thought, User } = require('../models')

const thoughtController = {
    addThought({ body }, res) {
        Thought.create({thoughtText: body.thoughtText, username: body.username})
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId},
                { $push: { thought: _id }},
                { new: true}
            );
        })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                return res.status(404).json({ message: 'No user with that id!'})
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err))
    },
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: "No thoughts with that id!"})
            }
            return User.findOneAndUpdate(
                { _id: params.userId},
                { $pull: { thought: params.thoughtId}},
                { new: true}
            )
        })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: "No user found with that id"})
                return
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err))
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reaction: body }}, { new : true, runValidators: true})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No user found with that Id!'})
                return
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err))
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            { $pull: { reaction: { reactionId: params.reactionId}}},
            { new: true}
        )
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => res.json(err))
    }
}

module.exports = thoughtController