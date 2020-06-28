const _ = require('lodash');

export const dateToTimestamp = date => {
    return parseInt(date / 1000);
};

export const calculatePriceDayChange = closePrices => {
    const currentClose = closePrices[1];
    const yesterdayClose = closePrices[0];
    const change = currentClose - yesterdayClose;
    const changePercent = yesterdayClose / change;
    const priceIsBigger = currentClose > yesterdayClose ? true : false;
    return {
        change,
        changePercent: _.round(changePercent, 2),
        priceIsBigger,
    };
};
