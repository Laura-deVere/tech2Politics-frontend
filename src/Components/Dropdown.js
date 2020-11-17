import { useEffect, useState, useRef } from 'react';
import { dropdown } from '../sass/Dropdown.module.scss';

const Dropdown = ({ listName, listOptions, onClickHandler, list}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        if(isOpen) {
            dropdownRef.current.querySelector('a').focus();
        }
    }, [isOpen]);

    const validateExpertiseListLength = (listLength, onClickHandler, item) => {
        if(list.length < 5 && !list.some(selected => selected._id === item._id)) { 
            onClickHandler(item);
        }  else { return null }
    }

    const renderList = () => {
        return listOptions.map((item, index) => {
            return (
            <li 
                key={index} 
                onClick={() => validateExpertiseListLength(list,onClickHandler,item)}>
                <a href="#">{item.name}</a>
            </li>)
        });
    }

    return (
        <div className={dropdown} ref={dropdownRef} >
            <button onClick={() => setIsOpen(!isOpen)}>{listName}<i className="lni lni-arrow-down-circle"></i></button>
            {isOpen ? <ul>{renderList()}</ul> : null}
        </div>
    )
}

export default Dropdown;