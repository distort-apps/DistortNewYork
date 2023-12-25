import classes from './donate.module.css'
import Button from '../ui/button'

function Donate () {
    return (
        <section className={classes.donate}>
            <h2>Donate today - help us provide urgent supplies to Palestinians in need</h2>
            {/* Using Button component with an <a> tag for external link */}
            <Button>
                <a 
                  href="https://linktr.ee/MedicalAidforPalestinians" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={classes.btn}
                >
                    Donate Now
                </a>
            </Button>
        </section>
    )
}
export default Donate
