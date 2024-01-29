import { Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../utils/constants.js";

import { SearchBar } from "./";

const Navbar = () => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{ position: "sticky", background: '#000', top: 0, justifyContent: "space-between" }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
        <Typography
          variant="h6"
          fontWeight="bold"
          color="#FFF"
          sx={{
            margin: '10px',
            fontSize: { xs: '18.5px', sm: 'inherit' }, // Adjust font size for different screen sizes
          }}
        >
          Clone
        </Typography>
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;
