import { useRef, useState } from 'react'
import classes from './gen-search.module.css'

function GenSearch (props) {
  const [placeholder , setPlaceholder] = useState('')
  const inputRef = useRef()


  function submitHandler (event) {
    event.preventDefault()

    const query = inputRef.current.value
    if (!query || query.trim() === 0) {
      setPlaceholder('you have to type something first')
    } else {
      props.onSearch(query)
    }
    
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor='search'>Search</label>
          <input id='search' ref={inputRef} placeholder={placeholder}/>
        </div>
      </div>
      <button>search</button>
    </form>
  )
}

export default GenSearch
