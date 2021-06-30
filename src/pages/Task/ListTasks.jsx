import withRoot from '../../components/withRoot';
import React, { useState, useEffect, forwardRef } from "react";
import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import MaterialTable from "material-table"
import {
	Divider,
	Grid,
	Fab,
	withStyles,
	makeStyles,
	Tooltip,
	Fade,
    Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
	ArrowDownward,
	ChevronLeft,
	ChevronRight,
	FirstPage,
	LastPage,
	Search,
	ViewColumn,
} from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect, useHistory } from "react-router-dom";

import { getTasksForProject } from "../../api/api";
import { deleteTask } from "../../api/api";
import LoadingSpinner from "../../components/components/LoadingSpinner";

const tableIcons = {
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef(() => ""),
	Search: forwardRef((props, ref) => (
		<Search id="searchClients" {...props} ref={ref} />
	)),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

const StyledDivider = withStyles(() => ({
	root: {
		backgroundColor: "#f5c172",
		height: 3,
	},
}))(Divider);

const tableStyles = makeStyles({
	root: {
		minWidth: 300,
	},
	name: {
		whiteSpace: "normal",
		wordWrap: "break-word",
		width: "10rem",
	},
});

const useStyles = makeStyles((theme) => ({
    createTask: {
        backgroundColor: theme.palette.warning.main,
        '&:hover': {
            backgroundColor: theme.palette.warning.dark,
        },
    },
    title:{
        color: theme.palette.warning.dark,
        padding: theme.spacing(2),
    }
}));

const handleDeleteTask = rowData => {
	console.log("rowData", rowData)
	const fetchData = async () => {
		try {
			await deleteTask(rowData.taskCode)
			console.log("🚀 ~ file: ListTasks.js ~ line 65 ~ delete  task")
			window.location.reload();
		} catch (err) {
			console.log(err)
		}
	}
	fetchData()
}

const ListTasks = () => {
	const table = tableStyles();
    const classes = useStyles();

	let project = {};
	if (localStorage && localStorage.getItem('project')) {
	   project = JSON.parse(localStorage.getItem('project'));
	}
    const projectCode = project.projectCode;
    const projectTitle = project.title;

	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
	
	const history = useHistory()
	const handleRedirectToCreateTask = () => {
		localStorage.setItem('project', JSON.stringify(project));

		history.push({
			pathname: "/task/create",
			search: `?project=${projectTitle}`,
		})
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getTasksForProject(projectCode);
				console.log("🚀 ~ file: ListTasks.js ~ line 69 ~ data", data);
				setData(data.tasks);

				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);

	if (!user) {
		return <Redirect to="/" />
	}

	const handleRedirectToEditTask = (rowData) =>{
		console.log("🚀 ~ file: ListTasks.js ~ line 117 ~ handleRedirectToEditTask ~ rowData", rowData);		
		localStorage.setItem('project', JSON.stringify(project));
		localStorage.setItem('task', JSON.stringify(rowData));

		history.push({
			pathname:"/task/edit",
			search:`?task=${rowData.title}`,
		});		
	}

    return (
        <React.Fragment>
            <AppAppBar />
            <div className="listEntities">
			{isLoading ? (
				<LoadingSpinner />
			) : (				
				<>
					<div className="newEntity">
						<Grid container spacing={1}>
							<Grid container item xs={12} justify="flex-end">
								{user?.role === "[ROLE_ADMIN]" ? (
                                    <>
                                        <Typography variant="h4" className={classes.title}>
                                            All tasks of {projectTitle}
                                        </Typography>
                                        <Tooltip
                                            title="Create new task"
                                            arrow
                                            TransitionComponent={Fade}
                                            TransitionProps={{ timeout: 600 }}
                                            placement="left"
                                            aria-label="create new task"
                                        >
                                            <Fab
                                                id="buttonToCreateTask"
                                                className={classes.createTask}
                                                aria-label="add new task"
                                                onClick={handleRedirectToCreateTask}
                                            >
                                                <AddIcon />
                                            </Fab>
                                        </Tooltip>
                                    </>
								) : null}
							</Grid>
						</Grid>
					</div>

					<StyledDivider />
					<MaterialTable
						icons={tableIcons}
						columns={[
							{
								title: "Task Name",
								field: "title",
								render: rowData => (
									<div className={table.name}>{rowData.title}</div>
								),
								searchable: true,
								sortable: true,
								defaultSort: "asc",
								customSort: (a, b) => a?.title?.localeCompare(b?.title),
							},
							{
								title: "Created By",
								field: "createdBy",
								render: rowData => (
									<div className={table.name}>{rowData.createdBy}</div>
								),
								searchable: true,
								sortable: true,
							},
                            {
								title: "Assigned To",
								field: "assignedTo",
								render: rowData => (
									<div className={table.name}>{rowData.assignedTo}</div>
								),
								searchable: true,
								sortable: true,
							},
							{
								title: "Task Status",
								field: "taskStatus",
								render: rowData => rowData.taskStatus,
								searchable: true,
								sortable: true,
							},
							{
								title: "Description",
								field: "description",
								render: rowData => (
									<div className={table.name}>{rowData.description}</div>
								),
								searchable: true,
								sortable: true,
							},
							{
								title: "Deadline",
								field: "deadline",
								render: rowData => formattedDate(rowData.deadline),
								searchable: true,
								sortable: true,
								customFilterAndSearch: (searchValue, rowData) => handleSearchDate(searchValue, rowData.deadline)
							},
							{
								title: "Date Added",
								field: "dateAdded",
								render: rowData => formattedDate(rowData.dateAdded),
								searchable: true,
								sortable: true,
								customFilterAndSearch: (searchValue, rowData) => handleSearchDate(searchValue, rowData.dateAdded)
							},
							{
								title: "Last Modified",
								field: "lastModified",
								render: rowData => formattedDate(rowData.lastModified),
								searchable: true,
								sortable: true,
								customFilterAndSearch: (searchValue, rowData) => handleSearchDate(searchValue, rowData.lastModified)
							},
						]}
						data={data}
						actions={ user?.role === "[ROLE_ADMIN]" ? [
							{
								icon: () => <DeleteIcon />,
								tooltip: 'Delete Task',
								onClick: (event, rowData) => handleDeleteTask(rowData)
							},
							{
								icon: () => <EditIcon />,
								tooltip: 'Edit Task',
								onClick: (event, rowData) => handleRedirectToEditTask(rowData)
							}
						] : [] }
						options={{
							search: true,
							sorting: true,
							rowStyle: () => {
								return { backgroundColor: "#f5c172", fontSize: 14 }
							},
							headerStyle: {
								fontWeight: "bold",
								fontSize: 16,
							},
							emptyRowsWhenPaging: false,
							draggable: false,
							thirdSortClick: false,
							showTitle: false,
							initialPage: 0,
							paging: true,
							pageSize: 5,
							pageSizeOptions: [
								5,
								10,
								25,
								{ value: data.length, label: "All" },
							],
							paginationType: "normal",
							padding: "default",
						}}
						localization={{
							body: {
								emptyDataSourceMessage: "No task found.",
							},
							toolbar: {
								searchPlaceholder: "Search",
							},
							pagination: {
								labelRowsSelect: "tasks per page",
								firstAriaLabel: "paginationFirstPage",
								previousAriaLabel: "paginationPreviousPage",
								nextAriaLabel: "paginationNextPage",
								lastAriaLabel: "paginationLastPage",
							},
						}}
					/>
				</>
			)}
		</div>
            <AppFooter />
        </React.Fragment>
    );
}

function formattedDate(date) {
	if (date === null) {
		return "N/A"
	}

	var sliceDate = date.slice(0, 10)
	return (
		sliceDate.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4)
	)
}

function handleSearchDate(searchValue, rowData) {
    var date = formattedDate(rowData);
    if (date.indexOf(searchValue) !== -1) {
        return true;
    }
    return false;
};

export default withRoot(ListTasks);
