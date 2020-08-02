import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'components/common';
import { InstrumentHeader } from './Instrument.style';
import endpoints, { resolutions } from 'data/endpoints';
import { dateToTimestamp, calculatePriceDayChange } from 'utils';
import { fetchSingle } from 'data/fetch';
import SymbolsContext from 'data/context/SymbolsContext';
import Chart from './components/Chart';
// import Moment from 'react-moment';
import moment from 'moment';

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
    const { instrumentType, ticker, ticker2 } = useParams();
    const instrumentSymbol = ticker2 ? `${ticker}/${ticker2}` : ticker;

    const [instrumentData, setInstrumentData] = useState({});
    const [chartData, setChartData] = useState({
        options: {
            chart: {
                id: 'main-chart',
            },
            xaxis: {
                labels: {
                    formatter: function(value) {
                        const label = moment(value).format('D, MMM, YYYY');
                        return label;
                    },
                },
            },
        },
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
                    const item = [data.t[index] * 1000, data.o[index], data.h[index], data.l[index], data.c[index]];
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
                <Chart options={chartData.options} series={chartData.series} />
            </Container>
        </div>
    );
};

export default Instrument;
