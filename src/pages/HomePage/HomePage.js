import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Dropdown from 'components/Dropdown';
import { HomePageHeader, MarketList, MarketListHeader, MarketListMain } from './HomePage.style';
import { Button, Container } from 'components/common';
import endpoints, { resolutions } from 'data/endpoints';
import { dateToTimestamp, calculatePriceDayChange } from 'utils';

// temp
const listElements = ['Option-1', 'Option-2', 'Option-3', 'Option-4', 'Damian'];

function HomePage() {
    const [cryptoSymbols, setCryptoSymbols] = useState([]);
    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        async function fetchHomePage() {
            const tickers = await fetchSymbols(endpoints.cryptoSymbols);
            const data = await fetchDisplayData(3, tickers);
            setCryptoSymbols(tickers);
            setDisplayData(data);
        }
        fetchHomePage();
    }, []);

    const fetchSymbols = async endpoint => {
        const response = await fetch(endpoint);
        const tickers = await response.json();
        return tickers;
    };

    const fetchDisplayData = async (amount, tickers) => {
        const date = new Date();
        const dateTo = dateToTimestamp(date.getTime()); // today
        const dateFrom = dateToTimestamp(date.setDate(date.getDate() - 2)); // yesterday
        const chosenTickers = tickers.slice(0, amount).map(crypto => ({
            ticker: crypto.displaySymbol,
            url: endpoints.cryptoCandles(crypto.symbol, resolutions.day, dateFrom, dateTo),
        }));
        const response = await Promise.all(
            chosenTickers.map(async ({ url }) => {
                const response = await fetch(url);
                const data = await response.json();
                return data;
            })
        );
        const displayData = response.map((element, index) => ({
            ticker: chosenTickers[index].ticker,
            ...element,
        }));

        return displayData;
    };

    return (
        <div className="home-page">
            <Header />
            {console.log(displayData)}
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
                                <li>Volume</li>
                                <li>Day change (%)</li>
                            </ul>
                        </MarketListHeader>
                        <MarketListMain>
                            {displayData.map((element, index) => {
                                const { changePercent, priceIsBigger } = calculatePriceDayChange(element.c);
                                return (
                                    <ul key={index}>
                                        <li>{index + 1}</li>
                                        <li>{element.ticker}</li>
                                        <li>{element.c[1]}</li>
                                        <li>{element.o[1]}</li>
                                        <li>{element.h[1]}</li>
                                        <li>{element.l[1]}</li>
                                        <li>{element.v[1]}</li>
                                        <li className={priceIsBigger ? 'price-up' : 'price-down'}>{changePercent} %</li>
                                    </ul>
                                );
                            })}
                        </MarketListMain>
                    </MarketList>
                </Container>
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default HomePage;
