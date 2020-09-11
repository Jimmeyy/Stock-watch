import React, { useState } from 'react';
import { HeaderWrapper, HeaderLogo, HeaderMenu, HeaderContainer } from './Header.style';
import { Link } from 'react-router-dom';
import SideMenu from 'components/SideMenu';

function Header() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const handleMenuClick = () => {
        setMenuIsOpen(prevState => !prevState);
    };

    return (
        <HeaderWrapper>
            <HeaderContainer>
                <HeaderLogo>
                    <Link to="/">Stock-Watch</Link>
                </HeaderLogo>
                <HeaderMenu isOpen={menuIsOpen}>
                    <div className={`menu ${menuIsOpen && 'is-open'}`} onClick={handleMenuClick}>
                        <span className="line-top"></span>
                        <span className="line-middle"></span>
                        <span className="line-bottom"></span>
                    </div>
                </HeaderMenu>
            </HeaderContainer>
            {menuIsOpen && <SideMenu isOpen={menuIsOpen} closeMenu={handleMenuClick} />}
        </HeaderWrapper>
    );
}

export default Header;
