import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CarouselLayout from './CarouselLayout';
import CarouselWithImages from './CarouselWithImages';

const styles = (theme) => ({
    background: {
        backgroundColor: theme.palette.secondary.light,
        backgroundPosition: 'center',
    },
});

function Carousel(props) {
    const { classes } = props;

    return (
        <CarouselLayout backgroundClassName={classes.background}>
            <CarouselWithImages />
        </CarouselLayout>
    );
}

Carousel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Carousel);
