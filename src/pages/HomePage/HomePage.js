import React from 'react';
import { Container } from 'components/common';
import MarketList from 'components/MarketList';
import { marketListDropdownElements, marketListFields } from 'data/content/HomePage';
import { HeroSection, HeroSectionContent, TableSection } from './HomePage.style';

function HomePage() {
    return (
        <div className="home-page page">
            <HeroSection>
                <Container>
                    <HeroSectionContent>
                        <h1>Search for selected instrument.</h1>
                        {/* <SearchInput /> */}
                    </HeroSectionContent>
                </Container>
            </HeroSection>
            <TableSection>
                <Container>
                    <MarketList marketListDropdownElements={marketListDropdownElements} marketListFields={marketListFields} />
                </Container>
            </TableSection>
        </div>
    );
}

export default HomePage;
