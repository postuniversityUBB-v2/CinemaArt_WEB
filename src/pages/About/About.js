import withRoot from '../../components/withRoot';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        height: 440,
    },
    title: {
        marginBottom: 30
    }
}));

function About() {
    const classes = useStyles();
    const items =
    {
        Name: "Welcome!",
        Caption: "",
        contentPosition: "right",
        Items: [
            {
                Name: "",
                Image: '/style/images/passion.jpg'
            },
            {
                Name: "",
                Image: '/style/images/teamwork.jpg'
            }
        ]
    };
    console.log("items.Items[1].Image", items.Items[1].Image);
    return (
        <React.Fragment>
            <AppAppBar />
            <div className={classes.root}>
                <Grid container spacing={3} style={{ padding: "60px 60px" }}>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="subtitle1" component="h2" color="primary">
                                        The power of teamwork
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Behind every great human achievement, there is a team.
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        From medicine and space travel, to disaster response and pizza deliveries, our products help teams all over the planet advance humanity through the power of software.
                                        Our mission is to help unleash the potential of every team.
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    className={classes.media}
                                    image={items.Items[1].Image}
                                >
                                </CardMedia>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="subtitle1" component="h2" color="primary">
                                        Values to live by
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Our unique values describe, at the most fundamental level, what we stand for.
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        These five values shape our culture, influence who we are, what we do, and even who we hire. They're hard-wired into our DNA and will stay the same as we continue to grow.
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    className={classes.media}
                                    image={items.Items[0].Image}
                                >
                                </CardMedia>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <AppFooter />
        </React.Fragment >
    );
}


export default withRoot(About);