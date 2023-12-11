import classes from './show-header.module.css'

function ShowHeader ({ title }) {
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
    </header>
  )
}
export default ShowHeader
