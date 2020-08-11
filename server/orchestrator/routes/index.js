const route = require('express').Router()
const MainController = require('../controller/MainController')

route.get('/', MainController.findAll)
route.post('/addMovie', MainController.addMovie)
route.post('/addTvSeries', MainController.addTvSeries)
// console.log('masuk orchestra routes')

module.exports = route