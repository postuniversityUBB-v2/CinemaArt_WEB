import withRoot from '../../components/withRoot';
import React, { useState, useEffect, forwardRef } from "react"
import { Redirect, useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table"
import {
	Divider,
	Grid,
	Fab,
	withStyles,
	Tooltip,
	Fade,
    Typography,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import {
	ArrowDownward,
	ChevronLeft,
	ChevronRight,
	FirstPage,
	LastPage,
	Search,
	ViewColumn,
} from "@material-ui/icons"
import AssignmentIcon from "@material-ui/icons/Assignment"
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import { getProjects, deleteProject } from "../../api/api"
import LoadingSpinner from "../../components/components/LoadingSpinner"

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
    createProject: {
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

const ListProjects = () => {
	const table = tableStyles();
    const classes = useStyles();

	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
	const history = useHistory()

	const handleRedirectTasks = rowData => {
		localStorage.setItem('project', JSON.stringify(rowData));

		history.push({
			pathname: "/task/list",
			search: `?project=${rowData.title}`
		})
	}

	const handleRedirectToEditProject = rowData => {		
		localStorage.setItem('project', JSON.stringify(rowData));

		history.push({
			pathname: "/project/edit",
			search: `?project=${rowData.title}`,
		})
	}
	
	const handleDeleteProject = rowData => {
		const fetchData = async () => {
			try {
				await deleteProject(rowData.projectCode)
				console.log("🚀 ~ file: ListProjects.js ~ line 69 ~ data")
				window.location.reload();
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
	}
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getProjects()
				console.log("🚀 ~ file: ListProjects.js ~ line 69 ~ data", data)
				setData(data)

				setIsLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
	}, [])

	if (!user) {
		return <Redirect to="/" />
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
                                                All Projects
                                            </Typography>
                                            <Tooltip
                                                title="Create new project"
                                                arrow
                                                TransitionComponent={Fade}
                                                TransitionProps={{ timeout: 600 }}
                                                placement="top"
                                                aria-label="create new project"
                                            >
                                                <Fab
                                                    id="buttonToCreateProject"
                                                    aria-label="add new project"
                                                    href="/project/create"
                                                    className={classes.createProject}
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
                                    title: "Project Name",
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
                                    title: "Project Status",
                                    field: "projectStatus",
                                    render: rowData => rowData.projectStatus,
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
                                    icon: () => <AssignmentIcon />,
                                    tooltip: "View tasks",
                                    onClick: (event, rowData) => handleRedirectTasks(rowData),
                                },
                                {
                                    icon: () => <DeleteIcon />,
                                    tooltip: 'Delete Project',
                                    onClick: (event, rowData) => handleDeleteProject(rowData)
                                },
                                {
                                    icon: () => <EditIcon />,
                                    tooltip: 'Edit Project',
                                    onClick: (event, rowData) => {
                                        handleRedirectToEditProject(rowData);
                                    } 
                                }
                            ] : [{
                                icon: () => <AssignmentIcon />,
                                tooltip: "View tasks",
                                onClick: (event, rowData) => handleRedirectTasks(rowData),
                            }]}
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
                                    emptyDataSourceMessage: "No project found.",
                                },
                                toolbar: {
                                    searchPlaceholder: "Search",
                                },
                                pagination: {
                                    labelRowsSelect: "projects per page",
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

export default withRoot(ListProjects);
