const router = require('express').Router()

//import controller methods
const { create, list, read } = require('../controllers/post')

router.post('/post', create)
router.get('/posts', list)
router.get('/post/:slug', read)

module.exports = router