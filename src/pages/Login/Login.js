import withRoot from '../../components/withRoot';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinkCustom from '@material-ui/core/Link';
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { Link } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import TypographyCustom from '../../components/components/Typography';
import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import AppForm from '../../components/views/AppForm';
import { login } from "../../api/api";

const useStyles = makeStyles((theme) => ({
    // form: {
    //     marginTop: theme.spacing(6),
    // },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    feedback: {
        marginTop: theme.spacing(2),
    },
    paper: {
		marginTop: theme.spacing(3),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		marginTop: theme.spacing(3),
		backgroundColor: theme.palette.secondary.light,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Login() {
    const classes = useStyles();
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
	const [done, setDone] = useState(false)

	const responseFacebook = (response) => {
		console.log(response);
		setEmail(response.email);
		setName(response.name);

		localStorage.setItem("token", response.accessToken)
		localStorage.setItem(
			"user",
			JSON.stringify({
				firstName: name,
				lastName: name,
				email: email,
				token: response.accessToken,
				role: "User",
			})
		)
		if (response.accessToken !== null) {
			setDone(true)
		}
	}

	const responseGoogle = (response) => {
		console.log(response);
	}

	const sendLogin = async e => {
		e.preventDefault()
		const { data, status } = await login({
			email: email,
			password: password,
		})


		localStorage.setItem("token", data.token)
		localStorage.setItem(
			"user",
			JSON.stringify({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				token: data.token,
				role: data.role,
			})
		)
		if (status === 200) {
			setDone(true)
		}
	}

	if (user || done) {
    	window.location.href = "/"
	}

    return (
        <React.Fragment>
            <AppAppBar />
            <AppForm>
                <React.Fragment>
                    <TypographyCustom variant="h3" gutterBottom marked="center" align="center">
                        Sign In
                    </TypographyCustom>
                    <TypographyCustom variant="body2" align="center">
                        {'Not a member yet? '}
                        <LinkCustom href="/register" align="center" underline="always">
                            Sign Up here
                        </LinkCustom>
                    </TypographyCustom>
                </React.Fragment>

                <React.Fragment><form className={classes.form} onSubmit={e => sendLogin(e)}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							autoComplete="email"
							onChange={e => setEmail(e.target.value)}
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							onChange={e => setPassword(e.target.value)}
							autoComplete="current-password"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign in
						</Button>
					</form>
                </React.Fragment>

				<div className="App" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
					<div style={{display: "flex", justifyContent: "center"}}>					
						<FacebookLogin
							appId="333550634942475" //APP ID NOT CREATED YET
							fields="name,email,picture"
							callback={responseFacebook}
						/>
					</div>

					{/* <div class="fb-login-button" 
						data-width="" 
						data-size="large" 
						data-button-type="login_with" 
						data-layout="default" 
						data-auto-logout-link="true" 
						data-use-continue-as="true"
					>
					</div> */}
					<br />
					<br />

					<div style={{display: "flex", justifyContent: "center"}}>	
						<GoogleLogin
							clientId="" //CLIENTID NOT CREATED YET
							buttonText="SIGN IN WITH GOOGLE"
							onSuccess={responseGoogle}
							onFailure={responseGoogle}
						/>
					</div>

				</div>
              </AppForm>
            <AppFooter />
        </React.Fragment>
    );
}

export default withRoot(Login);
