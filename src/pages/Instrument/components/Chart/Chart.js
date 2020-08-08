import React, { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import { ChartWrapper, ChartHeader, ChartMain } from './Chart.style';
import PropTypes from 'prop-types';
import Dropdown from 'components/Dropdown';
import { fetchSingle } from 'data/fetch';
import { dropdownResolutions, dropdownTimeFrames, dropdownChartTypes } from 'data/content/InstrumentPage';
import moment from 'moment';

const Chart = ({ endpoint }) => {
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
    // Temp
    const dropdownChange = value => {
        console.log(chartData);
    };

    return (
        <ChartWrapper>
            <ChartHeader>
                <div>
                    <h2>Chart Header</h2>
                </div>
                <div>
                    <Dropdown dropdownElements={dropdownChartTypes} onChange={dropdownChange} />
                    <Dropdown dropdownElements={dropdownResolutions} onChange={dropdownChange} />
                    <Dropdown dropdownElements={dropdownTimeFrames} onChange={dropdownChange} />
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
};

export default Chart;
