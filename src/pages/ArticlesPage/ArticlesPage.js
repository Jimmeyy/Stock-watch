import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading } from 'components/common';
import Banner from 'components/Banner';
import Articles from 'components/Articles';
import endpoints from 'data/endpoints';

const ArticlesPage = () => {
    const [articlesCategory, setArticlesCategory] = useState();
    const { category } = useParams();

    const setCategory = category => {
        if (category === 'stocks') {
            return 'general';
        } else if (category === undefined) {
            return 'merger';
        }
        return category;
    };

    useEffect(() => {
        setArticlesCategory(setCategory(category));
    }, [category]);

    return (
        <div className="page page-articles">
            <Banner>
                <Heading small>{category ? category : 'all'}</Heading>
                <Heading>Articles Page</Heading>
            </Banner>
            <Container>
                <Articles endpoint={endpoints.news(articlesCategory)} />
            </Container>
        </div>
    );
};

export default ArticlesPage;
