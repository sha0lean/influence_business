import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Header from './Header';
import Customization from '../Customization';
import navigation from 'menu-items';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar>
                <Toolbar>
                    <Header />
                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    );
};

export default MainLayout;
