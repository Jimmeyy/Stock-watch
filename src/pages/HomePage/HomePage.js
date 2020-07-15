import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Dropdown from 'components/Dropdown';
import { HomePageHeader, MarketList, MarketListHeader, MarketListMain } from './HomePage.style';
import { Button, Container, Loader, PaginationWrapper } from 'components/common';
import endpoints, { resolutions } from 'data/endpoints';
import { dateToTimestamp, calculatePriceDayChange } from 'utils';
import ReactPaginate from 'react-paginate';

// temp
const listElements = [
    {
        displayValue: 'Forex',
        value: 'forex',
    },
    {
        displayValue: 'Stocks',
        value: 'stocks',
    },
    {
        displayValue: 'Crypto',
        value: 'crypto',
    },
];

function HomePage() {
    const [instrumentType, setInstrumentType] = useState('forex');
    const [instrumentSymbols, setInstrumentSymbols] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        offset: 0,
        perPage: 10,
        currentPage: 1,
    });

    useEffect(() => {
        setIsLoading(true);
        const { perPage, currentPage } = pagination;
        const fetchAmount = perPage * currentPage;
        async function fetchHomePage() {
            const tickers = await fetchSymbols(endpoints[`${instrumentType}Symbols`]);
            const data = await fetchDisplayData(fetchAmount, tickers);
            setInstrumentSymbols(tickers);
            setDisplayData(data);
            setIsLoading(false);
        }
        fetchHomePage();
    }, [instrumentType, pagination.currentPage]);

    const fetchSymbols = async endpoint => {
        const response = await fetch(endpoint);
        const tickers = await response.json();
        return tickers;
    };

    const fetchDisplayData = async (amount, tickers) => {
        const date = new Date();
        const dateTo = dateToTimestamp(date.getTime()); // today
        const dateFrom = dateToTimestamp(date.setDate(date.getDate() - 1)); // yesterday
        const { perPage } = pagination;
        const chosenTickers = tickers.slice(amount - perPage, amount).map(instrument => ({
            ticker: instrument.displaySymbol,
            url: endpoints[`${instrumentType}Candles`](instrument.symbol, resolutions.day, dateFrom, dateTo),
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

    const changeInstrumentType = symbol => {
        setInstrumentType(symbol);
    };

    const handlePagination = currentPage => {
        const activePage = currentPage.selected + 1;
        setPagination(prevState => ({
            ...prevState,
            currentPage: activePage,
        }));
    };

    return (
        <div className="home-page page">
            <Header />
            <main>
                <Container>
                    <HomePageHeader>
                        <div className="dropdown">
                            <Dropdown listElements={listElements} onChange={changeInstrumentType} />
                        </div>
                        <div className="buttons">
                            <Button>Filters</Button>
                            <Button icon className="icon-arrow-left-white" />
                            <Button icon className="icon-arrow-right-white" />
                        </div>
                    </HomePageHeader>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <React.Fragment>
                            <MarketList>
                                <MarketListHeader>
                                    <ul>
                                        <li>Lp</li>
                                        <li>Name</li>
                                        <li>Close</li>
                                        <li>Open</li>
                                        <li>High</li>
                                        <li>Low</li>
                                        <li>Volume</li>
                                        <li>Day change (%)</li>
                                    </ul>
                                </MarketListHeader>
                                <MarketListMain>
                                    {displayData.map((element, index) => {
                                        if (element.s === 'ok') {
                                            const { changePercent, priceIsBigger } = calculatePriceDayChange(element);
                                            return (
                                                <ul key={index}>
                                                    <li>{index + 1}</li>
                                                    <li>{element.ticker}</li>
                                                    <li>{element.c[0]}</li>
                                                    <li>{element.o[0]}</li>
                                                    <li>{element.h[0]}</li>
                                                    <li>{element.l[0]}</li>
                                                    <li>{element.v[0]}</li>
                                                    <li className={priceIsBigger ? 'price-up' : 'price-down'}>{changePercent} %</li>
                                                </ul>
                                            );
                                        }
                                    })}
                                </MarketListMain>
                            </MarketList>
                            <PaginationWrapper>
                                <ReactPaginate
                                    pageCount={instrumentSymbols.length}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={1}
                                    onPageChange={handlePagination}
                                    initialPage={pagination.currentPage - 1}
                                />
                            </PaginationWrapper>
                        </React.Fragment>
                    )}
                </Container>
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;
