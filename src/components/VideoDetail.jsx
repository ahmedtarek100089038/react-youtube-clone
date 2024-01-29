import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Grid, Avatar, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const [videos, setVideos] = useState(null);
  const [comments, setComments] = useState(null);
  const { id } = useParams();
  const theme = useTheme();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        setVideoDetail(data.items[0]);
        const channelId = data.items[0]?.snippet?.channelId;

        if (channelId) {
          // Fetch channel details including subscriber count
          fetchFromAPI(`channels?part=snippet,statistics&id=${channelId}`)
            .then((channelData) => {
              setChannelDetails({
                ...channelData.items[0]?.snippet,
                subscribers: channelData.items[0]?.statistics?.subscriberCount,
              });
            });
        }
      });

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items));

    fetchFromAPI(`commentThreads?part=snippet,replies&videoId=${id}&maxResults=30`)
      .then((data) => setComments(data.items));
  }, [id]);

  const getTimeDifference = (publishedAt) => {
    const now = new Date();
    const publishedTime = new Date(publishedAt);
    const timeDifference = now - publishedTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    if (months > 0) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    if (weeks > 0) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    if (days > 0) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    if (hours > 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    if (minutes > 0) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    if (seconds > 0) return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;

    return 'just now';
  };

  if (!videoDetail?.snippet || !channelDetails) return <Loader />;

  const {
    snippet: {
      title,
      channelId,
      description,
      thumbnails: { medium: thumbnail },
      publishedAt,
    },
    statistics: { viewCount, likeCount, commentCount },
  } = videoDetail;

  const { title: channelTitle, thumbnails: { medium: channelThumbnail } } = channelDetails;

  return (
    <Box minHeight="95vh">
      <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
      <Box px={2} py={2}>
        <Typography color="#fff" variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1}>
          <Link to={`/channel/${channelId}`}>
            <Box display="flex" alignItems="center">
              <Avatar src={channelThumbnail?.url} alt={channelTitle} />
              <Typography
                variant={theme.breakpoints.down("sm") ? "subtitle1" : "h6"}
                color="#fff"
                sx={{ marginLeft: 2 }}
              >
                {channelTitle}
                <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {parseInt(channelDetails?.subscribers).toLocaleString('en-US')} Subscribers
                </Typography>
              </Typography>
            </Box>
          </Link>
        </Stack>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          {/* Description section */}
          <Box maxHeight="200px" overflow="auto" sx={{ background: '#272727', padding: 1, marginLeft: 1, borderRadius: 2 }}>
            <Stack direction="row" gap="20px"  alignItems="center">
              <Typography variant="body1" color="#fff" sx={{ opacity: 0.7 }}>
                {parseInt(viewCount).toLocaleString()} views
              </Typography>
              <Typography variant="body1" color="#fff" sx={{ opacity: 0.7 }}>
                {parseInt(likeCount).toLocaleString()} likes
              </Typography>
              <Stack direction="row" alignItems="center">
                <AccessTimeIcon sx={{ fontSize: "16px", color: "#fff", mr: "2px" }} />
                <Typography variant="body1" color="#fff" sx={{ opacity: 0.7 }}>
                  {getTimeDifference(publishedAt)}
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="body1" color="#fff" mt={1}>
              {description}
            </Typography>
          </Box>
          {comments && (
            <Box px={2} py={2} overflow="auto" maxHeight={{ xs: "200px", md: "none" }}>
              {/* Comments section */}
              <Typography variant="h6" color="#fff" mb={2}>
                {parseInt(commentCount).toLocaleString()} Comments
              </Typography>
              {comments.map((comment) => (
                <Box key={comment.id} mb={2}>
                  <Typography variant="subtitle1" color="#fff" fontWeight="bold">
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </Typography>
                  <Typography variant="caption" color="gray">
                    {getTimeDifference(comment.snippet.topLevelComment.snippet.publishedAt)}
                  </Typography>
                  <Typography variant="body1" color="#fff">
                    {comment.snippet.topLevelComment.snippet.textDisplay}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          {/* Other videos section */}
          <Box px={2} py={2}>
            <Videos videos={videos} direction="column" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoDetail;
