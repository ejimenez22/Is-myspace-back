const router = require('express').Router()

const {
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts-controller');

router
.route('/')
.post(addThought);

router
.route('/:thoughtId')
.delete(removeThought);

router
.route('/:thoughtId/reactions')
.put(addReaction)
.delete(removeReaction);

module.exports = router