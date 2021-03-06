import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { MarketListTopBar, MarketListWrapper, MarketListHeader, MarketListMain, MarketListContainer } from './MarketList.style';
import { Button, Loader, PaginationWrapper } from 'components/common';
import Dropdown from 'components/Dropdown';
import InstrumentRow from 'components/InstrumentRow';
import ReactPaginate from 'react-paginate';
import endpoints, { resolutions } from 'data/endpoints';
import { dateToTimestamp, convertDataFormat } from 'utils';
import lodash from 'lodash';
import { fetchMultiple } from 'data/fetch';
import SymbolsContext from 'data/context/SymbolsContext';
import { Link } from 'react-router-dom';

const MarketList = ({ marketListDropdownElements, marketListFields }) => {
    const [instrumentType, setInstrumentType] = useState(marketListDropdownElements[0].value);
    const [displayData, setDisplayData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        perPage: 5,
        currentPage: 1,
    });
    const [sortBy, setSortBy] = useState({
        field: '',
        direction: false,
    });
    const instrumentSymbols = useContext(SymbolsContext);

    useEffect(() => {
        setIsLoading(true);
        const { perPage, currentPage } = pagination;
        const fetchAmount = perPage * currentPage;
        async function fetchData() {
            const data = await fetchDisplayData(fetchAmount, instrumentSymbols[instrumentType]);
            setDisplayData(data);
            setIsLoading(false);
        }
        fetchData();
    }, [instrumentType, pagination.currentPage]);

    useEffect(() => {
        if (sortBy.field) {
            const direction = sortBy.direction ? 'asc' : 'desc';
            const sortedDisplayData = lodash.orderBy(displayData, [sortBy.field], [direction]);
            setDisplayData(sortedDisplayData);
        }
    }, [sortBy]);

    const fetchDisplayData = async (amount, tickers) => {
        const date = new Date();
        const dateTo = dateToTimestamp(date.getTime()); // today
        const dateFrom = dateToTimestamp(date.setDate(date.getDate() - 1)); // yesterday
        const { perPage } = pagination;
        const chosenTickers = tickers.slice(amount - perPage, amount).map(instrument => ({
            ticker: instrument.displaySymbol,
            url: endpoints[`${instrumentType}Candles`](instrument.symbol, resolutions.day, dateFrom, dateTo),
        }));

        const urls = chosenTickers.map(({ url }) => url);
        const response = await fetchMultiple(urls);

        const displayData = response.map((element, index) => {
            if (element.s === 'ok') {
                return convertDataFormat(chosenTickers[index].ticker, element);
            }
        });
        return displayData;
    };

    const changeInstrumentType = symbol => {
        setInstrumentType(symbol);
        setPagination({
            ...pagination,
            currentPage: 1,
        });
    };

    const handleSortBy = value => {
        setSortBy(prevState => {
            return {
                field: value,
                direction: prevState.field === value ? !prevState.direction : false,
            };
        });
    };

    const handlePagination = currentPage => {
        const activePage = currentPage.selected + 1;
        setPagination({
            ...pagination,
            currentPage: activePage,
        });
    };

    const paginationNext = () => {
        if (pagination.currentPage < Math.ceil(instrumentSymbols[instrumentType].length / pagination.perPage)) {
            setPagination(prevState => ({
                ...prevState,
                currentPage: prevState.currentPage + 1,
            }));
        }
    };

    const paginationPrev = () => {
        if (pagination.currentPage > 1) {
            setPagination(prevState => ({
                ...prevState,
                currentPage: prevState.currentPage - 1,
            }));
        }
    };

    return (
        <MarketListContainer>
            <MarketListTopBar>
                <div className="dropdown">
                    <Dropdown dropdownElements={marketListDropdownElements} onChange={changeInstrumentType} />
                </div>
                <div className="buttons">
                    {/* <Button>Filters</Button> */}
                    <Button onClick={paginationPrev} icon className="icon-arrow-left-white" />
                    <Button onClick={paginationNext} icon className="icon-arrow-right-white" />
                </div>
            </MarketListTopBar>
            {isLoading ? (
                <Loader />
            ) : (
                <React.Fragment>
                    <MarketListWrapper>
                        <MarketListHeader>
                            <ul>
                                {marketListFields.map(({ displayValue, value }) => (
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
                                if (element && element.s === 'ok') {
                                    return (
                                        <Link to={`/instrument/${instrumentType}/${element.ticker}`}>
                                            <InstrumentRow element={element} />
                                        </Link>
                                    );
                                }
                            })}
                        </MarketListMain>
                    </MarketListWrapper>
                    <PaginationWrapper>
                        <ReactPaginate
                            pageCount={Math.ceil(instrumentSymbols[instrumentType].length / pagination.perPage)}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            onPageChange={handlePagination}
                            initialPage={pagination.currentPage - 1}
                            previousLabel={'Prev'}
                            nextLabel={'Next'}
                        />
                    </PaginationWrapper>
                </React.Fragment>
            )}
        </MarketListContainer>
    );
};

MarketList.propTypes = {
    marketListDropdownElements: PropTypes.array.isRequired,
    marketListFields: PropTypes.array.isRequired,
};

export default MarketList;
