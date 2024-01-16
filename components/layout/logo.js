import classes from './logo.module.css';

function Logo() {
  return (
    <section className={classes.logo}>
      <div>DistortNewYork</div>
      <div className={classes.staticText}>New York's Underground 🌹</div>
    </section>
  );
}

export default Logo;
