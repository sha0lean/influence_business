import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/system';


function SimpleContainer() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" sx={{ bgcolor: '#CEC6FF', height: '30vh', weight: '20vw' }}>

            </Container>
        </React.Fragment>
    );
}

export default SimpleContainer;