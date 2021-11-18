const express = require('express')
const router = express.Router()
const note_controller = require('../controllers/notes')
//const schemas = require('../models/schemas')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')

router.get('/:id', auth, note_controller.show)

router.get('/', auth, note_controller.index)

router.post('/add',auth, note_controller.create)

router.put('/:id', auth, note_controller.update)

router.delete('/:id', auth, note_controller.delete)

module.exports = router