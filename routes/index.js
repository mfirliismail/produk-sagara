const router = require('express').Router()
const userRoute = require('./users')
const produkRoute = require('./produk')

router.use('/users', userRoute)
router.use('/produk', produkRoute)


module.exports = router