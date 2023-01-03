import User from '../models/User.js'

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ state: true })

    res.json({ users })
  } catch (error) {
    res.json(error)
  }
}

export const getUser = async (req, res) => {
  const { id } = req.params

  const user = await User.findByPk(id)

  if (user) {
    res.json(user)
  } else {
    res.status(404).json({
      msg: `There is no user with the id ${id}`,
    })
  }
}

export const postUser = async (req, res) => {
  const { body } = req

  try {
    const emailExists = await User.findOne({
      where: {
        email: body.email,
      },
    })

    if (emailExists) {
      return res.status(400).json({
        msg: 'There is already a User with the email ' + body.email,
      })
    }

    const user = new User(body)
    await user.save()

    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const putUser = async (req, res) => {
  const { id } = req.params
  const { body } = req

  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({
        msg: 'There is no User with the id ' + id,
      })
    }
    await user.update(body)
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Contact the administrator',
    })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findByPk(id)
  if (!user) {
    return res.status(404).json({
      msg: 'There is no User with the id ' + id,
    })
  }
  await user.update({ state: false })
  res.json(user)
}
