import classes from './contact-body.module.css'
import MailToButton from '../ui/mail-to-button'
import Link from 'next/link'
function ContactBodyPage () {
  return (
    <div className={classes.contact}>
      <div>
      <h2>Write DistortNewYork @:</h2>
      <MailToButton
        label='contact@distortnewyork.com'
        mailto='mailto:contact@distortnewyork.com'
      />
      <hr />
    </div>
    <div>
      <h2>Mayday Space</h2>
      <p>A HOME FOR MOVEMENTS, SOCIAL JUSTICE ACTIVISM, AND COMMUNITY EVENTS</p>
      <Link
        href='https://maydayspace.org/'
        target='_blank'
        rel='noopener noreferrer'
      >
        https://maydayspace.org/
      </Link>
      <hr />
    </div>
    <div>
      <h2>Save Project Reach</h2>
      <p>Raising funds to help empower young people and marginalized communities.</p>
      <Link
        href='https://www.instagram.com/saveprojectreach/'
        target='_blank'
        rel='noopener noreferrer'
      >
        @saveprojectreach
      </Link>
      <hr />
    </div>
    </div>
  )
}

export default ContactBodyPage
