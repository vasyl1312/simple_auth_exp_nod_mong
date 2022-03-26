const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcrypt')
const {
  validationResult
} = require('express-validator')

class authController { //Усі ф-ції для взаємодії з користувачем,які працюватимуть на відпов роутах
  async registration(req, res) {
    try {
      const errors = validationResult(req) //перевірка валідації даних при реєстрації
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Помилка при реєстрації',
          errors
        })
      }
      const {
        username,
        password
      } = req.body
      const candidate = await User.findOne({ //чи існує вже такий користувач, await якщо працюємо з DB
        username
      })
      if (candidate) {
        return res.status(400).json({
          message: 'Такий користувач вже існує'
        })
      }
      const hashPassword = bcrypt.hashSync(password, 7) //степінь хешировання, на сайті npm є важчі
      const userRole = await Role.findOne({
        value: 'USER'
      })
      const user = new User({
        username,
        password: hashPassword, //захеширований пароль щоб не легко було взламати акаунт
        roles: [userRole.value]
      })
      await user.save() //збереження користувача в базу
      return res.json({
        message: 'Користувача успішно створено'
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({
        message: 'Registration error'
      })
    }
  }

  async login(req, res) {
    try {

    } catch (e) {
      console.log(e)
      res.status(400).json({
        message: 'Login error'
      })
    }
  }

  async getUsers(req, res) {
    try {

      res.json('Server work')
    } catch (e) {
      console.log('Error:', e)
    }
  }
}

module.exports = new authController()