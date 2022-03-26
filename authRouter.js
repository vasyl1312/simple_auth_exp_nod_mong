const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {
  check
} = require('express-validator')

router.post('/registration', [
  check('username', 'Ім`я користувача не може бути пустим').notEmpty(),
  check('password', 'Пароль не може бути меншим ніж 4 симболи і більше ніж 10').isLength({
    min: 4,
    max: 10
  })
], controller.registration) //роути і відповідні їм контролери
router.post('/login', controller.login)
router.get('/users', controller.getUsers)



module.exports = router