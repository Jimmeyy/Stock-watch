import React, { useState, useEffect } from 'react';
import ArticleBox from 'components/ArticleBox';
import { fetchSingle } from 'data/fetch';
import PropTypes from 'prop-types';
import { ArticlesWrapper } from './Articles.style';
import { Loader } from 'components/common';

const Articles = ({ endpoint }) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchSingle(endpoint);
            setArticles(data);
            setIsLoading(false);
        };

        fetchData();
    }, [endpoint]);

    return <ArticlesWrapper>{isLoading ? <Loader /> : articles.map(article => <ArticleBox key={article.id} article={article} />)}</ArticlesWrapper>;
};

Articles.propTypes = {
    endpoint: PropTypes.string.isRequired,
};

export default Articles;
