import React from 'react';
import PropTypes from 'prop-types';
import { Row } from './InstrumentRow.style';

const InstrumentRow = ({ element }) => {
    return (
        <Row>
            <li>{element.ticker}</li>
            <li>{element.c}</li>
            <li>{element.o}</li>
            <li>{element.h}</li>
            <li>{element.l}</li>
            <li>{element.v}</li>
            <li className={element.priceIsBigger ? 'price-up' : 'price-down'}>{element.changePercent} %</li>
        </Row>
    );
};

InstrumentRow.propTypes = {
    element: PropTypes.object.isRequired,
};

export default InstrumentRow;
