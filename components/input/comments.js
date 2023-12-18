import { useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments (props) {
  const { showId } = props

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    if(showComments) {
      fetch('/api/comments/' + showId)
      .then(res => res.json()).then(data => {
        setComments(data.comments)
      })
    }
  }, [showComments])

  function toggleCommentsHandler () {
    setShowComments(prevStatus => !prevStatus)
  }

  function addCommentHandler (commentData) {
    fetch('/api/comments/' + showId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => (data))
  }


  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
    </section>
  )
}

export default Comments
