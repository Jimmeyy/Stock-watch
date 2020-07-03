import React from 'react';
import { Container, Button, InputText } from 'components/common';
import { FooterWrapper, FooterList, FooterCol, FooterCopyrights, FooterSocials, FooterSubscription } from './Footer.style';

function Footer() {
    return (
        <FooterWrapper>
            <Container>
                <FooterList>
                    <FooterCol>
                        <ul>
                            <li className="footer-heading">Stocks</li>
                            <li>Aapl</li>
                            <li>Msft</li>
                            <li>Amzn</li>
                            <li>Goog</li>
                            <li>Baba</li>
                        </ul>
                    </FooterCol>
                    <FooterCol>
                        <ul>
                            <li className="footer-heading">Forex</li>
                            <li>EurUsd</li>
                            <li>GbpUsd</li>
                            <li>NzdUsd</li>
                            <li>AudUsd</li>
                            <li>UsdJpy</li>
                        </ul>
                    </FooterCol>
                    <FooterCol>
                        <ul>
                            <li className="footer-heading">Crypto</li>
                            <li>Bitcoin</li>
                            <li>Ethereum</li>
                            <li>XRP</li>
                            <li>Tether</li>
                            <li>Litecoin</li>
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
