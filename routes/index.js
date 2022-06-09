const router = require('express').Router()
const thoughtRoutes = require('./api/thought-routes')
const userRoutes = require('./api/user-routes')

router.use('/thoughts', thoughtRoutes)
router.use('/user', userRoutes)

module.exports = router