function ShowGrid ({ items }) {
    console.log(items)
    return (
        <ul>
            {items.map(item => (
                <li ke={item.id}>{item.title}</li>
            ))}
        </ul>
    )
}
export default ShowGrid
