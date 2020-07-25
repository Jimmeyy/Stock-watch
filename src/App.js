import React, { useState, useEffect } from 'react';
import HomePage from 'pages/HomePage';
import SymbolsContext from 'data/context/SymbolsContext';
import endpoints from 'data/endpoints';
import { fetchSingle } from 'data/fetch';
import { Loader } from 'components/common';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';

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
                        </div>
                    </SymbolsContext.Provider>
                )}
            </React.Fragment>
        </Router>
    );
}

const Instrument = () => {
    const { ticker, ticker2 } = useParams();
    return <h1>You are on {ticker}/{ticker2} subpage</h1>;
}

export default App;
