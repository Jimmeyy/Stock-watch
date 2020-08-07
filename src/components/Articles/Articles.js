import React, { useState, useEffect } from 'react';
import ArticleBox from 'components/ArticleBox';
import { fetchSingle } from 'data/fetch';
import PropTypes from 'prop-types';
import { ArticlesWrapper } from './Articles.style';

const Articles = ({ endpoint }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchSingle(endpoint);
            setArticles(data);
        };

        fetchData();
    }, []);

    return (
        <ArticlesWrapper>
            {articles.map(article => (
                <ArticleBox key={article.id} article={article} />
            ))}
        </ArticlesWrapper>
    );
};

Articles.propTypes = {
    endpoint: PropTypes.string.isRequired,
};

export default Articles;
