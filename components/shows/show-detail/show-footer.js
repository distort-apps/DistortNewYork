import classes from './show-footer.module.css'

function ShowFooter ({ excerpt }) {
  const refactoredExcert = excerpt.replace(/\n/g,'<br />')
  return <div className={`center ${classes.excerpt}`} dangerouslySetInnerHTML={{
    __html: refactoredExcert
}}></div>
}
export default ShowFooter
