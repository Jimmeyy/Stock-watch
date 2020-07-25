import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Container, Loader } from 'components/common';
import MarketListNew from './components/MarketList';
import { marketListDropdownElements, marketListFields } from 'data/content/HomePage';
import endpoints from 'data/endpoints';
import { fetchSingle } from 'data/fetch';

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
            const forex = await fetchSingle(endpoints.forexSymbols);
            const stocks = await fetchSingle(endpoints.stocksSymbols);
            const crypto = await fetchSingle(endpoints.cryptoSymbols);

            setInstrumentSymbols({
                forex,
                stocks,
                crypto,
            });
            setIsLoading(false);
        }
        fetchData();
    }, []);

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
