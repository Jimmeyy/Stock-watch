import React, { useState } from 'react';
import { HeaderWrapper, HeaderLogo, HeaderSearch, HeaderMenu } from './Header.style';

function Header() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const handleMenuClick = () => {
        setMenuIsOpen(prevState => !prevState);
    };

    return (
        <HeaderWrapper>
            <div className="container">
                <HeaderLogo>
                    <a href="/">Stock-Watch</a>
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
            </div>
        </HeaderWrapper>
    );
}

export default Header;