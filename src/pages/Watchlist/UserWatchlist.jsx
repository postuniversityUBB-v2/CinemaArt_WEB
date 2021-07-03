import withRoot from '../../components/withRoot';
import React, { useState, useEffect, forwardRef } from "react";
import { Redirect, useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import TablePagination from '@material-ui/core/TablePagination';
import { Divider, withStyles, makeStyles, Typography } from "@material-ui/core";
import {
	ArrowDownward,
	ChevronLeft,
	ChevronRight,
	FirstPage,
	FlashOnTwoTone,
	LastPage,
	Search,
	ViewColumn,
} from "@material-ui/icons";
import PropTypes from 'prop-types';
import {  useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import { getWatchlists, deleteWatchlistMovie } from "../../api/api";
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
};

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
    title:{
        color: theme.palette.warning.dark,
        padding: theme.spacing(2),
    }
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

const UserWatchlist = () => {
	const table = tableStyles();    
    const classes = useStyles();
	const history = useHistory();

	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalEntities, setTotalEntities] = React.useState(data.totalEntities);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	
	const handleRedirectToEditWatchlist = (rowData) =>{
		// console.log("🚀 ~ file: ListTasks.js ~ line 117 ~ handleRedirectToEditTask ~ rowData", rowData);		
		// localStorage.setItem('movie', JSON.stringify(movie));
		// localStorage.setItem('review', JSON.stringify(rowData));

		history.push({
			pathname:"/review/edit",
			search:`?movie=${rowData.title}`,
		});		
	}

	const handleDeleteWatchlistMovie = rowData => {
		console.log("rowData", rowData)
		const fetchData = async () => {
			try {
				await deleteWatchlistMovie(rowData.id)
				console.log("🚀 ~ file: DeleteUserWatchlist.js ~ line 65 ~ delete  watchlist")
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
				const data = await getWatchlists(page+1, rowsPerPage)
				const movies = data.entities[0].movies;
				console.log("🚀 ~ file: ListUsers.js ~ line 61 ~ data", movies)
				setData(movies)
				setTotalEntities(movies.length)

				setIsLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
	}, [page, rowsPerPage])
					
	// const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
	console.log(data.length);
	if (!user) {
		return <Redirect to="/" />
	}

    return (
        <React.Fragment>
            <AppAppBar />
            <div className="listEntities">
            <Typography variant="h4" className={classes.title}>
                {user.firstName}'s Watchlist
            </Typography>

			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
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
								// searchable: true,
								sortable: true,
								defaultSort: "asc",
								customSort: (a, b) => a?.firstName?.localeCompare(b?.firstName),
							},
							{
								title: "Release",
								field: "release",
								render: rowData => (
									<div className={table.name}>{rowData.yearOfRelease}</div>
								),
								// searchable: true,
								sortable: true,
							},
							{
								title: "Genre",
								field: "genre",
								render: rowData => (
									<div className={table.name}>{rowData.genre}</div>
								),
								// searchable: true,
								sortable: true,
							},
							{
								title: "Description",
								field: "description",
								render: rowData => (
									<div className={table.name}>{rowData.description}</div>
								),
								// searchable: true,
								sortable: true,
							},
							{
								title: "Director",
								field: "director",
								render: rowData => rowData.director,
								// searchable: true,
								sortable: true,
							},
							{
								title: "Date Added",
								field: "dateAdded",
								render: rowData => formattedDate(rowData.dateAdded),
								// searchable: true,
								sortable: true,
								// customFilterAndSearch: (searchValue, rowData) => handleSearchDate(searchValue, rowData.dateAdded)
							},
							{
								title: "Duration",
								field: "durationInMinutes",
								render: rowData => rowData.durationInMinutes,
								// searchable: true,
								sortable: true,
							},
							{
								title: "Rating",
								field: "rating",
								render: rowData => rowData.rating,
								// searchable: true,
								sortable: true,
							},
							{
								title: "Watched",
								field: "watched",
								render: rowData => rowData.watched ? "Yes" : "No",
								// searchable: true,
								sortable: true,
							},
						]}
						data={data}
						actions={ user?.role === "Admin" ? [
							{
								icon: () => <DeleteIcon />,
								tooltip: 'Delete Review',
								onClick: (event, rowData) => handleDeleteWatchlistMovie(rowData)
							},
							{
								icon: () => <EditIcon />,
								tooltip: 'Edit Review',
								onClick: (event, rowData) => handleRedirectToEditWatchlist(rowData)
							}
						] : [							
							{
								icon: () => <DeleteIcon />,
								tooltip: 'Delete Review',
								onClick: (event, rowData) => handleDeleteWatchlistMovie(rowData)
							},
						] }
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
								emptyDataSourceMessage: "No movie found.",
							},
							// toolbar: {
							// 	searchPlaceholder: "Search",
							// },
						}}
					/>
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

export default withRoot(UserWatchlist);
