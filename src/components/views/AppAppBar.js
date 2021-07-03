import React, { useState }  from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBarCustom from '../components/AppBar';
import ToolbarCustom, { styles as toolbarStyles } from '../components/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeIcon from '@material-ui/icons/Home';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 24,
    },
    placeholder: toolbarStyles(theme).root,
    toolbar: {
        justifyContent: 'space-between',
    },
    left: {
        flex: 1,
    },
    leftLinkActive: {
        color: theme.palette.common.white,
    },
    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    rightLink: {
        fontSize: 16,
        color: theme.palette.common.white,
        marginLeft: theme.spacing(3),
    },
    linkSecondary: {
        color: theme.palette.warning.dark,
    },
    root: {
        display: 'flex',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
}));

function AppAppBar(props) {
    // const { classes } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed" 
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className={classes.toolbar}>
                    {user && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <div className={classes.left} />
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        className={classes.title}
                        href="/home/index"
                    >
                        {'Just Watch'}
                    </Link>
                    <div className={classes.right}>
                    {user ? (  
                        <>
                            <Link
                                color="inherit"
                                variant="h6"
                                underline="none"
                                className={classes.rightLink}
                                href="/home/index"
                            >
                                {'Dashboard'}
                            </Link>                          
                            <Link
                                    variant="h6"
                                    underline="none"
                                    className={clsx(classes.rightLink, classes.linkSecondary)}
                                    href="/logout"
                                >
                                    {'Logout'}
                            </Link>
                        </>
                    )
                    : (
                        <>
                            <Link
                                color="inherit"
                                variant="h6"
                                underline="none"
                                className={classes.rightLink}
                                href="/home/index"
                            >
                                {'Dashboard'}
                            </Link>
                            <Link
                                color="inherit"
                                variant="h6"
                                underline="none"
                                className={classes.rightLink}
                                href="/login"
                            >
                                {'Sign In'}
                            </Link>
                            <Link
                                variant="h6"
                                underline="none"
                                className={clsx(classes.rightLink, classes.linkSecondary)}
                                href="/register"
                            >
                                {'Sign Up'}
                            </Link>
                        </>
                    )}
                    </div>
                </Toolbar>
            </AppBar>
            {user &&
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button  component="a" href="/home/index">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component="a" href="/movie/list">
                            <ListItemIcon>
                                <LocalMoviesIcon />
                            </ListItemIcon>
                            <ListItemText primary="Movies"/>
                        </ListItem>
                        <ListItem button component="a" href="/watchlist/list">
                            <ListItemIcon>
                                <PlaylistAddCheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Your Watchlist" />
                        </ListItem>
                    </List>
                </Drawer>
            }
            <div className={classes.placeholder} />
        </div>
    );
}

AppAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(AppAppBar);