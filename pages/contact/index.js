import Head from 'next/head'
import ContactForm from '@/components/input/contact-form'
import ContactBodyPage from '@/components/input/contact-body'
import Donate from '../../components/donate/donate'
function ContactPage () {
  return (
    <div>
        <Donate/>
        <ContactForm />
      <Head>
        <title>DistortNewYork Contact Page</title>
        <meta
          name='description'
          content='Share your thoughts, or promote a show / event'
        />
      </Head>
      <ContactBodyPage />
    </div>
  )
}
export default ContactPage