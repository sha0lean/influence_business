import * as React from 'react';

import Header from '../components/Header';

import CardProfile from '../components/Card/CardProfile.jsx'
import CardSkeleton from "../components/Card/CardSkeleton.jsx"
import CardFeed from '../components/Card/CardFeed.jsx'
import CardModulesTable from '../components/Card/CardModulesTable.jsx'
import SimpleContainer from '../components/containers/SimpleContainer.jsx'
import Container from '@mui/material/Container';

function Feed() {
    // const customization = useSelector((state) => state.customization);
    return (
        <>
            <Header />
            <br />
            <Container maxWidth="xl">
                <CardFeed />
                <br />
                <CardFeed />
                <br />
                <SimpleContainer>
                </SimpleContainer>
                <br />
                <CardModulesTable />
                <br />
                <br />
                <CardProfile />
                <br />
                <br />
                <CardSkeleton />
            </Container>
            <h1>Home Office</h1>
        </>
    )
}

export default Feed;