import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, width: { md: '240px', lg: '240px' }, px: { sx: 0, md: 2 } }}>
        <Sidebar sx={{ borderBottom: '1.5px solid rgba(255,255,255,0.2)' }} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        <Link to='https://ahmedtarek.dev' style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", textAlign: "center" }}>
            Copyright © 2024 <span style={{ color: "#FC1503" }}>Ahmed Tarek</span>
          </Typography>
        </Link>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
