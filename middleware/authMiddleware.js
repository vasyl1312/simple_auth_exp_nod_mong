const jwt = require('jsonwebtoken')
const {
  secret
} = require('../config')

module.exports = (req, res, next) => {
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
    const decodedData = jwt.verify(token, secret) //перевірка токена
    req.user = decodedData
    next()
  } catch (e) {
    console.log(e)
    res.status(403).json({
      message: 'Користувач не авторизований'
    })
  }
}