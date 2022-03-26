const {
  Schema,
  model
} = require('mongoose')

const Role = new Schema({ //створення самих ролей і по замовчуванню роль неАдмін
  value: {
    type: String,
    unique: true,
    default: 'USER'
  }
})

module.exports = model('Role', Role)