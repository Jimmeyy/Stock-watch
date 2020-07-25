import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'components/common';

const Instrument = () => {
    const { ticker, ticker2 } = useParams();
    return (
        <div className="instrument-page page">
            <Container>
                <h1>You are on {ticker}/{ticker2} page.</h1>
            </Container>
        </div>
    );
};

export default Instrument;
