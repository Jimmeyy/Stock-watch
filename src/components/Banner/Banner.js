import React from 'react';
import { BannerWrapper, BannerInner } from './Banner.style';
import { Container } from 'components/common';
import PropTypes from 'prop-types';

const Banner = ({ children }) => {
    return (
        <BannerWrapper>
            <Container>
                <BannerInner>{children}</BannerInner>
            </Container>
        </BannerWrapper>
    );
};

Banner.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Banner;
