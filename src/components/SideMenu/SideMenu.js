import React from 'react';
import { SideMenuWrapper, SideMenuMain } from './SideMenu.style';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SideMenu = ({ isOpen }) => {
    return (
        <SideMenuWrapper isOpen={isOpen}>
            <SideMenuMain isOpen={isOpen}>
                <h3>Articles</h3>
                <ul>
                    <li>
                        <Link to="/articles">All</Link>
                    </li>
                    <li>
                        <Link to="/articles/stocks">Stocks</Link>
                    </li>
                    <li>
                        <Link to="/articles/forex">Forex</Link>
                    </li>
                    <li>
                        <Link to="/articles/crypto">Crypto</Link>
                    </li>
                </ul>
            </SideMenuMain>
        </SideMenuWrapper>
    );
};

SideMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

export default SideMenu;
