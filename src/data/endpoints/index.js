const token = process.env.REACT_APP_STOCK_MARKET_API;

const endpoints = {
    // CRYPTO
    cryptoSymbols: `https://finnhub.io/api/v1/crypto/symbol?exchange=binance&token=${token}`,
    cryptoCandles: (symbol, resolution, dateFrom, dateTo) => `https://finnhub.io/api/v1/crypto/candle?symbol=${symbol}&resolution=${resolution}&from=${dateFrom}&to=${dateTo}&token=${token}`,
    // STOCKS
    stocksSymbols: `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${token}`,
    stocksCandles: (symbol, resolution, dateFrom, dateTo) => `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${dateFrom}&to=${dateTo}&token=${token}`,
    // FOREX
    forexSymbols: `https://finnhub.io/api/v1/forex/symbol?exchange=oanda&token=${token}`,
    forexCandles: (symbol, resolution, dateFrom, dateTo) => `https://finnhub.io/api/v1/forex/candle?symbol=${symbol}&resolution=${resolution}&from=${dateFrom}&to=${dateTo}&token=${token}`,
};

export const resolutions = {
    min1: '1',
    min5: '5',
    min15: '15',
    min30: '30',
    h1: '60',
    day: 'D',
    week: 'W',
    month: 'M',
};

export default endpoints;
