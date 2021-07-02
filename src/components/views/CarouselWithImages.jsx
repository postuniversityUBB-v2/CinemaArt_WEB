import React from 'react';
import Carousel from "react-material-ui-carousel"
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import '../../styles/Carousel.scss';

const useStyles = makeStyles((theme) => ({
    // root: {
    //     backgroundColor: theme.palette.secondary.light,
    // },
    button: {
        minWidth: 175,
    },
}));

const Banner = (props) => {
    const classes = useStyles();
    const contentPosition = props.contentPosition ? props.contentPosition : "left"
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;

    let items = [];
    const content = (
        <Grid item xs={12 / totalItems} key="content">
            <CardContent className="Content">
                <Typography className="Title">
                    {props.item.Name}
                </Typography>

                <Typography className="Caption">
                    {props.item.Caption}
                </Typography>

                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    className={classes.button}
                    component="a"
                    href="/about"
                >
                    About
                </Button>
            </CardContent>
        </Grid>
    )


    for (let i = 0; i < mediaLength; i++) {
        const item = props.item.Items[i];

        const media = (
            <Grid item xs={12 / totalItems} key={item.Image}>
                <CardMedia
                    className="Media"
                    image={item.Image}
                    title={item.Name}
                >
                    <Typography className="MediaCaption">
                        {item.Name}
                    </Typography>
                </CardMedia>
            </Grid>
        )

        items.push(media);
    }

    if (contentPosition === "left") {
        items.unshift(content);
    } else if (contentPosition === "right") {
        items.push(content);
    } else if (contentPosition === "middle") {
        items.splice(items.length / 2, 0, content);
    }

    return (
        <Card raised className="Banner">
            <Grid container spacing={0} className="BannerGrid">
                {items}
            </Grid>
        </Card>
    )
}

const items = [
    {
        Name: "Just Watch Movies",
        Caption: "",
        contentPosition: "left",
        Items: [
            {
                Name: "",
                Image: '/style/images/cinema_7.jpg'
            },
            {
                Name: "",
                Image: '/style/images/cinema_4.jpg'
            }
        ]
    },
    {
        Name: "Just Watch Movies",
        Caption: "",
        contentPosition: "middle",
        Items: [
            {
                Name: "",
                Image: '/style/images/cinema_2.jpg'
            },
            {
                Name: "",
                Image: '/style/images/cinema_3.jpg'
            }
        ]
    },
    {
        Name: "Welcome!",
        Caption: "",
        contentPosition: "right",
        Items: [
            {
                Name: "",
                Image: '/style/images/popcorn.jpg'
            },
            {
                Name: "",
                Image: '/style/images/cinema.jpg'
            }
        ]
    }
]

function CarouselWithImages() {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{ color: "#494949" }}>
            <Carousel
                autoPlay={true}
                animation={"slide"}
                indicators={true}
                timeout={400}
                cycleNavigation={true}
                navButtonsAlwaysVisible={false}
                navButtonsAlwaysInvisible={true}

            >
                {
                    items.map((item, index) => {
                        return <Banner item={item} key={index + item.Name} contentPosition={item.contentPosition} />
                    })
                }
            </Carousel>
        </div>
    )
}

export default CarouselWithImages;