import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const styles = (theme) => ({
    root: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
    },
    images: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexWrap: 'wrap',
    },
    imageWrapper: {
        position: 'relative',
        display: 'block',
        padding: 0,
        borderRadius: 0,
        height: '40vh',
        [theme.breakpoints.down('sm')]: {
            width: '100% !important',
            height: 100,
        },
        '&:hover': {
            zIndex: 1,
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15,
        },
        '&:hover $imageMarked': {
            opacity: 0,
        },
        '&:hover $imageTitle': {
            border: '4px solid currentColor',
        },
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: theme.palette.common.black,
        opacity: 0.5,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        background: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

function MovieGenre(props) {
    const { classes } = props;

    const images = [
        {
            url:
                '/style/images/cinema_8.jpg',
            title: 'Biography',
            width: '40%',
        },
        {
            url:
                '/style/images/cinema_11.jpg',
            title: 'Horror',
            width: '20%',
        },
        {
            url:
                '/style/images/cinema_9.jpg',
            title: 'Action',
            width: '40%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=400&q=80',
            title: 'History',
            width: '38%',
        },
        {
            url:
                '/style/images/cinema_10.jpg',
            title: 'Comedy',
            width: '38%',
        },
        {
            url:
                '/style/images/cinema_13.jpg',
            title: 'Musical',
            width: '24%',
        },
        {
            url:
                '/style/images/cinema_12.jpg',
            title: 'Romance',
            width: '40%',
        },
        {
            url:
                '/style/images/cinema_14.jpg',
            title: 'Adventure',
            width: '20%',
        },
        {
            url:
                '/style/images/cinema_5.jpg',
            title: 'Thriller',
            width: '40%',
        },
    ];

    return (
        <Container className={classes.root} component="section">
            <Typography variant="h4" marked="center" align="center" component="h2">
                Art, culture and movies come together
            </Typography>
            <div className={classes.images}>
                {images.map((image) => (
                    <ButtonBase
                        href="/about"
                        key={image.title}
                        className={classes.imageWrapper}
                        style={{
                            width: image.width,
                        }}
                    >
                        <div
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <div className={classes.imageBackdrop} />
                        <div className={classes.imageButton}>
                            <Typography
                                component="h3"
                                variant="h6"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                {image.title}
                                <div className={classes.imageMarked} />
                            </Typography>
                        </div>
                    </ButtonBase>
                ))}
            </div>
        </Container>
    );
}

MovieGenre.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieGenre);