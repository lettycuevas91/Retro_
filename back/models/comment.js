const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: String,
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment