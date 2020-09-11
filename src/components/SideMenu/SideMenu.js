import React, { useRef, useEffect } from 'react';
import { SideMenuWrapper, SideMenuMain } from './SideMenu.style';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SideMenu = ({ isOpen, closeMenu }) => {
    const sideMenuMain = useRef();

    const handleClick = event => {
        if (sideMenuMain.current.contains(event.target)) {
            // inside click
            return;
        }
        // outside click
        closeMenu();
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return (
        <SideMenuWrapper isOpen={isOpen}>
            <SideMenuMain isOpen={isOpen} ref={sideMenuMain}>
                <h3>Articles</h3>
                <ul>
                    <li>
                        <Link to="/articles" onClick={closeMenu}>
                            All
                        </Link>
                    </li>
                    <li>
                        <Link to="/articles/stocks" onClick={closeMenu}>
                            Stocks
                        </Link>
                    </li>
                    <li>
                        <Link to="/articles/forex" onClick={closeMenu}>
                            Forex
                        </Link>
                    </li>
                    <li>
                        <Link to="/articles/crypto" onClick={closeMenu}>
                            Crypto
                        </Link>
                    </li>
                </ul>
            </SideMenuMain>
        </SideMenuWrapper>
    );
};

SideMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired,
};

export default SideMenu;
