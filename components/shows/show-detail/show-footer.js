function ShowFooter ({ excerpt }) {
  const refactoredExcert = excerpt.replace(/\n/g,'<br />')
  return <div className='center' dangerouslySetInnerHTML={{
    __html: refactoredExcert
}}></div>
}
export default ShowFooter
