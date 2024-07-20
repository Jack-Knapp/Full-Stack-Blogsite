const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title:1, author:1, url:1, likes:1, id:1})
    response.json(users)
        
})
  
usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body
    
    const saltRs = 10
    const pwHash = await bcrypt.hash(password, saltRs)
    const user = new User({
        username,
        name,
        passwordHash: pwHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter