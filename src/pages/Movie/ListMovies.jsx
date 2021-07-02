import withRoot from '../../components/withRoot';
import React, { useState, useEffect, forwardRef } from "react"
import { Redirect, useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import TablePagination from '@material-ui/core/TablePagination';
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
import { getMovies, deleteProject } from "../../api/api"
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

const ListMovies = () => {
	const table = tableStyles();
    const classes = useStyles();

	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
	const history = useHistory()

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

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
				const rows = await getMovies(page, rowsPerPage)
				console.log("🚀 ~ file: ListProjects.js ~ line 69 ~ data", rows.entities.yearOfRelease)
				setData(rows.entities)

				setIsLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
	}, [page, rowsPerPage])

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
                                    {user?.role === "Admin" ? (
                                        <>
                                            <Typography variant="h4" className={classes.title}>
                                                All Movies
                                            </Typography>
                                            <Tooltip
                                                title="Create new movie"
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
                                    title: "Title",
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
                                    title: "Release",
                                    field: "release",
                                    render: rowData => (
                                        <div className={table.name}>{rowData.yearOfRelease}</div>
                                    ),
                                    searchable: true,
                                    sortable: true,
                                },
                                {
                                    title: "Genre",
                                    field: "genre",
                                    render: rowData => (
                                        <div className={table.name}>{rowData.genre}</div>
                                    ),
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
                                    title: "Director",
                                    field: "director",
                                    render: rowData => rowData.director,
                                    searchable: true,
                                    sortable: true,
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
                                    title: "Duration",
                                    field: "durationInMinutes",
                                    render: rowData => rowData.durationInMinutes,
                                    searchable: true,
                                    sortable: true,
                                },
                                {
                                    title: "Rating",
                                    field: "rating",
                                    render: rowData => rowData.rating,
                                    searchable: true,
                                    sortable: true,
                                },
                                {
                                    title: "Watched",
                                    field: "watched",
                                    render: rowData => rowData.watched ? "Yes" : "No",
                                    searchable: true,
                                    sortable: true,
                                },
                            ]}
                            data={data}
                            actions={ user?.role === "Admin" ? [
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
                                // initialPage: 0,
                                paging: false,
                                // pageSize: 5,
                                // pageSizeOptions: [
                                //     5,
                                //     10,
                                //     25,
                                //     { value: data.length, label: "All" },
                                // ],
                                // paginationType: "normal",
                                padding: "default",
                            }}
                            localization={{
                                body: {
                                    emptyDataSourceMessage: "No project found.",
                                },
                                toolbar: {
                                    searchPlaceholder: "Search",
                                },
                                // pagination: {
                                //     labelRowsSelect: "projects per page",
                                //     firstAriaLabel: "paginationFirstPage",
                                //     previousAriaLabel: "paginationPreviousPage",
                                //     nextAriaLabel: "paginationNextPage",
                                //     lastAriaLabel: "paginationLastPage",
                                // },
                            }}
                        />
                        <TablePagination
                            rowsPerPageOptions={[5, 25, 50]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
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

export default withRoot(ListMovies);
