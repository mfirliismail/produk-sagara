const router = require('express').Router()
const userController = require('../controller/users')

router.post('/login', userController.login)
router.post('/register', userController.register)


module.exports = router