import withRoot from '../../components/withRoot';
// --- Post bootstrap -----
import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Markdown from '../../components/components/Markdown';
import Typography from '../../components/components/Typography';
import AppAppBar from '../../components/views/AppAppBar';
import terms from '../../components/views/terms.md';
import AppFooter from '../../components/views/AppFooter';

function Terms() {
    return (
        <React.Fragment>
            <AppAppBar />
            <Container>
                <Box mt={7} mb={12}>
                    <Typography variant="h3" gutterBottom marked="center" align="center">
                        Terms
                    </Typography>
                    <Markdown>{terms}</Markdown>
                </Box>
            </Container>
            <AppFooter />
        </React.Fragment>
    );
}

export default withRoot(Terms);
