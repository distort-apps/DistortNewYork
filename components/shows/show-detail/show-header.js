import classes from './show-header.module.css'

function ShowHeader ({ title }) {
  return (
    <div className={classes.headerWrapper}>
    <header className={classes.header}>
      <h1>{title}</h1>
    </header>
    <hr/>
    </div>
  )
}
export default ShowHeader
