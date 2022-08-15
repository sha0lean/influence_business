// import { Table } from "@mui/material";
import React from "react";
import ProfileTabs from "../../components/ProfileTabs";
import ProfileTable from "../../components/ProfileTable";

const Profile = () => {
    return (
        <div className="App">
            Here is the profile page
            <ProfileTabs></ProfileTabs>
            <ProfileTable></ProfileTable>
            <br />
            ----
        </div>
    );
}
export default Profile;