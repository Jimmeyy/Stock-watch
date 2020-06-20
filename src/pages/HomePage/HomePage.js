import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

function HomePage() {
    return (
        <div className="home-page">
            <Header />
            <main>
                <h1>Home Page</h1>
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;
