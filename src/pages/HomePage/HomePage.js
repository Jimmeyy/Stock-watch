import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Dropdown from 'components/Dropdown';
import { HomePageHeader, MarketList, MarketListHeader, MarketListMain } from './HomePage.style';
import { Button, Container } from 'components/common';
import endpoints, { resolutions } from 'data/endpoints';
import { dateToTimestamp } from 'utils';

// temp
const listElements = ['Option-1', 'Option-2', 'Option-3', 'Option-4', 'Damian'];

function HomePage() {
    const [cryptoSymbols, setCryptoSymbols] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        async function fetchHomePage() {
            const tickers = await fetchSymbols(endpoints.cryptoSymbols);
            const data = await fetchTableData(5, tickers);
            setCryptoSymbols(tickers);
            setTableData(data);
        }
        fetchHomePage();
    }, []);

    const fetchSymbols = async endpoint => {
        const response = await fetch(endpoint);
        const tickers = await response.json();
        return tickers;
    };

    const fetchTableData = async (amount, tickers) => {
        const date = new Date();
        const dateTo = dateToTimestamp(date.getTime()); // today
        const dateFrom = dateToTimestamp(date.setDate(date.getDate() - 1)); // yesterday
        const urls = tickers.slice(0, amount).map(crypto => endpoints.cryptoCandles(crypto.symbol, resolutions.day, dateFrom, dateTo));
        const response = await Promise.all(
            urls.map(async url => {
                const response = await fetch(url);
                const data = await response.json();
                return data;
            })
        );
        return response;
    };

    return (
        <div className="home-page">
            <Header />
            {console.log(cryptoSymbols)}
            {console.log(tableData)}
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
                    <MarketList>
                        <MarketListHeader>
                            <ul>
                                <li>Lp</li>
                                <li>Name</li>
                                <li>Last Value</li>
                                <li>Open</li>
                                <li>High</li>
                                <li>Low</li>
                                <li>Day change</li>
                                <li>Day change (%)</li>
                            </ul>
                        </MarketListHeader>
                        <MarketListMain>
                            <ul>
                                <li>1</li>
                                <li>Bitcoin</li>
                                <li className="price-up">10 000 $</li>
                                <li>9 564 $</li>
                                <li>10 323 $</li>
                                <li>9 321 $</li>
                                <li>436 $</li>
                                <li>4.73 (%)</li>
                            </ul>
                            <ul>
                                <li>2</li>
                                <li>Bitcoin</li>
                                <li className="price-up">10 000 $</li>
                                <li>9 564 $</li>
                                <li>10 323 $</li>
                                <li>9 321 $</li>
                                <li>436 $</li>
                                <li>4.73 (%)</li>
                            </ul>
                            <ul>
                                <li>3</li>
                                <li>Bitcoin</li>
                                <li className="price-down">10 000 $</li>
                                <li>9 564 $</li>
                                <li>10 323 $</li>
                                <li>9 321 $</li>
                                <li>436 $</li>
                                <li>4.73 (%)</li>
                            </ul>
                            <ul>
                                <li>4</li>
                                <li>Bitcoin</li>
                                <li className="price-up">10 000 $</li>
                                <li>9 564 $</li>
                                <li>10 323 $</li>
                                <li>9 321 $</li>
                                <li>436 $</li>
                                <li>4.73 (%)</li>
                            </ul>
                            <ul>
                                <li>5</li>
                                <li>Bitcoin</li>
                                <li className="price-down">10 000 $</li>
                                <li>9 564 $</li>
                                <li>10 323 $</li>
                                <li>9 321 $</li>
                                <li>436 $</li>
                                <li>4.73 (%)</li>
                            </ul>
                        </MarketListMain>
                    </MarketList>
                </Container>
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default HomePage;
