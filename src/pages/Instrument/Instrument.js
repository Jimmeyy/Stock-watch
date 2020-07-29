import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'components/common';
import Chart from 'react-apexcharts';
import { InstrumentHeader } from './Instrument.style';
import endpoints, { resolutions } from 'data/endpoints';
import { dateToTimestamp, calculatePriceDayChange } from 'utils';
import { fetchSingle } from 'data/fetch';
import SymbolsContext from 'data/context/SymbolsContext';

const chartOptions = {
    chart: {
        id: 'basic-bar',
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
};

const chartSeries = [
    {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
];

const Instrument = () => {
    const { instrumentType, ticker, ticker2 } = useParams();
    const instrumentSymbol = ticker2 ? `${ticker}/${ticker2}` : ticker;

    const [instrumentData, setInstrumentData] = useState({});
    const [chartData, setChartData] = useState({
        options: {},
        series: [],
    });
    const instrumentSymbols = useContext(SymbolsContext);

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date();
            const dateTo = dateToTimestamp(date.getTime()); // today
            const dateFrom = dateToTimestamp(date.setDate(date.getDate() - 30)); // 30 days ago
            const instrument = instrumentSymbols[instrumentType].find(instrument => instrument.displaySymbol === instrumentSymbol);
            const endpoint = endpoints[`${instrumentType}Candles`](instrument && instrument.symbol, resolutions.day, dateFrom, dateTo);
            const data = await fetchSingle(endpoint);
            setInstrumentData(data);
            if (data.c) {
                const series = data.c.map((row, index) => {
                    const item = [data.t[index], data.o[index], data.h[index], data.l[index], data.c[index]];
                    return item;
                });
                setChartData({
                    ...chartData,
                    series: [
                        {
                            name: 'series-1',
                            data: series,
                        },
                    ],
                });
            }
        };
        fetchData();
    }, []);

    return (
        <div className="instrument-page page">
            <Container>
                <InstrumentHeader>
                    <h1>
                        <span>{instrumentType}</span> - You are on {instrumentSymbol} page.
                    </h1>
                </InstrumentHeader>
                <Chart options={{}} series={chartData.series} type="candlestick" width="800px" />
            </Container>
            {console.log(chartData)}
        </div>
    );
};

export default Instrument;
