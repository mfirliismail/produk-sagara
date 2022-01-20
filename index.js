const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const route = require('./routes')
require('dotenv').config()

app.use(express.json())


app.use('/api/v1', route)


app.listen(port, () => {
    console.log('server listening on port ', port)
})