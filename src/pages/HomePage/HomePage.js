import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Container } from 'components/common';
import MarketListNew from './components/MarketList';
import { marketListDropdownElements, marketListFields } from 'data/content/HomePage';

function HomePage() {
    return (
        <div className="home-page page">
            <Header />
            <main>
                <Container>
                    <MarketListNew marketListDropdownElements={marketListDropdownElements} marketListFields={marketListFields} />
                </Container>
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;
