const User = require('./models/User')
const Role = require('./models/Role')
const {
  secret
} = require('./config')
const bcrypt = require('bcrypt')
const {
  validationResult
} = require('express-validator')
const jwt = require('jsonwebtoken')

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, secret, {
    expiresIn: '24h' //якщо токен викрали то існуватиме 24 години тільки
  })
}

class authController { //Усі ф-ції для взаємодії з користувачем,які працюватимуть на відпов роутах
  // /REGISTRATION
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

  // /LOGIN
  async login(req, res) {
    try {
      const {
        username,
        password
      } = req.body
      const user = await User.findOne({
        username
      })
      if (!user) {
        return res.status(400).json({
          message: `Користувача ${username} не знайдено`
        })
      }
      const validPassword = bcrypt.compareSync(password, user.password) //перевіряємо чи збігається 
      if (!validPassword) { //захеширований пароль з нашим методом розхешировання з сайту npm bcript
        return res.status(400).json({
          message: `Пароль не правильний`
        })
      }
      const token = generateAccessToken(user._id, user.roles) //_id генерується автоматично mongo
      return res.json({
        token
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({
        message: 'Login error'
      })
    }
  }

  // /USERS
  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (e) {
      console.log('Error:', e)
    }
  }
}

module.exports = new authController()