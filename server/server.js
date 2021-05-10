const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log(`DB connected`))
    .catch((err) => console.log(err))

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//routes
app.get('*', (req, res) => {
    res.json({
        data: 'Random data for testing..!!'
    })
})


//port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`server is running on ${port}`);
})