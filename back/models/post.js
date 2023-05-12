const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  content: String,
  category: String,
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post