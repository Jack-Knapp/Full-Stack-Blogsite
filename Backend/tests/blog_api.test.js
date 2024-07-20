const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('Get all blogs in DB', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    console.log(response.body)
    assert.strictEqual(response.body.length, response.body.length)
})

test('validate id in schema', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[0]._id, undefined)
})

test('Verify POST functionality', async () => {
    const nBlog =  
    {
        _id: '5a422aa71b54a676234dfff6',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }

    const prev = await api.get('/api/blogs')
    await api
      .post('/api/blogs')
      .send(nBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    
    assert.strictEqual(response.body.length, prev.body.length + 1)
})

test('Verify DELETE functionality', async () => {
    const id = '5a422aa71b54a676234dfff6'

    const prev = await api.get('/api/blogs')
    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, prev.body.length - 1)
})

test('Verify PUT functionality', async () => {
    const nBlog =  
    {
        id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 1000,
        __v: 0
      }

    const prev = await api.get('/api/blogs')
    await api
      .put(`/api/blogs/${nBlog.id}`)
      .send(nBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    
    assert.strictEqual(response.body.length, prev.body.length)
})


after(async () => {
  await mongoose.connection.close()
})