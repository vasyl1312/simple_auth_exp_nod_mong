const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {
  check
} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration', [
  check('username', 'Ім`я користувача не може бути пустим').notEmpty(),
  check('password', 'Пароль не може бути меншим ніж 4 симболи і більше ніж 10').isLength({
    min: 4,
    max: 10
  })
], controller.registration) //роути і відповідні їм контролери
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['USER', 'ADMIN']), controller.getUsers)
//тут можна міняти і умовно для юзера і адміна давати різні права і завдання і перевіряти це у постмені


module.exports = router