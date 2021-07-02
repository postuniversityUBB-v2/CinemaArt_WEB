import withRoot from '../../components/withRoot';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { makeStyles, FormControl, TextField, Grid, Button, RootRef, Backdrop, MenuItem, Typography } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, Slide } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import { editMovie } from "../../api/api";
import { MovieRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginRight: theme.spacing(33),
        marginBottom: theme.spacing(14),
        width: 200,
    },
    textField : {
        width: 240,
    },
    keyboardDatePicker: {
        width: 240,
    },
    dialogEditProjectText: {
        color: "black",
        fontWeight: 700,
        fontSize: 20,
        marginBottom: 15,
        marginTop: 20,
        marginRight: 70,
        marginLeft: 97,
        minWidth: 333,
    },
    dialogEditProjectEditProject: {
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
        minWidth: 200,
    },
    dialogEditProjectBackToList: {
        height: 36,
        borderRadius: 9,
        backgroundColor: "#384A9C",
        color: "white",
        paddingRight: 50,
        paddingLeft: 50,
        marginBottom: 35,
        marginRight: 25,
        minWidth: 180,
        "&:hover": {
            height: 36,
            borderRadius: 9,
            backgroundColor: "#384A9C",
            color: "white",
            paddingRight: 50,
            paddingLeft: 50,
            marginBottom: 35,
            marginRight: 25,
            minWidth: 180,
        }
    },
    dialogBackToListTitle: {
        color: "#384A9C",
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
        borderColor: "#384A9C",
        paddingRight: 55,
        paddingLeft: 55,
        marginLeft: 45,
        marginBottom: 35,
    },
    dialogProceedButton: {
        height: 36,
        borderRadius: 9,
        backgroundColor: "#384A9C",
        color: "white",
        paddingRight: 50,
        paddingLeft: 50,
        marginRight: 45,
        marginBottom: 35,
        "&:hover": {
            height: 36,
            borderRadius: 9,
            backgroundColor: "#384A9C",
            color: "white",
            paddingRight: 50,
            paddingLeft: 50,
            marginRight: 45,
            marginBottom: 35,
        }
    },
    title:{
        color: theme.palette.warning.dark,
        paddingBottom: theme.spacing(6),
    }
}));

const EditProject = () => {
    const domRef = useRef();
    const classes = useStyles();

    let movie = {};
	if (localStorage && localStorage.getItem('movie')) {
	   movie = JSON.parse(localStorage.getItem('movie'));
	}
    
    const SubmitButton = (props) => ( <button {...props} type="submit" />);

    const movieGenre = ['Action', 'Documentary', 'Biography', 'Comedy', 'Adventure', 'Horror', 'History', 'SciFi', 'Animation', 'Thriller', 'Romance', 'Musical'];
    const [title, setTitle] = useState(movie.title);
    const [genre, setGenre] = useState(movie.genre);
    const [description, setDescription] = useState(movie.description);
    const [durationInMinutes, setDurationInMinutes] = useState(movie.durationInMinutes);
    const [yearOfRelease, setYearOfRelease] = useState(movie.yearOfRelease);
    const [director, setDirector] = useState(movie.director);
    const [rating, setRating] = useState(movie.rating);
    const [watched, setWatched] = useState(movie.watched === true ? true : false);
    
    const [openBackToList, isOpenBackToList] = useState(false);
    const [openEditProject, isOpenEditProject] = useState(false);

    const handleClickOpenBackToList = () => {
        window.open('./list','_self');
    };

    const handleCloseBackToList = () => {
        isOpenBackToList(false);
    };

    const handleCloseEditProject = () => {
        isOpenEditProject(false);
    };

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleChangeGenre = (event) => {
        setGenre(event.target.value);
    };

    const handleChangeDurationInMinutes = (event) => {
        setDurationInMinutes(event.target.value);
    };

    const handleChangeYearOfRelease = (year) => {
        setYearOfRelease(year);
    };

    const handleChangeDirector = (event) => {
        setDirector(event.target.value);
    };

    const handleChangeRating = (event) => {
        setRating(event.target.value);
    };

    const handleChangeWatched = () => {
        setWatched(!watched);
    };

    const handleReset = () => {
        setTitle(movie.title);
        setGenre(movie.genre);
        setDescription(movie.description);
    }

    const { register, handleSubmit } = useForm();
    const onSubmit = (values, e) => {
        e.preventDefault();
		const payload = {
			dateAdded: movie.dateAdded ,
			description: description,
            director: director,
            durationInMinutes: durationInMinutes,
			genre: genre,
            rating: rating,
			title: title,
			yearOfRelease: yearOfRelease,
            watched: watched === true ? true : false,
		}
        try {
            editMovie(movie.id, payload);
            console.log("🚀 ~ file: EditMovie.js ~ line 193");
            isOpenEditProject(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            <AppAppBar />
                <div className="createEntity">
                    <Typography variant="h4" className={classes.title}>Edit {movie.title}</Typography>
                    <RootRef rootRef={domRef}>
                        <form onSubmit={handleSubmit(onSubmit)} autocomplete="off" noValidate>
                            <FormControl id="titleForm" className={classes.formControl}>
                                <TextField
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={title}
                                    {...register("title")}
                                    onChange={handleChangeTitle}
                                    className={classes.textField}
                                    label="Title"
                                    placeholder="Title"
                                    InputLabelProps={{shrink: true,}}
                                />
                            </FormControl>

                            <FormControl id="genreForm" className={classes.formControl}>                    
                                <TextField
                                    id="genre"
                                    type="text"
                                    name="genre"
                                    {...register("genre")}
                                    select
                                    label="Genre"
                                    value={genre}
                                    onChange={handleChangeGenre}    
                                    className={classes.textField}                    
                                    placeholder="Genre"
                                    InputLabelProps={{shrink: true,}}
                                    inputProps={{ "data-testid": "genre" }}
                                >
                                    {movieGenre.map((genre, index) => (
                                        <MenuItem key={index} value={genre}>
                                            {genre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>

                            <FormControl id="descriptionForm" className={classes.formControl}>
                                <TextField
                                    id="description"
                                    type="text"
                                    multiline
                                    rowsMax={3}
                                    name="description"
                                    value ={description}
                                    {...register("description")}
                                    onChange={handleChangeDescription}
                                    className={classes.textField}
                                    label="Description"
                                    placeholder="Description"
                                    InputLabelProps={{shrink: true,}}
                                />
                            </FormControl>

                            <TextField
                                id="durationInMinutes"
                                name="durationInMinutes"
                                label="Duration in Minutes"
                                value={durationInMinutes}
                                {...register("durationInMinutes")}
                                onChange={handleChangeDurationInMinutes}
                                inputProps={{ min: "1", max: "600", step: "1" }}
                                placeholder="Duration in Minutes"
                                type="number"
                                InputLabelProps={{shrink: true,}}
                            />

                            <FormControl id="directorForm" className={classes.formControl}>
                                <TextField
                                    id="director"
                                    type="text"
                                    name="director"
                                    value={director}
                                    {...register("director")}
                                    onChange={handleChangeDirector}
                                    className={classes.textField}
                                    label="Director"
                                    placeholder="Director"
                                    InputLabelProps={{shrink: true,}}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>                            
                                <TextField
                                    id="rating"
                                    name="rating"
                                    label="Rating"
                                    value={rating}
                                    {...register("rating")}
                                    onChange={handleChangeRating}
                                    inputProps={{ min: "1", max: "10", step: "0.1" }}
                                    placeholder="Rating"
                                    type="number"
                                    InputLabelProps={{shrink: true,}}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        id="yearOfRelease"
                                        name="yearOfRelease"
                                        value={yearOfRelease}
                                        views={['year']}
                                        {...register("yearOfRelease")}
                                        onChange={date => handleChangeYearOfRelease(date)}
                                        className={classes.keyboardDatePicker}
                                        format="yyyy"
                                        KeyboardButtonProps={{
                                            'aria-label': 'yearOfRelease',
                                        }}
                                        label="Year of Release"
                                        placeholder="Year of Release   yyyy"
                                        InputLabelProps={{shrink: true,}}
                                        autoOk={true}
                                        inputProps={{ "data-testid": "yearOfRelease" }}
                                    />
                                </MuiPickersUtilsProvider>
                            </FormControl>

                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        id="watched"
                                        className={classes.watched}
                                        name="watched"
                                        value={watched}
                                        {...register("watched")}
                                        control={<Checkbox color="secondary" checked={watched} onChange={handleChangeWatched}/>}
                                        label="Watched"
                                        labelPlacement="end"
                                    />
                                </FormGroup>
                            </FormControl>

                            <Grid container spacing={1}>
                                <Grid container item xs={12} justify="center">
                                    <Button
                                        id="submitEditProject"
                                        className="inactive-button"
                                        style={{backgroundColor: "#f5c172"}}
                                        component={SubmitButton}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        href="#"
                                    >
                                        Edit Movie
                                    </Button>
                                    <Backdrop open={openEditProject} onClose={handleCloseEditProject} elevation={18}>
                                        <Dialog
                                            open={openEditProject}
                                            TransitionComponent={TransitionEditProject}
                                            keepMounted
                                            aria-describedby="Movie edited!"
                                            disableBackdropClick
                                        >
                                            <DialogContent>
                                                <DialogContentText id="alertDialogDescriptionEditProject" className={classes.dialogEditProjectText}>
                                                    Movie successfully edited!
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Grid container spacing={2}>
                                                        <Grid container item xs={6} justify="center">
                                                            <Button id="alertDialogButtonEditProjectForBacktoList"
                                                                    className={classes.dialogEditProjectEditProject}
                                                                    onClick={() => {
                                                                        handleReset();
                                                                        handleCloseEditProject();
                                                                    }}
                                                                    color="primary"
                                                            >
                                                                Edit movie
                                                            </Button>
                                                        </Grid>
                                                        <Grid container item xs={6} justify="center">
                                                            <Button id="alertDialogButtonBackToListForBackToList"
                                                                    className={classes.dialogEditProjectBackToList}
                                                                    style={{backgroundColor: "#f5c172"}}
                                                                    href="./list"
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
                                        id="alertDialogButtonForEditProject"
                                        className="backToList"
                                        style={{backgroundColor: "#f5c172"}}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={handleClickOpenBackToList}
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
                                                        <Button id="alertDialogButtonCancelForEditProject"
                                                                className={classes.dialogCancelButton}
                                                                onClick={handleCloseBackToList}
                                                                color="primary"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </Grid>
                                                    <Grid container item xs={6} justify="center">
                                                        <Button
                                                            id="alertDialogButtonProceedForEditProject"
                                                            className={classes.dialogProceedButton}
                                                            href="./list"
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
    const newDate =  new Date(year, month-1, day);

    const moment = require('moment');
    const newDateFormat = moment(newDate).format('YYYY-MM-DD');
    return newDateFormat;
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TransitionEditProject = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default withRoot(EditProject);
