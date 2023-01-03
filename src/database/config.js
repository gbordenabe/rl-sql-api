import { Sequelize } from 'sequelize'

const db = new Sequelize('mydatabase', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql',
})

export default db
