import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Container, Loader } from 'components/common';
import MarketListNew from './components/MarketList';
import { marketListDropdownElements, marketListFields } from 'data/content/HomePage';
import endpoints from 'data/endpoints';

function HomePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [instrumentSymbols, setInstrumentSymbols] = useState({
        forex: [],
        stocks: [],
        crypto: [],
    });

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const forex = await fetchSymbols(endpoints.forexSymbols);
            const stocks = await fetchSymbols(endpoints.stocksSymbols);
            const crypto = await fetchSymbols(endpoints.cryptoSymbols);
            setInstrumentSymbols({
                forex,
                stocks,
                crypto,
            });
            setIsLoading(false);
        }
        fetchData();
    }, []);

    const fetchSymbols = async endpoint => {
        const response = await fetch(endpoint);
        const tickers = await response.json();
        return tickers;
    };

    return (
        <div className="home-page page">
            <Header />
            <main>
                <Container>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <MarketListNew
                            instrumentSymbols={instrumentSymbols}
                            marketListDropdownElements={marketListDropdownElements}
                            marketListFields={marketListFields}
                        />
                    )}
                </Container>
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;
