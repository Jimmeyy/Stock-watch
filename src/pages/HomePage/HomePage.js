import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Button } from 'components/common';

function HomePage() {
    return (
        <div className="home-page">
            <Header />
            <main>
                <h1>Home Page</h1>
                <Button>Filters</Button>
                <Button icon className="icon-arrow-left-white" />
                <Button icon className="icon-arrow-right-white" />
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;
