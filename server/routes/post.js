const router = require('express').Router()

//import controller methods
const { create } = require('../controllers/post')

router.get('/', create)

module.exports = router