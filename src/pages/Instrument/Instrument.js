import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Button, Heading } from 'components/common';
import { InstrumentHeader } from './Instrument.style';
import endpoints, { resolutions } from 'data/endpoints';
import InstrumentRow from 'components/InstrumentRow';
import { dateToTimestamp, convertDataFormat, usePrevious } from 'utils';
import { fetchSingle } from 'data/fetch';
import SymbolsContext from 'data/context/SymbolsContext';
import Chart from 'components/Chart';
import { dropdownIntervals, dropdownTimeFrames } from 'data/content/InstrumentPage';
import Banner from 'components/Banner';

const Instrument = () => {
    const instrumentSymbols = useContext(SymbolsContext);
    const history = useHistory();
    const { instrumentType, ticker, ticker2 } = useParams();
    // const instrumentSymbol = ticker2 ? `${ticker}/${ticker2}` : ticker;

    const [instrumentSymbol, setInstrumentSymbol] = useState(ticker2 ? `${ticker}/${ticker2}` : ticker);
    const [chartEndpoint, setChartEndpoint] = useState('');
    const [chartInterval, setChartInterval] = useState(dropdownIntervals.find(item => item.displayValue === 'h1'));
    const [chartTimeFrame, setChartTimeFrame] = useState(dropdownTimeFrames.find(item => item.displayValue === 'month1'));
    const [instrumentDataDay, setInstrumentDataDay] = useState({});

    // const prevTicker = usePrevious(ticker);
    // const prevTicker2 = usePrevious(ticker2);

    useEffect(() => {
        const date = new Date();
        const dateTo = dateToTimestamp(date.getTime()); // today
        const dateFrom = dateToTimestamp(date.setDate(date.getDate() - parseFloat(chartTimeFrame.value))); // Chart timer frame ago
        const instrument = instrumentSymbols[instrumentType].find(instrument => instrument.displaySymbol === instrumentSymbol);
        const endpoint = endpoints[`${instrumentType}Candles`](instrument && instrument.symbol, chartInterval.value, dateFrom, dateTo);
        setChartEndpoint(endpoint);
    }, [chartInterval, chartTimeFrame, instrumentSymbol]);

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date();
            const dateTo = dateToTimestamp(date.getTime()); // today
            const dateFromDay = dateToTimestamp(date.setDate(date.getDate() - 1)); // yesterday
            const instrument = instrumentSymbols[instrumentType].find(instrument => instrument.displaySymbol === instrumentSymbol);
            const endpointDay = endpoints[`${instrumentType}Candles`](instrument && instrument.symbol, resolutions.day, dateFromDay, dateTo);
            const dataDay = await fetchSingle(endpointDay);
            setInstrumentDataDay(convertDataFormat(instrumentSymbol, dataDay));
        };
        fetchData();
    }, [instrumentSymbol]);

    useEffect(() => {
        setInstrumentSymbol(ticker2 ? `${ticker}/${ticker2}` : ticker);
    }, [instrumentType, ticker, ticker2]);

    const dropdownIntervalsChange = value => {
        setChartInterval({
            ...chartInterval,
            value,
        });
    };

    const dropdownTimeFramesChange = value => {
        setChartTimeFrame({
            ...chartTimeFrame,
            value,
        });
    };

    return (
        <div className="page page-instrument">
            <Banner>
                <Button onClick={() => history.goBack()}>Back</Button>
                <Heading>
                    <span>{instrumentType}</span> - You are on {instrumentSymbol} page.</Heading>
            </Banner>
            <Container>
                <InstrumentRow element={instrumentDataDay} />
                <Chart
                    endpoint={chartEndpoint}
                    dropdownIntervalsChange={dropdownIntervalsChange}
                    dropdownTimeFramesChange={dropdownTimeFramesChange}
                />
            </Container>
        </div>
    );
};

export default Instrument;
