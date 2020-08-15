import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Button } from 'components/common';
import { InstrumentHeader } from './Instrument.style';
import endpoints, { resolutions } from 'data/endpoints';
import InstrumentRow from 'components/InstrumentRow';
import { dateToTimestamp, convertDataFormat } from 'utils';
import { fetchSingle } from 'data/fetch';
import SymbolsContext from 'data/context/SymbolsContext';
import Chart from './components/Chart';
import Articles from 'components/Articles';
import { dropdownIntervals, dropdownTimeFrames } from 'data/content/InstrumentPage';

// const options: {
//     chart: {
//         id: 'main-chart',
//     },
//     xaxis: {
//         categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//         labels: {
//             format: 'dd/MM',
//         },
//     },
// },

const Instrument = () => {
    const instrumentSymbols = useContext(SymbolsContext);
    const history = useHistory();
    const { instrumentType, ticker, ticker2 } = useParams();
    const instrumentSymbol = ticker2 ? `${ticker}/${ticker2}` : ticker;

    const [chartEndpoint, setChartEndpoint] = useState('');
    const [chartInterval, setChartInterval] = useState(dropdownIntervals.find(item => item.displayValue === 'day'));
    const [chartTimeFrame, setChartTimeFrame] = useState(dropdownTimeFrames.find(item => item.displayValue === 'month1'));
    const [instrumentDataDay, setInstrumentDataDay] = useState({});

    useEffect(() => {
        const date = new Date();
        const dateTo = dateToTimestamp(date.getTime()); // today
        const dateFrom = dateToTimestamp(date.setDate(date.getDate() - parseFloat(chartTimeFrame.value))); // Chart timer frame ago
        const instrument = instrumentSymbols[instrumentType].find(instrument => instrument.displaySymbol === instrumentSymbol);
        const endpoint = endpoints[`${instrumentType}Candles`](instrument && instrument.symbol, chartInterval.value, dateFrom, dateTo);
        setChartEndpoint(endpoint);
    }, [chartInterval, chartTimeFrame]);

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
    }, []);

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
            <Container>
                <InstrumentHeader>
                    <Button onClick={() => history.goBack()}>Back</Button>
                    <h1>
                        <span>{instrumentType}</span> - You are on {instrumentSymbol} page.
                    </h1>
                </InstrumentHeader>
                <InstrumentRow element={instrumentDataDay} />
                <Chart
                    endpoint={chartEndpoint}
                    dropdownIntervalsChange={dropdownIntervalsChange}
                    dropdownTimeFramesChange={dropdownTimeFramesChange}
                />
                <Articles endpoint={endpoints.news(instrumentType)} />
            </Container>
        </div>
    );
};

export default Instrument;
