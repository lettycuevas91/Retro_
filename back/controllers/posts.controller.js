const Post = require('../models/post')

async function getPosts(category) {
  const options = category ? { category } : {}
  const allPosts = await Post.find(options).populate('comments').exec()

  function categorifyPosts(allPosts) {
    const categorizedPosts = {
      wentWell: [],
      toImprove: [],
      kudos: [],
    }

    allPosts.forEach((post) => {
      categorizedPosts[post.category].push(post)
    })

    return categorizedPosts
  }

  const response = {
    totalPosts: allPosts.length,
    posts: categorifyPosts(allPosts),
  }

  return response
}

async function createPost(content) {
  const newPost = await Post.create(content)
  return newPost
}
async function deletePost(id) {
    const postDeleted = await Post.findByIdAndDelete(id)
    return postDeleted
  }
  
async function updatePost(id, content) {
  const postUpdated = await Post.findByIdAndUpdate(id, content, {
    new: true,
  }).populate('comments')
  return postUpdated
}


module.exports = { getPosts, createPost, updatePost, deletePost }