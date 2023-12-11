import ShowItem from "./show-item"

function ShowGrid ({ items }) {
    console.log(items)
    return (
        <ul>
            {items.map(item => (
                <ShowItem key={item.id} show={item} />
            ))}
        </ul>
    )
}
export default ShowGrid
