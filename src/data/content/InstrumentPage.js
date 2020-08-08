import { resolutions } from 'data/endpoints';

export const dropdownIntervals = Object.entries(resolutions).map(row => ({
    displayValue: row[0],
    value: row[1],
}));

export const dropdownTimeFrames = [
    {
        displayValue: 'month1',
        value: '30',
    },
    {
        displayValue: 'month3',
        value: '90',
    },
    {
        displayValue: 'month6',
        value: '180',
    },
    {
        displayValue: 'year1',
        value: '360',
    },
    {
        displayValue: 'year2',
        value: '720',
    },
    {
        displayValue: 'year3',
        value: '1080',
    },
];

export const dropdownChartTypes = [
    {
        displayValue: 'Candles',
        value: 'candlestick',
    },
    {
        displayValue: 'Linear',
        value: 'linear',
    },
];
