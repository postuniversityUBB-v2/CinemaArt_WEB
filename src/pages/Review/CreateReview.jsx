import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles, FormControl, TextField, Grid, Button, RootRef, Backdrop, Typography } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, Slide } from '@material-ui/core';
import 'date-fns';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import withRoot from '../../components/withRoot';
import { postReview } from "../../api/api";
import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginRight: theme.spacing(33),
        marginBottom: theme.spacing(14),
        width: 560,
    },
    textField: {
        width: 560,
    },
    keyboardDatePicker: {
        width: 560,
    },
    dialogCreateReviewText: {
        color: "#f5c172",
        fontWeight: 700,
        fontSize: 20,
        marginBottom: 15,
        marginTop: 20,
        marginRight: 70,
        marginLeft: 70,
    },
    dialogCreateReviewNewReview: {
        height: 36,
        borderRadius: 9,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#f5c172",
        paddingRight: 55,
        paddingLeft: 55,
        marginLeft: 25,
        marginBottom: 35,
        letterSpacing: 0,
        minWidth: 180,
    },
    dialogCreateReviewBackToList: {
        height: 36,
        borderRadius: 9,
        backgroundColor: "#f5c172",
        color: "white",
        paddingRight: 50,
        paddingLeft: 50,
        marginBottom: 35,
        marginRight: 25,
        minWidth: 180,
        "&:hover": {
            height: 36,
            borderRadius: 9,
            backgroundColor: "#f5c172",
            color: "white",
            paddingRight: 50,
            paddingLeft: 50,
            marginBottom: 35,
            marginRight: 25,
            minWidth: 180,
        }
    },
    dialogBackToListTitle: {
        color: "#f5c172",
        fontWeight: 700,
        fontSize: 22,
        marginBottom: 15,
        marginTop: 20,
        marginLeft: 10,
    },
    dialogBackToListDescription: {
        color: "#3d3d29",
        fontWeight: "bolder",
        fontSize: 14,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
    },
    dialogCancelButton: {
        height: 36,
        borderRadius: 9,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#f5c172",
        paddingRight: 55,
        paddingLeft: 55,
        marginLeft: 45,
        marginBottom: 35,
    },
    dialogProceedButton: {
        height: 36,
        borderRadius: 9,
        backgroundColor: "#f5c172",
        color: "white",
        paddingRight: 50,
        paddingLeft: 50,
        marginRight: 45,
        marginBottom: 35,
        "&:hover": {
            height: 36,
            borderRadius: 9,
            backgroundColor: "#f5c172",
            color: "white",
            paddingRight: 50,
            paddingLeft: 50,
            marginRight: 45,
            marginBottom: 35,
        }
    },
    title:{
        color: theme.palette.warning.dark,
        paddingBottom: theme.spacing(14),
    }
}));

const CreateReview = () => {
    const domRef = useRef();
    const classes = useStyles();

	let movie = {};
	if (localStorage && localStorage.getItem('movie')) {
        movie = JSON.parse(localStorage.getItem('movie'));
	}

    const movieId = movie.id
    const movieTitle = movie.title;

    const SubmitButton = (props) => (<button {...props} type="submit" />);

    const [text, setText] = useState('');
    const [important, setImportant] = useState(false);

    const [openBackToList, isOpenBackToList] = useState(false);
    const [openCreateReview, isOpenCreateReview] = useState(false);

    const history = useHistory()
    const handleRedirectToListReviews = () => {
        localStorage.setItem('movie', JSON.stringify(movie));

        history.push({
            pathname: "/review/list",
            search: `?movie=${movieTitle}`,
        })
    }

    const handlePopUpBackToList = () => {
        isOpenBackToList(true);
    };

    const handleCloseBackToList = () => {
        isOpenBackToList(false);
    };

    const handleCloseCreateReview = () => {
        isOpenCreateReview(false);
    };

    const handleChangeText = (event) => {
        setText(event.target.value);
    };

    const handleChangeImportant = () => {
        setImportant(!important);
    };

    const handleReset = () => {
        setText('');
        setImportant('');
    }

    const { register, handleSubmit } = useForm();
    const onSubmit = (values, e) => {
        e.preventDefault();

        const payload = {
            ...values
        };
        payload.dateTime = new Date();
        payload.important = important === true ? true : false;

        try {
            postReview(movieId, payload);
            isOpenCreateReview(true);
        } catch (err) {
            return <Typography>Something went wrong...</Typography>
        }
    }

    return (
        <React.Fragment>
            <AppAppBar />
                <div className="createEntity">
                    <Typography variant="h4" className={classes.title}>Create Review for {movieTitle}</Typography>
                    <RootRef rootRef={domRef}>
                        <form onSubmit={handleSubmit(onSubmit)} autocomplete="off" noValidate>
                            <FormControl id="textForm" className={classes.formControl}>
                                <TextField
                                    id="text"
                                    type="text"
                                    multiline
                                    rowsMax={3}
                                    name="text"
                                    value={text}
                                    {...register("text")}
                                    onChange={handleChangeText}
                                    className={classes.textField}
                                    label="text"
                                    placeholder="text"
                                    InputLabelProps={{ shrink: true, }}
                                />
                            </FormControl>

                            
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        id="important"
                                        className={classes.important}
                                        name="important"
                                        defaultValue={important}
                                        {...register("important")}
                                        control={<Checkbox color="secondary" checked={important} onChange={handleChangeImportant}/>}
                                        label="Important"
                                        labelPlacement="end"
                                    />
                                </FormGroup>
                            </FormControl>

                            <Grid container spacing={1}>
                                <Grid container item xs={12} justify="center">
                                    <Button
                                        id="submitCreateReview"
                                        className="inactive-button"
                                        style={{backgroundColor: "#f5c172"}}
                                        component={SubmitButton}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        href="#"
                                    >
                                        Create Review
                                    </Button>
                                    <Backdrop open={openCreateReview} onClose={handleCloseCreateReview} elevation={18}>
                                        <Dialog
                                            open={openCreateReview}
                                            TransitionComponent={TransitionCreateReview}
                                            keepMounted
                                            aria-describedby="New review created!"
                                            disableBackdropClick
                                        >
                                            <DialogContent>
                                                <DialogContentText id="alertDialogDescriptionNewReview" className={classes.dialogCreateReviewText}>
                                                    New review successfully created!
                                            </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Grid container spacing={2}>
                                                    <Grid container item xs={6} justify="center">
                                                        <Button id="alertDialogButtonNewReviewForBacktoList"
                                                            className={classes.dialogCreateReviewNewReview}
                                                            onClick={() => {
                                                                handleReset();
                                                                handleCloseCreateReview();
                                                            }}
                                                            color="primary"
                                                        >
                                                            New review
                                                        </Button>
                                                    </Grid>
                                                    <Grid container item xs={6} justify="center">
                                                        <Button id="alertDialogButtonBackToListForBackToList"
                                                            className={classes.dialogCreateReviewBackToList}
                                                            onClick={handleRedirectToListReviews}
                                                            color="primary"
                                                        >
                                                            Back to List
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </DialogActions>
                                        </Dialog>
                                    </Backdrop>
                                </Grid>

                                <Grid container item xs={12} justify="center">
                                    <Button
                                        id="alertDialogButtonForCreateReview"
                                        className="reviewbackToList"
                                        style={{backgroundColor: "#f5c172"}}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={() => {
                                                text !== "" ? handlePopUpBackToList() : handleRedirectToListReviews()
                                            }
                                        }
                                    >
                                        Back to list
                                </Button>
                                    <Backdrop open={openBackToList} onClose={handleCloseBackToList} elevation={18}>
                                        <Dialog
                                            open={openBackToList}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={handleCloseBackToList}
                                            aria-labelledby="Confirmation"
                                            aria-describedby="Do you want to save changes to this document before closing?"
                                            disableBackdropClick
                                        >
                                            <DialogContent>
                                                <DialogContentText id="alertdDialogTitleBackToList" className={classes.dialogBackToListTitle}>
                                                    Confirmation
                                            </DialogContentText>
                                                <DialogContentText id="alertDialogDescriptionBackToList" className={classes.dialogBackToListDescription}>
                                                    <p>Do you want to save changes to this document before closing?</p>
                                                    <p>Unsaved changes will be lost.</p>
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Grid container spacing={2}>
                                                    <Grid container item xs={6} justify="center">
                                                        <Button id="alertDialogButtonCancelForCreatReview"
                                                            className={classes.dialogCancelButton}
                                                            onClick={handleCloseBackToList}
                                                            color="primary"
                                                        >
                                                            Cancel
                                                    </Button>
                                                    </Grid>
                                                    <Grid container item xs={6} justify="center">
                                                        <Button
                                                            id="alertDialogButtonProceedForCreateReview"
                                                            className={classes.dialogProceedButton}
                                                            onClick={handleRedirectToListReviews}
                                                            color="primary"
                                                        >
                                                            Proceed
                                                    </Button>
                                                    </Grid>
                                                </Grid>
                                            </DialogActions>
                                        </Dialog>
                                    </Backdrop>
                                </Grid>
                            </Grid>
                        </form>
                    </RootRef>
                </div>
            <AppFooter />
        </React.Fragment>
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TransitionCreateReview = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default withRoot(CreateReview);
