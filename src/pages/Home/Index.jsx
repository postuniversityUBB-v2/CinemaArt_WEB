import React from 'react';
import withRoot from '../../components/withRoot';
import MovieGenre from '../../components/views/MovieGenre';
import ContactUs from '../../components/views/ContactUs';
import AppFooter from '../../components/views/AppFooter';
import Carousel from '../../components/views/Carousel';
import MovieValues from '../../components/views/MovieValues';
import HowItWorks from '../../components/views/HowItWorks';
import MovieOffers from '../../components/views/MovieOffers';
import AppAppBar from '../../components/views/AppAppBar';

const Index = () => {
    return (
        <React.Fragment>
            <AppAppBar />
            <Carousel />
            <MovieValues />
            <MovieGenre />
            <HowItWorks />
            <MovieOffers />
            <ContactUs />
            <AppFooter />
        </React.Fragment>
    );
}

export default withRoot(Index);
