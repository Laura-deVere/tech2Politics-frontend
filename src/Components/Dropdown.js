const Dropdown = ({ listOptions, onClickHandler}) => {
    const renderList = () => {
        return listOptions.map((item, index) => {
            return <li key={index} onClick={(e) => onClickHandler(item)}>{item}</li>
        });
    }

    return (
        <ul>{renderList()}</ul>
    )
}

export default Dropdown;