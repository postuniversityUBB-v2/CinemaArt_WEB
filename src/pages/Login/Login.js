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

import TypographyCustom from '../../components/components/Typography';
import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import AppForm from '../../components/views/AppForm';
import { login } from "../../api/api"

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
		backgroundColor: theme.palette.secondary.main,
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
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
	const [done, setDone] = useState(false)
	const sendLogin = async e => {
		e.preventDefault()
		const { data, status } = await login({
			username: username,
			password: password,
		})

		const items = data.split(",")
		localStorage.setItem("token", items[3])
		localStorage.setItem(
			"user",
			JSON.stringify({
				username: items[0],
				firstName: items[1],
				lastName: items[2],
				token: items[3],
				role: items[4],
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
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							onChange={e => setUsername(e.target.value)}
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
              </AppForm>
            <AppFooter />
        </React.Fragment>
    );
}

export default withRoot(Login);
