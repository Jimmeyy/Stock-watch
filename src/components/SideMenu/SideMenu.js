import React from 'react';
import { SideMenuWrapper, SideMenuMain } from './SideMenu.style';
import PropTypes from 'prop-types';

const SideMenu = ({ isOpen }) => {
    return (
        <SideMenuWrapper isOpen={isOpen}>
            <SideMenuMain isOpen={isOpen}>
                <h3>Articles</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis aspernatur quaerat accusantium ducimus doloribus eius fugit
                    dolores impedit eveniet enim dignissimos, esse consequatur culpa itaque. Corporis cum eaque quo sequi.
                </p>
            </SideMenuMain>
        </SideMenuWrapper>
    );
};

SideMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

export default SideMenu;
