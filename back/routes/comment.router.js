const router = require('express').Router()
const controller = require('../controllers/comments.controller')

router.get('/comments', async (req, res) => {
  try {
    const postId = req.query.postId
    const response = await controller.getComments(postId)
    res.send(response)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
})

router.post('/createComment', async (req, res) => {
  try {
    const postId = req.body.postId
    const content = req.body.content
    const response = await controller.createComment(postId, content)
    req.app.get('io').emit('newComment', response)
    res.send(response)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
})

router.delete('/deleteComment', async (req, res) => {
  try {
    const id = req.query.commentId
    const response = await controller.deleteComment(id)
    req.app.get('io').emit('deleteComment', response)
    res.send(response)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
})

router.patch('/updateComment', async (req, res) => {
  try {
    const id = req.query.commentId
    const content = req.body
    const response = await controller.updateComment(id, content)
    res.send(response)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
})

module.exports = router