import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = (theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.common.white,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            height: '80vh',
            minHeight: 500,
            maxHeight: 1300,
        },
    },
    container: {
        // marginTop: theme.spacing(3),
        // marginBottom: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.5,
        zIndex: -1,
    },
    // background: {
    //     position: 'absolute',
    //     left: 0,
    //     right: 0,
    //     top: 0,
    //     bottom: 0,
    //     backgroundColor: theme.palette.secondary.light,
    //     backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //     zIndex: -2,
    // },
    arrowDown: {
        position: 'absolute',
        bottom: theme.spacing(4),
    },
});

function CarouselLayout(props) {
    const { backgroundClassName, children, classes } = props;

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                {/* <img
                    src="/style/images/productHeroWonder.png"
                    alt="wonder"
                    width="147"
                    height="80"
                /> */}
                {children}
                <div className={classes.backdrop} />
                <div className={clsx(classes.background, backgroundClassName)} />
                <img
                    className={classes.arrowDown}
                    src="/style/images/productHeroArrowDown.png"
                    height="16"
                    width="12"
                    alt="arrow down"
                />
            </Container>
        </section>
    );
}

CarouselLayout.propTypes = {
    backgroundClassName: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarouselLayout);