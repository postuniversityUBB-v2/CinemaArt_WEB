import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ProductHeroLayout from './ProductHeroLayout';
import CarouselWithImages from '../views/CarouselWithImages';

const styles = (theme) => ({
    background: {
        backgroundColor: theme.palette.secondary.light,
        backgroundPosition: 'center',
    },
});

function ProductHero(props) {
    const { classes } = props;

    return (
        <ProductHeroLayout backgroundClassName={classes.background}>
            <CarouselWithImages />
        </ProductHeroLayout>
    );
}

ProductHero.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
