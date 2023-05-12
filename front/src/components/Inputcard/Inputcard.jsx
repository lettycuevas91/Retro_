import React, { useContext, useState, useEffect } from 'react'
import Postcontext from '../Context/Postcontext'
import styles from '../Inputcard/inputcard.module.css'
import API_URL from '../config'

const InputCard = ({
  action,
  postId,
  category,
  toggleInputCard,
  setToggleInputCard,
  color,
}) => {
  const [input, setInput] = useState('')
  const textareaRef = React.useRef(null)
  const { posts, setPosts } = useContext(Postcontext)

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  function createPost() {
    fetch(API_URL + '/createPost', {
      method: 'POST',
      headers: {
        dataType: 'json',
      },
      body: JSON.stringify({ content: input, category: category }),
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const newPosts = { ...posts }
        newPosts[data.category].push(data)
        setPosts(newPosts)
        setToggleInputCard(!toggleInputCard)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function createComment() {
    fetch(API_URL + '/createComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId: postId, content: input }),
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const newPosts = { ...posts }
        newPosts[data.category] = newPosts[data.category].map((post) => {
          if (post._id === data._id) {
            return data
          } else {
            return post
          }
        })
        setPosts(newPosts)
        setToggleInputCard(!toggleInputCard)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (action === 'create') {
      createPost()
    } else if (action === 'comment') {
      createComment()
    } else {
      console.log('error')
    }
  }

  useEffect(() => {
    function autoResize() {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }

    autoResize()
  }, [input])

  return (
    <div className={styles['input-card']} style={{ backgroundColor: color }}>
      <form action="#" onSubmit={handleSubmit}>
        <textarea name="content" ref={textareaRef} onChange={handleChange} />
        <div>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              setToggleInputCard(!toggleInputCard)
            }}
          >
            close
          </span>
          <input type="submit" value="add"></input>
        </div>
      </form>
    </div> 
  )
}

export default InputCard