const { createForm, getSingleForm, updateForm, deleteForm, getForm } = require('../controllers/formController')

const router = require('express').Router()

router.post('/', createForm)
router.get('/', getForm)
router.get('/:id', getSingleForm)
router.put('/:id', updateForm)
router.delete('/:id', deleteForm)

module.exports = router