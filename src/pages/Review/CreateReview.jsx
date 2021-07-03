import withRoot from '../../components/withRoot';
import React, { useState, useRef, useEffect } from 'react';
import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles, FormControl, TextField, Grid, Button, RootRef, Backdrop, Typography } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, Slide, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { postReview } from "../../api/api";
import SelectUsers from '../../components/form/SelectUsers';

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
    dialogCreateTaskText: {
        color: "#f5c172",
        fontWeight: 700,
        fontSize: 20,
        marginBottom: 15,
        marginTop: 20,
        marginRight: 70,
        marginLeft: 70,
    },
    dialogCreateTaskNewTask: {
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
    dialogCreateTaskBackToList: {
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

const CreateTask = () => {
    const domRef = useRef();
    const classes = useStyles();

	let movie = {};
	if (localStorage && localStorage.getItem('movie')) {
        movie = JSON.parse(localStorage.getItem('movie'));
	}

    useEffect(() => {
        console.log("movie", movie);
    }, []);
    const movieId = movie.id
    const movieTitle = movie.title;

    const SubmitButton = (props) => (<button {...props} type="submit" />);

    const [text, setText] = useState('');
    const [important, setImportant] = useState(false);

    const [openBackToList, isOpenBackToList] = useState(false);
    const [openCreateTask, isOpenCreateTask] = useState(false);

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

    const handleCloseCreateTask = () => {
        isOpenCreateTask(false);
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
            isOpenCreateTask(true);
        } catch (err) {
            console.log(err);
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
                                id="submitCreateTask"
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
                            <Backdrop open={openCreateTask} onClose={handleCloseCreateTask} elevation={18}>
                                <Dialog
                                    open={openCreateTask}
                                    TransitionComponent={TransitionCreateTask}
                                    keepMounted
                                    aria-describedby="New task created!"
                                    disableBackdropClick
                                >
                                    <DialogContent>
                                        <DialogContentText id="alertDialogDescriptionNewTask" className={classes.dialogCreateTaskText}>
                                            New review successfully created!
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Grid container spacing={2}>
                                            <Grid container item xs={6} justify="center">
                                                <Button id="alertDialogButtonNewTaskForBacktoList"
                                                    className={classes.dialogCreateTaskNewTask}
                                                    onClick={() => {
                                                        handleReset();
                                                        handleCloseCreateTask();
                                                    }}
                                                    color="primary"
                                                >
                                                    New review
                                                </Button>
                                            </Grid>
                                            <Grid container item xs={6} justify="center">
                                                <Button id="alertDialogButtonBackToListForBackToList"
                                                    className={classes.dialogCreateTaskBackToList}
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
                                id="alertDialogButtonForCreateTask"
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
                                                <Button id="alertDialogButtonCancelForCreatTask"
                                                    className={classes.dialogCancelButton}
                                                    onClick={handleCloseBackToList}
                                                    color="primary"
                                                >
                                                    Cancel
                                            </Button>
                                            </Grid>
                                            <Grid container item xs={6} justify="center">
                                                <Button
                                                    id="alertDialogButtonProceedForCreateTask"
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

function formatDate(dateString) {
    if (dateString === "") {
        return dateString;
    };

    const dateArray = dateString.split("/");
    const [day, month, year] = dateArray;
    const newDate = new Date(year, month - 1, day);

    const moment = require('moment');
    const newDateFormat = moment(newDate).format('YYYY-MM-DD');
    return newDateFormat;
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TransitionCreateTask = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default withRoot(CreateTask);
