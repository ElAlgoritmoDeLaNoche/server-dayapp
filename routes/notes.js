import { Router } from 'express'
import { getNotes, createNote, updateNote, deleteNote, likeNote } from '../controllers/notes.js'
const router = Router()

import authentication from '../middlewares/authentication.js'

router.get('/', getNotes)
router.post('/', authentication, createNote)
router.patch('/:id', authentication, updateNote)
router.delete('/:id', authentication, deleteNote)
router.patch('/:id/likeNote', authentication, likeNote)

export default router