//connect our config.env
require('dotenv').config({path: './config.env'})
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const errorHandler = require('./middleware/error')
const app = express()
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({extended: true}))

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true}).catch((err) => console.err(err.stack)).then( async () => console.log('Connected to MongoDB!!!'))

const port = process.env.PORT || 4242

//connect routes
app.use('/api/auth', require('./routes/auth'))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})