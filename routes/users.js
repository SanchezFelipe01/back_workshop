const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/users')
const schemas = require('../models/schemas')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')

router.get('/:id', user_controller.show)

router.get('/', user_controller.index)

router.post('/register', validate(schemas.user), user_controller.create)

router.post('/login', user_controller.login)

router.put('/:id', auth,validate(schemas.user), user_controller.update)

router.delete('/:id', auth, user_controller.delete)

module.exports = router