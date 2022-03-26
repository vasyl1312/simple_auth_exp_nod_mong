const User = require('./models/User')
const Role = require('./models/Role')

class authController { //Усі ф-ції для взаємодії з користувачем,які працюватимуть на відпов роутах
  async registration(req, res) {
    try {

    } catch (e) {
      console.log('Error:', e)
    }
  }

  async login(req, res) {
    try {

    } catch (e) {
      console.log('Error:', e)
    }
  }

  async getUsers(req, res) {
    try {
      const userRole = new Role() //створюємо 2 користувачів і для адміна прописуємо що адмін бо по 
      const adminRole = new Role({ //дефолту користувач простий USER
        value: 'ADMIN'
      })
      await userRole.save() //і зберігаємо до монго
      await adminRole.save()
      res.json('Server work')
    } catch (e) {
      console.log('Error:', e)
    }
  }
}

module.exports = new authController()