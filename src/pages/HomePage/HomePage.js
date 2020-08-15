import React from 'react';
import { Container, Heading } from 'components/common';
import MarketList from 'components/MarketList';
import { marketListDropdownElements, marketListFields } from 'data/content/HomePage';
import { HeroSection, HeroSectionContent, TableSection } from './HomePage.style';
import SearchInput from 'components/SearchInput';

function HomePage() {
    return (
        <div className="page page-home">
            <HeroSection>
                <Container>
                    <HeroSectionContent>
                        <Heading>Search for selected instrument.</Heading>
                        <SearchInput />
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
