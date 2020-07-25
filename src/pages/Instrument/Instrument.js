import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'components/common';

const Instrument = () => {
    const { ticker, ticker2 } = useParams();
    const instrumentSymbol = ticker2 ? `${ticker}/${ticker2}` : ticker;
    return (
        <div className="instrument-page page">
            <Container>
                <h1>You are on {instrumentSymbol} page.</h1>
            </Container>
        </div>
    );
};

export default Instrument;
