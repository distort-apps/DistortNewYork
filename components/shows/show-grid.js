import { useScrollRestoration } from "@/helpers/hooks/useScrollRestoration";
import ShowItem from "./show-item";
import classes from './show-grid.module.css';

function ShowGrid({ items }) {
    useScrollRestoration()

    return (
        <ul className={classes.grid}>
            {items.map(item => (
                <ShowItem key={item._id} show={item} />
            ))}
        </ul>
    );
}

export default ShowGrid;
