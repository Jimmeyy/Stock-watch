import React from 'react';
import PropTypes from 'prop-types';
import { ArticleWrapper } from './ArticleBox.style';
import moment from 'moment';

const ArticleBox = ({ article }) => {
    const { datetime, headline, image, summary, url } = article;
    return (
        <ArticleWrapper>
            <p>{moment(datetime)}</p>
            <h2>{headline}</h2>
            <div className="image-warpper">
                <img src={image} alt="news-image" />
            </div>
            <p>{summary}</p>
            <a href={url}>Read more</a>
        </ArticleWrapper>
    );
};

ArticleBox.propTypes = {
    article: PropTypes.array.isRequired,
};

export default ArticleBox;
