import withRoot from '../../components/withRoot';
import React,{ useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { Redirect } from 'react-router-dom';

import AppFooter from '../../components/views/AppFooter';
import AppAppBar from '../../components/views/AppAppBar';
import Chart from '../../components/components/statistics/Chart';
import RecentIncome from '../../components/components/statistics/RecentIncome';
import RecentProjects from '../../components/components/statistics/RecentProjects';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '74vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Charts = () => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [user,setUser]= useState(JSON.parse(localStorage.getItem("user")))
  
     if(!user){
       return <Redirect to="/"/>
     }

    return (
        <React.Fragment>
            <AppAppBar />
            <div className="listEntities">
                <div className={classes.root}>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="lg" className={classes.container}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper>
                                        <Chart />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper className={fixedHeightPaper}>
                                        <RecentIncome />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <RecentProjects />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </main>
                </div>
            </div>
            <AppFooter />
        </React.Fragment>
    );
}

export default withRoot(Charts);
