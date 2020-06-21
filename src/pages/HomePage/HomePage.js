import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Dropdown from 'components/Dropdown';
import { HomePageHeader } from './HomePage.style';
import { Button, Container } from 'components/common';

// temp
const listElements = ['Option-1', 'Option-2', 'Option-3', 'Option-4', 'Damian'];

function HomePage() {
    return (
        <div className="home-page">
            <Header />
            <main>
                <Container>
                    <HomePageHeader>
                        <div className="dropdown">
                            <Dropdown listElements={listElements} />
                            <Dropdown listElements={listElements} />
                        </div>
                        <div className="buttons">
                            <Button>Filters</Button>
                            <Button icon className="icon-arrow-left-white" />
                            <Button icon className="icon-arrow-right-white" />
                        </div>
                    </HomePageHeader>
                </Container>
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default HomePage;
