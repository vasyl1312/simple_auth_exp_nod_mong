const jwt = require('jsonwebtoken')
const {
  secret
} = require('../config')

module.exports = (roles) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) { //якщо нам не прийшов ніякий токен
        res.status(403).json({
          message: 'Користувач не авторизований'
        })
      }
      const {
        roles: userRoles
      } = jwt.verify(token, secret)
      let hashRole = false //далі перевірятимемо масив ролей і чи має він дозвіл до даної функції
      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hashRole = true
        }
      })
      if (!hashRole) {
        return res.status(403).json({
          message: 'У вас немає доступу'
        })
      }
      next()
    } catch (e) {
      console.log(e)
      res.status(403).json({
        message: 'Користувач не авторизований'
      })
    }
  }
}