import mongoose from 'mongoose'
import Note from '../models/noteContent.js'

export const getNotes = async (req, res) => {

  try {
    const note = await Note.find()
    res.status(200).json(note)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }

}

export const createNote = async (req, res) => {
  const body = req.body

  const newNote = new Note({
    ...body,
    userId: req.userId,
    postDate: new Date().toISOString()
  })

  try {
    await newNote.save()
    res.status(201).json(newNote)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }

}

export const updateNote = async (req, res) => {
  const { id: _id } = req.params

  const note = req.body

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("This id doesnt belong to any note")
  }

  const updatedNote = await Note.findByIdAndUpdate(_id, note, { new: true })

  res.json(updatedNote)
}

export const deleteNote = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("This id doesnt belong to any note")
  }

  await Note.findByIdAndRemove(id)

  res.json({ message: "Note deleted successfully" })
}

export const likeNote = async (req, res) => {
  const { id } = req.params

  if (!req.userId) return res.json({ message: "Unauthenticated User" })

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("This id doesnt belong to any note")
  }

  const note = await Note.findById(id)

  const index = note.likes.findIndex(id => id === String(req.userId))

  if (index === -1) { // if user has not liked the note
    note.likes.push(req.userId)
  } else {
    note.likes = note.likes.filter(id => id !== String(req.userId))
  }

  const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true })

  res.json(updatedNote)
}