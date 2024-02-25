const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })

  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
  // if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
  //   return response.status(400).json({ error: 'password is not secure' })
  // }

  if (!password) {
    return response.status(400).json({ error: 'password is required' })
  }

  if (password.length < 3) {
    return response.status(400).json({ error: 'password is too short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

userRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

module.exports = userRouter
