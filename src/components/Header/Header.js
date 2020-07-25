import React, { useState } from 'react';
import { HeaderWrapper, HeaderLogo, HeaderSearch, HeaderMenu, HeaderContainer } from './Header.style';
import { Link } from 'react-router-dom';

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
                <HeaderSearch>
                    <div className="search-main">
                        <input type="text" placeholder="Search..." />
                    </div>
                </HeaderSearch>
                <HeaderMenu>
                    <div className={`menu ${menuIsOpen && 'is-open'}`} onClick={handleMenuClick}>
                        <span className="line-top"></span>
                        <span className="line-middle"></span>
                        <span className="line-bottom"></span>
                    </div>
                </HeaderMenu>
            </HeaderContainer>
        </HeaderWrapper>
    );
}

export default Header;
