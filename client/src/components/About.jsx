import React from "react";
import { FormattedMessage } from 'react-intl'

export function About() {
    return (
        <div className="about">
            <div className="container">
                <div className="register">
                    <h1 className="register__title"><FormattedMessage id="app.about-us" defaultMessage="About Us"/></h1>
                </div>

                <div className="about__description">
                    <h3 className="about__title first"><FormattedMessage id="app.description" defaultMessage="Description"/></h3>
                    <p><FormattedMessage id="app.this-project" defaultMessage="This project is an E-commerce for coding bootcamp with the following design and development features:"/>
                        
                        <ul>
                            <li><span>✔️</span><FormattedMessage id="app.basic" defaultMessage="Basic features of e-commerce project like: (CRUD of products, authentication, shop, checkout, etc)."/></li>
                            <li><span>✔️</span><FormattedMessage id="app.platforms-payment" defaultMessage="Payments platform integration (Mercado Pago) for orders pays."/></li>
                            <li><span>✔️</span><FormattedMessage id="app.sendgrid" defaultMessage="Emails notifications for Orders and Payments Status (Sendgrid API)."/></li>
                            <li><span>✔️</span><FormattedMessage id="app.security" defaultMessage="2FA (Two Factor Authentication) Security option for user with verification code send via Email (Sendgrid API)."/></li>
                            <li><span>✔️</span><FormattedMessage id="app.google" defaultMessage="Google Authentication for register and login on website."/></li>
                            <li><span>✔️</span><FormattedMessage id="app.management" defaultMessage="Management of Orders, Physical Shop Stores, Products to sell and Products stock."/></li>
                            <li><span>✔️</span><FormattedMessage id="app.management-users" defaultMessage="Management of Users, posibility of granting admin permisions, force password resets, edit account data."/></li>
                            <li><span>✔️</span><FormattedMessage id="app.discounts-deals" defaultMessage="Discounts deals system based on weekdays and product categories."/></li>
                        </ul>
                    </p>
                </div>

                    <h3 className="about__title"><FormattedMessage id="app.technologies" defaultMessage="Technologies"/></h3>

                    <div className="about__tecnologies">
                        <div className="frontend">
                            <h5 className="about__subtitle">Frontend</h5>
                            <ul>
                                <li>HTML 5</li>
                                <li>CSS 3</li>
                                <li>Javascript</li>
                                <li>ReactJS</li>
                                <li>Redux</li>
                                <li>SASS</li>
                                <li>UI/UX Material</li>
                                <li>Google Maps React</li>
                                <li>LocalStorage</li>
                                <li>SessionStorage</li>
                            </ul>
                        </div>

                        <div className="backend">
                            <h5 className="about__subtitle">Backend</h5>
                            <ul>
                                <li>NodeJS</li>
                                <li>Express</li>
                                <li>Sequelize</li>
                                <li>Google Auth Library</li>
                                <li>JSON Web Token</li>
                                <li>Mercado Pago Integration</li>
                            </ul>
                        </div>

                        <div className="db">
                            <h5 className="about__subtitle">Database</h5>
                            <ul>
                                <li>PostgreSQL</li>
                            </ul>
                        </div>

                        <div className="deploy">
                            <h5 className="about__subtitle">Deploy</h5>
                            <ul>
                                <li>Vercel</li>
                                <li>Heroku</li>
                            </ul>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default About;