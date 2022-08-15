import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

function CardSkeleton(props) {
    const { loading = false } = props;

    return (
        <>
            <Card sx={{
                width: "50%",
                m: 2
            }}>
                <CardHeader
                    avatar={
                        loading ? (
                            <Skeleton animation="wave" variant="circular" width={40} height={40} />
                        ) : (
                            <Avatar
                                alt="Project update"
                                src="https://cms.weka.ch/fileadmin_personal_schweiz/USERDATA/Corporate_culture_nouveau.jpg"
                            />
                        )
                    }
                    action={
                        loading ? null : (
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        )
                    }
                    title={
                        loading ? (
                            <Skeleton
                                animation="wave"
                                height={10}
                                width="80%"
                                style={{ marginBottom: 6 }}
                            />
                        ) : (
                            'Ted'
                        )
                    }
                    subheader={
                        loading ? (
                            <Skeleton animation="wave" height={10} width="40%" />
                        ) : (
                            '5 hours ago'
                        )
                    }
                />
                {loading ? (
                    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                ) : (
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://cms.weka.ch/fileadmin_personal_schweiz/USERDATA/Corporate_culture_nouveau.jpg"
                        alt="c'est just"
                    />
                )}

                <CardContent>
                    {loading ? (
                        <React.Fragment>
                            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={10} width="80%" />
                        </React.Fragment>
                    ) : (
                        <Typography variant="body2" color="text.secondary" component="p">
                            {
                                "C'est notre projet, ..."
                            }
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </>

    );
}

CardSkeleton.propTypes = {
    loading: PropTypes.bool,
};

export default function Facebook() {
    return (
        <div>
            <CardSkeleton loading />
            <CardSkeleton />
        </div>
    );
}
