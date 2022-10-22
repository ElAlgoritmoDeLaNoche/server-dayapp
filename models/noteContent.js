import mongoose from 'mongoose'

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  tags: String,
  likes: {
    type: [String],
    default: []
  },
  postDate: {
    type: Date, default: new
      Date()
  },
})

export default mongoose.model('Note', noteSchema)