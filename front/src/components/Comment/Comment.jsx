import React from 'react'
import styles from './Comment.module.css'
import { useContext } from 'react'
import Postcontext from '../Context/Postcontext'
import API_URL from '../config'

const Comment = ({ comment, id }) => {
  const { posts, setPosts } = useContext(Postcontext)

  const deletecomment = () => {
    fetch(API_URL + '/deleteComment?commentId=' + id, {
      method: 'DELETE',
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const newPosts = { ...posts }
        newPosts[data.post.category] = newPosts[data.post.category].map(
          (post) => {
            const newComments = post.comments.filter((comment) => {
              return comment._id !== data.commentDeleted._id
            })
            post.comments = newComments
            return post
          }
        )
        setPosts(newPosts)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={styles.comment}>
      <p>{comment.content}</p>
      <span className="material-symbols-outlined" onClick={deletecomment}>
        close
      </span>
    </div>
  )
}

export default Comment