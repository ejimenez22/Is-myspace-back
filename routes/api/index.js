const router = require('express').Router()
const thoughtRoutes = require('./thought-routes')
const userRoutes = require('./user-routes')

router.use('/thought', thoughtRoutes)
router.user('/user', userRoutes)

module.exports = router