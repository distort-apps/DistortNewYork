import Link from 'next/link';

import classes from './button.module.css';

function Button(props) {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.link}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}

export default Button;
