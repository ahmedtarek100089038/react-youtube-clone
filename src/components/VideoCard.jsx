import React from 'react';
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

const formatTimeAgo = (timestamp) => {
    const currentDate = new Date();
    const videoDate = new Date(timestamp);

    const seconds = Math.floor((currentDate - videoDate) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return `${interval} ${interval === 1 ? 'year' : 'years'} ago`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return `${interval} ${interval === 1 ? 'month' : 'months'} ago`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return `${interval} ${interval === 1 ? 'day' : 'days'} ago`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return `${interval} ${interval === 1 ? 'hour' : 'hours'} ago`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return `${interval} ${interval === 1 ? 'minute' : 'minutes'} ago`;
    }

    return `${Math.floor(seconds)} ${Math.floor(seconds) === 1 ? 'second' : 'seconds'} ago`;
};

const VideoCard = ({ video: { id: { videoId }, snippet, liveBroadcastContent } }) => {
    // console.log(videoId, snippet, liveBroadcastContent);
    const publishedTimeAgo = formatTimeAgo(snippet?.publishedAt);

    return (
        <Card sx={{ backgroundColor: "transparent", width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 2 }}>
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                <CardMedia image={snippet?.thumbnails?.high?.url} alt={snippet?.title} sx={{ width: { xs: '100%', sm: '358px' }, height: 180 }} />
            </Link>

            <CardContent sx={{ height: '90px' }}>
                <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                    <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
                        {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
                    </Typography>
                </Link>
                <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
                    <Typography variant="subtitle2" color="gray">
                        {snippet?.channelTitle || demoChannelTitle}
                        <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                    </Typography>
                </Link>
                {/* <Typography variant="caption" color="gray">
                    {publishedTimeAgo}
                </Typography> */}
                {liveBroadcastContent === 'live' && (
                    <Typography variant="caption" color="gray">
                        Streamed {publishedTimeAgo}
                    </Typography>
                )}
                {liveBroadcastContent !== 'live' && (
                    <Typography variant="caption" color="gray">
                        {publishedTimeAgo}
                    </Typography>
                )}
            </CardContent>
        </Card>

    )
}

export default VideoCard;