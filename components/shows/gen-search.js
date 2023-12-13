import { useRef } from 'react'
import classes from './gen-search.module.css'

function GenSearch (props) {
const inputRef = useRef()

  function submitHandler (event) {
    event.preventDefault()

    const query = inputRef.current.value

    props.onSearch(query)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor='search'>Search</label>
          <input id='search' ref={inputRef} />
        </div>
      </div>
      <button>search</button>
    </form>
  )
}

export default GenSearch
