import { useRef } from 'react'
import classes from './show-date-filter.module.css'

function ShowDateFilter (props) {
  const date = new Date()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const yearInputRef = useRef()
  const monthInputRef = useRef()

  function submitHandler (event) {
    event.preventDefault()

    const selectedYear = yearInputRef.current.value
    const selectedMonth = monthInputRef.current.value

    props.onSearch(selectedYear, selectedMonth)
  }

  return (
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='year'>Year</label>
            <select id='year' ref={yearInputRef} defaultValue={year}>
              <option value='2024'>2024</option>
              <option value='2025'>2025</option>
            </select>
          </div>
          <div className={classes.control}>
            <label htmlFor='month'>Month</label>
            <select id='month' ref={monthInputRef} defaultValue={month}>
              <option value='1'>January</option>
              <option value='2'>February</option>
              <option value='3'>March</option>
              <option value='4'>April</option>
              <option value='5'>May</option>
              <option value='6'>June</option>
              <option value='7'>July</option>
              <option value='8'>August</option>
              <option value='9'>Septemer</option>
              <option value='10'>October</option>
              <option value='11'>November</option>
              <option value='12'>December</option>
            </select>
          </div>
        </div>
        <button>search</button>
      </form>
  )
}

export default ShowDateFilter

 