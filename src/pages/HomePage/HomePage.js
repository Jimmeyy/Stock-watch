import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Dropdown from 'components/Dropdown';
import { HomePageHeader, MarketList, MarketListHeader, MarketListMain } from './HomePage.style';
import { Button, Container, Loader, PaginationWrapper } from 'components/common';
import endpoints, { resolutions } from 'data/endpoints';
import { dateToTimestamp, calculatePriceDayChange } from 'utils';
import ReactPaginate from 'react-paginate';

const lodash = require('lodash');

// List dropdown elements
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

// List column fields
const tableFields = [
    {
        displayValue: 'Lp',
        value: 'lp',
    },
    {
        displayValue: 'Name',
        value: 'ticker',
    },
    {
        displayValue: 'Close',
        value: 'c',
    },
    {
        displayValue: 'Open',
        value: 'o',
    },
    {
        displayValue: 'High',
        value: 'h',
    },
    {
        displayValue: 'Low',
        value: 'l',
    },
    {
        displayValue: 'Volume',
        value: 'v',
    },
    {
        displayValue: 'Day change  (%)',
        value: 'changePercent',
    },
];

function HomePage() {
    const [instrumentType, setInstrumentType] = useState('forex');
    const [instrumentSymbols, setInstrumentSymbols] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        offset: 0,
        perPage: 5,
        currentPage: 1,
    });
    const [sortBy, setSortBy] = useState({
        field: '',
        direction: false,
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

    useEffect(() => {
        if (sortBy.field) {
            const direction = sortBy.direction ? 'asc' : 'desc';
            const sortedDisplayData = lodash.orderBy(displayData, [sortBy.field], [direction]);
            setDisplayData(sortedDisplayData);
        }
        console.log(sortBy);
    }, [sortBy]);

    const fetchSymbols = async endpoint => {
        const response = await fetch(endpoint);
        const tickers = await response.json();
        return tickers;
    };

    const fetchDisplayData = async (amount, tickers) => {
        const date = new Date();
        const dateTo = dateToTimestamp(date.getTime()); // today
        const dateFrom = dateToTimestamp(date.setDate(date.getDate())); // yesterday
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

        const displayData = response.map((element, index) => {
            const { changePercent, priceIsBigger } = calculatePriceDayChange(element);
            return {
                ...element,
                ticker: chosenTickers[index].ticker,
                changePercent,
                priceIsBigger,
                o: element.o[0],
                h: element.h[0],
                l: element.l[0],
                c: element.c[0],
                v: element.v[0],
            };
        });

        return displayData;
    };

    const changeInstrumentType = symbol => {
        setInstrumentType(symbol);
        setPagination(prevState => ({
            ...prevState,
            currentPage: 1,
        }));
    };

    const handlePagination = currentPage => {
        const activePage = currentPage.selected + 1;
        setPagination(prevState => ({
            ...prevState,
            currentPage: activePage,
        }));
    };

    const handleSortBy = value => {
        setSortBy(prevState => {
            return {
                field: value,
                direction: prevState.field === value ? !prevState.direction : false,
            };
        });
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
                                        {tableFields.map(({ displayValue, value }) => (
                                            <li onClick={() => handleSortBy(value)} key={value}>
                                                {value === sortBy.field ? (
                                                    <span className={sortBy.direction ? 'sort-asc' : 'sort-desc'}>{displayValue}</span>
                                                ) : (
                                                    <span>{displayValue}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </MarketListHeader>
                                <MarketListMain>
                                    {displayData.map((element, index) => {
                                        if (element.s === 'ok') {
                                            return (
                                                <ul key={index}>
                                                    <li>{index + 1}</li>
                                                    <li>{element.ticker}</li>
                                                    <li>{element.c}</li>
                                                    <li>{element.o}</li>
                                                    <li>{element.h}</li>
                                                    <li>{element.l}</li>
                                                    <li>{element.v}</li>
                                                    <li className={element.priceIsBigger ? 'price-up' : 'price-down'}>{element.changePercent} %</li>
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
