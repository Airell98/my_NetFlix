require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT
const router = require('./routes')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/tv", router)

// app.get('/', (req, res) => {
//     res.send('testing tvSeries nih')
// })

app.listen(PORT, () => {
  console.log('SERVER RUNNING ON ' + PORT)
})
