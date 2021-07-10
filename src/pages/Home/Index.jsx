import React from 'react';
import withRoot from '../../components/withRoot';
import ProductCategories from '../../components/views/MovieGenre';
import ProductSmokingHero from '../../components/views/ContactUs';
import AppFooter from '../../components/views/AppFooter';
import ProductHero from '../../components/views/Carousel';
import ProductValues from '../../components/views/MovieValues';
import ProductHowItWorks from '../../components/views/HowItWorks';
import ProductCTA from '../../components/views/MovieOffers';
import AppAppBar from '../../components/views/AppAppBar';

const Index = () => {
    return (
        <React.Fragment>
            <AppAppBar />
            <ProductHero />
            <ProductValues />
            <ProductCategories />
            <ProductHowItWorks />
            <ProductCTA />
            <ProductSmokingHero />
            <AppFooter />
        </React.Fragment>
    );
}

export default withRoot(Index);
