import styled, { css } from 'styled-components';

const Button = styled.button`
    display: inline-block;
    margin: 0 4px;
    background-color: ${({ theme }) => theme.colors.blue};
    border: 0;
    border-radius: 5px;
    height: 38px;
    color: ${({ theme }) => theme.colors.white};
    padding: 6px 18px;
    letter-spacing: 0.2px;
    font-weight: 400;
    min-width: 120px;
    border: 2px solid ${({ theme }) => theme.colors.blue};
    vertical-align: middle;
    transition: all 0.3s ease;
    user-select: none;

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        opacity: 0.75;
    }

    ${({ icon }) =>
        icon &&
        css`
            min-width: 40px;
            background-repeat: no-repeat;
            background-size: 18px;
            background-position: center center;

            &.icon-arrow-left-white {
                background-image: url('/icons/white/arrow-left.svg');
            }

            &.icon-arrow-right-white {
                background-image: url('/icons/white/arrow-right.svg');
            }

            &.icon-arrow-up-white {
                background-image: url('/icons/white/arrow-up.svg');
            }

            &.icon-arrow-down-white {
                background-image: url('/icons/white/arrow-left.svg');
            }

            &.icon-play-white {
                background-image: url('icons/white/play.svg');
                background-size: 16px;
            }
        `}
`;

export default Button;
