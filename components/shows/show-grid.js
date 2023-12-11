import ShowItem from "./show-item"
import classes from './show-grid.module.css'

function ShowGrid ({ items }) {
    console.log(items)
    return (
        <ul className={classes.grid}>
            {items.map(item => (
                <ShowItem key={item.id} show={item} />
            ))}
        </ul>
    )
}
export default ShowGrid
