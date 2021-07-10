import withRoot from '../../components/withRoot';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinkCustom from '@material-ui/core/Link';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import TypographyCustom from '../../components/components/Typography';
import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import AppForm from '../../components/views/AppForm';
import { signIn } from "../../api/api";

const useStyles = makeStyles((theme) => ({
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

const SignIn = () => {
    const classes = useStyles();

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
	const [done, setDone] = useState(false)

	const responseFacebook = (response) => {
		setEmail(response.email);
		setName(response.name);

		localStorage.setItem("token", response.accessToken)
		localStorage.setItem(
			"user",
			JSON.stringify({
				firstName: response.name,
				lastName: response.name,
				email: response.email,
				token: response.accessToken,
				role: "Admin",
			})
		)
		if (response.accessToken !== null) {
			setDone(true)
		}
	}

	const responseGoogle = (response) => {
		console.log(response);

		setEmail(response.dt.Nt);
		setName(response.dt.Ve);

		localStorage.setItem("token", response.accessToken)
		localStorage.setItem(
			"user",
			JSON.stringify({
				firstName: response.dt.qS,
				lastName: response.dt.uU,
				email: response.dt.Nt,
				token: response.accessToken,
				role: "Admin",
			})
		)
		if (response.accessToken !== null) {
			setDone(true)
		}
	}

	const sendSignIn = async e => {
		e.preventDefault()
		const { data, status } = await signIn({
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

                <React.Fragment><form className={classes.form} onSubmit={e => sendSignIn(e)}>
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

				<div className="App" style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
					<div style={{display: "flex", justifyContent: "center", padding: "10px"}}>					
						<FacebookLogin
							appId="333550634942475"
							fields="name,email,picture"
							callback={responseFacebook}
						/>
					</div>
					<div style={{display: "flex", justifyContent: "center", padding: "10px"}}>	
						<GoogleLogin
							clientId="881235466006-efnl6nh8ph440amjiivqbbsesvir9mi9.apps.googleusercontent.com"
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

export default withRoot(SignIn);
