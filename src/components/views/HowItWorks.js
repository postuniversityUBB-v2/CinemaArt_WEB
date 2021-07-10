import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';

const styles = (theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.secondary.light,
        overflow: 'hidden',
    },
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(15),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
    },
    title: {
        marginBottom: theme.spacing(14),
    },
    number: {
        fontSize: 24,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightMedium,
    },
    image: {
        height: 55,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    curvyLines: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
        opacity: 0.7,
    },
    button: {
        marginTop: theme.spacing(8),
        backgroundColor: theme.palette.warning.light,
        marginRight: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.warning.dark,
        },
    },
});

function HowItWorks(props) {
    const { classes } = props;

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <img
                    src="/style/images/productCurvyLines.png"
                    className={classes.curvyLines}
                    alt="curvy lines"
                />
                <Typography variant="h4" marked="center" className={classes.title} component="h2">
                    How it works
                </Typography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>1.</div>
                                <img
                                    src="/style/images/productHowItWorks1.svg"
                                    alt="suitcase"
                                    className={classes.image}
                                />
                                <Typography variant="h5" align="center">
                                    Register to have access to movies details and reviews.
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>2.</div>
                                <img
                                    src="/style/images/productHowItWorks2.svg"
                                    alt="graph"
                                    className={classes.image}
                                />
                                <Typography variant="h5" align="center">
                                    Start watching best movies.
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>3.</div>
                                <img
                                    src="/style/images/productHowItWorks3.svg"
                                    alt="clock"
                                    className={classes.image}
                                />
                                <Typography variant="h5" align="center">
                                    {'New movies every week. New experiences, new surprises. '}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                {user !== null
                ? 
                    <Button
                        size="large"
                        variant="contained"
                        className={classes.button}
                        component="a"
                        href="/movie/list"
                    >
                        View Movies
                    </Button>
                :                 
                    <Button
                        size="large"
                        variant="contained"
                        className={classes.button}
                        component="a"
                        href="/signUp"
                    >
                        Get started
                    </Button>
                }

            </Container>
        </section>
    );
}

HowItWorks.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HowItWorks);
