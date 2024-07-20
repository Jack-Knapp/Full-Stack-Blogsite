require('dotenv').config()

const PORT = process.env.PORT || 3015

const MONGODB_URL = process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_TEST_URL
    : process.env.MONGODB_PROD_URL

module.exports = {
    MONGODB_URL,
    PORT
}