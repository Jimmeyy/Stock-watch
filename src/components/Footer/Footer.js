import React from 'react';
import { Container, Button, InputText } from 'components/common';
import { FooterWrapper, FooterList, FooterCol, FooterCopyrights, FooterSocials, FooterSubscription } from './Footer.style';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <FooterWrapper>
            <Container>
                <FooterList>
                    <FooterCol>
                        <ul>
                            <li className="footer-heading">Stocks</li>
                            <li>
                                <Link to={`/instrument/stocks/AAPL`}>Aapl</Link>
                            </li>
                            <li>
                                <Link to={`/instrument/stocks/MSFT`}>Msft</Link>
                            </li>
                            <li>
                                <Link to={`/instrument/stocks/AMZN`}>Amzn</Link>
                            </li>
                            <li>
                                <Link to={`/instrument/stocks/GOOG`}>goog</Link>
                            </li>
                            <li>
                                <Link to={`/instrument/stocks/BABA`}>baba</Link>
                            </li>
                        </ul>
                    </FooterCol>
                    <FooterCol>
                        <ul>
                            <li className="footer-heading">Forex</li>
                            <li>
                                <Link to={`/instrument/forex/EUR/USD`}>EurUsd</Link>
                            </li>
                            <li>
                                <Link to={`/instrument/forex/GBP/USD`}>GbpUsd</Link>
                            </li>
                            <li>
                                <Link to={`/instrument/forex/NZD/USD`}>NzdUsd</Link>
                            </li>
                            <li>
                                <Link to={`/instrument/forex/AUD/USD`}>AudUsd</Link>
                            </li>
                            <li>
                                <Link to={`/instrument/forex/USD/JPY`}>UsdJpy</Link>
                            </li>
                        </ul>
                    </FooterCol>
                    <FooterCol>
                        <ul>
                            <li className="footer-heading">Crypto</li>
                            <li>
                                <Link to={`/instrument/crypto/BTC/USDT`}>Bitcoin</Link>
                            </li>
                            <li>
                                <Link to={`/instrument/crypto/ETH/USDT`}>Etherium</Link>
                            </li>
                            <li>
                                <Link to={`/instrument/crypto/XRP/USDT`}>XRP</Link>
                            </li>
                            <li>
                                <Link to={`/instrument/crypto/LTC/USDT`}>Litecoin</Link>
                            </li>
                        </ul>
                    </FooterCol>
                    <FooterCol>
                        <h3 className="footer-heading">Follow us</h3>
                        <FooterSocials>
                            <li className="facebook"></li>
                            <li className="instagram"></li>
                            <li className="twitter"></li>
                            <li className="youtube"></li>
                        </FooterSocials>
                        <h3 className="footer-heading">Suscribe</h3>
                        <FooterSubscription>
                            <InputText type="text" />
                            <Button icon className="icon-play-white" />
                        </FooterSubscription>
                    </FooterCol>
                </FooterList>
                <FooterCopyrights>
                    <p>Stock-watch 2020 &copy; All rights reserved.</p>
                </FooterCopyrights>
            </Container>
        </FooterWrapper>
    );
}

export default Footer;
