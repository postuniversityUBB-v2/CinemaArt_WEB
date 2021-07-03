import withRoot from '../../components/withRoot';
import React, { useState, useRef } from 'react';
import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import { useForm } from "react-hook-form";
import { makeStyles, FormControl, TextField, Grid, Button, RootRef, Backdrop, MenuItem, Typography } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, Slide } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { postMovies } from "../../api/api";

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
    dialogCreateProjectText: {
        color: "black",
        fontWeight: 700,
        fontSize: 20,
        marginBottom: 15,
        marginTop: 20,
        marginRight: 70,
        marginLeft: 70,
    },
    dialogCreateProjectNewProject: {
        height: 36,
        borderRadius: 9,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#f5c172",
        paddingRight: 50,
        paddingLeft: 50,
        marginLeft: 25,
        marginBottom: 35,
        letterSpacing: 0,
        minWidth: 180,
    },
    dialogCreateProjectBackToList: {
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
        paddingBottom: theme.spacing(6),
    }
}));

const CreateProject = () => {
    const domRef = useRef();
    const classes = useStyles();

    const SubmitButton = (props) => ( <button {...props} type="submit" />);

    const movieGenre = ['Action', 'Documentary', 'Biography', 'Comedy', 'Adventure', 'Horror', 'History', 'SciFi', 'Animation', 'Thriller', 'Romance', 'Musical'];
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [durationInMinutes, setDurationInMinutes] = useState(1);
    const [yearOfRelease, setYearOfRelease] = useState(null);
    const [director, setDirector] = useState('');
    const [rating, setRating] = useState(1);
    const [watched, setWatched] = useState(false);
    
    const [openBackToList, isOpenBackToList] = useState(false);
    const [openCreateProject, isOpenCreateProject] = useState(false);

    const handlePopUpBackToList = () => {
        isOpenBackToList(true);
    };

    const handleClickOpenBackToList = () => {
        window.open('./list','_self');
    };

    const handleCloseBackToList = () => {
        isOpenBackToList(false);
    };

    const handleCloseCreateProject = () => {
        isOpenCreateProject(false);
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
        setTitle('');
        setGenre('');
        setDescription('');
    }

    const { register, handleSubmit } = useForm();
    const onSubmit = (values, e) => {
        e.preventDefault();
        const payload = {
            ...values
        };
        payload.dateAdded = new Date();
        payload.watched = watched === true ? true : false;
        console.log(payload);

        try {
            postMovies(payload);
            isOpenCreateProject(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            <AppAppBar />
                <div className="createEntity">
                    <Typography variant="h4" className={classes.title}>Create Movie</Typography>
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
                                    id="movieGenre"
                                    type="text"
                                    name="genre"
                                    {...register("genre")}
                                    select
                                    label="Genre"
                                    value ={genre}
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
                                        defaultValue={watched}
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
                                        id="submitCreateProject"
                                        className="inactive-button"
                                        style={{backgroundColor: "#f5c172"}}
                                        component={SubmitButton}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        href="#"
                                    >
                                        Create Movie
                                    </Button>
                                    <Backdrop open={openCreateProject} onClose={handleCloseCreateProject} elevation={18}>
                                        <Dialog
                                            open={openCreateProject}
                                            TransitionComponent={TransitionCreateProject}
                                            keepMounted
                                            aria-describedby="New project created!"
                                            disableBackdropClick
                                        >
                                            <DialogContent>
                                                <DialogContentText id="alertDialogDescriptionNewProject" className={classes.dialogCreateProjectText}>
                                                    New movie successfully created!
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Grid container spacing={2}>
                                                        <Grid container item xs={6} justify="center">
                                                            <Button id="alertDialogButtonNewProjectForBacktoList"
                                                                    className={classes.dialogCreateProjectNewProject}
                                                                    onClick={() => {
                                                                        handleReset();
                                                                        handleCloseCreateProject();
                                                                    }}
                                                                    color="primary"
                                                            >
                                                                New movie
                                                            </Button>
                                                        </Grid>
                                                        <Grid container item xs={6} justify="center">
                                                            <Button id="alertDialogButtonBackToListForBackToList"
                                                                    className={classes.dialogCreateProjectBackToList}
                                                                    href="./list"
                                                                    style={{backgroundColor: "#f5c172"}}
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
                                        id="alertDialogButtonForCreateProject"
                                        className="backToList"
                                        style={{backgroundColor: "#f5c172"}}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={ () => {
                                            (title !== "" || genre !== "" || description !== "" || 
                                            yearOfRelease !== null) ? handlePopUpBackToList() : handleClickOpenBackToList()}
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
                                                        <Button id="alertDialogButtonCancelForCreatProject"
                                                                className={classes.dialogCancelButton}
                                                                onClick={handleCloseBackToList}
                                                                color="primary"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </Grid>
                                                    <Grid container item xs={6} justify="center">
                                                        <Button
                                                            id="alertDialogButtonProceedForCreateProject"
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

const TransitionCreateProject = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default withRoot(CreateProject);
// export default function withRoot(CreateProject) {
//     return (
//         <SnackbarProvider maxSnack={1}>
//             <CreateProjectPage />
//         </SnackbarProvider>
//     );
// };
