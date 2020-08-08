import { resolutions } from 'data/endpoints';

export const dropdownResolutions = Object.entries(resolutions).map(row => ({
    displayValue: row[0],
    value: row[1],
}));

export const dropdownTimeFrames = [
    {
        displayValue: 'month1',
        value: 'M1',
    },
    {
        displayValue: 'month3',
        value: 'M3',
    },
    {
        displayValue: 'month6',
        value: 'M6',
    },
    {
        displayValue: 'year1',
        value: 'Y1',
    },
    {
        displayValue: 'year2',
        value: 'Y2',
    },
    {
        displayValue: 'year3',
        value: 'Y3',
    },
];

export const dropdownChartTypes = [
    {
        displayValue: 'Candles',
        value: 'candles',
    },
    {
        displayValue: 'Linear',
        value: 'linear',
    },
];
