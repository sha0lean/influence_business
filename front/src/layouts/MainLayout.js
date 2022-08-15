import * as React from 'react';
import { Outlet } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {

    return (
        // <Box sx={{ display: 'flex' }}>
        // </Box>
        <>
            <Outlet />
        </>
    );
};

export default MainLayout;
