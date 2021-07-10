import React, { useState, useEffect, forwardRef } from "react";
import MaterialTable from "material-table"
import {
	Divider,
	Grid,
	Fab,
	withStyles,
	makeStyles,
	Tooltip,
	Fade,
    Typography, 
	Button,
	Box
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
import PropTypes from 'prop-types';
import {  useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TablePagination from '@material-ui/core/TablePagination';

import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import withRoot from '../../components/withRoot';
import { getReviewsForMovie } from "../../api/api";
import { deleteReview } from "../../api/api";
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
		backgroundColor: "#f7cc8e",
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
    createReview: {
        backgroundColor: theme.palette.warning.main,
        '&:hover': {
            backgroundColor: theme.palette.warning.dark,
        },
    },
    title:{
        color: theme.palette.warning.dark,
        padding: theme.spacing(2),
    },
	box: {
		display: "flex",
		paddingTop: 8
	},
	centerBox: {
		justifyContent: "flex-end",
		alignItems: "flex-end"
	},
	root: {
		flexGrow: 1,
	  },
	  paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	  },
}));

const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
		<IconButton
			onClick={handleFirstPageButtonClick}
			disabled={page === 0}
			aria-label="first page"
		>
			{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
		</IconButton>
		<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
			{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
		</IconButton>
		<IconButton
			onClick={handleNextButtonClick}
			disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			aria-label="next page"
		>
			{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
		</IconButton>
		<IconButton
			onClick={handleLastPageButtonClick}
			disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			aria-label="last page"
		>
			{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
		</IconButton>
		</div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

const handleDeleteReview = rowData => {
	const fetchData = async () => {
		try {
			await deleteReview(rowData.id)
			window.location.reload();
		} catch (err) {
			return <Typography>Something went wrong...</Typography>
		}
	}
	fetchData()
}

const ListReviews = () => {
	const table = tableStyles();
    const classes = useStyles();

	let movie = {};
	if (localStorage && localStorage.getItem('movie')) {
		movie = JSON.parse(localStorage.getItem('movie'));
	}
    const idMovie = movie.id;
    const movieTitle = movie.title;

	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalEntities, setTotalEntities] = React.useState(data.totalEntities);
	
	const history = useHistory()

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleRedirectToCreateReview = () => {
		localStorage.setItem('movie', JSON.stringify(movie));

		history.push({
			pathname: "/review/create",
			search: `?movie=${movieTitle}`,
		})
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getReviewsForMovie(idMovie);
				setData(data.entities[0].reviews);
				setTotalEntities(data.entities[0].reviews.length);
				setIsLoading(false);
			} catch (err) {
				return <Typography>Something went wrong...</Typography>
			}
		}
		fetchData();
	}, []);

	if (!user) {
		return <Redirect to="/" />
	}

	const handleRedirectToEditReview = (rowData) =>{		
		localStorage.setItem('movie', JSON.stringify(movie));
		localStorage.setItem('review', JSON.stringify(rowData));

		history.push({
			pathname:"/review/edit",
			search:`?movie=${rowData.title}`,
		});		
	}


	const handleRedirectToMovies = () => {
		history.push({
			pathname:"/movie/list"
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
									<Typography variant="h4" className={classes.title}>
										All reviews of {movieTitle}
									</Typography>
										<>
											<Tooltip
												title="Create new review"
												arrow
												TransitionComponent={Fade}
												TransitionProps={{ timeout: 600 }}
												placement="top"
												aria-label="create new review"
											>
											<Fab
												id="buttonToCreateReview"
												className={classes.createReview}
												aria-label="add new review"
												onClick={handleRedirectToCreateReview}
											>
												<AddIcon />
											</Fab>
										</Tooltip>
									</>
								</Grid>
							</Grid>
						</div>

						<StyledDivider />
						<MaterialTable
							icons={tableIcons}
							columns={[
								{
									title: "Text",
									field: "text",
									render: rowData => (
										<div className={table.name}>{rowData.text}</div>
									),
									sortable: true,
									defaultSort: "asc",
									customSort: (a, b) => a?.title?.localeCompare(b?.title),
								},
								{
									title: "Important",
									field: "important",
									render: rowData => (
										<div className={table.name}>{rowData.important ? "Yes" : "No"}</div>
									),
									sortable: true,
								},
								{
									title: "Date Added",
									field: "dateTime",
									render: rowData => formattedDate(rowData.dateTime),
									sortable: true,
									customFilterAndSearch: (searchValue, rowData) => handleSearchDate(searchValue, rowData.dateTime)
								},
							]}
							data={data}
							actions={ user?.role === "Admin" ? [
								{
									icon: () => <DeleteIcon />,
									tooltip: 'Delete Review',
									onClick: (event, rowData) => handleDeleteReview(rowData)
								},
								{
									icon: () => <EditIcon />,
									tooltip: 'Edit Review',
									onClick: (event, rowData) => handleRedirectToEditReview(rowData)
								}
							] : [] }
							options={{
								search: false,
								sorting: true,
								rowStyle: () => {
									return { backgroundColor: "#f7cc8e", fontSize: 14 }
								},
								headerStyle: {
									fontWeight: "bold",
									fontSize: 16,
								},
								emptyRowsWhenPaging: false,
								draggable: false,
								thirdSortClick: false,
								showTitle: false,
								paging: false,
								padding: "default",
							}}
							localization={{
								body: {
									emptyDataSourceMessage: "No review found.",
								},
							}}
						/>

						<div className={classes.root}>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<TablePagination
										rowsPerPageOptions={[5, 10, 20]}
										colSpan={3}
										count={totalEntities}
										rowsPerPage={rowsPerPage}
										page={page}
										SelectProps={{
											inputProps: { 'aria-label': 'rows per page' },
											native: true,
										}}
										onChangePage={handleChangePage}
										onChangeRowsPerPage={handleChangeRowsPerPage}
										ActionsComponent={TablePaginationActions}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Box className={`${classes.centerBox} ${classes.box}`}>
										<Button
											variant="contained"
											color="default"
											onClick={handleRedirectToMovies}
										>
											Back to Movies
										</Button>
									</Box>
								</Grid>
							</Grid>
						</div>
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

export default withRoot(ListReviews);
