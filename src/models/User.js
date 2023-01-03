import { DataTypes } from 'sequelize'
import db from '../database/config.js'

const User = db.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
})

User.sync().then(() => {
  console.log('Table created successfully')
})

export default User
