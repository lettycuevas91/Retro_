import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import Postcontext from './components/Context/Postcontext'
import API_URL from './components/config'
import { socket } from './socket'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(API_URL + '/posts')
        const data = await response.json()
        console.log(data)
        setPosts(data.posts)
      } catch (err) {
        console.log(err)
      }
    }
    socket.on('connect', () => {
      console.log('conectado')
    })

    function handleNewPost(data) {
      setPosts((prevPosts) => {
        return {
          ...prevPosts,
          [data.category]: [...prevPosts[data.category], data],
        }
      })
    }

    function handleDeletePost(data) {
      setPosts((prevPosts) => {
        return {
          ...prevPosts,
          [data.category]: prevPosts[data.category].filter(
            (post) => post._id !== data._id
          ),
        }
      })
    }

    function handleDeleteComment(data) {
      setPosts((prevPosts) => {
        return {
          ...prevPosts,
          [data.post.category]: prevPosts[data.post.category].map((post) => {
            if (post._id === data.post._id) {
              return {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment._id !== data.commentDeleted._id
                ),
              }
            }
            return post
          }),
        }
      })
    }
    function handleUpdatePost(data) {
      setPosts((prevPosts) => {
        return {
          ...prevPosts,
          [data.category]: prevPosts[data.category].map((post) => {
            if (post._id === data._id) {
              return data
            }
            return post
          }),
        }
      })
    }
    socket.on('newPost', handleNewPost)
    socket.on('deletePost', handleDeletePost)
    socket.on('updatePost', handleUpdatePost)
    socket.on('newComment', handleUpdatePost)
    socket.on('deleteComment', handleDeleteComment)
    fetchPosts()

    return () => {
      socket.off('connect')
      socket.off('newPost')
    }
  }, [])

  return (
    <Postcontext.Provider value={{ posts, setPosts }}>
      <Home />
    </Postcontext.Provider>
  )
}

export default App