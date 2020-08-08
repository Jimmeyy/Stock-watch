import React, { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import { ChartWrapper, ChartHeader, ChartMain } from './Chart.style';
import PropTypes from 'prop-types';
import Dropdown from 'components/Dropdown';
import { fetchSingle } from 'data/fetch';
import { dropdownIntervals, dropdownTimeFrames, dropdownChartTypes } from 'data/content/InstrumentPage';
import moment from 'moment';

const chartOptions = {
    chart: {
        id: 'main-chart',
        animations: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        }
    },
    xaxis: {
        type: 'numeric',
        labels: {
            formatter: value => moment(value).format('D, MMM, YYYY'),
        },
    },
    yaxis: {
        opposite: true,
    },
};

const Chart = ({ endpoint, dropdownIntervalsChange, dropdownTimeFramesChange }) => {
    const [chartType, setChartType] = useState(dropdownChartTypes[0].value);
    const [chartData, setChartData] = useState({
        options: chartOptions,
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
        setChartType(value);
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
                {chartType === 'line' && <ApexChart options={chartData.options} series={chartData.series} type={chartType} width="100%" />}
                {chartType === 'candlestick' && <ApexChart options={chartData.options} series={chartData.series} type={chartType} width="100%" />}
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
