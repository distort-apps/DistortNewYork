import classes from './show-footer.module.css'

function ShowFooter ({ excerpt }) {
  const refactoredExcert = excerpt.replace(/\n/g,'<br />')
  return <p className={'center'} dangerouslySetInnerHTML={{
    __html: refactoredExcert
}}></p>
}
export default ShowFooter
