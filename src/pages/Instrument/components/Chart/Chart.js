import React from 'react';
import ApexChart from 'react-apexcharts';
import { ChartWrapper, ChartHeader, ChartMain } from './Chart.style';
import PropTypes from 'prop-types';
import Dropdown from 'components/Dropdown';
import { dropdownResolutions, dropdownTimeFrames, dropdownChartTypes } from 'data/content/InstrumentPage';

const Chart = ({ options, series }) => {
    const dropdownChange = value => {
        console.log(value);
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
