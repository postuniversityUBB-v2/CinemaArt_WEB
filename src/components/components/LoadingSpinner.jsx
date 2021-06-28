import React from 'react';
import { CircularProgress, Grid} from '@material-ui/core';

const LoadingSpinner = () => {
  return (
    <Grid container spacing={1}>
        <Grid container item xs={12} justify="center">
            <CircularProgress className="loadingIcons" size={60}/>
        </Grid>                                        
    </Grid>
  );
}

export default LoadingSpinner;