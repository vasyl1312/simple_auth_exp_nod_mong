const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/auth', authRouter) //головний роут і + роут в залежності від дії(login, users...)

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://vasyl:Vasyl2002@cluster0.ds8lf.mongodb.net/simple_auth_roles`) //підключення до монго
    app.listen(PORT, () => {
      console.log(`Server has started on ${PORT}...`) // старт сервера на порті
    })
  } catch (e) {
    console.log('Error:', e) // помилки
  }
}

start() // виклик ф-ції, щоб все запустити