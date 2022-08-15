// import { Table } from "@mui/material";
import React from "react";
import Navigation from "../../components/Navigation.jsx";
import ProfileTabs from "../../components/ProfileTabs.jsx";
// import ProfileTable from "../../components/ProfileTable.jsx";
import { Container } from '@mui/system';

const Profile = () => {
    return (
        <div className="App">
            <Navigation />
            <Container maxwidth="xl">
                <ProfileTabs />
            </Container>
            {/* <ProfileTable></ProfileTable> */}
        </div>
    );
}
export default Profile;