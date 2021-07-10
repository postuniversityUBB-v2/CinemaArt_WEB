import withRoot from '../../components/withRoot';
import React, {useState} from 'react';
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
                Image: '/style/images/movies_23.jpg'
            },
            {
                Name: "",
                Image: '/style/images/movies_22.jpg'
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
                                        Movie
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Type of visual communication which uses moving pictures and sound to tell stories or teach people something.
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Most people watch (view) movies as a type of entertainment or a way to have fun. For some people, fun movies can mean movies that make them laugh, while for others it can mean movies that make them cry, or feel afraid. 
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
                                        Genre
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Type of movie or a style of movie. Movies can be fictional (made up), or documentary (showing 'real life'), or a mix of the two.
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Although hundreds of movies are made every year, there are very few that do not follow a small number of set plots, or stories. Some movies mix together two or more genres. 
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