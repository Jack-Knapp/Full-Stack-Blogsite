const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const unknownEndpoint = require('./utils/middleware')


const mongoUrl = config.MONGODB_URL
mongoose.set('strictQuery',false)
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
    const testRouter = require('./controllers/testing')
    app.use('/api/testing', testRouter)
}

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})
app.use(unknownEndpoint)

module.exports = app
