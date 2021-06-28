import withRoot from '../../components/withRoot';
import React, { useState, useEffect, forwardRef } from "react";
import { Redirect } from "react-router-dom";
import MaterialTable from "material-table";
import { Divider, withStyles, makeStyles, Typography } from "@material-ui/core";
import {
	ArrowDownward,
	ChevronLeft,
	ChevronRight,
	FirstPage,
	LastPage,
	Search,
	ViewColumn,
} from "@material-ui/icons";

import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import { getUsers } from "../../api/api";
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
		backgroundColor: "#EBF0F9",
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

const ListUsers = () => {
	const table = tableStyles();    
    const classes = useStyles();

	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getUsers()
				console.log("🚀 ~ file: ListUsers.js ~ line 61 ~ data", data)
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
			{/* <h3 id="headerListOfProjects" className="header">
				All Users
			</h3> */}
            <Typography variant="h4" className={classes.title}>
                All Users
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
								title: "First Name",
								field: "firstName",
								render: rowData => (
									<div className={table.name}>{rowData.firstName}</div>
								),
								searchable: true,
								sortable: true,
								defaultSort: "asc",
								customSort: (a, b) => a?.firstName?.localeCompare(b?.firstName),
							},
							{
								title: "Last Name",
								field: "lastName",
								render: rowData => (
									<div className={table.name}>{rowData.lastName}</div>
								),
								searchable: true,
								sortable: true,
							},
							{
								title: "Username",
								field: "username",
								render: rowData => rowData.username,
								searchable: true,
								sortable: true,
							},
							{
								title: "Email",
								field: "email",
								render: rowData => (
									<div className={table.name}>{rowData.email}</div>
								),
								searchable: true,
								sortable: true,
							},
							{
								title: "Role",
								field: "role",
								render: rowData => rowData.roles.map(r => r.role + " "),
								searchable: true,
								sortable: true,
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
								emptyDataSourceMessage: "No user found.",
							},
							toolbar: {
								searchPlaceholder: "Search",
							},
							pagination: {
								labelRowsSelect: "users per page",
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

export default withRoot(ListUsers);
