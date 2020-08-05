import lodash from 'lodash';

const calculatePriceDayChange = ({ c, o }) => {
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

export const dateToTimestamp = date => {
    return parseInt(date / 1000);
};

export const convertDataFormat = (ticker, element) => {
    if (element.c) {
        const { changePercent, priceIsBigger } = calculatePriceDayChange(element);
        const convertedData = {
            ...element,
            ticker,
            changePercent,
            priceIsBigger,
            o: element.o[element.o.length - 1],
            h: element.h[element.o.length - 1],
            l: element.l[element.o.length - 1],
            c: element.c[element.o.length - 1],
            v: element.v[element.o.length - 1],
        };
        return convertedData;
    }
};
