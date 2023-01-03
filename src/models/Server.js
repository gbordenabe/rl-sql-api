import express from 'express'
import userRoutes from '../routes/users.js'
import cors from 'cors'
import db from '../database/config.js'

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      users: '/api/users',
    }

    this.dbConnection()
    this.middlewares()
    this.routes()
  }

  async dbConnection() {
    try {
      await db.authenticate()
      console.log('Database online')
    } catch (error) {
      throw new Error(error)
    }
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  routes() {
    this.app.use(this.paths.users, userRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port ' + this.port)
    })
  }
}

export default Server
