import withRoot from '../../components/withRoot';
import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { makeStyles, FormControl, TextField, Grid, Button, RootRef, Backdrop, MenuItem, Typography } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, Slide } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import { editProject } from "../../api/api";

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginRight: theme.spacing(33),
        marginBottom: theme.spacing(14),
        width: 300,
    },
    textField : {
        width: 380,
    },
    keyboardDatePicker: {
        width: 380,
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

    let project = {};
	if (localStorage && localStorage.getItem('project')) {
	   project = JSON.parse(localStorage.getItem('project'));
	}

    const SubmitButton = (props) => ( <button {...props} type="submit" />);

    const projectStatuses = [
        {
            value: 'dev',
            label: 'Dev',
        },
        {
            value: 'alpha',
            label: 'Alpha',
        },
        {
            value: 'beta',
            label: 'Beta',
        },
        {
            value: 'production',
            label: 'Production',
        },
    ];
    const [title, setTitle] = useState(project.title);
    const [projectStatus, setProjectStatus] = useState(project.projectStatus);
    const [description, setDescription] = useState(project.description);
    const [deadline, setDeadline] = useState(project.deadline);
    
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

    const handleChangeProjectStatus = (event) => {
        setProjectStatus(event.target.value);
    };
    
    const handleDeadline = (date) => {
        setDeadline(date);
    };

    const handleResetDatePickerDeadline = () => {
        setDeadline(project.deadline);
    };

    const handleReset = () => {
        setTitle(project.title);
        setProjectStatus(project.projectStatus);
        setDescription(project.description);
        setDeadline(handleResetDatePickerDeadline);
    }

    const { register, handleSubmit } = useForm();
    const onSubmit = (values, e) => {
        e.preventDefault();
        const payload = {
			title: title,
			description: description,            
			projectStatus: projectStatus,
			deadline: values.deadline ? formatDate(values.deadline) : deadline,
		}

        try {
            editProject(project.projectCode, payload);
            console.log("🚀 ~ file: EditProject.js ~ line 193");
            isOpenEditProject(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            <AppAppBar />
                <div className="createEntity">
                    <Typography variant="h4" className={classes.title}>Edit {project.title}</Typography>
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

                            <FormControl id="projectStatusForm" className={classes.formControl}>                    
                                <TextField
                                    id="projectStatus"
                                    type="text"
                                    name="projectStatus"
                                    {...register("projectStatus")}
                                    select
                                    label="Project Status"
                                    value={projectStatus}
                                    onChange={handleChangeProjectStatus}    
                                    className={classes.textField}                    
                                    placeholder="Project Status"
                                    InputLabelProps={{shrink: true,}}
                                    inputProps={{ "data-testid": "projectStatus" }}
                                >
                                    {projectStatuses.map((status, index) => (
                                        <MenuItem key={index} value={status.value}>
                                            {status.label}
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

                            <FormControl className={classes.formControl}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        id="deadline"
                                        name="deadline"
                                        value={deadline}
                                        {...register("deadline")}
                                        onChange={date => handleDeadline(date)}
                                        className={classes.keyboardDatePicker}
                                        format="dd/MM/yyyy"
                                        KeyboardButtonProps={{
                                            'aria-label': 'deadline',
                                        }}
                                        label="Deadline"
                                        placeholder="Deadline   dd/mm/yyyy"
                                        InputLabelProps={{shrink: true,}}
                                        autoOk={true}
                                    />
                                </MuiPickersUtilsProvider>
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
                                        Edit Project
                                    </Button>
                                    <Backdrop open={openEditProject} onClose={handleCloseEditProject} elevation={18}>
                                        <Dialog
                                            open={openEditProject}
                                            TransitionComponent={TransitionEditProject}
                                            keepMounted
                                            aria-describedby="Project edited!"
                                            disableBackdropClick
                                        >
                                            <DialogContent>
                                                <DialogContentText id="alertDialogDescriptionEditProject" className={classes.dialogEditProjectText}>
                                                    Project successfully edited!
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
                                                                Edit project
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
