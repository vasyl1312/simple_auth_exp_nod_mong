const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://vasyl:Vasyl2002@cluster0.ds8lf.mongodb.net/simple_auth_roles`)
    app.listen(PORT, () => {
      console.log(`Server has started on ${PORT}...`)
    })
  } catch (e) {
    console.log('Error:', e)
  }
}

start()