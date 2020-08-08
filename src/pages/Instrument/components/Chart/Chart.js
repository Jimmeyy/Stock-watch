import React, { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import { ChartWrapper, ChartHeader, ChartMain } from './Chart.style';
import PropTypes from 'prop-types';
import Dropdown from 'components/Dropdown';
import { fetchSingle } from 'data/fetch';
import { dropdownIntervals, dropdownTimeFrames, dropdownChartTypes } from 'data/content/InstrumentPage';
import moment from 'moment';

const Chart = ({ endpoint, dropdownIntervalsChange, dropdownTimeFramesChange }) => {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSingle(endpoint);
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
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [endpoint]);

    const dropdownTypesChange = value => {
        console.log(chartData);
    };

    return (
        <ChartWrapper>
            <ChartHeader>
                <div>
                    <h2>Chart Header</h2>
                </div>
                <div>
                    <Dropdown dropdownElements={dropdownChartTypes} onChange={dropdownTypesChange} />
                    <Dropdown
                        dropdownElements={dropdownIntervals}
                        onChange={dropdownIntervalsChange}
                        activeElement={dropdownIntervals.find(item => item.displayValue === 'day')}
                    />
                    <Dropdown
                        dropdownElements={dropdownTimeFrames}
                        onChange={dropdownTimeFramesChange}
                        activeElement={dropdownTimeFrames.find(item => item.displayValue === 'month1')}
                    />
                </div>
            </ChartHeader>
            <ChartMain>
                <ApexChart options={chartData.options} series={chartData.series} type="candlestick" width="100%" />
            </ChartMain>
        </ChartWrapper>
    );
};

Chart.propTypes = {
    endpoint: PropTypes.string.isRequired,
    dropdownIntervalsChange: PropTypes.func.isRequired,
    dropdownTimeFramesChange: PropTypes.func.isRequired,
};

export default Chart;
