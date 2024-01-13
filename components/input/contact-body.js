import classes from './contact-body.module.css'
import MailToButton from '../ui/mail-to-button'
function ContactBodyPage () {
  return (
    <div className={classes.contact}>
      <h2>Write DistortNewYork @:</h2>
      <MailToButton
        label='contact@distort-new-york.com'
        mailto='mailto:contact@distort-new-york.com'
      />
      <hr />
    </div>
  )
}

export default ContactBodyPage
