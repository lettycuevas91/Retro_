const router = require('express').Router()
const controller = require('../controllers/posts.controller')

router.get('/posts', async (req, res) => {
  try {
    const category = req.query.category
    const response = await controller.getPosts(category)
    res.send(response)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
})

router.post('/createPost', async (req, res) => {
  try {
    const content = req.body
    const response = await controller.createPost(content)
    req.app.get('io').emit('newPost', response)
    res.send(response)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
})
router.delete('/deletePost', async (req, res) => {
    try {
      const id = req.query.postId
      const response = await controller.deletePost(id)
      req.app.get('io').emit('deletePost', response)
      res.send(response)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  })

router.patch('/updatePost', async (req, res) => {
  try {
    const id = req.query.postId
    const content = req.body
    const response = await controller.updatePost(id, content)
    req.app.get('io').emit('updatePost', response)
    res.send(response)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
})



module.exports = router