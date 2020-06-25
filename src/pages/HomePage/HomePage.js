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
    const [crypto, setCrypto] = useState();

    const fetchData = async () => {
        const response = await fetch(endpoints.cryptoSymbols);
        const cryptoSymbols = await response.json();

        const date = new Date();
        const dateTo = dateToTimestamp(date.getTime()); // today
        const dateFrom = dateToTimestamp(date.setDate(date.getDate() - 1)); // yesterday

        const response2 = await fetch(endpoints.cryptoCandles(cryptoSymbols[0].symbol, resolutions.day, dateFrom, dateTo));
        const cryptoCandles = await response2.json();
        setCrypto(cryptoCandles);
        console.log(cryptoCandles);
    };

    useEffect(() => {
        fetchData();
    }, []);

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
