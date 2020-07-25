import lodash from 'lodash';

export const dateToTimestamp = date => {
    return parseInt(date / 1000);
};

export const calculatePriceDayChange = ({ c, o }) => {
    const closePrice = c ? c[c.length - 1] : '';
    const openPrice = o ? o[o.length - 1] : '';
    const change = closePrice - openPrice;
    const changePercent = (closePrice / openPrice) * 100 - 100;
    const priceIsBigger = closePrice > openPrice ? true : false;
    return {
        change,
        changePercent: lodash.round(changePercent, 2),
        priceIsBigger,
    };
};
