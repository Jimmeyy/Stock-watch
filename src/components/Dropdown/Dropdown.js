import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DropdownWrapper, DropdownMain, DropdownList } from './Dropdown.style';

function Dropdown({ listElements, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('Select option');
    const dropdownRef = useRef(null);

    useEffect(() => {
        isOpen && document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const handleClickOutside = event => {
        if (!dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleListClick = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleListElementClick = event => {
        setValue(event.target.textContent);
        setIsOpen(false);
        onChange(event.target.getAttribute('data-value'));
    };

    return (
        <DropdownWrapper ref={dropdownRef}>
            <DropdownMain isOpen={isOpen} onClick={handleListClick}>
                <span>{value}</span>
                <img src="icons/white/arrow-down.svg" alt="arrow-down" />
            </DropdownMain>
            {isOpen && (
                <DropdownList>
                    {listElements.map(element => (
                        <li key={element.value} data-value={element.value} onClick={handleListElementClick}>
                            {element.displayValue}
                        </li>
                    ))}
                </DropdownList>
            )}
        </DropdownWrapper>
    );
}

Dropdown.propTypes = {
    listElements: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Dropdown;
