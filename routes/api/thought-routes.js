const router = require('express').Router()

const {
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts-controller')

router
.route('/api/thoughts')
.post(addThought)
.delete(removeThought)

router
.route('/api/thoughts/:thoughtId/reactions')
.put(addReaction)
.delete(removeReaction)

module.exports = router