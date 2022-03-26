const Router = require('express')
const router = new Router()
const controller = require('./authController')

router.post('/registration', controller.registration) //роути і відповідні їм контролери
router.post('/login', controller.login)
router.get('/users', controller.getUsers)



module.exports = router