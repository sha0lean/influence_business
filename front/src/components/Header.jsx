import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';
import Navigation from './Navigation';

// project imports
// import LogoSection from '../LogoSection';
// import SearchSection from './SearchSection';
// import ProfileSection from './ProfileSection';
// import NotificationSection from './NotificationSection';

// assets
// import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    // const theme = useTheme();

    return (
        <Navigation />
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
