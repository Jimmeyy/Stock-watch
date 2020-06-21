import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DropdownWrapper, DropdownMain, DropdownList } from './Dropdown.style';

function Dropdown({ listElements }) {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('Select option');

    const handleListClick = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleListElementClick = event => {
        setValue(event.target.getAttribute('data-value'));
    };

    return (
        <DropdownWrapper onClick={handleListClick}>
            <DropdownMain isOpen={isOpen}>
                <span>{value}</span>
                <img src="icons/white/arrow-down.svg" alt="arrow-down" />
            </DropdownMain>
            {isOpen && (
                <DropdownList>
                    {listElements.map(element => (
                        <li key={element} data-value={element} onClick={handleListElementClick}>
                            {element}
                        </li>
                    ))}
                </DropdownList>
            )}
        </DropdownWrapper>
    );
}

Dropdown.propTypes = {
    listElements: PropTypes.array.isRequired,
};

export default Dropdown;
