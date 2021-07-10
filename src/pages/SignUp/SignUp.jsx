import withRoot from '../../components/withRoot';
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { register } from "../../api/api";
import TypographyCustom from '../../components/components/Typography';
import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import AppForm from '../../components/views/AppForm';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(3),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
        backgroundColor: theme.palette.warning.light,
	},
	avatar: {
		marginTop: theme.spacing(3),
		backgroundColor: theme.palette.warning.light,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	select: {
		width: "100%",
	},
}))

const SignUp = () => {
    const classes = useStyles();

	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [role, setRole] = useState("")

	const [done, setDone] = useState(false)
    const [error, setError] = useState(false)
    const [user, setUser]= useState(JSON.parse(localStorage.getItem("user")))

	const sendRegister = async e => {
		e.preventDefault()
		try {
			const status = await register({
				email: email,
				password: password,
				confirmPassword: confirmPassword,
				firstName: firstName,
				lastName: lastName,
				role: role,
			})
			if (status === 200) {
				setDone(true)
			}
		} catch (err) {
			setError(true)
		}
	}

	if (error) {
		return <Typography>Something went wrong...</Typography>
    }
    
    if(user){
        return <Redirect to="/"/>
    }

    return (
        <React.Fragment>
            <AppAppBar />
            <AppForm>
                {done ? (
						<>
							<Typography variant="h5">
								{firstName}, you are now registered!
							</Typography>
							<Typography variant="h4">
								Please <Link href="/signIn">sign in</Link>{" "}
							</Typography>
						</>
					) : (
						<>						
						<TypographyCustom variant="h3" gutterBottom marked="center" align="center">
                        	Sign Up
                    	</TypographyCustom>
						<TypographyCustom variant="body2" align="center">
							<Link href="/signIn" underline="always">
								Already have an account?
							</Link>
                    	</TypographyCustom>
						<form className={classes.form} onSubmit={e => sendRegister(e)}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="fname"
										name="firstName"
										variant="outlined"
										required
										fullWidth
										id="firstName"
										label="First Name"
										autoFocus
										onChange={e => setFirstName(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="lastName"
										label="Last Name"
										name="lastName"
										autoComplete="lname"
										onChange={e => setLastName(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										onChange={e => setEmail(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="current-password"
										onChange={e => setPassword(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="confirmPassword"
										label="Confirm Password"
										type="password"
										id="confirmPassword"
										autoComplete="current-confirm-password"
										onChange={e => setConfirmPassword(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControl className={classes.select} variant="outlined">
										<InputLabel id="demo-simple-select-outlined-label">
											Role
										</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											label="Role"
											onChange={e => setRole(e.target.value)}
										>
											<MenuItem value="User">User</MenuItem>
											<MenuItem value="Admin">Admin</MenuItem>
										</Select>
									</FormControl>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
							>
								Sign up
							</Button>
						</form>
						</>
					)}
            </AppForm>
            <AppFooter />
        </React.Fragment>
    );
}

export default withRoot(SignUp);
