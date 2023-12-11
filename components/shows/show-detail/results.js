import classes from './results.module.css';
import Button from '@/components/ui/button';

function Results(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link='/shows'>Show all events</Button>
    </section>
  );
}

export default Results;
