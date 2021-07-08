import withRoot from '../../components/withRoot';
import { useHistory } from "react-router-dom";
import React, { useState, useRef } from "react";
import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import { useForm } from "react-hook-form"
import {
	makeStyles,
	FormControl,
	TextField,
	Grid,
	Button,
	RootRef,
	Backdrop,
	Select,
    Typography
} from "@material-ui/core"
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Slide,
	MenuItem,
} from "@material-ui/core"
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import "date-fns"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import SelectUsers from "../../components/form/SelectUsers"
import { editReview } from "../../api/api"

const useStyles = makeStyles(theme => ({
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
		},
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
		},
	},
    title:{
        color: theme.palette.warning.dark,
        paddingBottom: theme.spacing(6),
    }
}))
const taskStatuses = [
	{
		value: "DEV_ON_DESK",
		label: "Dev on desk",
	},
	{
		value: "DEV_IN_PROGRESS",
		label: "Dev in progress",
	},
	{
		value: "TESTING",
		label: "Testing",
	},
	{
		value: "CANCELLED",
		label: "Cancelled",
	},
	{
		value: "COMPLETED",
		label: "Completed",
	},
]

const handleFormat = taskStatus => {
	const value = taskStatuses.filter(
		obj => obj.label.toLowerCase() === taskStatus
	)[0]?.value
	return value
}

const EditReview = () => {
    let review = {};
	let movie = {};
	if (localStorage && localStorage.getItem('task') && localStorage.getItem('movie')) {
		review = JSON.parse(localStorage.getItem('review'));
		movie = JSON.parse(localStorage.getItem('movie'));
	}
	const movieTitle = movie.title;
    console.log("🚀 ~ file: EditTask.jsx ~ line 166 ~ EditTaskPage ~ projectTitle", movieTitle)   
	
    const [text, setText] = useState(review?.text);
    const [important, setImportant] = useState(review?.important);

	const [openBackToList, isOpenBackToList] = useState(false)
	const [openCreateTask, isOpenCreateTask] = useState(false)
	const { register, handleSubmit } = useForm()
	const domRef = useRef()
	const classes = useStyles()

	const SubmitButton = props => <button {...props} type="submit" />

	const handlePopUpBackToList = () => {
		isOpenBackToList(true)
	}

	const handleCloseBackToList = () => {
		isOpenBackToList(false)
	}

	const handleCloseCreateTask = () => {
        isOpenCreateTask(false);
    };
	
    const history = useHistory()
    const handleRedirectToListReviews = () => {
        localStorage.setItem('movie', JSON.stringify(movie));

        history.push({
            pathname: "/review/list",
            search: `?movie=${movieTitle}`,
        })
    }

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

	const handleRedirectToListTask = () => {
		isOpenCreateTask(false)
		// window.history.push({
		// 	pathname:"/task/list",
		// 	search:`?project=${projectTitle}`,
		// 	state:{projectTitle: projectTitle}
		// })
		window.history.back()
	}

	const onSubmit = async (values, e) => {
        e.preventDefault();
        const payload = {
            ...values
        };
        payload.dateTime = review.dateTime;
        payload.important = important === true ? true : false;
		payload.text = text;

        try {
            editReview(movie.id, review.id, payload);
            isOpenCreateTask(true);
        } catch (err) {
            console.log(err);
        }
	}

    return (
        <React.Fragment>
            <AppAppBar />
            <div className="createEntity">
                <Typography variant="h4" className={classes.title}>Edit review</Typography>
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
                                    Edit Review
                                </Button>
                                <Backdrop
                                    open={openCreateTask}
                                    onClose={handleCloseCreateTask}
                                    elevation={18}
                                >
                                    <Dialog
                                        open={openCreateTask}
                                        TransitionComponent={TransitionCreateTask}
                                        keepMounted
                                        aria-describedby="New task created!"
                                        disableBackdropClick
                                    >
                                        <DialogContent>
                                            <DialogContentText
                                                id="alertDialogDescriptionNewTask"
                                                className={classes.dialogCreateTaskText}
                                            >
                                                Review edited successfully!
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
                                                    Edit review
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
                                    className="backToList"
                                    style={{backgroundColor: "#f5c172"}}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={handleRedirectToListTask}
                                >
                                    Back to list
                                </Button>							
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
		return dateString
	}

	const dateArray = dateString.split("/")
	const [day, month, year] = dateArray
	const newDate = new Date(year, month - 1, day)

	const moment = require("moment")
	const newDateFormat = moment(newDate).format("YYYY-MM-DD")
	return newDateFormat
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

const TransitionCreateTask = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

export default withRoot(EditReview);
