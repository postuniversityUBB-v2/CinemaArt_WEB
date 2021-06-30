import withRoot from '../../components/withRoot';
import React, { useState } from "react";
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import AppForm from '../../components/views/AppForm';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Contact = () => {
        const [open, setOpen] = React.useState(false);
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [email, setEmail] = useState('')
        const [phone, setPhone] = useState('')
        const [message, setMessage] = useState('')
        const [firstNameError, setFirstNameError] = useState(false)
        const [lastNameError, setLastNameError] = useState(false)
        const [emailError, setEmailError] = useState(false)
        const [phoneError, setPhoneError] = useState(false)
        const [messageError, setMesssageError] = useState(false)
    
        const handleSubmitForm = (e) => {
            e.preventDefault()
            console.log(firstName, lastName, email, phone, message)
    
            if (firstName === '') {
                setFirstNameError(true)
            }
    
            if (lastName === '') {
                setLastNameError(true)
            }
    
            if (email === '') {
                setEmailError(true)
            }
    
            if (phone === '') {
                setPhoneError(true)
            }
    
            if (message === '') {
                setMesssageError(true)
            }
    
    
            if (firstName && lastName && email && phone && message) {
                handleClickOpen()
                reset()
                setFirstNameError(false)
                setLastNameError(false)
                setEmailError(false)
                setPhoneError(false)
                setMesssageError(false)
            }
        }
    
        const reset = () => {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setMessage('');
        }
    
        const handleClickOpen = () => {
            setOpen(true);
    
        };
    
        const handleClose = () => {
            setOpen(false);
        };

    return (
        <>
            <AppAppBar />
            <AppForm>
                    <Grid>
                        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5">
                                    Contact Us
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                                    Fill up the form and our team will get back to you within 24 hours.
                                </Typography>
                                <form>
                                    <Grid container spacing={1}>
                                        <Grid xs={12} sm={6} item>
                                            <TextField
                                                onChange={(e) => { setFirstName(e.target.value) }}
                                                value={firstName}
                                                error={firstNameError}
                                                placeholder="Enter first name" label="First Name" variant="outlined" fullWidth required />
                                        </Grid>
                                        <Grid xs={12} sm={6} item>
                                            <TextField
                                                onChange={(e) => { setLastName(e.target.value) }}
                                                value={lastName}
                                                error={lastNameError}
                                                placeholder="Enter last name" label="Last Name" variant="outlined" fullWidth required />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                onChange={(e) => { setEmail(e.target.value) }}
                                                value={email}
                                                error={emailError}
                                                type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth required />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                onChange={(e) => { setPhone(e.target.value) }}
                                                value={phone}
                                                error={phoneError}
                                                type="text" placeholder="Enter phone number" label="Phone" variant="outlined" fullWidth required />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                onChange={(e) => { setMessage(e.target.value) }}
                                                value={message}
                                                error={messageError}
                                                label="Message" multiline rows={4} placeholder="Type your message here" variant="outlined" fullWidth required />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmitForm}>Send</Button>
                                        </Grid>

                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >

                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Thank you for you message, we will get back to you as soon as possible
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Ok
                            </Button>

                        </DialogActions>
                    </Dialog>
            </AppForm>
            
            <AppFooter />
        </>
    );
}

export default withRoot(Contact);
