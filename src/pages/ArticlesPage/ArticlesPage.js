import React from 'react';
import { ArticlesPageWrapper } from './ArticlesPage.style';
import { Container, Heading } from 'components/common';

const ArticlesPage = () => {
    return (
        <div className="page page-articles">
            <Container>
                <Heading dark>Articles Page</Heading>
            </Container>
        </div>
    );
};

export default ArticlesPage;
