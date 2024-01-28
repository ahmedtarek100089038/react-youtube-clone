import React from 'react';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';

const ChannelCard = ({ channelDetail, marginTop }) => (
    <Box
        sx={{
            boxShadow: 'none',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '356px', md: '320px' },
            height: '326px',
            margin: 'auto',
            marginTop,
        }}
    >
        <Link to={`/channel/${channelDetail?.id?.channelId}`} style={{ textDecoration: 'none' }}>
            <CardContent sx={{ textAlign: 'center', color: '#fff' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CardMedia
                        image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
                        alt={channelDetail?.snippet?.title}
                        sx={{ borderRadius: '50%', height: '180px', width: '180px', mb: 2, border: '1px solid #e3e3e3' }}
                    />
                    <Typography variant="h6">
                        {channelDetail?.snippet?.title}{' '}
                        <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {channelDetail?.statistics?.subscriberCount && (
                            <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray', marginRight: '10px',}}>
                                {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
                            </Typography>
                        )}
                        {channelDetail?.statistics?.subscriberCount && channelDetail?.statistics?.videoCount && (
                            <span style={{  fontSize: '15px', fontWeight: 500, color: 'gray', marginLift: '10px' }}>‧</span>
                        )}
                        {channelDetail?.statistics?.videoCount && (
                            <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray', marginLeft: '10px' }}>
                                {parseInt(channelDetail?.statistics?.videoCount).toLocaleString('en-US')} Videos
                            </Typography>
                        )}
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
                        {channelDetail?.snippet?.description.slice(0, 120)}
                    </Typography>
                </Box>
            </CardContent>
        </Link>
    </Box>
);

export default ChannelCard;
