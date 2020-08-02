import React from 'react';
import ApexChart from 'react-apexcharts';
import { ChartWrapper, ChartHeader, ChartMain } from './Chart.style';
import PropTypes from 'prop-types';

const Chart = ({ options, series }) => {
    return (
        <ChartWrapper>
            <ChartHeader>
                <h1>Chart Header</h1>
            </ChartHeader>
            <ChartMain>
                <ApexChart options={options} series={series} type="candlestick" width="100%" />
            </ChartMain>
        </ChartWrapper>
    );
};

Chart.propTypes = {
    options: PropTypes.object.isRequired,
    series: PropTypes.array.isRequired,
}

export default Chart;
