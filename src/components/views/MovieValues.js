import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const styles = (theme) => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: theme.palette.secondary.light,
    },
    container: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(30),
        display: 'flex',
        position: 'relative',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
    },
    image: {
        height: 55,
    },
    title: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    curvyLines: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
    },
});

function MovieValues(props) {
    const { classes } = props;

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <img
                    src="/style/images/productCurvyLines.png"
                    className={classes.curvyLines}
                    alt="curvy lines"
                />
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="/style/images/productValues1.svg"
                                alt="suitcase"
                            />
                            <Typography variant="h6" className={classes.title}>
                                The best movies
                            </Typography>
                            <Typography variant="h5">
                                {'A selection of the best movies. '}
                                {'Get the latest news from leading industry trades'}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="/style/images/productValues2.svg"
                                alt="graph"
                            />
                            <Typography variant="h6" className={classes.title}>
                                New experiences
                            </Typography>
                            <Typography variant="h5">
                                {'Explore Movies & TV shows. '}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="/style/images/productValues3.svg"
                                alt="clock"
                            />
                            <Typography variant="h6" className={classes.title}>
                                Just Watch Premium
                            </Typography>
                            <Typography variant="h5">
                                {'The essential resource for entertainment proffesionals. '}
                                {'24x7 Premium Support, and more.'}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}

MovieValues.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieValues);
