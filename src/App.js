import React, { useState, useEffect } from 'react';
import HomePage from 'pages/HomePage';
import Instrument from 'pages/Instrument';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SymbolsContext from 'data/context/SymbolsContext';
import endpoints from 'data/endpoints';
import { fetchSingle } from 'data/fetch';
import { Loader } from 'components/common';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
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
        <Router>
            <React.Fragment>
                {isLoading ? (
                    <Loader />
                ) : (
                    <SymbolsContext.Provider value={instrumentSymbols}>
                        <div className="app">
                            <Header />
                            <main>
                                <Switch>
                                    <Route exact path="/">
                                        <HomePage />
                                    </Route>
                                    <Route path="/instrument/:ticker/:ticker2">
                                        <Instrument />
                                    </Route>
                                    <Route path="">
                                        <h1>404</h1>
                                    </Route>
                                </Switch>
                            </main>
                            <Footer />
                        </div>
                    </SymbolsContext.Provider>
                )}
            </React.Fragment>
        </Router>
    );
}

export default App;
