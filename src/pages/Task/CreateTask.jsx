import withRoot from '../../components/withRoot';
import React, { useState, useRef } from 'react';
import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles, FormControl, TextField, Grid, Button, RootRef, Backdrop, Typography } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, Slide, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

import { postTask } from "../../api/api";
import SelectUsers from '../../components/form/SelectUsers';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginRight: theme.spacing(33),
        marginBottom: theme.spacing(14),
        width: 300,
    },
    textField: {
        width: 380,
    },
    keyboardDatePicker: {
        width: 380,
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
        paddingBottom: theme.spacing(6),
    }
}));

const CreateTask = () => {
    const domRef = useRef();
    const classes = useStyles();

	let project = {};
	if (localStorage && localStorage.getItem('project')) {
	   project = JSON.parse(localStorage.getItem('project'));
	}
    const projectCode = project.projectCode;
    const projectTitle = project.title;

    const SubmitButton = (props) => (<button {...props} type="submit" />);

    const taskStatuses = [
        {
            value: 'DEV_ON_DESK',
            label: 'Dev on desk',
        },
        {
            value: 'DEV_IN_PROGRESS',
            label: 'Dev in progress',
        },
        {
            value: 'TESTING',
            label: 'Testing',
        },
        {
            value: 'CANCELLED',
            label: 'Cancelled',
        },
        {
            value: 'COMPLETED',
            label: 'Completed',
        },
    ];
    const [title, setTitle] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const [description, setDescription] = useState('');
    const [assignedToUserCode, setAssignedToUserCode] = useState('');
    const [deadline, setDeadline] = useState(null);

    const [openBackToList, isOpenBackToList] = useState(false);
    const [openCreateTask, isOpenCreateTask] = useState(false);

    const history = useHistory()
    const handleRedirectToListTask = () => {
        localStorage.setItem('project', JSON.stringify(project));

        history.push({
            pathname: "/task/list",
            search: `?project=${projectTitle}`,
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

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleChangeTaskStatus = (event) => {
        setTaskStatus(event.target.value);
    };

    const handleChangeAssignedToUserCode = (event) => {
        setAssignedToUserCode(event.target.value);
    };

    const handleDeadline = (date) => {
        setDeadline(date);
    };

    const handleResetDatePickerDeadline = () => {
        setDeadline(null);
    };

    const handleReset = () => {
        setTitle('');
        setTaskStatus('');
        setDescription('');
        setAssignedToUserCode('');
        setDeadline(handleResetDatePickerDeadline);
    }

    const { register, handleSubmit } = useForm();
    const onSubmit = (values, e) => {
        e.preventDefault();
        const payload = {
            ...values
        };
        payload.deadline = formatDate(values.deadline);

        try {
            postTask(payload, projectCode);
            isOpenCreateTask(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            <AppAppBar />
            <div className="createEntity">
            <Typography variant="h4" className={classes.title}>Create Task for {projectTitle}</Typography>
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
                            InputLabelProps={{ shrink: true, }}
                        />
                    </FormControl>

                    <FormControl id="taskStatusForm" className={classes.formControl}>
                        <TextField
                            id="taskStatus"
                            type="text"
                            name="taskStatus"
                            {...register("taskStatus")}
                            select
                            label="Task Status"
                            value={taskStatus}
                            onChange={handleChangeTaskStatus}
                            className={classes.textField}
                            placeholder="Task Status"
                            InputLabelProps={{ shrink: true, }}
                            inputProps={{ "data-testid": "taskStatus" }}
                        >
                            {taskStatuses.map((status, index) => (
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
                            value={description}
                            {...register("description")}
                            onChange={handleChangeDescription}
                            className={classes.textField}
                            label="Description"
                            placeholder="Description"
                            InputLabelProps={{ shrink: true, }}
                        />
                    </FormControl>

                    <FormControl id="addedByUserCodeForm" className={classes.formControl}>                       
                        <SelectUsers register={register} handleChangeAssignedToUserCode={handleChangeAssignedToUserCode}/>
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
                                InputLabelProps={{ shrink: true, }}
                                autoOk={true}
                            />
                        </MuiPickersUtilsProvider>
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
                                Create Task
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
                                            New task successfully created!
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
                                                    New task
                                                </Button>
                                            </Grid>
                                            <Grid container item xs={6} justify="center">
                                                <Button id="alertDialogButtonBackToListForBackToList"
                                                    className={classes.dialogCreateTaskBackToList}
                                                    onClick={handleRedirectToListTask}
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
                                className="backToList"
                                style={{backgroundColor: "#f5c172"}}
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => {
                                        (title !== "" || taskStatus !== "" || description !== "" ||
                                        deadline !== null || assignedToUserCode !== "") ? handlePopUpBackToList() : handleRedirectToListTask()
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
                                                    onClick={handleRedirectToListTask}
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
