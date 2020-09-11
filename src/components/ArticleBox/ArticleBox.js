import React from 'react';
import PropTypes from 'prop-types';
import { ArticleWrapper } from './ArticleBox.style';
import moment from 'moment';

const ArticleBox = ({ article }) => {
    const { datetime, headline, image, summary, url } = article;
    return (
        <ArticleWrapper>
            <div className="image-warpper">
                <img src={image} alt="news-image" />
            </div>
            <div className="content">
                <p className="date">{moment.unix(datetime).format('MM.DD.YYYY')}</p>
                <h2>{headline}</h2>
                <p>{summary}</p>
                <a href={url}>Read more</a>
            </div>
        </ArticleWrapper>
    );
};

ArticleBox.propTypes = {
    article: PropTypes.array.isRequired,
};

export default ArticleBox;
