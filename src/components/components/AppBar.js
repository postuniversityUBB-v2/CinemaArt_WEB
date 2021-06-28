
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
        color: theme.palette.common.white,
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
    },
}));

function AppBar(props) {
    const classes = useStyles();
    return <MuiAppBar className={classes.root} elevation={0} position="static" {...props} />;
}

AppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);
