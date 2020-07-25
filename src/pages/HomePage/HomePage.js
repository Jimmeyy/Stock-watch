import React from 'react';
import { Container } from 'components/common';
import MarketListNew from './components/MarketList';
import { marketListDropdownElements, marketListFields } from 'data/content/HomePage';

function HomePage() {
    return (
        <div className="home-page page">
            <Container>
                <MarketListNew marketListDropdownElements={marketListDropdownElements} marketListFields={marketListFields} />
            </Container>
        </div>
    );
}

export default HomePage;
