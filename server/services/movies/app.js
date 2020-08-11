require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001
const router = require('./routes')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/movies", router)

app.listen(PORT, () => {
  console.log('SERVER RUNNING ON ' + PORT)
})


// const { connect } = require('./config/config')

// connect((err)=> {
//   if(!err){
//     app.use(cors())
//     app.use(express.urlencoded({extended: false}))
//     app.use(express.json())
//     app.use("/movies", require('./routes'))
//     app.listen(PORT, () => {
//       console.log('SERVER RUNNING ON ' + PORT)
//     })
//   }
// })

// app.get('/', (req, res) => {
//     res.send('testingggg')
// })

// app.listen(PORT, () => {
//     console.log('SERVER RUNNING ON ' + PORT)
//   })
